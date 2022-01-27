#!/bin/bash

files=(../../tests/cypress/integration/**/*);
(IFS=,; echo "[${files[*]#*/*/*/*/*/}]")

