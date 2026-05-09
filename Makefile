# gorfmusic.com — typecheck, build (Vite), security check, deploy to SMB

SHELL := /bin/bash
DIST := dist
-include .deploy-env

EXCLUDE := --exclude='.git' --exclude='.gitignore' --exclude='.cursor' --exclude='.cursorignore' \
	--exclude='node_modules' --exclude='*.md' --exclude='Makefile' --exclude='.deploy-env' --exclude='.deploy-env.example' \
	--exclude='deploy-to-smb.sh' --exclude='scripts' --exclude='$(DIST)'

.PHONY: build deploy clean install security-check

install:
	npm ci

security-check:
	@chmod +x scripts/security-check.sh 2>/dev/null; ./scripts/security-check.sh

build: security-check install
	@echo "Building $(DIST)/ with Vite..."
	npm run build
	@echo "Build done: $(DIST)/"

deploy: build
	@./deploy-to-smb.sh

clean:
	rm -rf $(DIST) node_modules/.vite
