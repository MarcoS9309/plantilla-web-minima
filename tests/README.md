# Control de Calidad y Pruebas

Este directorio contiene herramientas para el control de calidad y pruebas del proyecto.

## 📁 Estructura

```
tests/
├── javascript-tests.html    # Suite de pruebas JavaScript interactiva
├── README.md               # Este archivo
└── accessibility-test.html # Pruebas de accesibilidad (futuro)
```

## 🧪 Pruebas Disponibles

### 1. Suite de Pruebas JavaScript (`javascript-tests.html`)

Una suite de pruebas interactiva que valida:

- **Utilidades (Utils)**: Selectores DOM, debounce, funciones helper
- **Formularios (FormHandler)**: Validación de campos, manejo de errores
- **Quiz (QuizCritico)**: Lógica del quiz, respuestas correctas, feedback
- **Navegación**: Menú móvil, scroll animations, estado de la app
- **Integración**: Verificación de que todos los módulos trabajan juntos

#### Cómo usar:

```bash
# Abrir en el navegador
open tests/javascript-tests.html
# o navegar a: file:///path/to/project/tests/javascript-tests.html
```

### 2. Control de Calidad Completo (`../quality-control.sh`)

Script ejecutado desde la raíz del proyecto que verifica:

- ✅ Estructura de archivos
- 🎨 Validación de CSS
- 🌐 Validación de HTML
- 🔧 Validación de JavaScript (ESLint)
- ♿ Accesibilidad
- 🔒 Seguridad
- ⚡ Rendimiento
- 📱 Diseño responsive

#### Cómo usar:

```bash
# Desde la raíz del proyecto
./quality-control.sh
```

### 3. Verificación GitHub Pages (`../check-pages.sh`)

Script mejorado que verifica la configuración básica y ejecuta el control de calidad completo.

#### Cómo usar:

```bash
# Desde la raíz del proyecto
./check-pages.sh
```

## 📊 Interpretación de Resultados

### Estados de Pruebas

- ✅ **PASS**: Prueba exitosa
- ⚠️ **WARN**: Advertencia - funciona pero puede mejorarse
- ❌ **FAIL**: Falla crítica que debe corregirse

### Criterios de Calidad

Un sitio está listo para producción cuando:
- 0 fallas críticas (❌)
- Menos de 5 advertencias (⚠️)
- Todas las pruebas de funcionalidad pasan
- ESLint no reporta errores

## 🚀 Automatización

### En GitHub Actions

Para integrar las pruebas en el workflow de GitHub Actions, agrega al archivo `.github/workflows/deploy.yml`:

```yaml
- name: Run Quality Control
  run: |
    chmod +x quality-control.sh
    ./quality-control.sh
```

### En desarrollo local

```bash
# Ejecutar antes de cada commit
npm run lint && ./quality-control.sh
```

## 📝 Agregando Nuevas Pruebas

### Para JavaScript

Edita `javascript-tests.html` y agrega nuevas funciones de prueba siguiendo el patrón:

```javascript
function testNewFeature() {
    testFramework.setSection('feature');
    
    testFramework.test('Description of test', () => {
        // Tu lógica de prueba aquí
        return true; // o false, o 'warn'
    });
}
```

### Para Control de Calidad

Edita `../quality-control.sh` y agrega nuevas verificaciones en la sección apropiada:

```bash
# Nueva verificación
if [ alguna_condicion ]; then
    log_result "PASS" "Descripción del éxito"
else
    log_result "FAIL" "Descripción del fallo"
fi
```

## 🔄 Mejoras Futuras

- [ ] Pruebas de rendimiento automatizadas
- [ ] Verificación automática de contraste de colores
- [ ] Pruebas de compatibilidad entre navegadores
- [ ] Integración con herramientas de CI/CD
- [ ] Reportes de cobertura de código
- [ ] Pruebas de carga y estrés