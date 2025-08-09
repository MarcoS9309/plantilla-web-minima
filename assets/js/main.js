/**
 * JavaScript principal para interacciones del sitio web
 * Sin dependencias externas - JavaScript vanilla
 */

// Estado de la aplicación
const AppState = {
    isMobileMenuOpen: false,
    lastScrollY: 0,
    isHeaderVisible: true
};

// Utilidades
const Utils = {
    /**
     * Selector de elemento con validación
     */
    $(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Elemento no encontrado: ${selector}`);
        }
        return element;
    },

    /**
     * Selector de múltiples elementos
     */
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    /**
     * Debounce function para optimizar eventos
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Función para scroll suave a un elemento
     */
    smoothScrollTo(target) {
        const element = typeof target === 'string' ? this.$(target) : target;
        if (element) {
            const headerHeight = this.$('header')?.offsetHeight || 0;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }
};

// Gestión del menú móvil
const MobileMenu = {
    init() {
        this.menuToggle = Utils.$('.menu-toggle');
        this.navMenu = Utils.$('.nav-menu');
        this.navLinks = Utils.$$('.nav-menu a');
        
        if (this.menuToggle && this.navMenu) {
            this.bindEvents();
        }
    },

    bindEvents() {
        // Toggle del menú
        this.menuToggle.addEventListener('click', () => this.toggle());
        
        // Cerrar menú al hacer click en un enlace
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.close();
                
                // Pequeño delay para que se vea el cierre del menú
                setTimeout(() => {
                    Utils.smoothScrollTo(target);
                }, 300);
            });
        });
        
        // Cerrar menú con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.isMobileMenuOpen) {
                this.close();
            }
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (AppState.isMobileMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.close();
            }
        });
    },

    toggle() {
        if (AppState.isMobileMenuOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        AppState.isMobileMenuOpen = true;
        this.menuToggle.classList.add('active');
        this.navMenu.classList.add('active');
        this.menuToggle.setAttribute('aria-expanded', 'true');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    },

    close() {
        AppState.isMobileMenuOpen = false;
        this.menuToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.menuToggle.setAttribute('aria-expanded', 'false');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
};

// Gestión de navegación y scroll
const Navigation = {
    init() {
        this.header = Utils.$('header');
        this.navLinks = Utils.$$('nav a[href^="#"]');
        
        if (this.header) {
            this.bindEvents();
            this.handleScroll(); // Ejecutar una vez al inicio
        }
    },

    bindEvents() {
        // Navegación suave para enlaces internos
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                Utils.smoothScrollTo(target);
                
                // Cerrar menú móvil si está abierto
                if (AppState.isMobileMenuOpen) {
                    MobileMenu.close();
                }
            });
        });

        // Scroll con debounce para mejor rendimiento
        window.addEventListener('scroll', Utils.debounce(() => {
            this.handleScroll();
        }, 10));
    },

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Auto-hide header en scroll hacia abajo
        if (currentScrollY > AppState.lastScrollY && currentScrollY > 100) {
            // Scrolling down
            if (AppState.isHeaderVisible) {
                this.hideHeader();
            }
        } else if (currentScrollY < AppState.lastScrollY || currentScrollY <= 100) {
            // Scrolling up or at top
            if (!AppState.isHeaderVisible) {
                this.showHeader();
            }
        }
        
        AppState.lastScrollY = currentScrollY;
    },

    hideHeader() {
        AppState.isHeaderVisible = false;
        this.header.style.transform = 'translateY(-100%)';
    },

    showHeader() {
        AppState.isHeaderVisible = true;
        this.header.style.transform = 'translateY(0)';
    }
};

// Gestión de formularios
const FormHandler = {
    init() {
        this.contactForm = Utils.$('.contact-form');
        
        if (this.contactForm) {
            this.bindEvents();
        }
    },

    bindEvents() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit(e.target);
        });

        // Validación en tiempo real
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Limpiar errores previos
        this.clearFieldError(field);

        // Validaciones por tipo de campo
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Por favor, ingresa un email válido';
                }
                break;
        }

        // Validar campos requeridos
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    },

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            // Remover error previo
            const existingError = formGroup.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }

            // Agregar nuevo error
            const errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.color = 'var(--color-destructive)';
            errorElement.style.fontSize = 'var(--font-size-sm)';
            errorElement.style.marginTop = 'var(--spacing-xs)';
            errorElement.style.display = 'block';
            errorElement.textContent = message;
            
            formGroup.appendChild(errorElement);
            field.style.borderColor = 'var(--color-destructive)';
        }
    },

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            const errorElement = formGroup.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
            field.style.borderColor = '';
        }
    },

    handleSubmit(form) {
        const formData = new FormData(form);
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;

        // Validar todos los campos
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm(formData);
        } else {
            this.showNotification('Por favor, corrige los errores en el formulario', 'error');
        }
    },

    async submitForm(formData) {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Mostrar estado de carga
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Simular envío (aquí irían las credenciales reales del backend)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mostrar éxito
            this.showNotification('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
            this.contactForm.reset();

        } catch (error) {
            console.error('Error al enviar formulario:', error);
            this.showNotification('Error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        } finally {
            // Restaurar botón
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    },

    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform var(--transition-normal);
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto-remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
};

// Animaciones y efectos de scroll
const ScrollAnimations = {
    init() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.bindObserver();
    },

    bindObserver() {
        // Observar elementos que queremos animar
        const animatedElements = Utils.$$('.service-card, .portfolio-item, .skill-item');
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            this.observer.observe(element);
        });
    },

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
};

// Quiz de Pensamiento Crítico
const QuizCritico = {
    respuestasCorrectas: {
        q1: 'a', // Lenguaje sensacionalista
        q2: 'b', // Verificar primero
        q3: 'b', // Buscar contexto
        source1: 'verificar', // Wikipedia necesita verificación
        source2: 'no-confiable', // Blog sin referencias
        source3: 'confiable' // Estudio revisado por pares
    },

    feedback: {
        q1: {
            a: "¡Correcto! El lenguaje exageradamente emocional y frases como 'los médicos lo odian' son señales claras de contenido no confiable.",
            b: "Incorrecto. Este tipo de titulares sensacionalistas son típicos de contenido falso o engañoso.",
            c: "Aunque pedir más información es bueno, ya hay señales claras de que este contenido no es confiable."
        },
        q2: {
            a: "Incorrecto. Nunca compartas contenido sin verificar, especialmente si usa presión emocional.",
            b: "¡Correcto! Siempre verifica la información antes de compartir. La frase 'antes de que lo censuren' es una táctica común de desinformación.",
            c: "Ignorarlo es mejor que compartirlo, pero también puedes ayudar verificando y educando a otros."
        },
        q3: {
            a: "Incorrecto. Las imágenes sin contexto pueden ser muy engañosas. Muchas veces son de eventos diferentes o editadas.",
            b: "¡Correcto! Siempre busca el contexto original. Usa búsqueda inversa de imágenes si es necesario.",
            c: "Incorrecto. Comentar sin verificar puede propagar información falsa y confundir a otros."
        },
        sources: {
            source1: "Wikipedia puede ser un buen punto de partida si tiene referencias múltiples, pero siempre verifica las fuentes originales.",
            source2: "Los blogs personales sin referencias no son fuentes confiables para información importante.",
            source3: "Los estudios científicos revisados por pares son fuentes muy confiables, aunque siempre considera si están actualizados."
        }
    }
};

// Función global para evaluar el quiz
function evaluarQuiz() {
    const form = document.querySelector('.quiz-container');
    const resultsDiv = document.getElementById('quiz-results');
    const scoreDiv = document.getElementById('score');
    const feedbackDiv = document.getElementById('feedback');
    
    let puntuacion = 0;
    let totalPreguntas = 6;
    let feedbackTexto = '';

    // Evaluar preguntas de opción múltiple
    ['q1', 'q2', 'q3'].forEach(pregunta => {
        const respuestaSeleccionada = form.querySelector(`input[name="${pregunta}"]:checked`);
        if (respuestaSeleccionada) {
            const valor = respuestaSeleccionada.value;
            if (valor === QuizCritico.respuestasCorrectas[pregunta]) {
                puntuacion++;
            }
            feedbackTexto += `<div class="feedback-item">
                <h4>Pregunta ${pregunta.slice(1)}:</h4>
                <p>${QuizCritico.feedback[pregunta][valor]}</p>
            </div>`;
        }
    });

    // Evaluar evaluación de fuentes
    ['source1', 'source2', 'source3'].forEach(fuente => {
        const select = form.querySelector(`select[name="${fuente}"]`);
        if (select && select.value) {
            if (select.value === QuizCritico.respuestasCorrectas[fuente]) {
                puntuacion++;
            }
            feedbackTexto += `<div class="feedback-item">
                <h4>Evaluación ${fuente}:</h4>
                <p>${QuizCritico.feedback.sources[fuente]}</p>
            </div>`;
        }
    });

    // Calcular porcentaje
    const porcentaje = Math.round((puntuacion / totalPreguntas) * 100);
    
    // Mostrar resultados
    let nivelTexto = '';
    let colorClase = '';
    
    if (porcentaje >= 80) {
        nivelTexto = 'Excelente pensamiento crítico';
        colorClase = 'success';
    } else if (porcentaje >= 60) {
        nivelTexto = 'Buen nivel, sigue practicando';
        colorClase = 'warning';
    } else {
        nivelTexto = 'Necesitas practicar más';
        colorClase = 'danger';
    }

    scoreDiv.innerHTML = `
        <div class="score-display ${colorClase}">
            <h3>Tu puntuación: ${puntuacion}/${totalPreguntas} (${porcentaje}%)</h3>
            <p><strong>${nivelTexto}</strong></p>
        </div>
    `;

    feedbackDiv.innerHTML = `
        <div class="feedback-content">
            <h4>Explicaciones detalladas:</h4>
            ${feedbackTexto}
            <div class="feedback-item">
                <h4>Recomendaciones para mejorar:</h4>
                <ul>
                    <li>Lee nuestras guías de verificación de información</li>
                    <li>Practica identificando fuentes confiables diariamente</li>
                    <li>Únete a nuestros talleres comunitarios</li>
                    <li>Comparte estos conocimientos con tu familia</li>
                </ul>
            </div>
        </div>
    `;

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

// Inicialización de la aplicación
const App = {
    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    },

    start() {
        console.log('Iniciando aplicación...');
        
        try {
            // Inicializar módulos
            MobileMenu.init();
            Navigation.init();
            FormHandler.init();
            
            // Inicializar animaciones solo si el usuario no prefiere movimiento reducido
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                ScrollAnimations.init();
            }

            console.log('✓ Aplicación iniciada correctamente');
        } catch (error) {
            console.error('Error al inicializar la aplicación:', error);
        }
    }
};

// Iniciar la aplicación
App.init();