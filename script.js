// ========================================
// EXISTING CODE - TASK 5: Display Current Date and Time
// ========================================
// Author: Chingiz
$(document).ready(function(){
    console.log("jQuery is ready!");
});

function updateDateTime() {
  const now = new Date();
  
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };
  
  const formattedDate = now.toLocaleString('en-US', options);
  
  const dateTimeElement = document.getElementById('current-datetime');
  if (dateTimeElement) {
    dateTimeElement.textContent = formattedDate;
  }
}

if (document.getElementById('current-datetime')) {
  updateDateTime();
  setInterval(updateDateTime, 1000);
}

// ========================================
// EXISTING CODE - TASK 4: Change Background Color
// ========================================
// Author: Chingiz
function changeBackgroundColor() {
  const colors = [
    '#f5f5f0',
    '#e8f4f8',
    '#fff5e6',
    '#f0e6ff',
    '#e6ffe6',
    '#ffe6f0',
    '#fff9e6'
  ];
  
  const currentColor = document.body.style.backgroundColor || '#f5f5f0';
  let newColor;
  
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === currentColor);
  
  document.body.style.backgroundColor = newColor;
  document.body.style.transition = 'background-color 0.5s ease';
}

const bgButton = document.getElementById('bg-color-btn');
if (bgButton) {
  bgButton.addEventListener('click', changeBackgroundColor);
}

// ========================================
// EXISTING CODE - TASK 1: Form Validation
// ========================================
// Author: Sultan
function validateReservationForm(event) {
  event.preventDefault();
  
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => el.remove());
  
  let isValid = true;
  
  const name = document.getElementById('guest-name');
  const email = document.getElementById('guest-email');
  const phone = document.getElementById('guest-phone');
  const partySize = document.getElementById('party-size');
  const date = document.getElementById('reservation-date');
  const time = document.getElementById('reservation-time');
  
  if (!name.value.trim() || name.value.trim().length < 2) {
    showError(name, 'Name must be at least 2 characters long');
    isValid = false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailRegex.test(email.value)) {
    showError(email, 'Please enter a valid email address');
    isValid = false;
  }
  
  const phoneRegex = /^\d{10,}$/;
  const phoneDigits = phone.value.replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 10) {
    showError(phone, 'Phone number must be at least 10 digits');
    isValid = false;
  }
  
  if (!partySize.value) {
    showError(partySize, 'Please select party size');
    isValid = false;
  }
  
  if (!date.value) {
    showError(date, 'Please select a date');
    isValid = false;
  } else {
    const selectedDate = new Date(date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError(date, 'Date cannot be in the past');
      isValid = false;
    }
  }
  
  if (!time.value) {
    showError(time, 'Please select a time');
    isValid = false;
  }
  
  if (isValid) {
    playSound('success');
    alert('Reservation submitted successfully! We will contact you shortly to confirm.');
    event.target.reset();
  }
}

function showError(inputElement, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#d32f2f';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '5px';
  errorDiv.textContent = message;
  
  inputElement.style.borderColor = '#d32f2f';
  inputElement.parentElement.appendChild(errorDiv);
  
  inputElement.addEventListener('input', function() {
    inputElement.style.borderColor = '';
    const error = inputElement.parentElement.querySelector('.error-message');
    if (error) error.remove();
  }, { once: true });
}

const reservationForm = document.querySelector('#booking-header + .about-content + .contact-form');
if (reservationForm) {
  reservationForm.addEventListener('submit', validateReservationForm);
}

// ========================================
// EXISTING CODE - TASK 2: Accordion for FAQs
// ========================================
// Author: Kaisar
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-content').style.maxHeight = null;
      });
      
      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        playSound('click');
      }
    });
  });
}

if (document.querySelector('.accordion-item')) {
  initAccordion();
}

// ========================================
// EXISTING CODE - TASK 3: Popup Subscription Form
// ========================================
// Author: Kaisar
function openPopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    playSound('open');
  }
}

