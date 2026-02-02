
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  Plus, 
  Truck, 
  ShieldCheck, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  X 
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  badge?: string;
  image: string;
  colors: string[];
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'SCULPT LEGGING MAGENTA', price: '$24.900', category: 'LEGGINGS', badge: 'NUEVO', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800', colors: ['#E30072', '#000'] },
  { id: 2, name: 'POWER TOP BLACK', price: '$18.500', category: 'TOPS', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800', colors: ['#000', '#fff'] },
  { id: 3, name: 'VITALITY SET LILA', price: '$42.000', category: 'SETS', badge: 'HOT', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800', colors: ['#C8A2C8'] },
  { id: 4, name: 'CORE SHORTS CARBON', price: '$15.200', category: 'SHORTS', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800', colors: ['#333'] },
];

const CATEGORIES = ['LEGGINGS', 'TOPS', 'SETS', 'ACCESORIOS'];

const App = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedSize, setSelectedSize] = useState('M');

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="app-root">
      {/* 1. Marquee Superior */}
      <div className="marquee-container">
        <div className="marquee-content">
          🔥 ENVÍOS A TODO EL PAÍS — 💖 SENTITE PODEROSA ENTRENANDO — 🚀 NUEVA COLECCIÓN DISPONIBLE — 💎 CALIDAD PREMIUM GARANTIZADA — &nbsp;
          🔥 ENVÍOS A TODO EL PAÍS — 💖 SENTITE PODEROSA ENTRENANDO — 🚀 NUEVA COLECCIÓN DISPONIBLE — 💎 CALIDAD PREMIUM GARANTIZADA — &nbsp;
        </div>
      </div>

      {/* 2. Header Flotante */}
      <header className={isScrolled ? 'header-scrolled' : ''}>
        <div className="container">
          <nav className="nav-capsule">
            <a href="#" className="logo">CAMY<span>SPORT</span></a>
            
            <div className="nav-links">
              <a href="#">INICIO</a>
              <a href="#catalogo">CATÁLOGO</a>
              <a href="#">TALLES</a>
              <a href="#">CÓMO COMPRAR</a>
            </div>

            <div className="nav-actions">
              <button className="nav-icon-btn" onClick={() => setIsSearchOpen(true)}>
                <Search size={20} />
              </button>
              <button className="nav-icon-btn">
                <ShoppingBag size={20} />
              </button>
              <button className="nav-icon-btn md-only">
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="hero">
        <img 
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1920" 
          alt="Camy Sport Hero" 
          className="hero-bg" 
        />
        <div className="container hero-content">
          <span className="hero-tag">New Season 2024</span>
          <h1 className="title-impact">POTENCIA <br /> TU PASIÓN</h1>
          <p>Indumentaria de alto rendimiento que fusiona tecnología dry-fit con el diseño más sofisticado. Movete sin límites, sentite poderosa.</p>
          <a href="#catalogo" className="btn btn-magenta">VER CATÁLOGO</a>
        </div>
      </section>

      {/* 4. Slider de Categorías */}
      <section className="categories-section">
        <div className="container">
          <div className="section-title-area">
            <div>
              <span className="section-tag">Temporada 2024</span>
              <h2 className="title-impact">Nuestras Colecciones</h2>
            </div>
            <div className="explore-cta">EXPLORAR AHORA —</div>
          </div>

          <div className="category-slider">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} className="category-card">
                <span className="bg-letter">{cat[0]}</span>
                <h3>{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Grilla de Best Sellers */}
      <section className="best-sellers" id="catalogo">
        <div className="container">
          <div className="section-title-center">
            <span className="section-tag">Best Sellers</span>
            <h2 className="title-impact mega-title">ELEGIDOS TOP</h2>
          </div>

          <div className="product-grid">
            {PRODUCTS.map(product => (
              <div key={product.id} className="product-card" onClick={() => openModal(product)}>
                <div className="product-image-container">
                  {product.badge && <span className="product-badge">{product.badge}</span>}
                  <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                  <div className="product-overlay">
                    <button className="btn btn-magenta btn-sm">DETALLES</button>
                    <button className="btn-circle" onClick={(e) => e.stopPropagation()}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <span className="p-category">{product.category}</span>
                  <h4 className="p-name">{product.name}</h4>
                  <p className="p-price">{product.price}</p>
                  <div className="color-dots">
                    {product.colors.map((color, i) => (
                      <div key={i} className="dot" style={{ background: color }}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="view-all-container">
            <a href="#" className="btn btn-outline">VER TODA LA TIENDA</a>
          </div>
        </div>
      </section>

      {/* 6. Sección de Beneficios */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon"><Truck size={32} /></div>
              <h4 className="title-impact small-title">Envíos a todo el país</h4>
              <p>Llegamos a donde estés con Via Cargo y servicios express.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><ShieldCheck size={32} /></div>
              <h4 className="title-impact small-title">Calidad Certificada</h4>
              <p>Telas premium de alta compresión que no transparentan.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon"><MessageCircle size={32} /></div>
              <h4 className="title-impact small-title">Compra Protegida</h4>
              <p>Atención personalizada y asesoramiento por WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="#" className="logo">CAMY<span>SPORT</span></a>
              <p className="footer-desc">Indumentaria técnica para mujeres que no se detienen. Diseñado en Argentina para potenciar tu mejor versión.</p>
              <div className="social-links">
                <a href="#" className="social-btn"><Instagram size={20} /></a>
                <a href="#" className="social-btn"><Facebook size={20} /></a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Tienda</h5>
              <ul className="footer-links">
                <li><a href="#">Temporada 2024</a></li>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">Promociones</a></li>
                <li><a href="#">Nuevos Ingresos</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Ayuda</h5>
              <ul className="footer-links">
                <li><a href="#">Guía de Talles</a></li>
                <li><a href="#">Políticas de Cambio</a></li>
                <li><a href="#">Cómo Comprar</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>Contacto</h5>
              <ul className="footer-links">
                <li><a href="#">Showroom: Palermo, CABA</a></li>
                <li><a href="#">Email: hola@camysport.com</a></li>
                <li><a href="#">WhatsApp: +54 11 1234 5678</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 CAMY SPORT - Todos los derechos reservados.</p>
            <p>Hecho con 💖 para mujeres poderosas.</p>
          </div>
        </div>
      </footer>

      {/* Buscador Spotlight */}
      {isSearchOpen && (
        <div className="search-spotlight" onClick={() => setIsSearchOpen(false)}>
          <button className="close-spotlight">
            <X size={40} />
          </button>
          <div className="search-box" onClick={(e) => e.stopPropagation()}>
            <span className="search-label">¿QUÉ BUSCÁS HOY?</span>
            <input type="text" className="search-input" placeholder="Escribe aquí..." autoFocus />
          </div>
        </div>
      )}

      {/* Modal de Producto */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>
            <div className="modal-gallery">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <div className="gallery-nav">
                <div className="gallery-dot active"></div>
                <div className="gallery-dot"></div>
                <div className="gallery-dot"></div>
              </div>
            </div>
            <div className="modal-info">
              <span className="section-tag">{selectedProduct.category}</span>
              <h2 className="title-impact modal-title">{selectedProduct.name}</h2>
              <p className="p-price mega-price">{selectedProduct.price}</p>
              
              <div className="tech-boxes">
                <div className="tech-box">
                  <span>Tela</span>
                  <p>Supplex</p>
                </div>
                <div className="tech-box">
                  <span>Uso</span>
                  <p>Intenso</p>
                </div>
                <div className="tech-box">
                  <span>Calce</span>
                  <p>High-Rise</p>
                </div>
              </div>

              <span className="selector-label">Seleccionar Talle</span>
              <div className="size-selectors">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <div 
                    key={size} 
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>

              <span className="selector-label">Color</span>
              <div className="color-selectors">
                {selectedProduct.colors.map((color, i) => (
                  <div key={i} className="color-opt" style={{ background: color }}></div>
                ))}
              </div>

              <div className="modal-actions">
                <button className="btn btn-black">AGREGAR AL CARRITO</button>
                <button className="btn btn-magenta whatsapp-btn">
                  <MessageCircle size={18} /> CONSULTAR STOCK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón Flotante WhatsApp */}
      <a href="https://wa.me/541112345678" className="whatsapp-float">
        <MessageCircle size={30} />
      </a>
    </div>
  );
};

export default App;
