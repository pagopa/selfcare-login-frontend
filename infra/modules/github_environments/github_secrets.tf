# CI Secrets
resource "github_actions_environment_secret" "env_ci_secrets" {
  for_each = local.ci.secrets

  repository      = local.github.repository
  environment     = github_repository_environment.github_repository_environment_ci.environment
  secret_name     = each.key
  plaintext_value = each.value
}

# CD Secrets
resource "github_actions_environment_secret" "env_cd_secrets" {
  for_each = local.cd.secrets

  repository      = local.github.repository
  environment     = github_repository_environment.github_repository_environment_cd.environment
  secret_name     = each.key
  plaintext_value = each.value
}