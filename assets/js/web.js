/**
* Template Name: Knight
* Template URL: https://bootstrapmade.com/knight-free-bootstrap-theme/
* Updated: Oct 16 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();


  document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });


  //contact-form//


// function sendWhatsAppMessage(event) {
//    event.preventDefault(); // Optional: Uncomment if you're preventing form submission

//   const phoneNumber = "923378039943"; // Your WhatsApp number (no +)

//   // Get form input values
//   const name = document.getElementById("name").value.trim();
//   const contact = document.getElementById("contact").value.trim();
//   const subject = document.getElementById("subject").value.trim();
//   const message = document.getElementById("message").value.trim();

//   // Validate fields
//   if (!name || !contact || !subject || !message) {
//     alert("Please fill out all fields.");
//     return;
//   }

//   // Construct WhatsApp message with bold labels
//   const whatsappMessage = 
//     `*Name:* ${name}\n` +
//     `*Email:* ${contact}\n` +
//     `*Subject:* ${subject}\n` +
//     `*Message:* ${message}`;

//   // WhatsApp URL
//   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
//   window.open(whatsappURL, "_blank");
// }



// // ================== Website Modal ==================
const modal = document.getElementById('websiteModal');
const form = document.getElementById('websitemodalform');
const closeBtn = document.querySelector('.close-btn');
const openBtns = document.querySelectorAll('[onclick="openWebsiteModal()"], [onclick="protectedOpenWebsiteModal()"]');


function openWebsiteModal() {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeWebsiteModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Open modal
openBtns.forEach(btn => btn.addEventListener('click', e => {
  e.preventDefault();
  protectedOpenWebsiteModal(); // <-- yahan wrapper chalega
}));

// Close modal
closeBtn.addEventListener('click', closeWebsiteModal);
window.addEventListener('click', e => {
  if (e.target === modal) closeWebsiteModal();
});

// Handle Website Form Submit
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const requiredIds = ["name", "email", "phone", "businessType", "serviceneeded", "features", "details"];
  for (let id of requiredIds) {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) {
      alert("Please fill out all required fields.");
      return;
    }
  }

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    businessType: document.getElementById("businessType").value,
    serviceneeded: document.getElementById("serviceneeded").value,
    features: document.getElementById("features").value,
    details: document.getElementById("details").value,
    budget: document.getElementById("budget").value || "Not specified"
  };

  // Website Form ke liye Service & Template IDs
  const serviceID = "service_gcno13c";
  const templateID = "template_rzb05ip";

  emailjs.send(serviceID, templateID, params)
    .then(() => {
      form.reset();
      closeWebsiteModal();
      showSuccessPopup();
      setTimeout(closeSuccessPopup, 3000);
    })
    .catch(err => {
      console.error("EmailJS Error", err);
      alert("Something went wrong. Please try again or contact us directly.");
    });
});


// ========== GET VALUES ==========
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const businessType = document.getElementById("businessType").value.trim();
const serviceneeded = document.getElementById("serviceneeded").value.trim();
const features = document.getElementById("features").value.trim();
const details = document.getElementById("details").value.trim();
const budget = document.getElementById("budget").value.trim();

// ========== UNIVERSAL REQUIRED FIELDS CHECK ==========
if (!name || !email || !phone || !businessType || !serviceneeded || !features || !details) {
  alert("Please fill out all required fields.");
  return;
}

// ===================== NAME VALIDATION =====================
if (name.length < 3) {
  alert("Name must be at least 3 characters.");
  return;
}

const namePattern = /^[A-Za-z\s]+$/;
if (!namePattern.test(name)) {
  alert("Name can only contain letters and spaces.");
  return;
}

// ===================== EMAIL VALIDATION =====================
const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
if (!emailRegex.test(email)) {
  alert("Please enter a valid email like: example@gmail.com");
  return;
}

// ===================== PHONE VALIDATION =====================
const phonePattern = /^[0-9]+$/;

if (!phonePattern.test(phone)) {
  alert("Phone number can only contain digits.");
  return;
}

if (phone.length < 10) {
  alert("Phone number must be at least 10 digits.");
  return;
}

// ===================== BUSINESS TYPE VALIDATION =====================

const businessPattern = /^[A-Za-z\s]+$/;

if (!businessPattern.test(businessType)) {
  alert("Business type can only contain letters and spaces.");
  return;
}

// ===================== SERVICE NEEDED VALIDATION =====================

// const servicePattern = /^[A-Za-z\s]+$/;

// if (!servicePattern.test(serviceneeded)) {
//   alert("Service needed can only contain letters and spaces.");
//   return;
// }

// ===================== BUDGET VALIDATION =====================
const budgetPattern = /^[0-9]+$/;

if (!budgetPattern.test(budget)) {
  alert("Budget must be numbers only.");
  return;
}

// ===================== FEATURES & DETAILS =====================
// (NO SPECIAL VALIDATION — YOU ALLOWED EVERYTHING)

// features can have: letters, numbers, special chars ✔
// details can have: letters, numbers, special chars ✔

// OPTIONAL: Aap chahein to min length laga sakte hain
if (features.length < 5) {
  alert("Features must contain at least 5 characters.");
  return;
}

if (details.length < 10) {
  alert("Details must contain at least 10 characters.");
  return;
}

const budgetInput = document.getElementById("budget");

// Initialize with $
budgetInput.value = "$";

// Ensure $ stays at the start
budgetInput.addEventListener("input", function () {
  if (!this.value.startsWith("$")) {
    this.value = "$" + this.value.replace(/\$/g, "");
  }
});



  // =================== FeedBack Form ====================

const stars = document.querySelectorAll("#starRating i");   
const ratingInput = document.getElementById("ratings");
const feedbackForm = document.getElementById("feedbackForm");

// ================== Submit Handler ==================
feedbackForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Check Authentication
  const token = localStorage.getItem("token");
  if (!token) {
    localStorage.setItem("redirect_after_login", window.location.pathname + "#feedback-section");
    window.location.href = "login.html";
    return;
  }

  // Get values
  const name = document.getElementById("names").value.trim();
  const email = document.getElementById("emails").value.trim();
  const rating = ratingInput.value.trim();
  const message = document.getElementById("messages").value.trim();


  // ---- Name Validation ----

if (name.length < 3) {
  alert("Name must be at least 3 characters.");
  return;
}

const namePattern = /^[A-Za-z\s]+$/;

if (!namePattern.test(name)) {
  alert("Name can only contain letters and spaces. No numbers or special characters allowed.");
  return;
}

const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/;

if (!emailRegex.test(email)) {
  alert("Please enter a valid email");
  return;
}

  // ---- Rating Validation ----
  if (!rating) {
    alert("Please select a rating");
    return;
  }

  // ---- Message Validation ----
  if (message.length < 10) {
    alert("Feedback must be at least 10 characters");
    return;
  }

  // Prepare data
  const starsVisual = '⭐'.repeat(parseInt(rating));
  const params = { name, email, rating: starsVisual, message };

  // Send Email via EmailJS
  emailjs.send("service_gcno13c", "template_lz7s9vi", params)
    .then(() => {
      showSuccessPopup();
      feedbackForm.reset();
      ratingInput.value = "";
      stars.forEach(s => {
        s.classList.remove('bi-star-fill', 'text-warning');
        s.classList.add('bi-star');
      });
    })
    .catch((err) => {
      console.error("EmailJS Error:", err);
      alert("Something went wrong. Try again later.");
    });
});

// ================== Star Rating ==================
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    ratingInput.value = value;

    stars.forEach(s => {
      s.classList.remove('bi-star-fill', 'text-warning');
      s.classList.add('bi-star');
    });

    for (let i = 0; i <= index; i++) {
      stars[i].classList.remove('bi-star');
      stars[i].classList.add('bi-star-fill', 'text-warning');
    }
  });
});

// ================== Universal Success Popup Functions ==================
function showSuccessPopup() {
  document.getElementById('successPopup').style.display = 'flex';
}

function closeSuccessPopup() {
  document.getElementById('successPopup').style.display = 'none';
}

// ================== LOGIN PROTECTION WRAPPER ==================

function protectedOpenWebsiteModal() {
  const token = localStorage.getItem("token");

  if (!token) {
    // Save current desired page/feature
    localStorage.setItem("redirect_after_login", window.location.pathname + "#websiteModal");
    window.location.href = "login.html";
    return;
  }

  // User logged in → open modal
  openWebsiteModal();
}


const serviceSelect = document.getElementById("serviceneeded");
  const otherContainer = document.getElementById("otherServiceContainer");

  serviceSelect.addEventListener("change", () => {
    if(serviceSelect.value === "Other") {
      otherContainer.style.display = "block";
    } else {
      otherContainer.style.display = "none";
    }
  });
