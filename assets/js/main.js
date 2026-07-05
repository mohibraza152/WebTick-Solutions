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


// ================== FeedBack Form =====================
const stars = document.querySelectorAll("#starRating i");   
const ratingInput = document.getElementById("fb_rating");
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

  // Get values from feedback form
  const name = feedbackForm.querySelector("#fb_name").value.trim();
  const email = feedbackForm.querySelector("#fb_email").value.trim();
  const rating = feedbackForm.querySelector("#fb_rating").value;
  const message = feedbackForm.querySelector("#fb_message").value.trim();

  // Required fields check
  if (!name || !email || !rating || !message) {
    alert("Please fill out all required fields.");
    return;
  }

  // Name validation
  if (name.length < 3) { 
    alert("Name must be at least 3 characters."); 
    return; 
  }
  const namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(name)) { 
    alert("Name can only contain letters and spaces."); 
    return; 
  }

  // Email validation
  const emailRegex = /^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) { 
    alert("Please enter a valid email like: example@gmail.com"); 
    return; 
  }

  // Prepare data for EmailJS
  const starsVisual = '⭐'.repeat(parseInt(rating));
  const params = { 
    name, 
    email, 
    rating: starsVisual, 
    message 
  };

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

// ================== Website Modal ==================
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
  protectedOpenWebsiteModal(); 
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

  
  document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
      const checkbox = form.querySelector(".policy-checkbox");
      if (checkbox && !checkbox.checked) {
        e.preventDefault();
        alert("Please agree to the Privacy Policy and Terms before continuing.");
      }
    });
  });
});