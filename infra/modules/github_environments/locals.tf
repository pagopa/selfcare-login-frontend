locals {
  prefix    = var.prefix

  env_short = (
    var.environment == "dev" ? "d" :
    var.environment == "uat" ? "u" :
    var.environment == "prod" ? "p" : null
  )
  project = "${local.prefix}-${local.env_short}"

  identity_resource_group_name = "${local.project}-identity-rg"

  github = {
    org        = "pagopa"
    repository = var.repository
  }

  ci = {
    secrets = {
      "ARM_CLIENT_ID" = data.azurerm_user_assigned_identity.identity_ci.client_id
      "ARM_TENANT_ID"       = data.azurerm_client_config.current.tenant_id,
      "ARM_SUBSCRIPTION_ID" = data.azurerm_subscription.current.subscription_id
    }
  }

  cd = {
    secrets = {
      "ARM_CLIENT_ID" = data.azurerm_user_assigned_identity.identity_cd.client_id
      "ARM_TENANT_ID"       = data.azurerm_client_config.current.tenant_id,
      "ARM_SUBSCRIPTION_ID" = data.azurerm_subscription.current.subscription_id
    }
    reviewers_teams = var.reviewers
  }
}
