#!/bin/bash

# Quality Control Script for plantilla-web-minima
# Comprehensive testing and validation

echo "🔍 INICIANDO CONTROL DE CALIDAD Y PRUEBAS"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# Function to log results
log_result() {
    local status=$1
    local message=$2
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    case $status in
        "PASS")
            echo -e "${GREEN}✅ $message${NC}"
            PASSED_CHECKS=$((PASSED_CHECKS + 1))
            ;;
        "FAIL")
            echo -e "${RED}❌ $message${NC}"
            FAILED_CHECKS=$((FAILED_CHECKS + 1))
            ;;
        "WARN")
            echo -e "${YELLOW}⚠️  $message${NC}"
            WARNING_CHECKS=$((WARNING_CHECKS + 1))
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

echo
echo "📁 1. VERIFICACIÓN DE ESTRUCTURA DE ARCHIVOS"
echo "============================================"

# Essential files check
files_to_check=("index.html" "assets/css/styles.css" "assets/js/main.js" ".nojekyll" "README.md" "SECURITY.md")

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        log_result "PASS" "$file encontrado"
    else
        log_result "FAIL" "$file faltante"
    fi
done

# GitHub workflow check
if [ -f ".github/workflows/deploy.yml" ]; then
    log_result "PASS" "Workflow de GitHub Actions configurado"
else
    log_result "FAIL" "Workflow de GitHub Actions faltante"
fi

echo
echo "🎨 2. VALIDACIÓN DE CSS"
echo "======================="

# Check CSS file exists and has content
if [ -f "assets/css/styles.css" ]; then
    css_lines=$(wc -l < "assets/css/styles.css")
    if [ "$css_lines" -gt 10 ]; then
        log_result "PASS" "Archivo CSS tiene contenido ($css_lines líneas)"
    else
        log_result "WARN" "Archivo CSS parece estar vacío o muy pequeño ($css_lines líneas)"
    fi
    
    # Check for common CSS properties
    if grep -q "font-family\|color\|background\|margin\|padding" assets/css/styles.css; then
        log_result "PASS" "CSS contiene propiedades básicas de estilo"
    else
        log_result "WARN" "CSS parece no contener propiedades básicas de estilo"
    fi
    
    # Check for responsive design
    if grep -q "@media" assets/css/styles.css; then
        log_result "PASS" "CSS incluye media queries para diseño responsive"
    else
        log_result "WARN" "CSS no parece incluir media queries para diseño responsive"
    fi
else
    log_result "FAIL" "Archivo CSS no encontrado"
fi

echo
echo "🌐 3. VALIDACIÓN DE HTML"
echo "======================="

if [ -f "index.html" ]; then
    # Check HTML structure
    if grep -q "<!DOCTYPE html>" index.html; then
        log_result "PASS" "HTML incluye DOCTYPE"
    else
        log_result "FAIL" "HTML no incluye DOCTYPE"
    fi
    
    if grep -q "<html lang=" index.html; then
        log_result "PASS" "HTML incluye atributo lang"
    else
        log_result "WARN" "HTML no incluye atributo lang"
    fi
    
    if grep -q "<meta charset=" index.html; then
        log_result "PASS" "HTML incluye meta charset"
    else
        log_result "FAIL" "HTML no incluye meta charset"
    fi
    
    if grep -q "<meta name=\"viewport\"" index.html; then
        log_result "PASS" "HTML incluye meta viewport"
    else
        log_result "FAIL" "HTML no incluye meta viewport"
    fi
    
    # Check for semantic HTML
    semantic_tags=("main" "header" "nav" "section" "article" "footer")
    semantic_found=0
    for tag in "${semantic_tags[@]}"; do
        if grep -q "<$tag" index.html; then
            semantic_found=$((semantic_found + 1))
        fi
    done
    
    if [ "$semantic_found" -ge 3 ]; then
        log_result "PASS" "HTML usa etiquetas semánticas ($semantic_found encontradas)"
    else
        log_result "WARN" "HTML usa pocas etiquetas semánticas ($semantic_found encontradas)"
    fi
    
    # Check for relative paths
    if grep -q 'href="/\|src="/' index.html; then
        log_result "WARN" "Se encontraron rutas absolutas en HTML (pueden causar problemas en GitHub Pages)"
    else
        log_result "PASS" "HTML usa rutas relativas correctamente"
    fi
