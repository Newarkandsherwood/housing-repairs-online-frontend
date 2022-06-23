terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.10.0"
    },
    github = {
      source  = "integrations/github"
      version = "~> 4.0"
    }
  }
}
provider "azurerm" {
  features {}
  skip_provider_registration = true
}
terraform {
  backend "azurerm" {}
}

provider "github" {
}

locals {
  api_token_var = "AZURE_STATIC_WEB_APPS_API_TOKEN_2"
}

resource "github_actions_secret" "api_key" {
  repository      = "housing-repairs-online-frontend"
  secret_name     = local.api_token_var
  plaintext_value = azurerm_static_site.hro_frontend_test.api_key
}

data "terraform_remote_state" "state" {
  backend = "azurerm"
  config = {
    resource_group_name  = var.resource_group_name
    storage_account_name = var.storage_account_name
    container_name       = var.container_name
    key                  = var.key
  }
}

resource "azurerm_static_site" "hro_frontend_test" {
  name                = "hrofrontendtest"
  resource_group_name = var.resource_group_name
  location            = var.location
}
