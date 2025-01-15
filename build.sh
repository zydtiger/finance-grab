#!/bin/bash

# This script reinstalls the virtual environment for finance-api
# submodule to ensure clean packaged environment.

rm -rf finance-api/venv
python3 -m venv finance-api/venv
source finance-api/venv/bin/activate
pip install -r finance-api/requirements.txt
deactivate
