locals {
  prefix    = "selc"
  env_short = "p"
  env       = "prod"
  location  = "italynorth"
  project   = "${local.prefix}-${local.env_short}"
  domain    = "selc-login-frontend"

  repo_name = "selfcare-login-frontend"

  tags = {
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "SelfCare"
    Source         = "https://github.com/pagopa/selfcare-login-frontend/blob/main/infra/identity/prod"
  }
}
