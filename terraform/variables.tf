variable "storage_account_name" {
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
variable "owner" {
  type = string
}
variable "location" {
  type    = string
  default = "westeurope"
}
