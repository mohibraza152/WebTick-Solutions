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



function switchService(btn, service) {
  // reset active buttons
  document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // hide all services
  document.querySelectorAll('.service-content').forEach(el => el.classList.remove('show'));

  // show selected
  document.getElementById(service).classList.add('show');
}


function goToService(serviceId) {
  // Scroll pricing section tak
  document.querySelector("#pricing").scrollIntoView({ behavior: "smooth" });

  // Sare buttons inactive karo
  document.querySelectorAll(".service-btn").forEach(btn => btn.classList.remove("active"));
  
  // Sare contents hide karo
  document.querySelectorAll(".service-content").forEach(c => c.classList.remove("show"));

  // Related button ko active karo
  let relatedBtn = document.querySelector(`.service-btn[onclick*="${serviceId}"]`);
  if (relatedBtn) relatedBtn.classList.add("active");

  // Related service pricing show karo
  let relatedContent = document.getElementById(serviceId);
  if (relatedContent) relatedContent.classList.add("show");
}


function submitProductForm() {
  const form = document.getElementById("productForm");
  form.requestSubmit(); // Ye form ka submit event trigger karega
}


let selectedProduct = null;
let selectedTier = null;

// Function to set selected product and tier
function setProductTier(product, tier) {
  selectedProduct = product; // 'chatbot', 'gmail', 'excel', 'automation'
  selectedTier = tier;       // 'basic', 'standard', 'premium'
}

// UNIVERSAL & PRODUCT FIELDS (as your existing code)
const universalGroups = [
  {
    title: "Basic Information",
    fields: [
      { label: "Full Name", id: "fullName", type: "text" },
      { label: "Business Name", id: "businessName", type: "text" },
      { label: "Business Email", id: "businessEmail", type: "email" },
      { label: "Phone No.", id: "phone", type: "tel" }
    ]
  },
  {
    title: "Business Details",
    fields: [
      {
        label: "Business Category",
        id: "category",
        type: "select",
        options: ["Restaurant", "Real Estate", "Ecommerce", "Agency", "Freelancer", "Other"]
      },
      {
        label: "Preferred Platform",
        id: "preferredPlatform",
        type: "select",
        options: ["Website", "WhatsApp", "Instagram", "Facebook", "Messenger", "Email"]
      }
    ]
  }
];

const aiContextFields = {
  chatbot: [
    { label: "What should this AI bot do?", id: "aiGoal", type: "textarea", placeholder: "Answer FAQs, book appointments, qualify leads..." },
    { label: "When should it transfer to a human?", id: "handoffRule", type: "text", placeholder: "Angry users, payment issues..." }
  ],
  gmail: [
    { label: "Email Tone", id: "emailTone", type: "select", options: ["Formal", "Friendly", "Persuasive"] },
    { label: "Sample Email (Template)", id: "sampleEmail", type: "textarea" }
  ],
  excel: [
    { label: "Data Source Link", id: "dataSourceLink", type: "text" }
  ],
  automation: [
    { label: "Existing Tools", id: "existingTools", type: "text", placeholder: "GHL, Zapier, Sheets..." }
  ]
};


// PRODUCT SPECIFIC FIELDS
const productFields = {

  chatbot: {
    basic: [
      { label: "Chatbot Purpose", id: "botPurpose", type: "select", options: ["Lead Generation", "Customer Support", "Booking Automation", "Sales", "General"] },
      { label: "Website URL", id: "websiteURL", type: "text" },
      { label: "Languages Needed", id: "languages", type: "select", options: ["English", "Urdu", "Spanish", "Arabic", "Chinese"] }
    ],

    standard: [
      { label: "Integrations Needed", id: "integrations", type: "select", options: ["Booking API", "CRM", "Payment Gateway", "Custom API"] },
      { label: "Brand Style", id: "branding", type: "select", options: ["Minimal", "Corporate", "Modern", "Colorful"] },
      { label: "Website URL", id: "websiteURL", type: "text" }
    ],

    premium: [
      { label: "AI Training Materials (Links)", id: "trainingLink", type: "text" },
      { label: "Voice Support", id: "voiceSupport", type: "select", options: ["Yes", "No"] },
      { label: "Workflow Complexity", id: "workflow", type: "select", options: ["Basic", "Medium", "Advanced", "Enterprise"] }
    ]
  },

  gmail: {
    basic: [
      { label: "Email Type", id: "emailType", type: "select", options: ["Cold Email", "Follow-up", "Nurturing", "Sales"] },
      { label: "Target Audience", id: "targetAudience", type: "text" }
    ],

    standard: [
      { label: "Sequence Length", id: "seqLength", type: "number", options: ["3 Emails", "5 Emails", "7 Emails", "Custom"] },
      { label: "CRM Used", id: "crm", type: "select", options: ["GoHighLevel", "HubSpot", "Zoho", "None"] }
    ],

    premium: [
      { label: "Personalization Data Source", id: "dataSource", type: "select", options: ["Google Sheet", "CRM", "API", "Manual"] },
      { label: "Reporting Frequency", id: "reportFreq", type: "select", options: ["Daily", "Weekly", "Monthly"] }
    ]
  },

  excel: {
    basic: [
      { label: "Sheet Type", id: "sheetType", type: "select", options: ["Expense Sheet", "Employee Sheet", "Sales Report", "Inventory Sheet"] },
      { label: "Number of Sheets", id: "sheetCount", type: "number" }
    ],

    standard: [
      { label: "Custom Formulas Required", id: "formulas", type: "select", options: ["SUM", "AVERAGE", "LOOKUP", "Pivot Table", "Custom"] },
      { label: "API Data Import Needed?", id: "apiImport", type: "select", options: ["Yes", "No"] }
    ],

    premium: [
      { label: "Dashboard Style", id: "dashboard", type: "select", options: ["Minimal", "Corporate", "Colorful", "Professional"] },
      { label: "Predictive Analytics?", id: "prediction", type: "select", options: ["Yes", "No"] }
    ]
  },

  automation: {
    basic: [
      { label: "Automation Type", id: "automationType", type: "select", options: ["Reminder", "Welcome Flow", "Lead Nurture", "Follow Up"] },
      { label: "Audience Size", id: "audienceSize", type: "number" }
    ],

    standard: [
      { label: "Channels Needed", id: "channels", type: "select", options: ["Email", "SMS", "WhatsApp", "All"] },
      { label: "Trigger Types", id: "triggers", type: "select", options: ["New Lead", "Form Filled", "Order Placed", "Abandoned Cart"] }
    ],

    premium: [
      { label: "AI Personalization Level", id: "aiLevel", type: "select", options: ["Low", "Medium", "High", "Enterprise"] },
      { label: "Custom Rules", id: "rules", type: "text" }
    ]
  }
};


