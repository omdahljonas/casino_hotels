document.addEventListener('DOMContentLoaded', function() {
  // Update site name in the header
  const siteName = document.title.split(' | ')[0];
  document.querySelector('.site-name').textContent = siteName;
  
  // Update hero title with the site name
  const heroTitle = document.querySelector('.hero-title');
  heroTitle.textContent = `Discover the World's Finest ${siteName} Destinations`;
  
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenuButton.innerHTML = isExpanded ? 
      '<i class="fas fa-bars text-2xl"></i>' : 
      '<i class="fas fa-times text-2xl"></i>';
  });
  
  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Initialize Swiper for Gallery
  const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    lazy: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.gallery-swiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.gallery-swiper .swiper-button-next',
      prevEl: '.gallery-swiper .swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  
  // Initialize Swiper for Events
  const eventsSwiper = new Swiper('.events-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.events-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  
  // Initialize Swiper for Testimonials
  const testimonialsSwiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.testimonials-swiper .swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
  
  // Countdown Timer
  function updateCountdown() {
    const summerEventDate = new Date('2025-07-01T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = summerEventDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Event Countdowns
  function updateEventCountdowns() {
    document.querySelectorAll('.event-countdown').forEach(countdown => {
      const eventDate = new Date(countdown.dataset.date).getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        countdown.querySelector('.days').textContent = days.toString().padStart(2, '0');
        countdown.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
        countdown.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
      } else {
        countdown.innerHTML = '<span class="text-gold font-bold">Event Started!</span>';
      }
    });
  }
  
  updateEventCountdowns();
  setInterval(updateEventCountdowns, 60000); // Update every minute
  
  // Modal functionality
  const modals = document.querySelectorAll('.modal');
  const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-overlay');
  
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set focus on the close button for accessibility
    const closeButton = modal.querySelector('.modal-close');
    setTimeout(() => closeButton.focus(), 100);
  }
  
  function closeAllModals() {
    modals.forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
  
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', closeAllModals);
  });
  
  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
  
  // Casino Learn More buttons
  const casinoData = {
    'bellagio': {
      name: 'Bellagio Resort & Casino',
      location: 'Las Vegas, USA',
      description: 'The Bellagio is a luxury resort, hotel and casino on the Las Vegas Strip. It is owned by The Blackstone Group and operated by MGM Resorts International and was built on the site of the demolished Dunes hotel and casino.',
      features: ['Famous dancing fountains', 'Fine art gallery', 'Botanical gardens', 'Cirque du Soleil "O" show', 'High-limit poker room'],
      image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    'marina-bay-sands': {
      name: 'Marina Bay Sands',
      location: 'Singapore',
      description: 'Marina Bay Sands is an integrated resort fronting Marina Bay in Singapore. The iconic design has transformed Singapore\'s skyline and tourism landscape since it opened in 2010.',
      features: ['Iconic triple towers', 'Rooftop infinity pool', 'ArtScience Museum', 'Luxury shopping mall', 'Celebrity chef restaurants'],
      image: 'https://images.unsplash.com/photo-1555912881-1ecd82307e0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    'monte-carlo': {
      name: 'Casino de Monte-Carlo',
      location: 'Monaco',
      description: 'The Casino de Monte-Carlo is a gambling and entertainment complex located in Monaco. It includes a casino, the Opéra de Monte-Carlo, and the office of Les Ballets de Monte-Carlo.',
      features: ['Belle Époque architecture', 'Private gaming rooms', 'Opera house', 'Exclusive events', 'James Bond film location'],
      image: 'https://images.unsplash.com/photo-1602088113360-7a23e8d0f7a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    'venetian-macao': {
      name: 'The Venetian Macao',
      location: 'Macau, China',
      description: 'The Venetian Macao is a luxury hotel and casino resort in Macau owned by the American Las Vegas Sands company. It is the largest casino in the world, and the seventh-largest building in the world by floor area.',
      features: ['Venice-inspired canals', 'Gondola rides', 'Largest casino floor in the world', 'Luxury shopping', 'Arena for events'],
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    'caesars-palace': {
      name: 'Caesars Palace',
      location: 'Las Vegas, USA',
      description: 'Caesars Palace is a luxury hotel and casino in Paradise, Nevada, United States. The hotel is situated on the west side of the Las Vegas Strip between Bellagio and The Mirage.',
      features: ['Roman-themed architecture', 'The Colosseum concert venue', 'Garden of the Gods Pool Oasis', 'Forum Shops', 'Celebrity chef restaurants'],
      image: 'https://images.unsplash.com/photo-1601823984263-b87b59798b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    'atlantis': {
      name: 'Atlantis Paradise Island',
      location: 'Bahamas',
      description: 'Atlantis Paradise Island is an ocean-themed resort on Paradise Island in the Bahamas. It features a variety of accommodations built around Aquaventure, a 141-acre waterscape.',
      features: ['Marine habitat', 'Aquaventure water park', 'Multiple hotel towers', 'Casino', 'Celebrity chef restaurants'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  };
  
  document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', function() {
      const casinoId = this.dataset.casino;
      const casino = casinoData[casinoId];
      
      if (casino) {
        const modalContent = document.querySelector('#casino-modal .modal-content');
        let featuresHTML = '';
        
        casino.features.forEach(feature => {
          featuresHTML += `<li class="mb-2"><i class="fas fa-check text-gold mr-2"></i>${feature}</li>`;
        });
        
        modalContent.innerHTML = `
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/2">
              <img src="${casino.image}" alt="${casino.name}" class="w-full h-64 object-cover rounded-lg">
            </div>
            <div class="md:w-1/2">
              <h4 class="text-2xl font-bold mb-2">${casino.name}</h4>
              <p class="text-gray-600 mb-4">${casino.location}</p>
              <p class="mb-4">${casino.description}</p>
              <h5 class="font-bold mb-2">Key Features:</h5>
              <ul class="mb-4">
                ${featuresHTML}
              </ul>
              <a href="#" class="btn-primary inline-block">Visit Official Website</a>
            </div>
          </div>
        `;
        
        document.querySelector('#casino-modal .modal-title').textContent = casino.name;
        openModal('casino-modal');
      }
    });
  });
  
  // Event Details buttons
  const eventData = {
    'poker-championship': {
      name: 'World Poker Championship',
      date: 'July 15-20, 2025',
      location: 'Bellagio Resort & Casino, Las Vegas',
      description: 'The World Poker Championship is the most prestigious poker tournament of the year, attracting elite players from around the globe to compete for a $10 million prize pool.',
      details: [
        'Six days of intense competition',
        'Multiple poker variants including Texas Hold\'em, Omaha, and Seven-Card Stud',
        'Live streaming of final tables',
        'VIP spectator packages available',
        'Celebrity poker players in attendance'
      ],
      image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    'concert-series': {
      name: 'Casino Concert Series',
      date: 'August 5-7, 2025',
      location: 'The Venetian Macao, Macau',
      description: 'Experience three nights of world-class entertainment featuring Grammy-winning artists in an intimate venue setting with state-of-the-art acoustics.',
      details: [
        'Different headline performer each night',
        'VIP packages with meet-and-greet opportunities',
        'Premium open bar service',
        'Exclusive after-parties',
        'Limited seating for an intimate experience'
      ],
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    'food-wine-festival': {
      name: 'Gourmet Food & Wine Festival',
      date: 'September 22-24, 2025',
      location: 'Casino de Monte-Carlo, Monaco',
      description: 'Indulge in exquisite cuisine and fine wines presented by celebrity chefs and renowned sommeliers in the elegant setting of the Casino de Monte-Carlo.',
      details: [
        'Tasting menus from Michelin-starred chefs',
        'Wine pairings from world-class vineyards',
        'Cooking demonstrations and workshops',
        'Gala dinner with live entertainment',
        'Exclusive wine auctions'
      ],
      image: 'https://images.unsplash.com/photo-1574966739987-65ee4e0c952a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
    },
    'new-years-gala': {
      name: 'New Year\'s Eve Gala',
      date: 'December 31, 2025',
      location: 'Marina Bay Sands, Singapore',
      description: 'Ring in the New Year with an extravagant celebration featuring gourmet dining, live entertainment, and a spectacular fireworks display over Marina Bay.',
      details: [
        'Seven-course gourmet dinner',
        'Premium open bar all night',
        'Live performances by international artists',
        'Countdown party on the rooftop',
        'Champagne toast at midnight',
        'Best view of the Marina Bay fireworks'
      ],
      image: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    }
  };
  
  document.querySelectorAll('.event-details-btn').forEach(button => {
    button.addEventListener('click', function() {
      const eventId = this.dataset.event;
      const event = eventData[eventId];
      
      if (event) {
        const modalContent = document.querySelector('#event-modal .modal-content');
        let detailsHTML = '';
        
        event.details.forEach(detail => {
          detailsHTML += `<li class="mb-2"><i class="fas fa-check text-gold mr-2"></i>${detail}</li>`;
        });
        
        modalContent.innerHTML = `
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/2">
              <img src="${event.image}" alt="${event.name}" class="w-full h-64 object-cover rounded-lg">
            </div>
            <div class="md:w-1/2">
              <h4 class="text-2xl font-bold mb-2">${event.name}</h4>
              <p class="text-gray-600 mb-1"><i class="far fa-calendar-alt mr-2"></i>${event.date}</p>
              <p class="text-gray-600 mb-4"><i class="fas fa-map-marker-alt mr-2"></i>${event.location}</p>
              <p class="mb-4">${event.description}</p>
              <h5 class="font-bold mb-2">Event Highlights:</h5>
              <ul class="mb-4">
                ${detailsHTML}
              </ul>
              <a href="#" class="btn-primary inline-block">Reserve Tickets</a>
            </div>
          </div>
        `;
        
        document.querySelector('#event-modal .modal-title').textContent = event.name;
        openModal('event-modal');
      }
    });
  });
  
  // Load More button functionality
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadSpinner = document.getElementById('load-spinner');
  
  loadMoreBtn.addEventListener('click', function() {
    // Show spinner
    loadMoreBtn.querySelector('span').classList.add('opacity-0');
    loadSpinner.classList.remove('hidden');
    
    // Simulate loading delay
    setTimeout(function() {
      // Hide spinner
      loadMoreBtn.querySelector('span').classList.remove('opacity-0');
      loadSpinner.classList.add('hidden');
      
      // Show toast notification
      showToast('All casinos have been loaded');
      
      // Disable button
      loadMoreBtn.disabled = true;
      loadMoreBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }, 1500);
  });
  
  // VIP Form submission
  const vipForm = document.getElementById('vip-form');
  const formSpinner = document.getElementById('form-spinner');
  
  vipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const country = document.getElementById('country').value;
    const favoriteCasino = document.getElementById('favorite-casino').value;
    
    if (!name || !email || !country || !favoriteCasino) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    
    // Show spinner
    formSpinner.classList.remove('hidden');
    vipForm.querySelector('button[type="submit"]').disabled = true;
    
    // Simulate form submission
    setTimeout(function() {
      // Hide spinner
      formSpinner.classList.add('hidden');
      vipForm.querySelector('button[type="submit"]').disabled = false;
      
      // Reset form
      vipForm.reset();
      
      // Show success modal
      openModal('success-modal');
    }, 1500);
  });
  
  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    
    // Show spinner
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(function() {
      // Reset button
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
      
      // Reset form
      emailInput.value = '';
      
      // Show success toast
      showToast('Thank you for subscribing to our newsletter!');
    }, 1000);
  });
  
  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const answerId = this.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      
      // Toggle current FAQ item
      this.setAttribute('aria-expanded', !isExpanded);
      answer.hidden = isExpanded;
      
      // Close other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          const otherAnswerId = otherQuestion.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherAnswerId);
          
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.hidden = true;
        }
      });
    });
  });
  
  // Toast notification function
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    // Set message and style based on type
    toastMessage.textContent = message;
    
    if (type === 'error') {
      toast.classList.remove('bg-green-500');
      toast.classList.add('bg-red-500');
      toast.querySelector('i').className = 'fas fa-exclamation-circle mr-2';
    } else {
      toast.classList.remove('bg-red-500');
      toast.classList.add('bg-green-500');
      toast.querySelector('i').className = 'fas fa-check-circle mr-2';
    }
    
    // Show toast
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hide toast after 3 seconds
    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
  }
});

// Declare Swiper variable
let Swiper;
