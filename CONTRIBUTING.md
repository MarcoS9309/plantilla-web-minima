# Guía de Contribución

## 📋 Cómo Contribuir al Proyecto

¡Gracias por tu interés en contribuir a este proyecto educativo! Esta guía te ayudará a entender cómo colaborar de manera efectiva.

## 🚀 Configuración del Entorno de Desarrollo

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm (incluido con Node.js)
- Git

### Instalación
```bash
# Clonar el repositorio
git clone https://github.com/MarcoS9309/plantilla-web-minima.git
cd plantilla-web-minima

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

## 🏗️ Estructura del Proyecto

```
plantilla-web-minima/
├── src/                    # Código fuente React/TypeScript
│   ├── components/         # Componentes reutilizables
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Punto de entrada
├── assets/                # Assets estáticos
│   ├── css/               # Estilos CSS
│   ├── js/                # JavaScript vanilla
│   └── img/               # Imágenes
├── tests/                 # Pruebas y validaciones
├── index.html             # Página principal HTML
└── package.json           # Configuración del proyecto
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build

# Calidad
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir problemas automáticamente
npm run quality      # Control de calidad completo
npm run validate     # Validación completa

# Pruebas
npm run test         # Ver instrucciones de pruebas
```

## 🎯 Tipos de Contribuciones

### 1. Corrección de Errores (Bug Fixes)
- Identifica y soluciona problemas existentes
- Incluye pruebas que verifiquen la corrección
- Documenta el problema y la solución

### 2. Nuevas Características (Features)
- Propón nuevas funcionalidades educativas
- Mantén el enfoque en responsabilidad digital
- Asegúrate de que sea accesible para todas las edades

### 3. Mejoras de Documentación
- Actualiza documentación existente
- Agrega ejemplos y guías
- Mejora la claridad de las explicaciones

### 4. Optimizaciones de Rendimiento
- Mejora la velocidad de carga
- Optimiza imágenes y assets
- Reduce el tamaño del bundle

## 📝 Proceso de Contribución

### Paso 1: Crear un Issue
Antes de empezar a trabajar, crea un issue describiendo:
- El problema que quieres resolver
- La solución propuesta
- El impacto esperado

### Paso 2: Fork y Branch
```bash
# Crear una nueva rama para tu contribución
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/descripcion-del-error
```

### Paso 3: Desarrollo
1. **Escribe código limpio y bien documentado**
2. **Sigue las convenciones del proyecto**
3. **Mantén los commits pequeños y descriptivos**

### Paso 4: Pruebas y Validación
```bash
# Ejecutar todas las validaciones
npm run validate

# Ejecutar pruebas específicas
npm run lint
./quality-control.sh

# Abrir pruebas JavaScript en navegador
open tests/javascript-tests.html
```

### Paso 5: Pull Request
1. **Asegúrate de que todas las pruebas pasen**
2. **Describe claramente los cambios realizados**
3. **Incluye capturas de pantalla si hay cambios visuales**
4. **Referencia el issue relacionado**

## 🎨 Estándares de Código

### JavaScript/TypeScript
- Usa ESLint (configuración incluida)
- Prefiere `const` y `let` sobre `var`
- Usa funciones de flecha cuando sean apropiadas
- Comenta código complejo

### React/TSX
- Usa TypeScript para definir tipos
- Mantén componentes pequeños y reutilizables
- Usa hooks de React de manera apropiada
- Evita efectos secundarios innecesarios

### CSS
- Usa clases descriptivas
- Mantén diseño responsive
- Prueba en diferentes dispositivos
- Sigue principios de accesibilidad

### HTML
- Usa etiquetas semánticas
- Incluye atributos ARIA cuando sea necesario
- Mantén estructura clara y lógica

## ♿ Accesibilidad

### Requisitos Mínimos
- Contraste de color adecuado (WCAG AA)
- Navegación por teclado
- Atributos alt en imágenes
- Etiquetas apropiadas en formularios
- Estructura semántica HTML

### Herramientas de Verificación
- Lighthouse (DevTools)
- axe DevTools
- Validador HTML W3C

## 🔒 Seguridad

### Buenas Prácticas
- No incluyas credenciales en el código
- Valida entrada de usuarios
- Usa HTTPS cuando sea posible
- Mantén dependencias actualizadas

## 📋 Checklist de Pull Request

Antes de enviar tu PR, verifica:

- [ ] El código pasa todas las pruebas (`npm run validate`)
- [ ] Los cambios están bien documentados
- [ ] Se mantiene compatibilidad con navegadores objetivo
- [ ] Los archivos innecesarios no están incluidos
- [ ] El commit message es descriptivo
- [ ] Se han actualizado pruebas si es necesario

## 🎯 Objetivos del Proyecto

Recuerda que este proyecto tiene como objetivo:

1. **Educación Digital Responsable**: Promover el uso ético de la tecnología
2. **Accesibilidad**: Ser útil para todas las edades y niveles técnicos
3. **Código Limpio**: Servir como ejemplo de buenas prácticas de desarrollo
4. **Comunidad**: Fomentar la colaboración y el aprendizaje mutuo

## 💬 Comunicación

### Canales de Comunicación
- **Issues**: Para reportar problemas y proponer mejoras
- **Pull Requests**: Para revisar código y discutir implementaciones
- **Discussions**: Para conversaciones generales sobre el proyecto

### Código de Conducta
- Sé respetuoso y constructivo
- Enfócate en el código, no en las personas
- Ayuda a mantener un ambiente inclusivo
- Comparte conocimiento generosamente

## 🚀 Roadmap

### Próximas Mejoras Planificadas
- [ ] Más componentes React interactivos
- [ ] Sistema de pruebas automatizadas mejorado
- [ ] Guías adicionales de seguridad digital
- [ ] Integración con herramientas de análisis
- [ ] Modo oscuro/claro
- [ ] Internacionalización (i18n)

## 📚 Recursos Útiles

### Documentación Técnica
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Herramientas de Desarrollo
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier](https://prettier.io/)
- [Git Best Practices](https://git-scm.com/book)

¡Gracias por contribuir a este proyecto educativo! 🎉