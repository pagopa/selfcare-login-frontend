# resource "github_branch_default" "default_main" {
#   repository = github_repository.this.name
#   branch     = "main"
# }

# resource "github_branch_protection" "protection_main" {
#   repository_id = github_repository.this.name
#   pattern       = "main"

#   required_status_checks {
#     strict = true
#     contexts = [
#       "selfacre-login-frontend.code-review",
#     ]
#   }

#   require_conversation_resolution = false

#   #tfsec:ignore:github-branch_protections-require_signed_commits
#   require_signed_commits = false

#   force_push_bypassers = []

#   required_pull_request_reviews {
#     dismiss_stale_reviews           = false
#     require_code_owner_reviews      = true
#     required_approving_review_count = 1
#     dismissal_restrictions          = []
#     pull_request_bypassers          = []
#     restrict_dismissals             = false
#   }

#   restrict_pushes {
#     blocks_creations = false
#     push_allowances = [
#       "pagopa/selfcare-admin",
#       "pagopa/selfcare-contributors",
#       "pagopa/engineering-team-cloud-eng",
#     ]
#   }

#   allows_deletions = false
# }

# resource "github_branch_protection" "protection_release_dev" {
#   repository_id = github_repository.this.name
#   pattern       = "release-dev"

#   require_conversation_resolution = false
#   required_linear_history         = true

#   #tfsec:ignore:github-branch_protections-require_signed_commits
#   require_signed_commits = false

#   force_push_bypassers = []

#   required_pull_request_reviews {
#     dismiss_stale_reviews           = true
#     require_code_owner_reviews      = true
#     required_approving_review_count = 1
#     dismissal_restrictions          = []
#     pull_request_bypassers          = []
#     restrict_dismissals             = false
#   }

#   allows_deletions = false
# }