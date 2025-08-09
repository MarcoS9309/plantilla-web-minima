# Configuración de GitHub Pages

Este archivo contiene instrucciones detalladas para configurar GitHub Pages para este proyecto.

## 🚀 Configuración Rápida

### Paso 1: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. Desplázate hasta la sección **Pages**
4. En **Source**, selecciona **"GitHub Actions"**
5. ¡Listo! El sitio se desplegará automáticamente

### Paso 2: Verificar el Despliegue

1. Ve a la pestaña **Actions** en tu repositorio
2. Verifica que el workflow "Deploy to GitHub Pages" se ejecute correctamente
3. Una vez completado, tu sitio estará disponible en:
   ```
   https://tu-usuario.github.io/nombre-repositorio
   ```

## ⚙️ Configuraciones Avanzadas

### Dominio Personalizado

Si quieres usar tu propio dominio (ej: `www.mi-sitio.com`):

1. En **Settings** > **Pages**, agrega tu dominio en **Custom domain**
2. Crea un archivo `CNAME` en la raíz del repositorio con tu dominio:
   ```
   www.mi-sitio.com
   ```
3. Configura los registros DNS en tu proveedor de dominio:
   ```
   CNAME www tu-usuario.github.io
   ```

### HTTPS

GitHub Pages incluye HTTPS automáticamente:
- ✅ Para dominios github.io
- ✅ Para dominios personalizados (después de verificación)

### Variables de Entorno

Si necesitas variables específicas para el entorno de producción, puedes usar:

```html
<!-- En index.html, para detectar si estás en GitHub Pages -->
<script>
if (window.location.hostname.includes('github.io')) {
    // Código específico para producción
    console.log('Ejecutándose en GitHub Pages');
}
</script>
```

## 🔧 Mantenimiento del Workflow

### Archivo de Configuración

El workflow está en `.github/workflows/deploy.yml` y incluye:

- **Trigger**: Se ejecuta en cada push a `main`
- **Permisos**: Configurados para GitHub Pages
- **Build**: Sube todo el contenido del repositorio
- **Deploy**: Despliega a GitHub Pages

### Modificar el Workflow

Si necesitas personalizar el proceso de despliegue:

```yaml
# Ejemplo: Agregar un paso de validación
- name: Validate HTML
  run: |
    echo "Validando HTML..."
    # Aquí puedes agregar validaciones personalizadas
```

### Logs y Debugging

Para revisar problemas:

1. Ve a **Actions** > Ejecución fallida
2. Expande los pasos para ver logs detallados
3. Los errores comunes incluyen:
   - Rutas de archivos incorrectas
   - Permisos insuficientes
   - Archivos faltantes

## 📱 Optimizaciones para GitHub Pages

### Cache y Performance

GitHub Pages incluye cache automático, pero puedes optimizar:

```html
<!-- Versionado de archivos CSS/JS -->
<link rel="stylesheet" href="./assets/css/styles.css?v=1.0">
<script src="./assets/js/main.js?v=1.0"></script>
```

### SEO para GitHub Pages

```html
<!-- Meta tags optimizados -->
<meta property="og:url" content="https://tu-usuario.github.io/repositorio">
<meta property="og:title" content="Título de tu sitio">
<meta property="og:description" content="Descripción para redes sociales">
<link rel="canonical" href="https://tu-usuario.github.io/repositorio">
```

## 🚨 Solución de Problemas Comunes

### Error 404 en GitHub Pages

- Verifica que `index.html` esté en la raíz
- Confirma que el repositorio sea público (o tengas GitHub Pro)
- Revisa que GitHub Pages esté habilitado

### CSS/JS no se carga

- Verifica rutas relativas: `./assets/css/styles.css`
- No uses rutas absolutas como `/assets/...`
- Confirma que los archivos existen en el repositorio

### Cambios no se reflejan

- GitHub Pages puede tomar 1-10 minutos en actualizar
- Verifica que el workflow se haya ejecutado correctamente
- Limpia la cache del navegador (Ctrl+F5)

### Workflow no se ejecuta

- Confirma que el archivo `.github/workflows/deploy.yml` existe
- Verifica que tengas permisos de escritura en el repositorio
- Revisa que GitHub Actions esté habilitado en tu cuenta

## 📞 Soporte Adicional

- [Documentación oficial de GitHub Pages](https://docs.github.com/en/pages)
- [Guía de GitHub Actions](https://docs.github.com/en/actions)
- [Configuración de dominios personalizados](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)