// Generate input fields (same as your code)
function generateInput(field) {
  const wrapper = document.createElement("div");
  wrapper.className = "mb-3";

  if (field.type === "select") {
    wrapper.innerHTML = `
      <label>${field.label}</label>
      <select id="${field.id}">
        <option disabled selected>Select</option>
        ${field.options.map(o => `<option>${o}</option>`).join("")}
      </select>
    `;
  } else if (field.type === "textarea") {
    wrapper.innerHTML = `
      <label>${field.label}</label>
      <textarea id="${field.id}" rows="3" placeholder="${field.placeholder || ""}"></textarea>
    `;
  } else {
    wrapper.innerHTML = `<label>${field.label}</label>
      <input type="${field.type}" id="${field.id}" placeholder="${field.placeholder || ""}">`;
  }

  return wrapper;
}

// Modal form setup (same as your code)
function protectedWebsiteModal(product, tier) {
  setProductTier(product, tier); // set global product/tier on modal open
  const form = document.getElementById("productForm");
  form.innerHTML = "";

  universalGroups.forEach(group => {
    const heading = document.createElement("h6");
    heading.textContent = group.title;
    heading.className = "fw-bold mt-3";
    form.appendChild(heading);
    group.fields.forEach(f => form.appendChild(generateInput(f)));
  });

  const productHeading = document.createElement("h6");
  productHeading.textContent = "Product Requirements";
  productHeading.className = "fw-bold mt-4";
  form.appendChild(productHeading);
  productFields[product][tier].forEach(field => form.appendChild(generateInput(field)));

  if (aiContextFields[product]) {
    const aiHeading = document.createElement("h6");
    aiHeading.textContent = "AI Instructions";
    aiHeading.className = "fw-bold mt-4";
    form.appendChild(aiHeading);
    aiContextFields[product].forEach(field => form.appendChild(generateInput(field)));
  }

  // form.insertAdjacentHTML("beforeend", `
  //   <label class="fw-bold mt-3">Upload Business Docs (Optional)</label>
  //   <input type="file" id="businessDocs" accept=".pdf,.doc,.docx,.txt">
  // `);

  form.insertAdjacentHTML("beforeend", `
    <label class="fw-bold mt-3" for="additionalDetails">Brief Explanation</label>
    <textarea id="additionalDetails" class="form-control" rows="3" placeholder="Provide a short summary of your expectations so the AI agent can be built to suit your needs."></textarea>
  `);

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

// FORM SUBMIT WITH FILE ATTACHMENT + VALIDATION
document.getElementById("productForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // ================= VALIDATION =================
  if (!validateForm()) return; // Agar validation fail, form submit nahi hoga

  // ================= FILE ATTACHMENT =================
  const fileInput = document.getElementById("businessDocs");
  let fileAttachment = null;

  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      fileAttachment = event.target.result.split(",")[1]; // Base64
      sendEmail(fileAttachment);
    };
    reader.readAsDataURL(file);
  } else {
    sendEmail(null);
  }

  // ================= SEND EMAIL =================
