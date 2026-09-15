/* ==========================================================================
   ULTRA-LUXURY ROYAL DIGITAL WEDDING INVITATION - JAVASCRIPT
   Couple: आयुष्मान नन्दकिशोर चौहान ❤️ आयुष्मती दीक्षा
   ========================================================================== */

// --------------------------------------------------------------------------
// REQUIREMENT 5: ALWAYS OPEN FROM THE TOP (SCROLL RESET LOGIC)
// --------------------------------------------------------------------------
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function forceResetScrollToTop() {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Reset scroll on all page load/reload/pageshow events
forceResetScrollToTop();
window.addEventListener('beforeunload', forceResetScrollToTop);
window.addEventListener('load', forceResetScrollToTop);
window.addEventListener('pageshow', forceResetScrollToTop);

document.addEventListener('DOMContentLoaded', () => {
  forceResetScrollToTop();

  // DOM Elements
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const openInviteBtn = document.getElementById('open-invite-btn');
  const skipIntroTopBtn = document.getElementById('skip-intro-top-btn');
  const skipAnimationBtn = document.getElementById('skip-animation-btn');
  const musicToggleBtn = document.getElementById('music-toggle-btn');
  const petalsToggleBtn = document.getElementById('petals-toggle-btn');
  const rsvpForm = document.getElementById('rsvp-form');
  const wishesFeed = document.getElementById('wishes-feed');
  const whatsappShareBtn = document.getElementById('whatsapp-share-btn');
  const addToCalendarBtn = document.getElementById('add-to-calendar-btn');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  // Audio State
  let isPlaying = false;
  let audioCtx = null;

  // Particle Engine State
  let particlesRunning = true;

  // Sample Wishes with exact card spellings
  const sampleWishes = [
    { name: 'प्रकाश चौहान एवं परिवार', wish: 'नन्दकिशोर और दीक्षा को शादी की हार्दिक शुभकामनाएं! प्रभु श्री राम का आशीर्वाद सदा बना रहे।' },
    { name: 'श्री रामबरण सिंह जी एवं परिवार', wish: 'दोनों बच्चों को सुखद एवं मंगलमय दांपत्य जीवन का आशीर्वाद।' },
    { name: 'मुकेश चौहान', wish: 'बधाई हो नन्दकिशोर भैया! बहुत-बहुत शुभकामनाएं!' }
  ];

  renderWishes(sampleWishes);

  // ==========================================================================
  // 1. OPEN INVITATION & EXPLOSION OF FLOWERS, CONFETTI & MUSIC
  // ==========================================================================
  function revealMainWebsite(startMusic = true) {
    welcomeOverlay.classList.add('opened');
    forceResetScrollToTop();
    if (startMusic) {
      toggleMusic(true);
    }
    triggerPetalExplosion();
  }

  if (openInviteBtn) {
    openInviteBtn.addEventListener('click', () => revealMainWebsite(true));
  }

  if (skipIntroTopBtn) {
    skipIntroTopBtn.addEventListener('click', () => revealMainWebsite(false));
  }

  if (skipAnimationBtn) {
    skipAnimationBtn.addEventListener('click', () => revealMainWebsite(false));
  }

  // ==========================================================================
  // 2. SCROLL REVEAL OBSERVER
  // ==========================================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================================================
  // 3. BACKGROUND MUSIC PLAYER & SYNTHESIZER
  // ==========================================================================
  const weddingAudio = document.getElementById('wedding-audio');
  if (weddingAudio) {
    weddingAudio.volume = 0.45; // Soft & pleasant volume
  }

  musicToggleBtn.addEventListener('click', () => {
    toggleMusic(!isPlaying);
  });

  function toggleMusic(playState) {
    isPlaying = playState;
    if (isPlaying) {
      musicToggleBtn.classList.add('playing');
      musicToggleBtn.title = "संगीत चालू (म्यूट करने के लिए क्लिक करें)";
      playAudioTrack();
    } else {
      musicToggleBtn.classList.remove('playing');
      musicToggleBtn.title = "संगीत बंद (सुनने के लिए क्लिक करें)";
      stopAudioTrack();
    }
  }

  function playAudioTrack() {
    let playedMedia = false;
    if (weddingAudio) {
      const playPromise = weddingAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          playedMedia = true;
        }).catch(() => {
          // If media file fails/missing, use Web Audio API Synth fallback
          playAmbientShehnai();
        });
      }
    } else {
      playAmbientShehnai();
    }
  }

  function stopAudioTrack() {
    if (weddingAudio) {
      weddingAudio.pause();
    }
    stopAmbientShehnai();
  }

  function playAmbientShehnai() {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Traditional Indian Raga Yaman harmonic series
      const ragaFrequencies = [293.66, 329.63, 369.99, 440.00, 493.88, 554.37, 587.33];
      let stepIndex = 0;

      function playNotePattern() {
        if (!isPlaying || !audioCtx) return;

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(ragaFrequencies[stepIndex % ragaFrequencies.length], audioCtx.currentTime);

        gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.14, audioCtx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.4);

        stepIndex = (stepIndex + 1) % ragaFrequencies.length;
        setTimeout(playNotePattern, 1300);
      }

      playNotePattern();
    } catch (e) {
      console.log('Audio Context playback error:', e);
    }
  }

  function stopAmbientShehnai() {
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  }

  // ==========================================================================
  // 4. DUAL PARTICLE ENGINE (ROSE PETALS + GOLDEN DUST + CONFETTI)
  // ==========================================================================
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(isExplosion = false, isConfetti = false) {
      this.reset(isExplosion, isConfetti);
    }

    reset(isExplosion = false, isConfetti = false) {
      if (isConfetti) {
        this.type = 'confetti';
        this.x = canvas.width / 2 + (Math.random() * 240 - 120);
        this.y = canvas.height * 0.45;
        this.size = Math.random() * 9 + 5;
        this.speedY = Math.random() * -14 - 5;
        this.speedX = (Math.random() - 0.5) * 16;
        this.gravity = 0.38;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 14;
        this.opacity = 1;
        this.color = Math.random() > 0.5 ? '#FFD700' : (Math.random() > 0.5 ? '#E63946' : '#800A1D');
        return;
      }

      this.type = Math.random() > 0.4 ? 'petal' : 'goldDust';
      this.x = Math.random() * canvas.width;
      this.y = isExplosion ? Math.random() * canvas.height : -20;
      
      if (this.type === 'petal') {
        this.size = Math.random() * 12 + 8;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = Math.random() * 1 - 0.5;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.color = Math.random() > 0.35 ? '#E63946' : '#FFB703';
      } else {
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.color = '#FFD700';
      }
    }

    update() {
      if (this.type === 'confetti') {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;
        this.speedX *= 0.98;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.007;
        return;
      }

      this.y += this.speedY;
      this.x += Math.sin(this.y * 0.02) + this.speedX;

      if (this.type === 'petal') {
        this.rotation += this.rotationSpeed;
      }

      if (this.y > canvas.height + 20) {
        this.reset();
      }
    }

    draw() {
      if (this.type === 'confetti' && this.opacity <= 0) return;

      ctx.save();
      ctx.globalAlpha = Math.max(0, this.opacity);

      if (this.type === 'confetti') {
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 1.6);
      } else if (this.type === 'petal') {
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(this.size / 2, -this.size / 2, this.size, 0);
        ctx.quadraticCurveTo(this.size / 2, this.size / 2, 0, 0);
        ctx.fill();
      } else {
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFD700';
        ctx.fillStyle = '#FFF0B3';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 55; i++) {
      particles.push(new Particle());
    }
  }

  function triggerPetalExplosion() {
    // Confetti burst
    for (let i = 0; i < 70; i++) {
      particles.push(new Particle(true, true));
    }
    // Petals & Gold dust
    for (let i = 0; i < 35; i++) {
      particles.push(new Particle(true, false));
    }
  }

  function animateParticles() {
    if (!particlesRunning) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  petalsToggleBtn.addEventListener('click', () => {
    particlesRunning = !particlesRunning;
    petalsToggleBtn.style.opacity = particlesRunning ? '1' : '0.4';
    if (particlesRunning) animateParticles();
  });

  initParticles();
  animateParticles();

  // ==========================================================================
  // 5. LIVE COUNTDOWN TIMER (25 NOV 2026 18:00:00 GMT+0530)
  // ==========================================================================
  const weddingDate = new Date('November 25, 2026 18:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById('days').innerText = "00";
      document.getElementById('hours').innerText = "00";
      document.getElementById('minutes').innerText = "00";
      document.getElementById('seconds').innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ==========================================================================
  // 6. PHOTO LIGHTBOX MODAL
  // ==========================================================================
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      }
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightboxModal.classList.remove('active');
  });

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
    }
  });

  // ==========================================================================
  // 7. RSVP & WISHES FEED
  // ==========================================================================
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('guest-name').value.trim();
    const wishInput = document.getElementById('guest-wish').value.trim();

    if (!nameInput) return;

    const newWish = {
      name: nameInput,
      wish: wishInput || 'शुभ विवाह की हार्दिक बधाई एवं ढेर सारा स्नेह!'
    };

    sampleWishes.unshift(newWish);
    renderWishes(sampleWishes);

    rsvpForm.reset();
    alert('आपकी शुभकामनाएं एवं उपस्थिति संदेश सफलतापूर्वक प्रेषित कर दिया गया है! धन्यवाद।');
  });

  function renderWishes(wishes) {
    wishesFeed.innerHTML = '';
    wishes.forEach(w => {
      const item = document.createElement('div');
      item.className = 'wish-item';
      item.innerHTML = `
        <div class="wish-author">${escapeHtml(w.name)}</div>
        <div class="wish-text">${escapeHtml(w.wish)}</div>
      `;
      wishesFeed.appendChild(item);
    });
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[m];
    });
  }

  // ==========================================================================
  // 8. SHARE & CALENDAR TRIGGERS
  // ==========================================================================
  whatsappShareBtn.addEventListener('click', () => {
    const text = encodeURIComponent(
      "|| श्री गणेशाय नमः ||\n\n" +
      "🚩 शुभ विवाह निमंत्रण 🚩\n\n" +
      "आयुष्मान नन्दकिशोर चौहान ❤️ आयुष्मती दीक्षा\n\n" +
      "📅 विवाह तिथि: 25 नवंबर 2026 (बुधवार)\n" +
      "📍 स्थान: नहर मोहल्ला, भनोखर, अलवर (राज.)\n\n" +
      "कृपया नीचे दिए गए लिंक पर क्लिक करके हमारा डिजिटल विवाह निमंत्रण पत्र देखें:\n" +
      window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  });

  addToCalendarBtn.addEventListener('click', () => {
    const title = encodeURIComponent("आयुष्मान नन्दकिशोर संग आयुष्मती दीक्षा - शुभ विवाह");
    const details = encodeURIComponent("विवाह समारोह: आयुष्मान नन्दकिशोर चौहान एवं आयुष्मती दीक्षा");
    const location = encodeURIComponent("नहर मोहल्ला, भनोखर, अलवर");
    const startDate = "20261125T180000";
    const endDate = "20261126T040000";

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(calendarUrl, '_blank');
  });

  // ==========================================================================
  // 9. FULLSCREEN CARD VIEWER & INTERACTIVE ZOOM / DRAG
  // ==========================================================================
  const cardModal = document.getElementById('card-modal');
  const cardModalImg = document.getElementById('card-modal-img');
  const cardModalTitle = document.getElementById('card-modal-title');
  const cardModalClose = document.getElementById('card-modal-close');
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomResetBtn = document.getElementById('zoom-reset-btn');
  const cardModalBody = document.getElementById('card-modal-body');

  let currentScale = 1;
  let posX = 0;
  let posY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  document.querySelectorAll('.card-preview-item').forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-card-src');
      const title = item.getAttribute('data-card-title');
      cardModalImg.src = src;
      cardModalTitle.innerText = title;
      resetZoom();
      cardModal.classList.add('active');
    });
  });

  function updateTransform() {
    cardModalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${currentScale})`;
  }

  function resetZoom() {
    currentScale = 1;
    posX = 0;
    posY = 0;
    updateTransform();
  }

  zoomInBtn.addEventListener('click', () => {
    currentScale = Math.min(currentScale + 0.35, 3.5);
    updateTransform();
  });

  zoomOutBtn.addEventListener('click', () => {
    currentScale = Math.max(currentScale - 0.35, 0.8);
    updateTransform();
  });

  zoomResetBtn.addEventListener('click', resetZoom);

  cardModalClose.addEventListener('click', () => {
    cardModal.classList.remove('active');
  });

  cardModal.addEventListener('click', (e) => {
    if (e.target === cardModalBody || e.target === cardModal) {
      cardModal.classList.remove('active');
    }
  });

  // Drag & Pan support
  cardModalBody.addEventListener('mousedown', (e) => {
    if (currentScale > 1) {
      isDragging = true;
      startX = e.clientX - posX;
      startY = e.clientY - posY;
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      posX = e.clientX - startX;
      posY = e.clientY - startY;
      updateTransform();
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch Support for Mobile
  cardModalBody.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && currentScale > 1) {
      isDragging = true;
      startX = e.touches[0].clientX - posX;
      startY = e.touches[0].clientY - posY;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      posX = e.touches[0].clientX - startX;
      posY = e.touches[0].clientY - startY;
      updateTransform();
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
});
