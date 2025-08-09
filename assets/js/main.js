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