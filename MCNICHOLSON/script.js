// MCNICHOLSON GIFT INTEGRATED LIMITED - JavaScript Functionality

// Products Data
const products = [
  {
    id: 1,
    name: "Relationship Gift Ebook",
    category: "Ebook",
    price: "₦95,000",
    description: "Perfect digital gift for couples and relationships",
    icon: "📚",
    product_uuid: "16dc3285-2989-4301-9ce4-1bfa7c8a423e",
  },
  {
    id: 2,
    name: "Birthday Digital Gift Card",
    category: "Gift Voucher",
    price: "₦110,000",
    description: "Instant birthday gift that never expires",
    icon: "🎁",
    product_uuid: "25033e63-56ba-466b-8f5a-7a507e7970fb",
  },
  {
    id: 3,
    name: "Productivity Planner Template",
    category: "Digital Template",
    price: "₦92,500",
    description: "Organize life with beautiful planning templates",
    icon: "📄",
    product_uuid: "3a4db556-e039-4d41-a302-895f143ae6c5",
  },
  {
    id: 4,
    name: "Startup Business Kit",
    category: "Digital Bundle",
    price: "₦140,000",
    description: "Complete business starter pack with templates",
    icon: "📦",
    product_uuid: "8d60da7a-4b0b-4bb4-b717-cb2b2ce3fc75",
  },
  {
    id: 5,
    name: "Social Media Template Pack",
    category: "Templates",
    price: "₦120,000",
    description: "Professional social media designs and templates",
    icon: "🎨",
    product_uuid: "f139d5a9-9dd6-4a2e-ab92-0aa478686d25",
  },
  {
    id: 6,
    name: "Personal Finance Ebook",
    category: "Ebook",
    price: "₦90,000",
    description: "Master your money with expert financial guidance",
    icon: "📚",
    product_uuid: "7f92b2bb-53c1-472b-9f67-04e6287cb50b",
  },
  {
    id: 7,
    name: "Self-Care Digital Guide",
    category: "Ebook",
    price: "₦100,000",
    description: "Complete wellness and self-care resource",
    icon: "📚",
    product_uuid: "2ad72ab1-4032-42a9-acd9-18d8321c9ed0",
  },
  {
    id: 8,
    name: "Wedding Invitation Template Pack",
    category: "Templates",
    price: "₦105,000",
    description: "Elegant wedding invitation designs",
    icon: "🎨",
    product_uuid: "4810da56-7b2f-4568-9ee1-1136abab3455",
  },
  {
    id: 9,
    name: "Holiday Greeting Card Templates",
    category: "Templates",
    price: "₦90,500",
    description: "Festive cards for every holiday season",
    icon: "🎨",
    product_uuid: "9d830050-ca8a-45b5-bc6b-333404487082",
  },
  {
    id: 10,
    name: "Entrepreneur's Toolkit (PDF Pack)",
    category: "Digital Bundle",
    price: "₦125,000",
    description: "Essential tools and guides for entrepreneurs",
    icon: "📦",
    product_uuid: "8f802815-69b5-406c-9d3a-aafffc578b35",
  },
];

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
    // Escape single quotes and backslashes in the product name so it can be
    // safely inserted into an inline onclick attribute.
    const safeName = String(product.name)
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'");

    card.innerHTML = `
      <div class="product-icon float-animation">
        ${product.icon}
      </div>
      <h3 class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}</span>
        <button class="btn btn-gift btn-sm sparkle" data-product-id="${product.id}" onclick="loadIframe('https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${product.product_uuid}', '${safeName}')">
          Buy Now
        </button>
      </div>
    `;

    // Add purchase event listener to show toast (the button also opens the iframe via onclick)
    const buyButton = card.querySelector("button[data-product-id]");
    if (buyButton) {
      buyButton.addEventListener("click", () => {
        this.handlePurchase(product);
      });
    }

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

// Load checkout page in an overlay iframe (caller supplies full URL)
function loadIframe(url, productTitle) {
  let overlay = document.getElementById("checkoutOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "checkoutOverlay";
    overlay.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:10000;";

    const container = document.createElement("div");
    container.style.cssText =
      "width:95%;max-width:1100px;height:85%;background:#fff;border-radius:10px;overflow:hidden;position:relative;";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", "Close checkout");
    closeBtn.style.cssText =
      "position:absolute;top:8px;right:12px;font-size:28px;background:none;border:none;cursor:pointer;z-index:10001;";
    closeBtn.addEventListener("click", closeCheckoutOverlay);

    const iframe = document.createElement("iframe");
    iframe.id = "checkoutIframe";
    iframe.src = url;
    iframe.style.cssText = "width:100%;height:100%;border:0;display:block;";

    container.appendChild(closeBtn);
    container.appendChild(iframe);
    overlay.appendChild(container);
    document.body.appendChild(overlay);
  } else {
    const iframe = document.getElementById("checkoutIframe");
    if (iframe) iframe.src = url;
    overlay.style.display = "flex";
  }
}

function closeCheckoutOverlay() {
  const overlay = document.getElementById("checkoutOverlay");
  if (overlay) {
    const iframe = document.getElementById("checkoutIframe");
    if (iframe) iframe.src = "about:blank";
    overlay.style.display = "none";
  }
}