function closePopup() {
  const popup = document.getElementById('subscription-popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function handleSubscription(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('popup-email');
  const email = emailInput.value.trim();
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  playSound('success');
  alert('Thank you for subscribing! You will receive our newsletter soon.');
  emailInput.value = '';
  closePopup();
}

const subscribeBtn = document.getElementById('subscribe-btn');
const closeBtn = document.getElementById('close-popup');
const popupOverlay = document.getElementById('subscription-popup');
const popupForm = document.getElementById('subscription-form');

if (subscribeBtn) {
  subscribeBtn.addEventListener('click', openPopup);
}

if (closeBtn) {
  closeBtn.addEventListener('click', closePopup);
}

if (popupOverlay) {
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });
}

if (popupForm) {
  popupForm.addEventListener('submit', handleSubscription);
}

// ========================================
// NEW FEATURE 1: Day/Night Theme Toggle
// Assignment Requirement: Dynamic Style Changes
// Author: Sultan
// ========================================
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById('theme-toggle-btn');
  
  body.classList.toggle('night-theme');
  
  if (body.classList.contains('night-theme')) {
    themeBtn.innerHTML = '☀️ Day Mode';
  } else {
    themeBtn.innerHTML = '🌙 Night Mode';
  }
  
  playSound('click');
}

const themeToggleBtn = document.getElementById('theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

// ========================================
// NEW FEATURE 2: Star Rating System
// Assignment Requirement: Manipulating Attributes
// Author: Sultan
// ========================================
function initRatingSystem() {
  const ratingContainers = document.querySelectorAll('.rating-container');
  
  ratingContainers.forEach(container => {
    const stars = container.querySelectorAll('.star');
    const ratingText = container.querySelector('.rating-text');
    
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach(s => {
          s.classList.remove('selected');
          s.style.color = '#ddd';
        });
        
        for (let i = 0; i <= index; i++) {
          stars[i].classList.add('selected');
          stars[i].style.color = '#FFD700';
        }
        
        if (ratingText) {
          ratingText.textContent = `Your rating: ${index + 1}/5 stars`;
        }
        
        playSound('click');
      });
      
      star.addEventListener('mouseenter', () => {
        for (let i = 0; i <= index; i++) {
          if (!stars[i].classList.contains('selected')) {
            stars[i].style.color = '#FFD700';
          }
        }
      });
      
      star.addEventListener('mouseleave', () => {
        stars.forEach((s, i) => {
          if (!s.classList.contains('selected')) {
            s.style.color = '#ddd';
          }
        });
      });
    });
  });
}

if (document.querySelector('.rating-container')) {
  initRatingSystem();
}

// ========================================
// NEW FEATURE 3: Keyboard Navigation
// Assignment Requirement: Keyboard Event Handling
// Author: Chingiz
// ========================================
function initKeyboardNavigation() {
  const navLinks = document.querySelectorAll('.navigation a');
  let currentIndex = 0;
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % navLinks.length;
      navLinks[currentIndex].focus();
      navLinks[currentIndex].style.outline = '2px solid #8B4513';
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
      navLinks[currentIndex].focus();
      navLinks[currentIndex].style.outline = '2px solid #8B4513';
    } else if (e.key === 'Enter' && document.activeElement.tagName === 'A') {
      e.preventDefault();
      document.activeElement.click();
    }
  });
  
  navLinks.forEach((link, index) => {
    link.addEventListener('blur', () => {
      link.style.outline = 'none';
    });
  });
}

initKeyboardNavigation();

// ========================================
// NEW FEATURE 4: Language Selector with Switch
// Assignment Requirement: Switch Statements
// Author: Kaisar
// ========================================
const translations = {
  en: {
    welcome: 'Welcome to Divine Dining',
    menu: 'Menu',
    about: 'About Us',
    contact: 'Contact',
    reserve: 'Reservations'
  },
  ru: {
    welcome: 'Добро пожаловать в Божественную Трапезу',
    menu: 'Меню',
    about: 'О нас',
    contact: 'Контакты',
    reserve: 'Бронирование'
  },
  kz: {
    welcome: 'Құдайдың Үштігіне қош келдіңіз',
    menu: 'Мәзір',
    about: 'Біз туралы',
    contact: 'Байланыс',
    reserve: 'Брондау'
  }
};

