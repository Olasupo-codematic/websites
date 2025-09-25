// MCNICHOLSON GIFT INTEGRATED LIMITED - JavaScript Functionality

// Products Data
const products = [
  {
    id: 1,
    name: "Relationship Gift Ebook",
    category: "Ebook",
    price: "₦3,800",
    description: "Perfect digital gift for couples and relationships",
    icon: "📚",
  },
  {
    id: 2,
    name: "Birthday Digital Gift Card",
    category: "Gift Voucher",
    price: "₦5,000",
    description: "Instant birthday gift that never expires",
    icon: "🎁",
  },
  {
    id: 3,
    name: "Productivity Planner Template",
    category: "Digital Template",
    price: "₦4,500",
    description: "Organize life with beautiful planning templates",
    icon: "📄",
  },
  {
    id: 4,
    name: "Startup Business Kit",
    category: "Digital Bundle",
    price: "₦7,800",
    description: "Complete business starter pack with templates",
    icon: "📦",
  },
  {
    id: 5,
    name: "Social Media Template Pack",
    category: "Templates",
    price: "₦6,000",
    description: "Professional social media designs and templates",
    icon: "🎨",
  },
  {
    id: 6,
    name: "Personal Finance Ebook",
    category: "Ebook",
    price: "₦3,200",
    description: "Master your money with expert financial guidance",
    icon: "📚",
  },
  {
    id: 7,
    name: "Self-Care Digital Guide",
    category: "Ebook",
    price: "₦4,000",
    description: "Complete wellness and self-care resource",
    icon: "📚",
  },
  {
    id: 8,
    name: "Wedding Invitation Template Pack",
    category: "Templates",
    price: "₦5,200",
    description: "Elegant wedding invitation designs",
    icon: "🎨",
  },
  {
    id: 9,
    name: "Holiday Greeting Card Templates",
    category: "Templates",
    price: "₦2,800",
    description: "Festive cards for every holiday season",
    icon: "🎨",
  },
  {
    id: 10,
    name: "Entrepreneur's Toolkit (PDF Pack)",
    category: "Digital Bundle",
    price: "₦6,500",
    description: "Essential tools and guides for entrepreneurs",
    icon: "📦",
  },
];

// Toast Notification System
class Toast {
  constructor() {
    this.toastElement = document.getElementById("toast");
    this.titleElement = document.getElementById("toastTitle");
    this.descriptionElement = document.getElementById("toastDescription");
    this.closeButton = document.getElementById("toastClose");

    this.closeButton.addEventListener("click", () => this.hide());
  }

  show(title, description, duration = 5000) {
    this.titleElement.textContent = title;
    this.descriptionElement.textContent = description;
    this.toastElement.classList.add("show");

    setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide() {
    this.toastElement.classList.remove("show");
  }
}

// Smooth Scrolling Navigation
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    // Navigation links
    const navLinks = document.querySelectorAll(".nav-link, .footer-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = e.target.getAttribute("data-target");
        if (target) {
          this.scrollToSection(target);
        }
      });
    });

    // Hero buttons
    document.getElementById("heroShopBtn").addEventListener("click", () => {
      this.scrollToSection("products");
    });

    document.getElementById("heroHowBtn").addEventListener("click", () => {
      this.scrollToSection("how-it-works");
    });

    document.getElementById("shopNowBtn").addEventListener("click", () => {
      this.scrollToSection("products");
    });
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }
}

// Product Management
class ProductManager {
  constructor(toast) {
    this.toast = toast;
    this.productsGrid = document.getElementById("productsGrid");
    this.renderProducts();
  }

  renderProducts() {
    this.productsGrid.innerHTML = "";

    products.forEach((product, index) => {
      const productCard = this.createProductCard(product, index);
      this.productsGrid.appendChild(productCard);
    });
  }

  createProductCard(product, index) {
    const card = document.createElement("div");
    card.className = "product-card sparkle";
    card.style.animationDelay = `${index * 100}ms`;

    card.innerHTML = `
            <div class="product-icon float-animation">
                ${product.icon}
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price}</span>
                <button class="btn btn-gift btn-sm sparkle" data-product-id="${product.id}">
                    Buy Now
                </button>
            </div>
        `;

    // Add purchase event listener
    const buyButton = card.querySelector("button[data-product-id]");
    buyButton.addEventListener("click", () => {
      this.handlePurchase(product);
    });

    return card;
  }

  handlePurchase(product) {
    this.toast.show(
      "Added to Cart! 🛒",
      `${product.name} - ${product.price}`,
      3000
    );
  }
}

// Contact Form Management
class ContactForm {
  constructor(toast) {
    this.toast = toast;
    this.form = document.getElementById("contactForm");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  handleSubmit() {
    // Get form data
    const formData = new FormData(this.form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Validate form (basic validation)
    if (!data.name || !data.email || !data.message) {
      this.toast.show("Error", "Please fill in all fields", 3000);
      return;
    }

    // Simulate form submission
    this.toast.show(
      "Thank you! 🎁",
      "We'll reach out soon with your digital gift solutions!",
      5000
    );

    // Reset form
    this.form.reset();
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.observeElements();
  }

  observeElements() {
    // Observe product cards for staggered animation
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      this.observer.observe(card);
    });

    // Observe other elements
    const elementsToObserve = [".step", ".benefit-card", ".section-header"];

    elementsToObserve.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        this.observer.observe(element);
      });
    });
  }
}

// Header Scroll Effect
class HeaderEffects {
  constructor() {
    this.header = document.querySelector(".header");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        this.header.style.background = "hsla(240, 33%, 99%, 0.98)";
        this.header.style.boxShadow = "0 2px 20px hsla(0, 0%, 0%, 0.1)";
      } else {
        this.header.style.background = "hsla(240, 33%, 99%, 0.95)";
        this.header.style.boxShadow = "none";
      }
    });
  }
}

// Mobile Menu (if needed in future)
class MobileMenu {
  constructor() {
    // Placeholder for mobile menu functionality
    this.isMobile = window.innerWidth <= 768;
    window.addEventListener("resize", () => {
      this.isMobile = window.innerWidth <= 768;
    });
  }
}

// Initialize Application
class App {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.initializeComponents();
      });
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize components
    this.toast = new Toast();
    this.navigation = new Navigation();
    this.productManager = new ProductManager(this.toast);
    this.contactForm = new ContactForm(this.toast);
    this.animationObserver = new AnimationObserver();
    this.headerEffects = new HeaderEffects();
    this.mobileMenu = new MobileMenu();

    // Add sparkle effects
    this.addSparkleEffects();
  }

  addSparkleEffects() {
    const sparkleElements = document.querySelectorAll(".sparkle");
    sparkleElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        if (!element.querySelector(".sparkle-effect")) {
          const sparkle = document.createElement("span");
          sparkle.className = "sparkle-effect";
          sparkle.textContent = "✨";
          sparkle.style.cssText = `
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                        z-index: 10;
                    `;
          element.style.position = "relative";
          element.appendChild(sparkle);

          setTimeout(() => {
            sparkle.style.opacity = "1";
          }, 50);
        }
      });

      element.addEventListener("mouseleave", () => {
        const sparkle = element.querySelector(".sparkle-effect");
        if (sparkle) {
          sparkle.style.opacity = "0";
          setTimeout(() => {
            if (sparkle.parentNode) {
              sparkle.parentNode.removeChild(sparkle);
            }
          }, 300);
        }
      });
    });
  }
}

// Start the application
const app = new App();
