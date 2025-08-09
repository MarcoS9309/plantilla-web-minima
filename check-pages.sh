#!/bin/bash

# Script de validación para GitHub Pages
echo "🔍 Verificando configuración para GitHub Pages..."

# Verificar archivos esenciales
files_to_check=("index.html" "assets/css/styles.css" "assets/js/main.js" ".nojekyll")

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file faltante"
        exit 1
    fi
done

# Verificar que las rutas en index.html sean relativas
if grep -q 'href="/\|src="/' index.html; then
    echo "⚠️  Advertencia: Se encontraron rutas absolutas en index.html"
    echo "   Recomendación: Usar rutas relativas (./assets/...)"
else
    echo "✅ Rutas relativas correctas en index.html"
fi

# Verificar workflow de GitHub Actions
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Workflow de GitHub Actions configurado"
else
    echo "❌ Workflow de GitHub Actions faltante"
    exit 1
fi

echo ""
echo "🚀 Configuración lista para GitHub Pages"
echo "📝 Pasos siguientes:"
echo "   1. git add ."
echo "   2. git commit -m 'Configurar GitHub Pages'"
echo "   3. git push origin main"
echo "   4. Ir a Settings > Pages > Source > GitHub Actions"