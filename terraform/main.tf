terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.10.0"
    }
  }
}
provider "azurerm" {
  features {}
}
terraform {
  backend "azurerm" {}
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
