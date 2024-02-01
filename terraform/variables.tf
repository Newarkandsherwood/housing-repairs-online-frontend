variable "static_site_name" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "location" {
  type    = string
  default = "westeurope"
}

variable "sku_tier" {
  type    = string
  default = "Standard"
}

variable "sku_size" {
  type    = string
  default = "Standard"
}

variable "custom_domain_name" {
  type    = string
  default = ""
}
