'use strict';

// Element toggle function
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar toggle functionality
document.querySelector("[data-sidebar-btn]").addEventListener("click", function () {
  elementToggleFunc(document.querySelector("[data-sidebar]"));
});

// Testimonials modal functionality
const testimonialsModalFunc = () => {
  document.querySelector("[data-modal-container]").classList.toggle("active");
  document.querySelector("[data-overlay]").classList.toggle("active");
};

document.querySelectorAll("[data-testimonials-item]").forEach(item => {
  item.addEventListener("click", function () {
    document.querySelector("[data-modal-img]").src = this.querySelector("[data-testimonials-avatar]").src;
    document.querySelector("[data-modal-title]").innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    document.querySelector("[data-modal-text]").innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

document.querySelector("[data-modal-close-btn]").addEventListener("click", testimonialsModalFunc);
document.querySelector("[data-overlay]").addEventListener("click", testimonialsModalFunc);

// Filter functionality
const filterFunc = (selectedValue) => {
  document.querySelectorAll("[data-filter-item]").forEach(item => {
    item.classList.toggle("active", selectedValue === "all" || selectedValue === item.dataset.category);
  });
};

document.querySelector("[data-select]").addEventListener("click", function () {
  elementToggleFunc(this);
});

document.querySelectorAll("[data-select-item]").forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    document.querySelector("[data-selecct-value]").innerText = this.innerText;
    elementToggleFunc(document.querySelector("[data-select]"));
    filterFunc(selectedValue);
  });
});


function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Filter buttons for large screens
let lastClickedBtn = document.querySelectorAll("[data-filter-btn]")[0];

document.querySelectorAll("[data-filter-btn]").forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    document.querySelector("[data-selecct-value]").innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// Contact form validation
const formBtn = document.querySelector("[data-form-btn]");

document.querySelectorAll("[data-form-input]").forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});


// Contact Form Handling
const form = document.getElementById('contact-form');
const successMessage = document.querySelector('.success-message');
const errorMessage = document.querySelector('.error-message');

async function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      form.reset();
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error:', error);
    successMessage.style.display = 'none';
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 3000);
  }
}

form.addEventListener('submit', handleSubmit);

// Update the existing page navigation code
document.querySelectorAll("[data-nav-link]").forEach(link => {
  link.addEventListener("click", function() {
    // Remove active class from all nav links and pages
    document.querySelectorAll("[data-nav-link], [data-page]").forEach(el => {
      el.classList.remove("active");
    });
    
    // Get the target page from data-nav-link
    const targetPage = this.textContent.trim().toLowerCase();
    
    // Add active class to clicked nav link and corresponding page
    this.classList.add("active");
    document.querySelector(`[data-page="${targetPage}"]`).classList.add("active");
    
    window.scrollTo(0, 0);
  });
});


// Portfolio modal functionality
const portfolioModal = document.querySelector("[data-portfolio-modal]");
const portfolioModalImg = document.querySelector("[data-portfolio-modal-img]");
const portfolioModalTitle = document.querySelector("[data-portfolio-modal-title]");
const portfolioModalDescription = document.querySelector("[data-portfolio-modal-text]");
const portfolioModalTechStack = document.querySelector("[data-portfolio-modal-tech]");
const portfolioModalLinksContainer = document.querySelector("[data-portfolio-modal-links]");
const portfolioModalClose = document.querySelector("[data-portfolio-modal-close]");

// Function to open portfolio modal
document.querySelectorAll(".open-portfolio-modal").forEach(project => {
  project.addEventListener("click", function (event) {
    event.preventDefault();
    
    const projectItem = this.closest(".project-item");
    
    // Populate modal content
    portfolioModalImg.src = projectItem.querySelector("img").src;
    portfolioModalTitle.innerText = projectItem.querySelector(".project-title").innerText;
    portfolioModalDescription.innerText = projectItem.getAttribute("data-description") || "No description available.";
    portfolioModalTechStack.innerHTML = `<strong>Tech Stack:</strong> ${projectItem.getAttribute("data-tech") || "Not specified"}`;

    // Set links
    portfolioModalLinksContainer.innerHTML = "";
    if (projectItem.getAttribute("data-visit")) {
      portfolioModalLinksContainer.innerHTML += `<a href="${projectItem.getAttribute("data-visit")}" target="_blank" class="modal-link">Live Demo</a>`;
    }
    if (projectItem.getAttribute("data-github")) {
      portfolioModalLinksContainer.innerHTML += `<a href="${projectItem.getAttribute("data-github")}" target="_blank" class="modal-link">GitHub</a>`;
    }

    // Open modal
    portfolioModal.classList.add("active");
  });
});

// Function to close portfolio modal
function closePortfolioModal() {
  portfolioModal.classList.remove("active");
}

// Close modal on button click
portfolioModalClose.addEventListener("click", closePortfolioModal);

// Close modal when clicking outside modal content
portfolioModal.addEventListener("click", (event) => {
  if (!event.target.closest(".modal-content2")) {
    closePortfolioModal();
  }
});

// Function to truncate text for preview
function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// When loading blogs, make sure only the preview shows short text
document.querySelectorAll(".blog-preview p").forEach((preview) => {
  preview.innerText = truncateText(preview.innerText, 150); // Adjust length as needed
});



