$ErrorActionPreference = "Stop"

$ProjectNumber = 1
$ProjectId = "PVT_kwHOAHB0Ns4BgzQm"
$Owner = "mmesaman"

$CsvFile = ".\Fortune_Kids_GitHub_Project_Backlog.csv"
$ProjectItemsFile = ".\project-items.json"

Write-Host ""
Write-Host "========================================"
Write-Host " FORTUNE KIDS - ASIGNACION FINAL"
Write-Host "========================================"
Write-Host ""

# ============================================================
# 1. LEER CSV
# ============================================================

Write-Host "1. Leyendo CSV..."

$tasks = @(Import-Csv $CsvFile)

Write-Host "   Tareas CSV: $($tasks.Count)"

if ($tasks.Count -ne 104) {
    throw "El CSV debe contener 104 tareas."
}

# ============================================================
# 2. LEER PROJECT ITEMS
# ============================================================

Write-Host "2. Leyendo Project Items..."

$projectData = Get-Content $ProjectItemsFile -Raw | ConvertFrom-Json
$projectItems = @($projectData.items)

Write-Host "   Project Items: $($projectItems.Count)"

if ($projectItems.Count -ne 104) {
    throw "El Project debe contener 104 elementos."
}

# ============================================================
# 3. MAPEAR FK -> PROJECT ITEM
# ============================================================

Write-Host "3. Creando mapa FK -> Project Item..."

$itemMap = @{}

foreach ($item in $projectItems) {

    if ($null -eq $item.content) {
        continue
    }

    $title = [string]$item.content.title

    if ($title -match '\[(FK-\d+)\]') {

        $fk = $Matches[1]
        $itemMap[$fk] = [string]$item.id
    }
}

Write-Host "   Correspondencias: $($itemMap.Count)"

if ($itemMap.Count -ne 104) {
    throw "No se han encontrado las 104 correspondencias FK -> Project Item."
}

# ============================================================
# 4. IDs DE PRIORITY
# ============================================================

$PriorityOptions = @{
    "P0" = "c6e13b49"
    "P1" = "19d94bbd"
    "P2" = "333d379b"
    "P3" = "f13bd79d"
}

$PriorityFieldId = "PVTSSF_lAHOAHB0Ns4BgzQmzhf0QHU"

# ============================================================
# 5. IDs DE PHASE
# ============================================================

$PhaseOptions = @{
    "fase-0"  = "07e554c8"
    "fase-1"  = "c88c49b4"
    "fase-2"  = "1dfd1dcc"
    "fase-3"  = "658b6604"
    "fase-4"  = "accb9b42"
    "fase-5"  = "0dc071c0"
    "fase-6"  = "cf27ddef"
    "fase-7"  = "00498d9a"
    "fase-8"  = "cbd85acc"
    "fase-9"  = "c64ff9b9"
    "fase-10" = "3c24d64e"
    "fase-11" = "37e17338"
    "fase-12" = "821feb5e"
}

$PhaseFieldId = "PVTSSF_lAHOAHB0Ns4BgzQmzhf3ues"

# ============================================================
# 6. VALIDACION
# ============================================================

Write-Host "4. Validando tareas..."

$errors = @()

foreach ($task in $tasks) {

    $fk = [string]$task."Task ID"
    $priority = ([string]$task.Priority).Trim().ToUpper()
    $labels = ([string]$task.Labels).ToLower()

    if (-not $itemMap.ContainsKey($fk)) {
        $errors += "$fk : no existe en Project"
        continue
    }

    if (-not $PriorityOptions.ContainsKey($priority)) {
        $errors += "$fk : Priority '$priority' desconocida"
    }

    # Buscar fase directamente en Labels.
    # Ejemplo: fortune-kids,fase-0
    $phaseMatch = [regex]::Match(
        $labels,
        '(?:^|,)fase-(\d+)(?:,|$)'
    )

    if (-not $phaseMatch.Success) {
        $errors += "$fk : no se encontró fase-0 ... fase-12 en Labels '$labels'"
    }
    else {

        $phase = "fase-" + $phaseMatch.Groups[1].Value

        if (-not $PhaseOptions.ContainsKey($phase)) {
            $errors += "$fk : fase '$phase' desconocida"
        }
    }
}

