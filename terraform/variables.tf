variable "storage_account_name" {
  type = string
}

variable "static_site_name" {
  type = string
}

variable "container_name" {
  type = string
}

variable "resource_group_name" {
  type = string
}

variable "resource_group_location" {
  type = string
}

variable "key" {
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
