terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "<= 3.112.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfappdevselfcare"
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

module "github_environments" {
  source = "../../modules/github_environments"

  environment = local.env
  repository  = local.repo_name
  prefix      = local.prefix
  reviewers   = ["selfcare-admin", "selfcare-contributors", "engineering-team-cloud-eng"]
}