function changeLanguage(lang) {
  switch(lang) {
    case 'en':
      updatePageLanguage(translations.en);
      playSound('click');
      break;
    case 'ru':
      updatePageLanguage(translations.ru);
      playSound('click');
      break;
    case 'kz':
      updatePageLanguage(translations.kz);
      playSound('click');
      break;
    default:
      console.log('Language not supported');
  }
}

function updatePageLanguage(trans) {
  const welcomeEl = document.querySelector('.banner-text h2');
  if (welcomeEl) welcomeEl.textContent = trans.welcome;
}

const langSelector = document.getElementById('language-selector');
if (langSelector) {
  langSelector.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
  });
}

// ========================================
// NEW FEATURE 5: Load More Content
// Assignment Requirement: Event Listeners on Buttons
// Author: Chingiz
// ========================================
const additionalMenuItems = [
  { name: 'Divine Pizza', desc: 'Wood-fired pizza with holy toppings', price: '$15.99' },
  { name: 'Sacred Salad', desc: 'Fresh garden salad with divine dressing', price: '$9.99' },
  { name: 'Blessed Soup', desc: 'Hearty soup made with love', price: '$7.50' }
];

function loadMoreMenuItems() {
  const menuSection = document.querySelector('.menu-section');
  if (!menuSection) return;
  
  additionalMenuItems.forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.className = 'menu-item';
    menuItem.innerHTML = `
      <div>
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      </div>
      <span class="price">${item.price}</span>
    `;
    menuItem.style.opacity = '0';
    menuItem.style.transform = 'translateY(20px)';
    menuSection.appendChild(menuItem);
    
    setTimeout(() => {
      menuItem.style.transition = 'all 0.5s ease';
      menuItem.style.opacity = '1';
      menuItem.style.transform = 'translateY(0)';
    }, 100);
  });
  
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = 'none';
  }
  
  playSound('success');
}

const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', loadMoreMenuItems);
}

// ========================================
// NEW FEATURE 6: Greeting Based on Time
// Assignment Requirement: Switch Statements
// Author: Sultan
// ========================================
function displayTimeBasedGreeting() {
  const greetingElement = document.getElementById('time-greeting');
  if (!greetingElement) return;
  
  const hour = new Date().getHours();
  let greeting;
  let timeOfDay;
  
  if (hour >= 5 && hour < 12) {
    timeOfDay = 'morning';
  } else if (hour >= 12 && hour < 17) {
    timeOfDay = 'afternoon';
  } else if (hour >= 17 && hour < 22) {
    timeOfDay = 'evening';
  } else {
    timeOfDay = 'night';
  }
  
  switch(timeOfDay) {
    case 'morning':
      greeting = '🌅 Good Morning! Start your day with our divine breakfast';
      greetingElement.style.background = 'linear-gradient(135deg, #FFE4B5, #FFF8DC)';
      break;
    case 'afternoon':
      greeting = '☀️ Good Afternoon! Join us for a delightful lunch';
      greetingElement.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
      break;
    case 'evening':
      greeting = '🌆 Good Evening! Perfect time for dinner';
      greetingElement.style.background = 'linear-gradient(135deg, #FF8C00, #FF6347)';
      break;
    case 'night':
      greeting = '🌙 Good Night! We hope to see you tomorrow';
      greetingElement.style.background = 'linear-gradient(135deg, #4B0082, #8B008B)';
      greetingElement.style.color = '#fff';
      break;
    default:
      greeting = 'Welcome to our restaurant!';
  }
  
  greetingElement.textContent = greeting;
}

if (document.getElementById('time-greeting')) {
  displayTimeBasedGreeting();
  setInterval(displayTimeBasedGreeting, 60000);
}

