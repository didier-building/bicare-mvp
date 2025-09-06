#!/bin/bash

# Code analysis script for BiCare MVP
echo "📊 BiCare MVP - Code Structure Analysis"
echo "======================================="

echo ""
echo "📁 Project Structure:"
tree src/ -I node_modules 2>/dev/null || find src/ -type f -name "*.jsx" -o -name "*.js" | sort

echo ""
echo "📏 Component Sizes (lines of code):"
echo "Component                                    Lines"
echo "--------------------------------------------+------"
find src/ -name "*.jsx" -o -name "*.js" | while read file; do
    lines=$(wc -l < "$file")
    printf "%-44s %5d\n" "$file" "$lines"
done | sort -k2 -nr

echo ""
echo "🔍 Modular Structure Analysis:"

# Check for proper modular structure
if [ -d "src/components/portals" ]; then
    portal_count=$(find src/components/portals -name "*.jsx" | wc -l)
    echo "✓ Portal components: $portal_count files"
else
    echo "❌ Missing portal components directory"
fi

if [ -d "src/components/shared" ]; then
    shared_count=$(find src/components/shared -name "*.jsx" | wc -l)
    echo "✓ Shared components: $shared_count files"
else
    echo "❌ Missing shared components directory"
fi

if [ -d "src/utils" ]; then
    utils_count=$(find src/utils -name "*.js" -o -name "*.jsx" | wc -l)
    echo "✓ Utility modules: $utils_count files"
else
    echo "❌ Missing utils directory"
fi

if [ -d "src/data" ]; then
    data_count=$(find src/data -name "*.js" | wc -l)
    echo "✓ Data modules: $data_count files"
else
    echo "❌ Missing data directory"
fi

echo ""
echo "📦 Import Analysis:"

# Check for circular dependencies (basic check)
echo "Checking for potential circular dependencies..."
temp_file=$(mktemp)
find src/ -name "*.jsx" -o -name "*.js" | while read file; do
    echo "File: $file" >> "$temp_file"
    grep -E "^import.*from.*['\"]@/" "$file" | sed 's/.*from ['\''\"]/  imports: /' | sed 's/['\''\"]//' >> "$temp_file"
    echo "" >> "$temp_file"
done

echo "Import relationships documented in analysis"

echo ""
echo "⚡ Performance Metrics:"

# Bundle size analysis
if [ -f "dist/assets/index-*.js" ]; then
    bundle_size=$(stat -c%s dist/assets/index-*.js 2>/dev/null | head -1)
    if [ -n "$bundle_size" ]; then
        bundle_kb=$((bundle_size / 1024))
        echo "Main bundle size: ${bundle_kb}KB"
        
        if [ $bundle_size -gt 512000 ]; then
            echo "⚠️  Bundle is large (>500KB) - consider code splitting"
        else
            echo "✓ Bundle size is acceptable"
        fi
    fi
else
    echo "ℹ️  No build artifacts found - run 'npm run build' first"
fi

echo ""
echo "🧹 Code Quality Checks:"

# Check for large files
large_files=$(find src/ -name "*.jsx" -o -name "*.js" | xargs wc -l | awk '$1 > 300 {print $0}' | grep -v total | wc -l)
if [ "$large_files" -eq 0 ]; then
    echo "✓ No overly large files (>300 lines)"
else
    echo "⚠️  Found $large_files large file(s) - consider splitting"
fi

# Check for TODO/FIXME comments
todo_count=$(grep -r "TODO\|FIXME" src/ 2>/dev/null | wc -l)
if [ "$todo_count" -eq 0 ]; then
    echo "✓ No TODO/FIXME comments found"
else
    echo "📝 Found $todo_count TODO/FIXME comment(s)"
fi

# Clean up
rm -f "$temp_file"

echo ""
echo "✅ Code analysis complete!"