else
    log_result "FAIL" "Archivo index.html no encontrado"
fi

echo
echo "🔧 4. VALIDACIÓN DE JAVASCRIPT"
echo "=============================="

if [ -f "assets/js/main.js" ]; then
    js_lines=$(wc -l < "assets/js/main.js")
    if [ "$js_lines" -gt 10 ]; then
        log_result "PASS" "Archivo JavaScript tiene contenido ($js_lines líneas)"
    else
        log_result "WARN" "Archivo JavaScript parece estar vacío o muy pequeño ($js_lines líneas)"
    fi
    
    # Check for modern JavaScript features
    if grep -q "const\|let\|=>" assets/js/main.js; then
        log_result "PASS" "JavaScript usa características modernas (const/let/arrow functions)"
    else
        log_result "WARN" "JavaScript no parece usar características modernas"
    fi
    
    # Check for event listeners
    if grep -q "addEventListener" assets/js/main.js; then
        log_result "PASS" "JavaScript incluye event listeners"
    else
        log_result "WARN" "JavaScript no parece incluir event listeners"
    fi
    
    # Check for DOM manipulation
    if grep -q "querySelector\|getElementById\|getElementsBy" assets/js/main.js; then
        log_result "PASS" "JavaScript incluye manipulación del DOM"
    else
        log_result "WARN" "JavaScript no parece incluir manipulación del DOM"
    fi
    
    # Run ESLint if available
    if command -v npm >/dev/null 2>&1 && [ -f "package.json" ]; then
        echo -e "${BLUE}Ejecutando ESLint...${NC}"
        if npm run lint --silent 2>/dev/null; then
            log_result "PASS" "ESLint: Sin errores críticos"
        else
            log_result "WARN" "ESLint: Se encontraron advertencias o errores menores"
        fi
    else
        log_result "INFO" "ESLint no disponible, saltando validación de sintaxis"
    fi
else
    log_result "FAIL" "Archivo JavaScript no encontrado"
fi

echo
echo "♿ 5. VALIDACIÓN DE ACCESIBILIDAD"
echo "================================"

if [ -f "index.html" ]; then
    # Check for ARIA attributes
    if grep -q "aria-\|role=" index.html; then
        log_result "PASS" "HTML incluye atributos ARIA"
    else
        log_result "WARN" "HTML no incluye atributos ARIA para accesibilidad"
    fi
    
    # Check for alt attributes on images
    img_count=$(grep -c "<img" index.html 2>/dev/null || echo 0)
    img_alt_count=$(grep -c "alt=" index.html 2>/dev/null || echo 0)
    
    if [ "$img_count" -eq 0 ]; then
        log_result "INFO" "No se encontraron imágenes en HTML"
    elif [ "$img_alt_count" -ge "$img_count" ]; then
        log_result "PASS" "Todas las imágenes tienen atributo alt"
    else
        log_result "WARN" "Algunas imágenes no tienen atributo alt ($img_alt_count de $img_count)"
    fi
    
    # Check for form labels
    form_count=$(grep -c "<input\|<textarea\|<select" index.html 2>/dev/null || echo 0)
    label_count=$(grep -c "<label\|aria-label=" index.html 2>/dev/null || echo 0)
    
    if [ "$form_count" -eq 0 ]; then
        log_result "INFO" "No se encontraron elementos de formulario"
    elif [ "$label_count" -ge "$form_count" ]; then
        log_result "PASS" "Elementos de formulario tienen etiquetas apropiadas"
    else
        log_result "WARN" "Algunos elementos de formulario pueden carecer de etiquetas"
    fi
