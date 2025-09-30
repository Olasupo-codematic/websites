// Claire Beare Gifts - JavaScript Functionality

// Product data (matches the React data exactly)
const products = [
  {
    id: 1,
    name: "Luxury Birthday Gift Card",
    description:
      "A premium digital gift card that can be redeemed for future purchases. Perfect for birthdays and special celebrations.",
    price: 90000,
    image:
      "https://media.istockphoto.com/id/1324315716/vector/happy-birthday-vector-banner-template-happy-birthday-greeting-text-with-gifts-party-hat-and.jpg?s=612x612&w=0&k=20&c=YJe0GXx5uWeBWYjl6c3kd2DWQcsB7gyyOekY4Hha_Tc=",
    category: "Gift Cards",
    product_uuid: "efeb095f-1a1f-4a71-bdcf-8027da056074",
  },
  {
    id: 2,
    name: "Romantic E-Gift Card",
    description:
      "A beautifully themed e-gift card designed for anniversaries, Valentine's Day, or romantic gestures.",
    price: 95000,
    image:
      "https://shopamantine.com/cdn/shop/files/GiftCard_00d85aa8-5e8d-4fe7-9c40-cc1f916f775f.png?v=1703359417",
    category: "Gift Cards",
    product_uuid: "263fcfeb-f783-495e-be48-988d50aa5e95",
  },
  {
    id: 3,
    name: "Printable Daily Planner",
    description:
      "A stylish PDF planner designed to boost your productivity with elegant layouts and organizational tools.",
    price: 92000,
    image:
      "https://onplanners.com/sites/default/files/styles/template_fancy/public/template-images/printable-daily-hourly-planner-flowers-template_0.png",
    category: "Templates",
    product_uuid: "938cf126-a263-4760-9245-8b6980adf967",
  },
  {
    id: 4,
    name: "Resume/CV Template Pack",
    description:
      "Professionally designed, editable templates for job seekers. Multiple styles included for various industries.",
    price: 98000,
    image:
      "https://s3-figma-hubfile-images-production.figma.com/hub/file/carousel/img/657d2b062a365548bd20c9acb172bfbe34285a5d",
    category: "Templates",
    product_uuid: "513bd85b-36b0-4c1e-abfb-90b38b70815e",
  },
  {
    id: 5,
    name: "Ebook: '100 Inspiring Gift Ideas'",
    description:
      "A comprehensive guidebook filled with creative and thoughtful gifting ideas for every occasion and recipient.",
    price: 91000,
    image:
      "https://m.media-amazon.com/images/I/51yeCKmid-L._UF1000,1000_QL80_.jpg",
    category: "Ebooks",
    product_uuid: "34cef3c8-fc85-4acd-a056-5d5a262feaee",
  },
  {
    id: 6,
    name: "Digital Greeting Card Bundle",
    description:
      "Beautiful digital greeting cards for birthdays, weddings, holidays, and special celebrations.",
    price: 90050,
    image:
      "https://m.media-amazon.com/images/I/51yeCKmid-L._UF1000,1000_QL80_.jpg",
    category: "Templates",
    product_uuid: "c1095a8f-2ad9-4fba-bcde-b7415cf72369",
  },
  {
    id: 7,
    name: "Stock Photo Collection",
    description:
      "Curated HD lifestyle and celebration-themed images perfect for social media, websites, and marketing.",
    price: 110000,
    image:
      "https://static.showit.co/1600/Asbgs1XwThiOuGzBUCvowg/154719/haute_stock_the_agency_collection_banner_image.png",
    category: "Media",
    product_uuid: "3151744d-df43-41d8-b215-39e97425118c",
  },
  {
    id: 8,
    name: "Digital Art Print",
    description:
      "Original downloadable artwork ready to print and frame. Modern abstract design in luxury colors.",
    price: 105000,
    image: "https://www.digitalprolab.com/wp-content/uploads/IMG_9055.jpg",
    category: "Art",
    product_uuid: "35554430-6466-47dc-aa78-bb27515cfd25",
  },
  {
    id: 9,
    name: "Online Course: Creative Gifting Strategies",
    description:
      "A comprehensive mini-course teaching you how to choose meaningful gifts that create lasting impressions.",
    price: 120000,
    image:
      "https://www.learnworlds.com/app/uploads/2022/12/How-to-Sell-Courses-as-Gifts.jpg",
    category: "Courses",
    product_uuid: "af8609b3-654b-4cd3-9396-29677da297e4",
  },
  {
    id: 10,
    name: "Music Playlist Pack",
    description:
      "Curated downloadable MP3 tracks perfect for parties, romantic moments, and relaxing chill vibes.",
    price: 90500,
    image:
      "https://i1.sndcdn.com/artworks-HZ1YrisBDcWZ6Hvh-t4dihA-t500x500.jpg",
    category: "Media",
    product_uuid: "773e5b01-4d52-49cf-80cd-70580f162497",
  },
];

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function formatPrice(price) {
  return price.toLocaleString();
}

