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

resource "azurerm_static_site" "hrostaticwebapp" {
  name                = var.static_site_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku_tier            = var.sku_tier
  sku_size            = var.sku_size
}

resource "azurerm_static_site_custom_domain" "hrostaticwebapp" {
  count           = var.custom_domain_name == "" ? 0 : 1
  static_site_id  = azurerm_static_site.hrostaticwebapp.id
  domain_name     = var.custom_domain_name
  validation_type = "cname-delegation"
}
