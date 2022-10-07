terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.10.0"
    }
  }
  backend "azurerm" {}
}

provider "azurerm" {
  features {}
  skip_provider_registration = true
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

resource "azurerm_static_site" "hrostaticwebapp" {
  name                = var.static_site_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku_tier            = var.sku_tier
  sku_size            = var.sku_size
}

resource "azurerm_static_site_custom_domain" "hrostaticwebapp" {
  static_site_id  = azurerm_static_site.hrostaticwebapp.id
  domain_name     = var.custom_domain_name
  validation_type = "cname-delegation"
}