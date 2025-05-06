#!/bin/bash

echo "🔧 Running ESLint auto-fix..."
npx eslint . --ext .ts,.tsx --fix --ignore-path .gitignore

echo "🎨 Running Prettier format..."
npx prettier . --write

echo "✅ Done. Linting and formatting complete."