fi

echo
echo "🔒 6. VALIDACIÓN DE SEGURIDAD"
echo "============================="

# Check for potentially unsafe patterns
if [ -f "index.html" ]; then
    if grep -qi "javascript:" index.html; then
        log_result "WARN" "Se encontraron enlaces javascript: (puede ser un riesgo de seguridad)"
    else
        log_result "PASS" "No se encontraron enlaces javascript: peligrosos"
    fi
    
    if grep -qi "eval\|innerHTML.*+\|document.write" assets/js/main.js 2>/dev/null; then
        log_result "WARN" "Se encontraron patrones de JavaScript potencialmente inseguros"
    else
        log_result "PASS" "No se encontraron patrones de JavaScript inseguros"
    fi
fi

# Check for secrets or sensitive information
if grep -r -i "password\|secret\|key\|token" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md" 2>/dev/null | grep -v "placeholder\|example\|demo" | head -1 >/dev/null; then
    log_result "WARN" "Se encontraron posibles secretos o información sensible en el código"
else
    log_result "PASS" "No se encontraron secretos obvios en el código"
fi

echo
echo "⚡ 7. VALIDACIÓN DE RENDIMIENTO"
echo "=============================="

# Check file sizes
if [ -f "assets/css/styles.css" ]; then
    css_size=$(wc -c < "assets/css/styles.css")
    if [ "$css_size" -lt 100000 ]; then # Less than 100KB
        log_result "PASS" "Tamaño de CSS es razonable ($(($css_size / 1024))KB)"
    else
        log_result "WARN" "Archivo CSS es grande ($(($css_size / 1024))KB), considerar optimización"
    fi
fi

if [ -f "assets/js/main.js" ]; then
    js_size=$(wc -c < "assets/js/main.js")
    if [ "$js_size" -lt 100000 ]; then # Less than 100KB
        log_result "PASS" "Tamaño de JavaScript es razonable ($(($js_size / 1024))KB)"
    else
        log_result "WARN" "Archivo JavaScript es grande ($(($js_size / 1024))KB), considerar optimización"
    fi
fi

# Check for external dependencies
external_deps=$(grep -o "https\?://" index.html 2>/dev/null | wc -l || echo 0)
if [ "$external_deps" -lt 5 ]; then
    log_result "PASS" "Pocas dependencias externas ($external_deps encontradas)"
else
    log_result "WARN" "Muchas dependencias externas ($external_deps encontradas), puede afectar rendimiento"
fi

echo
echo "📱 8. VALIDACIÓN DE DISEÑO RESPONSIVE"
echo "===================================="

if [ -f "assets/css/styles.css" ]; then
    # Check for media queries
    media_queries=$(grep -c "@media" assets/css/styles.css 2>/dev/null || echo 0)
    if [ "$media_queries" -gt 0 ]; then
        log_result "PASS" "CSS incluye $media_queries media queries para diseño responsive"
    else
        log_result "WARN" "CSS no incluye media queries para diseño responsive"
    fi
    
    # Check for flexible units
    if grep -q "rem\|em\|%\|vw\|vh" assets/css/styles.css; then
        log_result "PASS" "CSS usa unidades flexibles (rem, em, %, vw, vh)"
    else
        log_result "WARN" "CSS principalmente usa unidades fijas (px)"
    fi
fi

echo
echo "⚛️  9. VALIDACIÓN REACT/TYPESCRIPT"
echo "=================================="