// Toast Notification System
function showToast(title, description, type = "success") {
  const toast = document.getElementById("toast");
  const toastIcon = document.getElementById("toastIcon");
  const toastTitle = document.getElementById("toastTitle");
  const toastDescription = document.getElementById("toastDescription");
  toastTitle.textContent = title;
  toastDescription.textContent = description;

  // Set icon based on type
  if (type === "success") {
    toastIcon.textContent = "✓";
    toastIcon.className = "toast-icon success";
  } else if (type === "error") {
    toastIcon.textContent = "✗";
    toastIcon.className = "toast-icon error";
  }

  // Show toast
  toast.classList.remove("hidden");
  toast.classList.add("show");

  // Hide toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.classList.add("hidden");
    }, 300);
  }, 5000);
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");

  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = !mobileNav.classList.contains("hidden");

    if (isOpen) {
      // Close menu
      mobileNav.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    } else {
      // Open menu
      mobileNav.classList.remove("hidden");
      menuIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }
  });

  // Close mobile menu when clicking on nav links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');

  [...navLinks, ...footerLinks].forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });
}

// Product Card Creation
function createProductCard(product) {
  // Escape single quotes in the product name so it can be safely inserted
  // into a single-quoted onclick attribute value.
  const safeName = String(product.name).replace(/'/g, "\\'");

  return `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <div class="product-badge">${product.category}</div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price-row">
          <span class="product-price">₦${formatPrice(product.price)}</span>
          <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="m21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7,10 12,15 17,10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
      </div>
      <div class="product-footer">
        <button class="btn btn-primary btn-full" onclick="loadIframe('https://checkout-page-frontend-development-749119130796.europe-west1.run.app/checkout?id=${
          product.product_uuid
        }', '${safeName}')">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
          Buy Now
        </button>
      </div>
    </div>
  `;
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

// Render Products
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    productsGrid.innerHTML = products
      .map((product) => createProductCard(product))
      .join("");
  }
}

// Handle Buy Now Click (matches React functionality exactly)
function handleBuyNow(productName, price) {
  alert(
    `Purchasing ${productName} for ₦${formatPrice(
      price
    )}. This is a demo - no actual transaction will occur.`
  );
}

// Contact Form Handling
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("name").trim();
      const email = formData.get("email").trim();
      const message = formData.get("message").trim();

      // Basic validation
      if (!name || !email || !message) {
        showToast(
          "Please fill in all fields",
          "All fields are required to send your message.",
          "error"
        );
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast(
          "Invalid email address",
          "Please enter a valid email address.",
          "error"
        );
        return;
      }

      // Show loading state
      submitBtn.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <div style="animation: spin 1s linear infinite; border: 2px solid transparent; border-top: 2px solid currentColor; border-radius: 50%; width: 1rem; height: 1rem; margin-right: 0.5rem;"></div>
                    Sending...
                </div>
            `;
      submitBtn.disabled = true;

      try {
        // Simulate form submission (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        showToast(
          "Message sent successfully!",
          "Thank you for contacting us. We'll get back to you soon.",
          "success"
        );

        // Reset form
        contactForm.reset();
      } catch (error) {
        showToast(
          "Failed to send message",
          "Please try again later or contact us directly.",
          "error"
        );
      } finally {
        // Reset button
        submitBtn.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                    </svg>
                    Send Message
                `;
        submitBtn.disabled = false;
      }
    });
  }
}

// Set Current Year in Footer
function setCurrentYear() {
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear().toString();
  }
}

// Initialize Everything When DOM is Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeMobileMenu();
  initializeSmoothScrolling();
  renderProducts();
  initializeContactForm();
  setCurrentYear();

  // Add CSS animation for loading spinner
  const style = document.createElement("style");
  style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(style);
});

// Global functions for onclick handlers
window.scrollToSection = scrollToSection;
window.handleBuyNow = handleBuyNow;
