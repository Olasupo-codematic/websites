/*
 * JANKA COMPANY LIMITED - Product Logic
 * Handles dynamic product rendering, modal display, AJAX simulation, and form submissions.
 */

// --- 1. Product Data ---
const PRODUCTS = [
  {
    id: "saas-starter",
    title: "SaaS Starter Template",
    description: "Clean React + Vite starter kit for rapid deployment.",
    priceKES: 7500,
    category: "Development",
    image: "🚀",
  },
  {
    id: "ui-bundle",
    title: "UI Components Bundle",
    description: "150 reusable components in Figma and clean HTML/CSS.",
    priceKES: 7200,
    category: "Design",
    image: "🎨",
  },
  {
    id: "microservices-guide",
    title: "Microservices Architecture Guide",
    description:
      "Deployment, scaling, and infrastructure checklist for modern systems.",
    priceKES: 6900,
    category: "Architecture",
    image: "🏛️",
  },
  {
    id: "automation-scripts",
    title: "Automation Script Pack",
    description:
      "Node.js deployment, testing, and continuous integration scripts.",
    priceKES: 6800,
    category: "Automation",
    image: "⚙️",
  },
  {
    id: "api-security",
    title: "API Security Audit Template",
    description:
      "Comprehensive checklist and remediation playbook for REST/GraphQL APIs.",
    priceKES: 7400,
    category: "Security",
    image: "🛡️",
  },
  {
    id: "pitch-deck-kit",
    title: "Startup Pitch Deck Kit",
    description: "Investor-ready slides, financial models, and copy pack.",
    priceKES: 7300,
    category: "Business",
    image: "📈",
  },
];

// --- 2. DOM Elements and State ---
const productGrid = document.getElementById("product-grid");
const checkoutModalOverlay = document.getElementById("checkout-modal-overlay");
const successModalOverlay = document.getElementById("success-modal-overlay");
const contactForm = document.getElementById("contact-form");
const checkoutForm = document.getElementById("checkout-form");
let selectedProduct = null;

// Helper to format currency
const formatKES = (amount) => {
  return `KES ${amount.toLocaleString("en-KE")}`;
};

// --- 3. Dynamic Product Rendering ---
const renderProducts = () => {
  if (!productGrid) return;

  productGrid.innerHTML = PRODUCTS.map(
    (product) => `
        <li class="product-card" data-product-id="${product.id}">
            <div class="product-image" aria-label="${product.title} icon">
                ${product.image}
            </div>
            <div class="product-info">
                <h3 id="product-title-${product.id}">${product.title}</h3>
                <p>${product.description}</p>
                <div class="product-price-action">
                    <span class="product-price">
                        <span class="currency">KES</span> ${product.priceKES.toLocaleString(
                          "en-KE"
                        )}
                    </span>
                    <button class="btn btn-primary buy-now-btn" data-product-id="${
                      product.id
                    }" aria-labelledby="product-title-${product.id}">
                        Buy Now
                    </button>
                </div>
            </div>
        </li>
    `
  ).join("");

  // Attach event listeners to all 'Buy Now' buttons
  document.querySelectorAll(".buy-now-btn").forEach((button) => {
    button.addEventListener("click", handleBuyNowClick);
  });
};

// --- 4. Modal Handlers ---

const openModal = (modalOverlay) => {
  modalOverlay.classList.add("active");
  modalOverlay.setAttribute("aria-hidden", "false");
  // Set focus to the first interactive element inside the modal for accessibility
  const firstFocusable = modalOverlay.querySelector("input, button, a");
  if (firstFocusable) firstFocusable.focus();
};

const closeModal = (modalOverlay) => {
  modalOverlay.classList.remove("active");
  modalOverlay.setAttribute("aria-hidden", "true");
  // Clear form fields when closing checkout modal
  if (modalOverlay.id === "checkout-modal-overlay") {
    checkoutForm.reset();
    // Reset loading state
    const loadingIndicator = modalOverlay.querySelector(".loading-indicator");
    const checkoutButton = modalOverlay.querySelector(".btn-accent");
    if (loadingIndicator) loadingIndicator.classList.remove("active");
    if (checkoutButton) checkoutButton.disabled = false;
  }
};