// ========================================
// NEW FEATURE 7: Objects and Methods
// Assignment Requirement: Objects and Methods
// Author: Kaisar
// ========================================
const restaurant = {
  name: 'God loves the Trinity',
  location: '123 Divine Street',
  capacity: 50,
  currentGuests: 0,
  
  addGuest: function(number) {
    if (this.currentGuests + number <= this.capacity) {
      this.currentGuests += number;
      this.updateDisplay();
      return true;
    }
    return false;
  },
  
  removeGuest: function(number) {
    this.currentGuests = Math.max(0, this.currentGuests - number);
    this.updateDisplay();
  },
  
  updateDisplay: function() {
    const displayElement = document.getElementById('capacity-display');
    if (displayElement) {
      displayElement.textContent = `Current Guests: ${this.currentGuests}/${this.capacity}`;
      
      const percentage = (this.currentGuests / this.capacity) * 100;
      if (percentage >= 80) {
        displayElement.style.color = '#d32f2f';
      } else if (percentage >= 50) {
        displayElement.style.color = '#ff9800';
      } else {
        displayElement.style.color = '#4caf50';
      }
    }
  },
  
  getInfo: function() {
    return `${this.name} located at ${this.location}. Capacity: ${this.capacity} guests.`;
  }
};

const addGuestBtn = document.getElementById('add-guest-btn');
const removeGuestBtn = document.getElementById('remove-guest-btn');

if (addGuestBtn) {
  addGuestBtn.addEventListener('click', () => {
    if (restaurant.addGuest(1)) {
      playSound('success');
    } else {
      alert('Restaurant is at full capacity!');
      playSound('error');
    }
  });
}

if (removeGuestBtn) {
  removeGuestBtn.addEventListener('click', () => {
    restaurant.removeGuest(1);
    playSound('click');
  });
}

// ========================================
// NEW FEATURE 8: Higher-Order Functions
// Assignment Requirement: map, filter, forEach
// Author: Chingiz
// ========================================
const menuItems = [
  { name: 'Sacred Bruschetta', price: 8.99, category: 'appetizer', vegetarian: true },
  { name: 'Trinity Pasta', price: 16.99, category: 'main', vegetarian: true },
  { name: 'Blessed Burger', price: 14.50, category: 'main', vegetarian: false },
  { name: 'Heavenly Salmon', price: 19.75, category: 'main', vegetarian: false },
  { name: 'Angel Food Cake', price: 6.99, category: 'dessert', vegetarian: true }
];

function filterMenuByCategory(category) {
  const filtered = menuItems.filter(item => item.category === category);
  displayFilteredMenu(filtered);
}

function filterVegetarian() {
  const filtered = menuItems.filter(item => item.vegetarian === true);
  displayFilteredMenu(filtered);
}

function displayFilteredMenu(items) {
  const container = document.getElementById('filtered-menu');
  if (!container) return;
  
  container.innerHTML = '';
  
  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'filtered-menu-item';
    itemDiv.innerHTML = `
      <strong>${item.name}</strong> - $${item.price.toFixed(2)}
      ${item.vegetarian ? '🌱' : ''}
    `;
    container.appendChild(itemDiv);
  });
  
  playSound('click');
}

function applyDiscount(percentage) {
  const discounted = menuItems.map(item => ({
    ...item,
    originalPrice: item.price,
    price: item.price * (1 - percentage / 100)
  }));
  
  return discounted;
}

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    if (category === 'vegetarian') {
      filterVegetarian();
    } else {
      filterMenuByCategory(category);
    }
  });
});

