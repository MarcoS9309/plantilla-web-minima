# Guía de Mantenimiento

## 🔧 Manual de Mantenimiento del Proyecto

Esta guía describe las tareas regulares necesarias para mantener el proyecto en óptimas condiciones.

## 📅 Tareas de Mantenimiento Regular

### Semanal

#### 🔍 Revisión de Calidad
```bash
# Ejecutar control de calidad completo
./quality-control.sh

# Verificar que no haya regresiones
npm run validate
```

#### 📦 Actualización de Dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Verificar vulnerabilidades
npm audit
npm audit fix
```

### Mensual

#### 🔒 Revisión de Seguridad
```bash
# Audit completo de seguridad
npm audit --audit-level moderate

# Verificar dependencias con vulnerabilidades
npm ls --depth=0
```

#### 📊 Análisis de Rendimiento
- Ejecutar Lighthouse en todas las páginas
- Verificar métricas Core Web Vitals
- Optimizar imágenes si es necesario
- Revisar bundle size

#### 🧪 Revisión de Pruebas
- Ejecutar suite de pruebas completa
- Abrir `tests/javascript-tests.html` y verificar todos los tests
- Actualizar pruebas según nuevas funcionalidades

### Trimestral

#### 🚀 Actualización Mayor de Dependencias
```bash
# Verificar actualizaciones mayores disponibles
npx npm-check-updates

# Actualizar con precaución (una por una)
npx npm-check-updates -u --target minor
npm install
npm run validate
```

#### 📝 Revisión de Documentación
- Actualizar README.md con nuevas características
- Revisar y actualizar CONTRIBUTING.md
- Verificar que todos los ejemplos funcionen
- Actualizar screenshots si es necesario

## 🛠️ Procedimientos de Mantenimiento

### Actualización de Dependencias

#### 1. Preparación
```bash
# Crear rama para actualizaciones
git checkout -b maintenance/dependency-updates

# Verificar estado actual
npm run validate
```

#### 2. Actualización Segura
```bash
# Actualizar solo dependencias menores
npm update

# Ejecutar pruebas
npm run validate

# Si todo funciona, commit
git add package-lock.json
git commit -m "Update minor dependencies"
```

#### 3. Actualización de Dependencias Mayores
```bash
# Una dependencia a la vez
npm install react@latest
npm run validate

# Si falla, revertir
git checkout package.json package-lock.json
```

### Optimización de Rendimiento

#### 1. Análisis de Bundle
```bash
# Build para producción
npm run build

# Analizar tamaño del bundle
npx vite-bundle-analyzer dist
```

#### 2. Optimización de Imágenes
```bash
# Comprimir imágenes (si tienes imagemin)
npx imagemin assets/img/* --out-dir=assets/img/optimized

# Verificar que no se rompa nada
npm run build
```

#### 3. Verificación de Rendimiento
- Usar Chrome DevTools -> Lighthouse
- Verificar métricas:
  - First Contentful Paint < 2s
  - Largest Contentful Paint < 2.5s
  - Cumulative Layout Shift < 0.1

### Limpieza de Código

#### 1. Eliminación de Código Muerto
```bash
# Ejecutar linter
npm run lint

# Buscar código no utilizado
npx ts-unused-exports tsconfig.json

# Remover imports no utilizados
npx unimported
```

#### 2. Reformateo de Código
```bash
# Si tienes Prettier configurado
npx prettier --write src/**/*.{ts,tsx,js,jsx}

# Verificar con linter
npm run lint:fix
```

## 📈 Métricas de Salud del Proyecto

### Indicadores Clave
- **Cobertura de Pruebas**: Objetivo > 80%
- **Tiempo de Build**: Objetivo < 30s
- **Bundle Size**: Objetivo < 1MB
- **Lighthouse Score**: Objetivo > 90

### Comandos de Verificación
```bash
# Métricas de calidad
./quality-control.sh

# Tiempo de build
time npm run build

# Tamaño de archivos
du -sh dist/

# Lighthouse (requiere Chrome)
npx lighthouse http://localhost:5173 --output=json --output-path=lighthouse-report.json
```

## 🚨 Solución de Problemas Comunes

### Build Falla

#### Problema: Error de TypeScript
```bash
# Verificar errores de tipos
npx tsc --noEmit

# Verificar configuración
cat tsconfig.json
```

#### Problema: Dependencias Faltantes
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Tests Fallan

#### Problema: Tests JavaScript
1. Abrir `tests/javascript-tests.html` en navegador
2. Verificar qué funciones fallan
3. Revisar que las funciones existan en `assets/js/main.js`

#### Problema: ESLint Errors
```bash
# Ver errores específicos
npm run lint

# Arreglar automáticamente
npm run lint:fix
```

### Rendimiento Lento

#### Problema: Bundle Muy Grande
```bash
# Analizar dependencias
npx webpack-bundle-analyzer dist/

# Remover dependencias no utilizadas
npm uninstall <package>
```

#### Problema: Imágenes Muy Pesadas
```bash
# Comprimir imágenes
npx imagemin assets/img/**/*.{jpg,png} --out-dir=assets/img/compressed/
```

## 📋 Checklist de Mantenimiento

### Antes de Cada Release

- [ ] Ejecutar `./quality-control.sh` - debe pasar todas las pruebas
- [ ] Ejecutar `npm run validate` - sin errores
- [ ] Verificar que `npm run build` funcione
- [ ] Probar la aplicación en diferentes navegadores
- [ ] Actualizar version en `package.json`
- [ ] Crear release notes
- [ ] Hacer tag de Git

### Después de Cada Release

- [ ] Verificar que GitHub Pages se despliegue correctamente
- [ ] Monitorear errores en consola
- [ ] Verificar métricas Core Web Vitals
- [ ] Actualizar documentación si es necesario

## 🤖 Automatización

### GitHub Actions (Sugerido)

```yaml
# .github/workflows/maintenance.yml
name: Weekly Maintenance
on:
  schedule:
    - cron: '0 8 * * 1'  # Lunes a las 8 AM
  workflow_dispatch:

jobs:
  maintenance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm audit
      - run: ./quality-control.sh
      - run: npm run validate
```

### Scripts Personalizados

```bash
# maintenance-check.sh
#!/bin/bash
echo "🔍 Ejecutando verificación de mantenimiento..."
npm run validate
./quality-control.sh
npm audit --audit-level moderate
echo "✅ Verificación completada"
```

## 📚 Recursos de Referencia

### Herramientas de Monitoreo
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Bundlephobia](https://bundlephobia.com/) - para verificar tamaño de dependencias

### Documentación
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [React Performance](https://react.dev/learn/render-and-commit)
- [Vite Performance](https://vitejs.dev/guide/performance.html)

---

**Nota**: Esta guía debe actualizarse regularmente conforme el proyecto evoluciona. Fecha de última actualización: 2024