if ($errors.Count -gt 0) {

    Write-Host ""
    Write-Host "ERRORES:" -ForegroundColor Red

    foreach ($e in $errors) {
        Write-Host "  $e" -ForegroundColor Red
    }

    throw "Validación fallida. NO se ha modificado ninguna tarea."
}

Write-Host "   VALIDACION OK: 104 tareas"

# ============================================================
# 7. RESUMEN
# ============================================================

Write-Host ""
Write-Host "========================================"
Write-Host " VALIDACION COMPLETADA"
Write-Host "========================================"
Write-Host "CSV:           104"
Write-Host "Project Items: 104"
Write-Host "Priority:      OK"
Write-Host "Phase:         OK"
Write-Host "========================================"
Write-Host ""

$answer = Read-Host "Escribe SI para comenzar la asignacion"

if ($answer -ne "SI") {
    Write-Host "Cancelado."
    exit 0
}

# ============================================================
# 8. ASIGNAR
# ============================================================

Write-Host ""
Write-Host "5. Asignando Priority y Phase..."
Write-Host ""

$i = 0
$ok = 0
$errorsCount = 0

foreach ($task in $tasks) {

    $i++

    $fk = [string]$task."Task ID"
    $priority = ([string]$task.Priority).Trim().ToUpper()
    $labels = ([string]$task.Labels).ToLower()

    $phaseMatch = [regex]::Match(
        $labels,
        '(?:^|,)fase-(\d+)(?:,|$)'
    )

    $phase = "fase-" + $phaseMatch.Groups[1].Value

    $itemId = $itemMap[$fk]

    $priorityOptionId = $PriorityOptions[$priority]
    $phaseOptionId = $PhaseOptions[$phase]

    Write-Host "[$i/104] $fk | $priority | $phase"

    # --------------------------------------------------------
    # PRIORITY
    # --------------------------------------------------------

    try {

        & gh project item-edit `
            --id $itemId `
            --field-id $PriorityFieldId `
            --project-id $ProjectId `
            --single-select-option-id $priorityOptionId `
            --format json 2>&1 | Out-Null

        if ($LASTEXITCODE -ne 0) {
            throw "ERROR Priority"
        }

        Write-Host "    Priority OK"
    }
    catch {

        Write-Host "    ERROR Priority" -ForegroundColor Red
        $errorsCount++
        continue
    }

    # --------------------------------------------------------
    # PHASE
    # --------------------------------------------------------

    try {

        & gh project item-edit `
            --id $itemId `
            --field-id $PhaseFieldId `
            --project-id $ProjectId `
            --single-select-option-id $phaseOptionId `
            --format json 2>&1 | Out-Null

        if ($LASTEXITCODE -ne 0) {
            throw "ERROR Phase"
        }

        Write-Host "    Phase OK"
        $ok++
    }
    catch {

        Write-Host "    ERROR Phase" -ForegroundColor Red
        $errorsCount++
    }
}

# ============================================================
# 9. RESULTADO
# ============================================================

Write-Host ""
Write-Host "========================================"
Write-Host " RESULTADO"
Write-Host "========================================"
Write-Host "Procesadas:  $i"
Write-Host "Correctas:   $ok"
Write-Host "Errores:     $errorsCount"
Write-Host "========================================"

if ($errorsCount -eq 0) {
    Write-Host ""
    Write-Host "TODAS LAS 104 TAREAS SE HAN ASIGNADO CORRECTAMENTE." -ForegroundColor Green
}
else {
    Write-Host ""
    Write-Host "SE HAN PRODUCIDO ERRORES." -ForegroundColor Red
    exit 1
}