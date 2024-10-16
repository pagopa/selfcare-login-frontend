resource "github_repository_environment" "github_repository_environment_cd" {
  environment = "${var.environment}-cd"
  repository  = local.github.repository

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }

  reviewers {
    teams = matchkeys(
      data.github_organization_teams.all.teams[*].id,
      data.github_organization_teams.all.teams[*].slug,
      local.cd.reviewers_teams
    )
  }
}