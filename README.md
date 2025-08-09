# Mi Sitio Web

Un sitio web moderno y responsive construido con HTML5, CSS3 y JavaScript vanilla. Sin frameworks, sin bundlers, sin backend - solo código web fundamental y optimizado.

## 🚀 Características

- **HTML5 Semántico**: Estructura clara con elementos semánticos apropiados
- **CSS3 Moderno**: Variables CSS, Grid, Flexbox y efectos modernos
- **JavaScript Vanilla**: Interacciones fluidas sin dependencias externas
- **Totalmente Responsive**: Optimizado para dispositivos móviles y desktop
- **Accesible**: Cumple con estándares de accesibilidad web (WCAG)
- **Optimizado para GitHub Pages**: Configurado para despliegue automático

## 📁 Estructura del Proyecto

```
/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos principales
│   ├── js/
│   │   └── main.js         # JavaScript de interacciones
│   └── img/                # Imágenes del sitio
├── README.md               # Este archivo
├── LICENSE                 # Licencia MIT
└── .nojekyll              # Para GitHub Pages
```

## 🛠️ Desarrollo Local

### Requisitos Previos

- Un editor de código (recomendado: VS Code)
- Un navegador web moderno
- Opcionalmente: servidor web local para desarrollo

### Configuración en VS Code

1. **Clonar o descargar** este repositorio
2. **Abrir VS Code** y seleccionar "Archivo > Abrir Carpeta"
3. **Seleccionar** la carpeta del proyecto
4. **Instalar extensiones recomendadas**:
   - Live Server (para servidor local)
   - HTML CSS Support
   - Auto Rename Tag
   - Prettier (para formateo de código)

### Abrir el Sitio Localmente

#### Opción 1: Con Live Server (Recomendado)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"
4. El sitio se abrirá automáticamente en tu navegador

#### Opción 2: Directamente en el Navegador
1. Navega hasta la carpeta del proyecto
2. Doble clic en `index.html`
3. El archivo se abrirá en tu navegador predeterminado

### Edición Básica

#### Cambiar Contenido
- **Textos**: Edita directamente en `index.html`
- **Estilos**: Modifica variables y reglas en `assets/css/styles.css`
- **Interacciones**: Ajusta comportamientos en `assets/js/main.js`

#### Cambiar Colores
En `assets/css/styles.css`, modifica las variables en `:root`:
```css
:root {
    --color-primary: #2563eb;        /* Color principal */
    --color-secondary: #64748b;      /* Color secundario */
    --color-accent: #f59e0b;         /* Color de acento */
}
```

#### Agregar Imágenes
1. Coloca las imágenes en `assets/img/`
2. Referencia con rutas relativas: `./assets/img/mi-imagen.jpg`
3. Optimiza las imágenes para web (WebP, JPEG optimizado)

## 🌐 Publicación en GitHub Pages

### Método 1: Desde la Rama Main (Raíz)

1. **Subir código** a tu repositorio de GitHub
2. Ir a **Settings** > **Pages** en tu repositorio
3. En **Source**, seleccionar **"Deploy from a branch"**
4. Seleccionar **"main"** como branch y **"/ (root)"** como folder
5. Hacer clic en **Save**
6. Tu sitio estará disponible en: `https://tu-usuario.github.io/nombre-repositorio`

### Método 2: Desde la Carpeta /docs

1. **Crear carpeta docs** en la raíz del repositorio
2. **Mover todos los archivos** del sitio a la carpeta `docs/`
3. **Subir cambios** a GitHub
4. En **Settings** > **Pages**, seleccionar **"main"** branch y **"/docs"** folder
5. Tu sitio estará disponible en la misma URL

### Configuración Adicional

- El archivo `.nojekyll` está incluido para evitar procesamiento Jekyll
- Las rutas son relativas para funcionar en cualquier subdominio
- El sitio es completamente estático y no requiere configuración adicional

## 🎨 Personalización

### Cambiar Tipografía
En `index.html`, agrega fuentes de Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
```

Luego en `assets/css/styles.css`:
```css
:root {
    --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Agregar Secciones
1. Copia la estructura de una sección existente en `index.html`
2. Modifica el contenido y los IDs únicos
3. Agrega estilos específicos en `assets/css/styles.css`
4. Actualiza la navegación si es necesario

### Modificar Animaciones
En `assets/js/main.js`, busca el módulo `ScrollAnimations` para:
- Cambiar efectos de entrada
- Modificar umbrales de activación
- Agregar nuevos elementos animados

## 📱 Responsive Design

El sitio utiliza un enfoque **mobile-first**:
- Breakpoint principal: 768px (tablets y desktop)
- Grid y Flexbox para layouts fluidos
- Imágenes responsivas con `srcset` cuando sea necesario
- Menú hamburguesa para móviles

## ♿ Accesibilidad

Características implementadas:
- Navegación por teclado completa
- Landmarks semánticos apropiados
- Atributos ARIA donde son necesarios
- Contraste de colores optimizado
- Soporte para `prefers-reduced-motion`

## 🔧 Mantenimiento

### Actualizaciones Regulares
- Revisar enlaces rotos
- Optimizar imágenes nuevas
- Actualizar contenido desactualizado
- Validar HTML y CSS periodicamente

### Herramientas Útiles
- [HTML Validator](https://validator.w3.org/)
- [CSS Validator](https://jigsaw.w3.org/css-validator/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) para auditorías de rendimiento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si tienes preguntas o problemas:
- Revisa la documentación existente
- Abre un issue en GitHub
- Contacta al desarrollador

---

**¡Listo para comenzar!** 🎉 Abre `index.html` en tu navegador y comienza a personalizar tu sitio web.