document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".blog-post-item .blog-text").forEach((element) => {
    let maxLength = 150; // Character limit for preview
    let fullText = element.innerText.trim(); // Store full text
    if (fullText.length > maxLength) {
      element.setAttribute("data-full-text", fullText); // Save full text in attribute
      element.innerText = fullText.substring(0, maxLength) + "..."; // Display truncated text
    }
  });
});


function openModal(blogItem) {
  // Get elements
  const imgSrc = blogItem.querySelector(".blog-banner-box img").src;
  const title = blogItem.querySelector(".blog-item-title").innerText;
  const date = blogItem.querySelector(".blog-meta time").innerText;
  
  // Ensure we're getting the full text correctly
  const textElement = blogItem.querySelector(".blog-text");
  const fullText = textElement.hasAttribute("data-full-text") 
    ? textElement.getAttribute("data-full-text") 
    : textElement.innerText;

  // Populate modal
  document.getElementById("modalImg").src = imgSrc;
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDate").innerText = date;
  document.getElementById("modalFullText").innerText = fullText; // Ensure full text is used

  // Show modal
  document.getElementById("blogModal").style.display = "flex";
}


function closeModal() {
  document.getElementById("blogModal").style.display = "none";
}


// Ensure JavaScript runs after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const blogModal = document.getElementById("blogModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDate = document.getElementById("modalDate");
  const modalFullText = document.getElementById("modalFullText");
  const closeButton = document.querySelector(".modal .close");

  // Function to open modal
  window.openModal = function (blogItem) {
    const imgSrc = blogItem.querySelector(".blog-banner-box img").src;
    const title = blogItem.querySelector(".blog-item-title").textContent;
    const date = blogItem.querySelector("time").textContent;
    const fullText = blogItem.querySelector(".blog-text").textContent;

    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDate.textContent = date;
    modalFullText.textContent = fullText;

    blogModal.style.display = "block"; // Show modal
  };

  // Function to close modal
  function closeModal() {
    blogModal.style.display = "none";
  }

  // Close modal when clicking the close button
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside modal content
  window.addEventListener("click", function (event) {
    if (event.target === blogModal) {
      closeModal();
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal");
  const closeModal = document.querySelector(".close");
  
  // Ensure the modal is hidden on page load
  if (modal) {
    modal.style.display = "none";
  }

  // Assuming you have a trigger button (modify as needed)
  const openModalBtn = document.querySelector(".open-modal-btn");
  
  if (openModalBtn) {
    openModalBtn.addEventListener("click", function () {
      modal.style.display = "flex"; // Show modal when button is clicked
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", function () {
      modal.style.display = "none"; // Hide modal on close button click
    });
  }
});

// Blog Modal Functionality
const blogModal = document.createElement('div');
blogModal.className = 'modal-container';
blogModal.innerHTML = `
  <div class="overlay" data-overlay></div>
  <section class="testimonials-modal blog-modal">
    <button class="modal-close-btn" data-blog-close>
      <ion-icon name="close-outline"></ion-icon>
    </button>
    <div class="blog-modal-img-container">
      <img src="" alt="Blog image" class="blog-modal-img">
    </div>
    <div class="blog-modal-content">
      <p class="blog-category"></p>
      <time class="blog-modal-date"></time>
      <h3 class="h3 modal-title"></h3>
      <div class="blog-modal-text"></div>
      <div class="blog-modal-button-container"></div>
    </div>
  </section>
`;
document.body.appendChild(blogModal);

// Dynamic height adjustment
function adjustModalContentHeight() {
  const modalContent = document.querySelector('.blog-modal-content');
  const modalImage = document.querySelector('.blog-modal-img-container');
  
  if (window.innerWidth > 768) {
    modalContent.style.minHeight = `${modalImage.offsetHeight}px`;
  } else {
    modalContent.style.minHeight = 'auto';
  }
}

// Open modal
document.querySelectorAll('.blog-post-item').forEach(blogItem => {
  blogItem.addEventListener('click', function() {
    const imgSrc = this.querySelector('img').src;
    const title = this.querySelector('.blog-item-title').textContent;
    const date = this.querySelector('time').textContent;
    const content = this.querySelector('.blog-text').innerHTML;
    const linkedinUrl = this.dataset.linkedin || '';

    blogModal.querySelector('.blog-modal-img').src = imgSrc;
    blogModal.querySelector('.modal-title').textContent = title;
    blogModal.querySelector('.blog-modal-date').textContent = date;
    blogModal.querySelector('.blog-modal-text').innerHTML = content;

    const buttonContainer = blogModal.querySelector('.blog-modal-button-container');
    buttonContainer.innerHTML = linkedinUrl ? 
      `<a href="${linkedinUrl}" target="_blank" class="blog-modal-button">View LinkedIn Post</a>` : 
      '';

    document.querySelector('.overlay').classList.add('active');
    blogModal.classList.add('active');
    
    setTimeout(() => {
      adjustModalContentHeight();
      window.addEventListener('resize', adjustModalContentHeight);
    }, 100);
  });
});

// Close modal
function closeBlogModal() {
  document.querySelector('.overlay').classList.remove('active');
  blogModal.classList.remove('active');
  window.removeEventListener('resize', adjustModalContentHeight);
}

document.querySelector('[data-blog-close]').addEventListener('click', closeBlogModal);
document.querySelector('.overlay').addEventListener('click', closeBlogModal);