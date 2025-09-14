import { useState } from 'react'

function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <div className="app">
            <header role="banner">
                <nav role="navigation" aria-label="Navegación principal">
                    <div className="nav-container">
                        <div className="logo">
                            <a href="#inicio" aria-label="Ir al inicio">Recursos Innovación</a>
                        </div>
                        <button 
                            className="menu-toggle" 
                            aria-label="Abrir menú de navegación" 
                            aria-expanded={mobileMenuOpen}
                            onClick={toggleMobileMenu}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} role="menubar">
                            <li role="none"><a href="#inicio" role="menuitem">Inicio</a></li>
                            <li role="none"><a href="#sobre-pagina" role="menuitem">Sobre Esta Página</a></li>
                            <li role="none"><a href="#uso-etico" role="menuitem">Uso Ético</a></li>
                            <li role="none"><a href="#portafolio-innovador" role="menuitem">Portafolio Innovador</a></li>
                            <li role="none"><a href="#contacto" role="menuitem">Contacto</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main role="main">
                <div className="project-disclaimer">
                    <div className="container">
                        <div className="disclaimer-content">
                            <p>
                                <strong>📚 Proyecto Educativo:</strong> Este sitio web es una propuesta educativa y ejercicio de programación diseñado para demostrar cómo crear recursos digitales responsables. El contenido y eventos mostrados son ejemplos conceptuales para promover el pensamiento crítico sobre tecnología.
                            </p>
                        </div>
                    </div>
                </div>

                <section id="inicio" aria-labelledby="inicio-titulo">
                    <div className="container">
                        <div className="hero-content">
                            <h1 id="inicio-titulo">Recursos Imprescindibles en Innovación</h1>
                            <p className="hero-subtitle">
                                Una plataforma digital dedicada a compartir herramientas y conocimientos sobre el uso responsable de la tecnología e inteligencia artificial para la comunidad de Jerusalén. Nuestro objetivo es brindar recursos confiables y consejos prácticos para navegar de manera segura en el mundo digital.
                            </p>
                            <div className="hero-buttons">
                                <a href="#uso-etico" className="btn btn-primary">Conocer Recursos</a>
                                <a href="#contacto" className="btn btn-secondary">Unirse a la Comunidad</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="features-section">
                    <div className="container">
                        <h2>Características Principales</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <h3>✅ Contenido Verificado</h3>
                                <p>Información basada en fuentes oficiales como UNESCO</p>
                            </div>
                            <div className="feature-card">
                                <h3>🌐 Navegación Sencilla</h3>
                                <p>Diseño accesible para todas las edades</p>
                            </div>
                            <div className="feature-card">
                                <h3>🤖 Recursos Prácticos</h3>
                                <p>Prompts y consejos para el uso responsable de IA</p>
                            </div>
                            <div className="feature-card">
                                <h3>🏛️ Enfoque Comunitario</h3>
                                <p>Pensado específicamente para Jerusalén</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer role="contentinfo">
                <div className="container">
                    <p>&copy; 2024 Recursos Imprescindibles en Innovación. Proyecto Educativo.</p>
                </div>
            </footer>
        </div>
    )
}

export default App