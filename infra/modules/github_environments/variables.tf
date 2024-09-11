variable "environment" {
  description = "Environment name"
  type        = string
  validation {
    condition     = contains(["dev", "uat", "prod"], var.environment)
    error_message = "Environment can be'dev', 'uat' or 'prod'."
  }
}

variable "reviewers" {
  description = "List of reviewers teams"
  type        = list(string)
  default     = []
}

variable "repository" {
  description = "Repository name"
  type        = string
}

variable "prefix" {
  description = "Prefix used for resource names"
  type        = string
}