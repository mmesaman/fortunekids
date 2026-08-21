$repo = "mmesaman/fortunekids"
$project = 1

$issues = gh issue list `
    --repo $repo `
    --state open `
    --limit 200 `
    --json number,url,title |
    ConvertFrom-Json

foreach ($issue in $issues) {

    Write-Host "Añadiendo #$($issue.number) - $($issue.title)" -ForegroundColor Cyan

    gh project item-add `
        $project `
        --owner mmesaman `
        --url $issue.url

    if ($LASTEXITCODE -eq 0) {
        Write-Host "  OK" -ForegroundColor Green
    } else {
        Write-Host "  Ya estaba o se produjo un error" -ForegroundColor Yellow
    }
}