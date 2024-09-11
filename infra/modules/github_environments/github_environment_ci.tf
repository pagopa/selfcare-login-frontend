resource "github_repository_environment" "github_repository_environment_ci" {
  environment = "${var.environment}-ci"
  repository  = local.github.repository

  deployment_branch_policy {
    protected_branches     = false
    custom_branch_policies = true
  }
}