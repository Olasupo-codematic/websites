// MCCHARLISON SUPPLIES LIMITED - JavaScript

// Products Data
const products = [
  {
    id: 1,
    title: "Business Growth Ebook",
    category: "Ebook",
    price: "₦92,000",
    icon: "📚",
    description: "Complete guide to scaling your business",
    product_uuid: "b1751fac-fb9e-40c9-82dc-be64f039eb28",
  },
  {
    id: 2,
    title: "Invoice & Receipt Templates Pack",
    category: "Template Bundle",
    price: "₦110,000",
    icon: "📄",
    description: "Professional business document templates",
    product_uuid: "810eaa8f-e066-453b-a1de-7824d713c83f",
  },
  {
    id: 3,
    title: "Social Media Marketing Guide",
    category: "Ebook",
    price: "₦98,500",
    icon: "📱",
    description: "Master social media marketing strategies",
    product_uuid: "99013bb2-6ce9-4ea6-8309-6fb3d4323272",
  },
  {
    id: 4,
    title: "Startup Pitch Deck Template",
    category: "Presentation",
    price: "₦130,000",
    icon: "📊",
    description: "Investor-ready pitch deck template",
    product_uuid: "5cdb43e6-6450-4348-ae10-544e666c0ab3",
  },
  {
    id: 5,
    title: "Web Design UI Kit",
    category: "Digital Asset",
    price: "₦150,000",
    icon: "🎨",
    description: "Complete UI components for web design",
    product_uuid: "c070f19c-aea6-4227-893e-d2b3baa64f6e",
  },
  {
    id: 6,
    title: "Personal Finance Planner",
    category: "Digital Planner",
    price: "₦90,500",
    icon: "🧮",
    description: "Organize your finances effectively",
    product_uuid: "33d28631-f3b8-47bd-bdac-9075c9174d8a",
  },
  {
    id: 7,
    title: "Content Calendar Template",
    category: "Productivity Kit",
    price: "₦95,500",
    icon: "📅",
    description: "Plan your content strategy",
    product_uuid: "bdaab02e-ea1c-47b2-a3c7-77680ed0643e",
  },
  {
    id: 8,
    title: "Cybersecurity Awareness Ebook",
    category: "Ebook",
    price: "₦105,000",
    icon: "🔒",
    description: "Stay safe in the digital world",
    product_uuid: "e52400dc-ed3f-4192-a85b-62328eea1c87",
  },
  {
    id: 9,
    title: "Resume & CV Template Pack",
    category: "Templates",
    price: "₦91,500",
    icon: "👤",
    description: "Professional resume and CV designs",

    product_uuid: "56daaa4a-443b-44e4-b22b-972da4568081",
  },
  {
    id: 10,
    title: "Small Business Legal Docs Bundle",
    category: "Templates",
    price: "₦120,000",
    icon: "🏢",
    description: "Essential legal documents for businesses",
    product_uuid: "80351708-fe59-47c2-afd3-b5999a7cf2a7",
  },
];

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Initialize the application
  initApp();
});

function initApp() {
  // Render products
  renderProducts();

  // Setup navigation
  setupNavigation();

  // Setup form handling
  setupFormHandling();

  // Setup animations
  setupAnimations();

  // Setup modal
  setupModal();
}

// Render Products
function renderProducts() {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-icon">${product.icon}</div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price}</span>
                <button class="btn-cta" onclick="loadIframe('https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${product.product_uuid}', '${product.title}')">Buy Now</button>
            </div>
        </div>
    `
    )
    .join("");
}

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

// Handle Buy Now
function handleBuyNow(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    // In a real application, this would redirect to payment processing
    alert(`Redirecting to payment for: ${product.title} - ${product.price}`);
  }
}

// Setup Navigation
function setupNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll-to buttons
  document.querySelectorAll("[data-scroll-to]").forEach((button) => {
    button.addEventListener("click", function () {
      const target = document.getElementById(this.dataset.scrollTo);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }

    lastScrollY = currentScrollY;
  });
}

// Setup Form Handling
function setupFormHandling() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Basic validation
    if (!data.name || !data.email || !data.message) {
      alert("Please fill in all fields");
      return;
    }

    // Reset form
    this.reset();

    // Show success modal with GSAP animation
    showSuccessModal();

    // In a real application, you would send the data to your server here
    console.log("Form submitted:", data);
  });
}

// Setup Animations
function setupAnimations() {
  // Hero content animation
  gsap.to(".hero-content", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    delay: 0.3,
  });

  // Product cards staggered animation
  gsap.set(".product-card", { opacity: 0, y: 30 });
  ScrollTrigger.batch(".product-card", {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    start: "top 80%",
  });

  // Step cards animation
  gsap.set(".step-card", { opacity: 0, y: 30 });
  ScrollTrigger.batch(".step-card", {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
      });
    },
    start: "top 80%",
  });

  // Benefit cards animation
  gsap.set(".benefit-card", { opacity: 0, y: 30 });
  ScrollTrigger.batch(".benefit-card", {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    start: "top 80%",
  });

  // Section headers animation
  gsap.set(".section-header", { opacity: 0, y: 20 });
  ScrollTrigger.batch(".section-header", {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    start: "top 85%",
  });

  // Contact card animation
  gsap.set(".contact-card", { opacity: 0, scale: 0.95 });
  ScrollTrigger.create({
    trigger: ".contact-card",
    start: "top 80%",
    onEnter: () => {
      gsap.to(".contact-card", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });
    },
  });

  // Footer animation
  gsap.set(".footer", { opacity: 0 });
  ScrollTrigger.create({
    trigger: ".footer",
    start: "top 90%",
    onEnter: () => {
      gsap.to(".footer", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    },
  });
}

// Setup Modal
function setupModal() {
  const modal = document.getElementById("success-modal");
  const closeBtn = document.querySelector(".modal-close");

  // Close modal when clicking the close button
  if (closeBtn) {
    closeBtn.addEventListener("click", hideSuccessModal);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        hideSuccessModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      hideSuccessModal();
    }
  });
}

// Show Success Modal
function showSuccessModal() {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  modal.style.display = "block";

  // GSAP animation for modal entrance
  gsap.fromTo(
    ".modal-content",
    {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)",
    }
  );
}

// Hide Success Modal
function hideSuccessModal() {
  const modal = document.getElementById("success-modal");
  if (!modal) return;

  // GSAP animation for modal exit
  gsap.to(".modal-content", {
    opacity: 0,
    scale: 0.8,
    y: 50,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      modal.style.display = "none";
    },
  });
}

// Intersection Observer for additional animations (fallback)
if ("IntersectionObserver" in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe elements for fade-in animation
  document
    .querySelectorAll(".product-card, .step-card, .benefit-card")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Performance optimization
function optimizeAnimations() {
  // Disable animations on slower devices
  const isSlowDevice =
    navigator.hardwareConcurrency < 4 ||
    navigator.connection?.effectiveType === "2g" ||
    navigator.connection?.effectiveType === "3g";

  if (isSlowDevice) {
    document.documentElement.style.setProperty("--transition-normal", "0.1s");
    document.documentElement.style.setProperty("--transition-slow", "0.2s");
  }
}

// Initialize performance optimizations
optimizeAnimations();

// Window load event for final optimizations
window.addEventListener("load", () => {
  // Remove loading states
  document.body.classList.remove("loading");

  // Trigger any final animations
  ScrollTrigger.refresh();
});

// Handle window resize
window.addEventListener(
  "resize",
  debounce(() => {
    ScrollTrigger.refresh();
  }, 250)
);