// ========================================
// NEW FEATURE 9: Sound Effects
// Assignment Requirement: Play Sounds
// Author: Sultan
// ========================================
const sounds = {
  click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZTA4OVbXp5rJcFg1Ll+LzxW8lBzF+zPPdkTwIGmS76+mjUxEKQ5vj8rtoHQY2jtLz0n0vBSh7yfDdkz8KFly16OuwYBkLTZ3k88ZyJAc0g87z2I4+CRpkvO7omE0OD1K36+y2ZBoMTKXl9MJwJAc1idDz0X4yBSp+zPDblUEJF2G76+mjVBIMSp7i9L90JwcyhdDy1YU2Byh+0O/bmkUJGGO+7Oinoi0EM/0LkPZz9A=='),
  success: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZTA4OVbXp5rJcFg1Ll+LzxW8lBzF+zPPdkTwIGmS76+mjUxEKQ5vj8rtoHQY2jtLz0n0vBSh7yfDdkz8KFly16OuwYBkLTZ3k88ZyJAc0g87z2I4+CRpkvO7omE0OD1K36+y2ZBoMTKXl9MJwJAc1idDz0X4yBSp+zPDblUEJF2G76+mjVBIMSp7i9L90JwcyhdDy1YU2Byh+0O/bmkUJGGO+7Oinoi0EM/0LkPZz9A=='),
  error: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZTA4OVbXp5rJcFg1Ll+LzxW8lBzF+zPPdkTwIGmS76+mjUxEKQ5vj8rtoHQY2jtLz0n0vBSh7yfDdkz8KFly16OuwYBkLTZ3k88ZyJAc0g87z2I4+CRpkvO7omE0OD1K36+y2ZBoMTKXl9MJwJAc1idDz0X4yBSp+zPDblUEJF2G76+mjVBIMSp7i9L90JwcyhdDy1YU2Byh+0O/bmkUJGGO+7Oinoi0EM/0LkPZz9A=='),
  open: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZTA4OVbXp5rJcFg1Ll+LzxW8lBzF+zPPdkTwIGmS76+mjUxEKQ5vj8rtoHQY2jtLz0n0vBSh7yfDdkz8KFly16OuwYBkLTZ3k88ZyJAc0g87z2I4+CRpkvO7omE0OD1K36+y2ZBoMTKXl9MJwJAc1idDz0X4yBSp+zPDblUEJF2G76+mjVBIMSp7i9L90JwcyhdDy1YU2Byh+0O/bmkUJGGO+7Oinoi0EM/0LkPZz9A==')
};

function playSound(type) {
  if (sounds[type]) {
    sounds[type].currentTime = 0;
    sounds[type].volume = 0.3;
    sounds[type].play().catch(e => console.log('Audio play failed:', e));
  }
}

// ========================================
// NEW FEATURE 10: Animations on Scroll
// Assignment Requirement: Animations
// Author: Chingiz
// ========================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

initScrollAnimations();

// ========================================
// NEW FEATURE 11: Contact Form Submission
// Assignment Requirement: Responding to Events with Callbacks
// Author: Kaisar
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm && !contactForm.id) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Simulate async submission
    setTimeout(() => {
      playSound('success');
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }, 500);
  });
}

// ========================================
// Initialize all features on page load
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('All features initialized successfully!');
  
  // Initialize restaurant object display
  if (document.getElementById('capacity-display')) {
    restaurant.updateDisplay();
  }
});


  // === REAL-TIME SEARCH (Task 1) ===
$('#menu-search').on('keyup', function(){
  const q = $(this).val().toLowerCase().trim();
  $('#menu-list .menu-item').each(function(){
    const text = $(this).text().toLowerCase();
    $(this).toggle(text.indexOf(q) !== -1);
  });
});

// === AUTOCOMPLETE SUGGESTIONS (Task 2) ===
const suggestions = $('#menu-list .menu-item .title').map(function(){ return $(this).text(); }).get();

$('#menu-search').on('input', function(){
  const q = $(this).val().toLowerCase();
  if(!q){ $('#suggestions').hide(); return; }

  const matches = suggestions.filter(s => s.toLowerCase().indexOf(q) !== -1).slice(0,6);
  const html = matches.map(m => `<li class="sug-item">${m}</li>`).join('');
  $('#suggestions').html(html).show();
});

