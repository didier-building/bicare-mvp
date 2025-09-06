#!/bin/bash

# Environment variable validation script for BiCare MVP
echo "🔍 BiCare MVP - Environment Validation"
echo "======================================"

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ .env.example file not found"
    exit 1
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found - creating from .env.example"
    cp .env.example .env.local
    echo "✓ Created .env.local from template"
else
    echo "✓ .env.local exists"
fi

# Validate required environment variables
echo ""
echo "📋 Checking required environment variables:"

required_vars=(
    "VITE_API_BASE_URL"
    "VITE_APP_ENV"
)

all_valid=true

for var in "${required_vars[@]}"; do
    if grep -q "^${var}=" .env.local 2>/dev/null; then
        value=$(grep "^${var}=" .env.local | cut -d'=' -f2)
        if [ -n "$value" ]; then
            echo "✓ $var is set"
        else
            echo "❌ $var is empty"
            all_valid=false
        fi
    else
        echo "❌ $var is missing"
        all_valid=false
    fi
done

# Check if environment variables are used properly in code
echo ""
echo "🔧 Checking environment variable usage in code:"

if grep -r "import.meta.env.VITE_" src/services/ > /dev/null 2>&1; then
    echo "✓ Environment variables properly used in services"
else
    echo "❌ Environment variables not found in services"
    all_valid=false
fi

# Check for hardcoded URLs that should use environment variables
echo ""
echo "🔍 Checking for hardcoded configurations:"

hardcoded_urls=$(grep -r "http://localhost" src/ --exclude-dir=node_modules 2>/dev/null | grep -v "import.meta.env" | wc -l)
if [ "$hardcoded_urls" -eq 0 ]; then
    echo "✓ No hardcoded URLs found"
else
    echo "⚠️  Found $hardcoded_urls potentially hardcoded URL(s) - consider using environment variables"
fi

echo ""
if [ "$all_valid" = true ]; then
    echo "🎉 Environment validation passed!"
    exit 0
else
    echo "❌ Environment validation failed - please fix the issues above"
    exit 1
fi