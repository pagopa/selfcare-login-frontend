terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "<= 3.112.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfappprodselfcare"
    container_name       = "terraform-state"
    key                  = "selfcare-login-frontend.identity.tfstate"
  }
}

provider "azurerm" {
  features {
  }
}

provider "github" {
  owner = "pagopa"
}

module "federated_identities" {
  source = "github.com/pagopa/dx//infra/modules/azure_federated_identity_with_github?ref=main"

  prefix    = local.prefix
  env_short = local.env_short
  env       = local.env
  domain    = local.domain

  repositories = [local.repo_name]

  tags = local.tags
}

module "github_environments" {
  source = "../../modules/github_environments"

  environment = local.env
  repository  = local.repo_name
  prefix      = local.prefix
  reviewers   = ["selfcare-admin", "selfcare-contributors", "engineering-team-cloud-eng"]

  depends_on = [module.federated_identities]
}