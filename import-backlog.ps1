$repo = "mmesaman/fortunekids"
$csv = ".\Fortune_Kids_GitHub_Project_Backlog.csv"

$tasks = Import-Csv $csv

foreach ($task in $tasks) {

    Write-Host "Creando $($task.'Task ID'): $($task.Title)" -ForegroundColor Cyan

    $body = @"
## Tarea

$($task.Description)

### Información

- **ID:** $($task.'Task ID')
- **Fase:** $($task.Phase)
- **Prioridad:** $($task.Priority)
- **Estado inicial:** $($task.Status)
"@

    gh issue create `
        --repo $repo `
        --title $task.Title `
        --body $body

    Start-Sleep -Milliseconds 500
}