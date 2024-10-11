locals {
  prefix    = "selc"
  env_short = "u"
  env       = "uat"
  location  = "italynorth"
  project   = "${local.prefix}-${local.env_short}"
  domain    = "selc-login-frontend"

  repo_name = "selfcare-login-frontend"

  tags = {
    CostCenter  = "TS310 - PAGAMENTI & SERVIZI"
    CreatedBy   = "Terraform"
    Environment = "UAT"
    Owner       = "SelfCare"
    Source      = "https://github.com/pagopa/selfcare-login-frontend/blob/main/infra/identity/prod"
  }
}