function sendEmail(attachment) {
  const params = {
    product: selectedProduct,
    tier: selectedTier,
    fullName: document.getElementById("fullName")?.value || "",
    businessName: document.getElementById("businessName")?.value || "",
    businessEmail: document.getElementById("businessEmail")?.value || "",
    phone: document.getElementById("phone")?.value || "",
    category: document.getElementById("category")?.value || "",
    preferredPlatform: document.getElementById("preferredPlatform")?.value || "",
    productRequirements: collectProductFields(),
    aiInstructions: collectAIFields(),
    additionalDetails: document.getElementById("additionalDetails")?.value || "",
    attachment: attachment
  };

  emailjs.send("service_eexjjk6", "template_zkz61o4", params)
    .then(() => {
      // Optional success message
      alert("Form submitted successfully! - We'll get in touch when we need any other information.");

      // Redirect to aiagents.html
      window.location.href = "aiagents.html";
    })
    .catch(err => {
      console.error(err);
      alert("Email failed. Please try again.");
    });
}
});


function collectProductFields() {
  const fields = productFields[selectedProduct][selectedTier];
  return fields.map(f => `${f.label}: ${document.getElementById(f.id)?.value || ''}`).join('\n');
}

function collectAIFields() {
  if (!aiContextFields[selectedProduct]) return '';
  return aiContextFields[selectedProduct].map(f => `${f.label}: ${document.getElementById(f.id)?.value || ''}`).join('\n');
}


function validateForm() {
  let isValid = true;

  // UNIVERSAL FIELDS
  const name = document.getElementById("fullName")?.value.trim();
  const businessName = document.getElementById("businessName")?.value.trim();
  const businessEmail = document.getElementById("businessEmail")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const category = document.getElementById("category")?.value.trim();
  const platform = document.getElementById("preferredPlatform")?.value.trim();
  const additionalDetails = document.getElementById("additionalDetails")?.value.trim();

  if (!name || !businessName || !businessEmail || !phone || !category || !platform || !additionalDetails) {
    alert("Please fill out all required fields.");
    return false;
  }

  // NAME VALIDATION
  if (name.length < 3) {
    alert("Full Name must be at least 3 characters.");
    return false;
  }
  const namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(name)) {
    alert("Full Name can only contain letters and spaces.");
    return false;
  }

  // BUSINESS NAME VALIDATION
  if (businessName.length < 3) {
    alert("Business Name must be at least 3 characters.");
    return false;
  }
  if (!namePattern.test(businessName)) {
    alert("Business Name can only contain letters and spaces.");
    return false;
  }

  // EMAIL VALIDATION
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(businessEmail)) {
    alert("Please enter a valid email like: example@gmail.com");
    return false;
  }

  // PHONE VALIDATION
  const phonePattern = /^[0-9]+$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number can only contain digits.");
    return false;
  }
  if (phone.length < 10) {
    alert("Phone number must be at least 10 digits.");
    return false;
  }

  // CATEGORY / PLATFORM VALIDATION
  const textPattern = /^[A-Za-z\s]+$/;
  if (!textPattern.test(category)) {
    alert("Business Category can only contain letters and spaces.");
    return false;
  }
  if (!textPattern.test(platform)) {
    alert("Preferred Platform can only contain letters and spaces.");
    return false;
  }

  // ADDITIONAL DETAILS MIN LENGTH
  if (additionalDetails.length < 10) {
    alert("Brief Explanation must be at least 10 characters.");
    return false;
  }

  // PRODUCT-SPECIFIC FIELDS
  const prodFields = productFields[selectedProduct][selectedTier];
  for (let f of prodFields) {
    const val = document.getElementById(f.id)?.value.trim();
    if (!val) {
      alert(`${f.label} is required.`);
      return false;
    }
    // optional: min length 2 for text fields
    if (f.type === "text" && val.length < 2) {
      alert(`${f.label} must be at least 2 characters.`);
      return false;
    }
  }

  // AI FIELDS
  const aiFields = aiContextFields[selectedProduct] || [];
  for (let f of aiFields) {
    const val = document.getElementById(f.id)?.value.trim();
    if (!val) {
      alert(`${f.label} is required.`);
      return false;
    }
    if (f.type === "text" && val.length < 2) {
      alert(`${f.label} must be at least 2 characters.`);
      return false;
    }
  }

  return true; // all validations passed
}



// =========== Payment Methods =========== //

// document.getElementById("paymentMethod").addEventListener("change", e => {
//   const val = e.target.value;
//   const box = document.getElementById("paymentDetails");

//   if (val === "stripe") {
//     box.innerHTML = `
//       <label class="form-label">Card Number</label>
//       <input class="form-control mb-2" type="text">
//       <label class="form-label">Expiry Date</label>
//       <input class="form-control mb-2" type="text" placeholder="MM/YY">
//       <label class="form-label">CVV</label>
//       <input class="form-control" type="number">
//     `;
//   } else if (val === "paypal") {
//     box.innerHTML = `<p class="text-muted">You will be redirected to PayPal.</p>`;
//   } else if (val === "payoneer") {
//     box.innerHTML = `<p class="text-muted">Payoneer Email: your@email.com</p>`;
//   } else if (val === "nayapay") {
//     box.innerHTML = `<p class="text-muted">NayaPay ID: your-nayapay-id</p>`;
//   } else {
//     box.innerHTML = "";
//   }
// });