$(document).on('click', '.sug-item', function(){
  const val = $(this).text();
  $('#menu-search').val(val).trigger('keyup');
  $('#suggestions').hide();
});

$(document).on('click', function(e){
  if(!$(e.target).closest('#search-wrapper').length){
    $('#suggestions').hide();
  }
});

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function removeHighlights(container){
  $(container).find('span.highlight').each(function(){ $(this).replaceWith($(this).text()); });
}
function highlightMatches(container, term){
  if(!term) return;
  const re = new RegExp('(' + escapeRegExp(term) + ')', 'ig');
  $(container).each(function(){
    const html = $(this).html().replace(/<span class="highlight">|<\/span>/g, '');
    $(this).html(html.replace(re, '<span class="highlight">$1</span>'));
  });
}
// integrate with menu-search
$('#menu-search').on('keyup', function(){
  const q = $(this).val().trim();
  removeHighlights('.menu-section .menu-item h3, .menu-section .menu-item p');
  if(q) highlightMatches('.menu-section .menu-item h3, .menu-section .menu-item p', q);
});

function initScrollProgress(){
  $(window).on('scroll resize', function(){
    const docHeight = $(document).height() - $(window).height();
    const scrolled = docHeight > 0 ? ($(window).scrollTop() / docHeight) * 100 : 0;
    $('#progress-bar').css('width', scrolled + '%');
  });
}


function animateCount($el, target, duration=1500){
  const start = 0;
  const range = target - start;
  const stepTime = Math.max(20, Math.floor(duration / target));
  let current = start;
  const timer = setInterval(function(){
    current += Math.ceil(range * (stepTime / duration));
    if(current >= target){
      $el.text(target);
      clearInterval(timer);
    } else $el.text(current);
  }, stepTime);
}
function initCounters(){
  let triggered = false;
  $(window).on('scroll load', function(){
    if(triggered) return;
    const $stats = $('.stats');
    if(!$stats.length) return;
    const top = $stats.offset().top;
    if($(window).scrollTop() + $(window).height() > top + 50){
      $('.count').each(function(){
        const $t = $(this);
        animateCount($t, parseInt($t.attr('data-target'), 10));
      });
      triggered = true;
    }
  });
}
function initFormSpinner(){
  $('#reserve-form, #contact-form').on('submit', function(e){
    e.preventDefault();
    const $form = $(this);
    const $btn = $form.find('button[type="submit"]').first();
    $btn.prop('disabled', true);
    $btn.find('.btn-text').text('Please wait...');
    $btn.find('.spinner').show();
    setTimeout(function(){
      $btn.prop('disabled', false);
      $btn.find('.btn-text').text('Submit');
      $btn.find('.spinner').hide();
      showToast('Form submitted successfully');
      $form[0].reset();
    }, 1400);
  });
}

function showToast(message, timeout=2500){
  const $t = $(`<div class="toast">${message}</div>`);
  $('#toast-container').append($t);
  setTimeout(()=> $t.addClass('show'), 10);
  setTimeout(()=> { $t.removeClass('show'); setTimeout(()=> $t.remove(), 300); }, timeout);
}

function initCopyButtons(){
  $(document).on('click', '.copy-btn', function(){
    const $btn = $(this);
    const text = $btn.siblings('code').first().text().trim();
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(() => {
        $btn.text('✔').prop('disabled', true);
        $btn.siblings('.copy-tooltip').fadeIn(200).delay(700).fadeOut(200);
        setTimeout(()=>{ $btn.text('Copy').prop('disabled', false); }, 1200);
      });
    } else {
      const $tmp = $('<textarea>').val(text).appendTo('body').select();
      document.execCommand('copy'); $tmp.remove();
      $btn.text('✔').prop('disabled', true);
      $btn.siblings('.copy-tooltip').fadeIn(200).delay(700).fadeOut(200);
      setTimeout(()=>{ $btn.text('Copy').prop('disabled', false); }, 1200);
    }
  });
}