// Handle buy button click
const handleBuyNowClick = (event) => {
  const productId = event.currentTarget.getAttribute("data-product-id");
  selectedProduct = PRODUCTS.find((p) => p.id === productId);

  if (selectedProduct) {
    // Populate modal with product details
    document.getElementById("checkout-product-title").textContent =
      selectedProduct.title;
    document.getElementById("checkout-product-price").textContent = formatKES(
      selectedProduct.priceKES
    );

    // Update hidden field for submission
    document.getElementById("checkout-product-id-input").value =
      selectedProduct.id;

    openModal(checkoutModalOverlay);
  }
};

// Handle closing modals via button or overlay click
document.querySelectorAll(".close-btn, .modal-overlay").forEach((el) => {
  el.addEventListener("click", (event) => {
    // Only close if clicking the close button or the immediate overlay background
    if (
      event.target.classList.contains("close-btn") ||
      event.target.classList.contains("modal-overlay")
    ) {
      closeModal(
        event.currentTarget.closest(".modal-overlay") || event.currentTarget
      );
    }
  });
});

// Handle closing modals via ESC key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (checkoutModalOverlay.classList.contains("active")) {
      closeModal(checkoutModalOverlay);
    } else if (successModalOverlay.classList.contains("active")) {
      closeModal(successModalOverlay);
    }
  }
});

// --- 5. Form Submissions (AJAX Simulation) ---

// Generic function to simulate AJAX and show a success modal
const simulateAjax = (formElement, modalIdToShow) => {
  const submitButton = formElement.querySelector('.btn[type="submit"]');
  const loadingIndicator = formElement.querySelector(".loading-indicator");

  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());

  // Disable button and show loading indicator
  submitButton.disabled = true;
  if (loadingIndicator) loadingIndicator.classList.add("active");

  // Simulate network delay
  setTimeout(() => {
    // Re-enable button and hide loading indicator
    submitButton.disabled = false;
    if (loadingIndicator) loadingIndicator.classList.remove("active");

    // Show success modal
    const successModal = document.getElementById(modalIdToShow);
    if (successModal) {
      // Customize success message based on context
      if (modalIdToShow === "contact-success-modal-overlay") {
        successModal.querySelector("#contact-success-email").textContent =
          data.email || "your email address";
      } else if (modalIdToShow === "success-modal-overlay") {
        successModal.querySelector("#success-product-title").textContent =
          data.product_title || selectedProduct.title;
        successModal.querySelector("#success-recipient-email").textContent =
          data.email;
      }

      // Close current form modal if applicable
      if (formElement.closest(".modal-overlay")) {
        closeModal(formElement.closest(".modal-overlay"));
      }

      openModal(successModal);
    }

    // Reset the form
    formElement.reset();
  }, 1500); // 1.5 seconds simulated latency
};

// 5a. Contact Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Contact form success uses a dedicated modal
    simulateAjax(this, "contact-success-modal-overlay");
  });
}

// 5b. Checkout Form Submission
if (checkoutForm) {
  checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the product title from the hidden input/selectedProduct
    const productTitle = this.querySelector(
      "#checkout-product-title-input"
    ).value;
    const customerEmail = this.querySelector("#checkout-email").value;

    // Add the product title and email to the form data for the success message to use
    const formData = new FormData(this);
    formData.append("product_title", productTitle);
    formData.append("email", customerEmail);

    // Checkout success uses the main success modal
    simulateAjax(this, "success-modal-overlay");
  });
}

// --- 6. Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  // Only render products on the main index page
  if (productGrid) {
    renderProducts();
  }

  // Scroll Hero CTA to products on click
  const heroCTA = document.getElementById("hero-cta");
  if (heroCTA) {
    heroCTA.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("products")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  console.log("JANKA COMPANY LIMITED script initialized.");
});