# Check if TypeScript files exist and are valid
if [ -d "src" ]; then
    tsx_files=$(find src -name "*.tsx" -o -name "*.ts" | wc -l)
    if [ "$tsx_files" -gt 0 ]; then
        log_result "PASS" "Proyecto incluye archivos TypeScript/React ($tsx_files archivos)"
        
        # Check if App.tsx has meaningful content
        if [ -f "src/App.tsx" ]; then
            app_lines=$(grep -v "^\s*$\|^\s*//\|^\s*/\*\|^\s*\*" src/App.tsx | wc -l)
            if [ "$app_lines" -gt 10 ]; then
                log_result "PASS" "App.tsx tiene contenido sustancial ($app_lines líneas de código)"
            else
                log_result "WARN" "App.tsx parece tener contenido mínimo ($app_lines líneas de código)"
            fi
        fi
        
        # Check if build works
        if npm run build >/dev/null 2>&1; then
            log_result "PASS" "Build de React/TypeScript exitoso"
        else
            log_result "FAIL" "Build de React/TypeScript falla"
        fi
        
        # Check if TypeScript config exists
        if [ -f "tsconfig.json" ]; then
            log_result "PASS" "Configuración de TypeScript presente"
        else
            log_result "WARN" "No se encontró tsconfig.json"
        fi
        
    else
        log_result "INFO" "No se encontraron archivos TypeScript/React"
    fi
else
    log_result "INFO" "No existe directorio src/"
fi

# Check for proper component structure
if [ -d "src/components" ]; then
    component_count=$(find src/components -name "*.tsx" | wc -l)
    if [ "$component_count" -gt 0 ]; then
        log_result "PASS" "Estructura de componentes organizada ($component_count componentes)"
    fi
fi

echo
echo "🔧 10. VALIDACIÓN DE HERRAMIENTAS DE DESARROLLO"
echo "=============================================="

# Check if dev tools are properly configured
if [ -f "package.json" ]; then
    if grep -q '"dev":\|"build":\|"lint":' package.json; then
        log_result "PASS" "Scripts de desarrollo configurados"
    else
        log_result "WARN" "Scripts de desarrollo pueden estar incompletos"
    fi
    
    # Check for proper dependencies
    if grep -q '"react":\|"typescript":' package.json; then
        log_result "PASS" "Dependencias principales presentes"
    fi
fi

# Check if Vite config exists and is valid
if [ -f "vite.config.ts" ]; then
    log_result "PASS" "Configuración de Vite presente"
    
    # Check if config has basic plugins
    if grep -q "react()\|tailwindcss()" vite.config.ts; then
        log_result "PASS" "Plugins esenciales configurados en Vite"
    else
        log_result "WARN" "Configuración de Vite puede estar incompleta"
    fi
fi

echo
echo "📊 RESUMEN DE RESULTADOS"
echo "======================="
echo -e "${GREEN}✅ Pruebas exitosas: $PASSED_CHECKS${NC}"
echo -e "${YELLOW}⚠️  Advertencias: $WARNING_CHECKS${NC}"
echo -e "${RED}❌ Fallas: $FAILED_CHECKS${NC}"
echo -e "${BLUE}📊 Total de verificaciones: $TOTAL_CHECKS${NC}"

# Calculate quality score
quality_score=$(echo "scale=1; ($PASSED_CHECKS * 100) / $TOTAL_CHECKS" | bc 2>/dev/null || echo "N/A")

echo
if [ "$FAILED_CHECKS" -eq 0 ]; then
    if [ "$WARNING_CHECKS" -eq 0 ]; then
        echo -e "${GREEN}🎉 ¡EXCELENTE! Todas las pruebas pasaron sin problemas.${NC}"
    else
        echo -e "${YELLOW}✨ BUENO: Sin fallas críticas, pero hay algunas recomendaciones.${NC}"
    fi
    echo -e "${GREEN}✅ SITIO LISTO PARA PRODUCCIÓN${NC}"
    exit 0
else
    echo -e "${RED}🚨 ATENCIÓN: Se encontraron $FAILED_CHECKS fallas que deben corregirse.${NC}"
    echo -e "${RED}❌ SITIO NECESITA CORRECCIONES ANTES DE PRODUCCIÓN${NC}"
    exit 1
fi