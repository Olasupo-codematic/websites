document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // --- Configuration ---
  const ANIMATION_DURATION = 0.8;
  const STAGGER_AMOUNT = 0.1;
  const PRIMARY_COLOR = "#007BFF";
  const ACCENT_COLOR = "#FF2E63";

  // --- 1. Hero Section Animations ---
  const heroTimeline = gsap.timeline();

  // Text fade-in and slide up
  heroTimeline
    .from(".hero-headline", {
      y: 30,
      opacity: 0,
      duration: ANIMATION_DURATION,
      ease: "power2.out",
    })
    .from(
      ".hero-subtext",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    )
    .from(
      ".hero-ctas",
      {
        opacity: 0,
        duration: 0.5,
      },
      "-=0.3"
    );

  // Icon float animation loop
  document.querySelectorAll(".icon-float").forEach((icon, index) => {
    const xDirection = index % 2 === 0 ? 30 : -30;
    const yDirection = index % 3 === 0 ? 20 : -20;

    gsap.to(icon, {
      x: xDirection,
      y: yDirection,
      rotation: (index + 1) * 5,
      duration: 4 + Math.random() * 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: index * 0.2,
    });
  });

  // --- 2. Scroll Reveal Animations (ScrollTrigger) ---

  // Generic batch scroll reveal for cards/items
  function setupScrollReveal(
    selector,
    { x = 0, y = 30, scale = 1, delay = 0, stagger = STAGGER_AMOUNT }
  ) {
    ScrollTrigger.batch(selector, {
      onEnter: (elements, triggers) => {
        gsap.to(elements, {
          x: 0,
          y: 0,
          scale: scale,
          opacity: 1,
          duration: ANIMATION_DURATION,
          ease: "power3.out",
          stagger: stagger,
          delay: delay,
        });
      },
      once: true,
      start: "top 85%",
    });
  }

  // Core Categories Grid
  setupScrollReveal(".service-card", { y: 20, stagger: 0.15 });

  // Benefits Section
  setupScrollReveal(".benefit-item", { x: -30, stagger: 0.1 });

  // How It Works (Sequential animation)
  gsap.to(".process-steps", {
    scrollTrigger: {
      trigger: ".section-process",
      start: "top 70%",
      onEnter: () => {
        const processTimeline = gsap.timeline();

        // Animate Step 1
        processTimeline.to('[data-gsap-step="1"]', {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        });

        // Animate Line 1 (desktop scaleX, mobile scaleY)
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const lineProp = isMobile ? "scaleY" : "scaleX";

        processTimeline.to('[data-gsap-line="1"]', {
          [lineProp]: 1,
          duration: 0.5,
          ease: "power1.out",
        });

        // Animate Step 2
        processTimeline.to(
          '[data-gsap-step="2"]',
          { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
          "<0.2"
        );

        // Animate Line 2
        processTimeline.to('[data-gsap-line="2"]', {
          [lineProp]: 1,
          duration: 0.5,
          ease: "power1.out",
        });

        // Animate Step 3
        processTimeline.to(
          '[data-gsap-step="3"]',
          { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
          "<0.2"
        );
      },
      once: true,
    },
  });

  // Call to Action (CTA)
  setupScrollReveal(".section-cta .cta-heading", {
    scale: 1,
    y: 0,
    delay: 0.2,
    stagger: 0,
    opacity: 1,
  });
  setupScrollReveal(".section-cta .cta-actions a", {
    scale: 1,
    y: 0,
    delay: 0.4,
    stagger: 0.1,
    opacity: 1,
  });

  // Footer
  setupScrollReveal(".footer", { y: 0, stagger: 0, opacity: 1, delay: 0.1 });

  // --- 3. Hover Interactions (GSAP) ---

  // Button Hover
  document
    .querySelectorAll('[data-gsap-hover="bounce-color"]')
    .forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)" });
      });
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
      });
    });

  // Card Hover (Elevation and Glow)
  document.querySelectorAll('[data-gsap-card="true"]').forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -5,
        boxShadow: `0 15px 35px rgba(0,0,0,0.15), 0 0 10px ${ACCENT_COLOR}`,
        borderColor: ACCENT_COLOR,
        duration: 0.4,
        ease: "power2.out",
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        borderColor: "var(--color-card-border)",
        duration: 0.4,
        ease: "power2.out",
      });
    });
  });

  // Sticky CTA Pulse/Glow
  const stickyCta = document.querySelector(".sticky-cta-btn");
  if (stickyCta) {
    gsap.to(stickyCta, {
      boxShadow: `0 0 15px 5px ${ACCENT_COLOR}`,
      y: -2,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    });
  }

  // --- 4. Form Submission and Modal Logic (AJAX Style) ---

  const contactForm = document.getElementById("contactForm");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const successModal = document.getElementById("successModal");
  const modalContent = successModal.querySelector(".modal-content");
  const modalCloseBtn = successModal.querySelector(".modal-close-btn");

  // Modal GSAP Timeline
  const modalTL = gsap.timeline({ paused: true });

  if (window.matchMedia("(max-width: 767px)").matches) {
    // Mobile: Slide up from bottom
    modalTL
      .to(successModal, { display: "flex", duration: 0 }, 0)
      .from(successModal, { opacity: 0, duration: 0.3 }, 0)
      .from(
        modalContent,
        { y: "100%", duration: 0.5, ease: "back.out(1)" },
        0.1
      );
  } else {
    // Desktop: Fade in and slight drop
    modalTL
      .to(successModal, { display: "flex", duration: 0 }, 0)
      .from(successModal, { opacity: 0, duration: 0.3 }, 0)
      .from(
        modalContent,
        { opacity: 0, y: -100, duration: 0.5, ease: "back.out(1.2)" },
        0.1
      );
  }

  function showModal() {
    modalTL.play();
    // Trap focus inside modal for accessibility (simple version)
    modalContent.focus();
  }

  function hideModal() {
    modalTL.reverse().then(() => {
      successModal.style.display = "none";
    });
  }

  // Close modal on button click
  modalCloseBtn.addEventListener("click", hideModal);

  // Close modal on background click
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      hideModal();
    }
  });

  // Simulate Form Submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Show loading indicator and disable button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.style.display = "none";
    loadingIndicator.style.display = "block";

    // Simulate AJAX Request Delay
    setTimeout(() => {
      // Success simulation
      console.log(
        "Form data simulated submission:",
        Object.fromEntries(formData.entries())
      );

      // Reset form
      contactForm.reset();

      // Hide loading and re-enable button
      loadingIndicator.style.display = "none";
      submitBtn.style.display = "block";

      // Trigger GSAP Success Modal
      showModal();
    }, 1500); // 1.5 second delay
  });

  // --- 5. Floating Label Fix (for empty/required state) ---
  document
    .querySelectorAll(".input-group input, .input-group textarea")
    .forEach((input) => {
      // Simple fix to ensure label is 'up' if field is not empty on page load (e.g., autofill)
      if (input.value !== "") {
        input.classList.add("not-empty");
      }
      input.addEventListener("input", () => {
        if (input.value !== "") {
          input.classList.add("not-empty");
        } else {
          input.classList.remove("not-empty");
        }
      });
    });
});
