const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const form = document.querySelector('[data-quote-form]');
const formStatus = document.querySelector('[data-form-status]');
const serviceSelect = form?.querySelector('[name="service"]');
const dialog = document.querySelector('[data-service-dialog]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const contactSection = document.querySelector('#contact');
const requestedService = new URLSearchParams(window.location.search).get('service');

const businessDetails = {
  gstin: '37BYVPC7302K1Z1',
  legalName: 'CHODIPALLI RAVITEJA',
  tradeName: 'SKY HAVEN ENTERPRISES',
};

const footer = document.querySelector('.footer');
if (footer && !footer.querySelector('[data-business-registration]')) {
  const registration = document.createElement('section');
  registration.className = 'footer-registration';
  registration.dataset.businessRegistration = '';
  registration.setAttribute('aria-label', 'Business registration details');
  registration.innerHTML = `
    <p><strong>GST-registered business</strong><span>Goods and Services Tax Identification Number</span></p>
    <dl>
      <div><dt>GSTIN</dt><dd>${businessDetails.gstin}</dd></div>
      <div><dt>Legal name</dt><dd>${businessDetails.legalName}</dd></div>
      <div><dt>Trade name</dt><dd>${businessDetails.tradeName}</dd></div>
    </dl>`;
  footer.querySelector('.footer-bottom')?.before(registration);
}

const offerKey = 'skyhaven-welcome-offer-seen-v1';
let offerSeen = false;
try {
  offerSeen = window.localStorage.getItem(offerKey) === 'true';
} catch {
  offerSeen = false;
}

if (!offerSeen) {
  const offerDialog = document.createElement('dialog');
  offerDialog.className = 'welcome-offer';
  offerDialog.setAttribute('aria-labelledby', 'welcome-offer-title');
  offerDialog.innerHTML = `
    <button class="welcome-offer-close" type="button" aria-label="Close welcome offer">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>
    <div class="welcome-offer-accent" aria-hidden="true"><span>20%</span><small>OFF</small></div>
    <div class="welcome-offer-copy">
      <p class="section-label">Welcome to SkyHaven</p>
      <h2 id="welcome-offer-title">First-time customer offer</h2>
      <p>Get <strong>20% off</strong> your first SkyHaven safety-net or invisible-grill installation.</p>
      <div class="welcome-offer-actions">
        <a class="button button-primary" href="https://wa.me/917207903116?text=Hello%20SkyHaven%2C%20I%20would%20like%20to%20claim%20the%2020%25%20first-customer%20offer." target="_blank" rel="noopener">Claim on WhatsApp</a>
        <a class="welcome-offer-link" href="/services/invisible-grills.html">Explore invisible grills</a>
      </div>
    </div>`;
  document.body.append(offerDialog);

  const dismissOffer = () => {
    try {
      window.localStorage.setItem(offerKey, 'true');
    } catch {
      // The offer still closes when browser storage is unavailable.
    }
    if (offerDialog.open && typeof offerDialog.close === 'function') offerDialog.close();
    else offerDialog.removeAttribute('open');
    document.body.classList.remove('has-dialog');
  };

  offerDialog.querySelector('.welcome-offer-close')?.addEventListener('click', dismissOffer);
  offerDialog.querySelector('.welcome-offer-actions a')?.addEventListener('click', dismissOffer);
  offerDialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    dismissOffer();
  });
  offerDialog.addEventListener('click', (event) => {
    if (event.target === offerDialog) dismissOffer();
  });

  window.setTimeout(() => {
    document.body.classList.add('has-dialog');
    if (typeof offerDialog.showModal === 'function') offerDialog.showModal();
    else offerDialog.setAttribute('open', '');
  }, reduceMotion ? 0 : 650);
}

const serviceData = {
  balcony: {
    title: 'Balcony Safety Nets',
    category: 'Residential safety',
    description: 'Made-to-measure netting for balconies and railing gaps, planned to add a discreet protective barrier without unnecessarily reducing light, airflow or the view.',
    points: ['Measured around the complete opening', 'Material, mesh and fixings stated in the quote', 'Perimeter tension and corners checked at handover'],
    enquiry: 'Balcony safety nets',
    images: ['/public/assets/source-services/sk-balcony.jpg', '/public/assets/source-services/bn-balcony.webp', '/public/assets/source-services/sk-slider1.jpg'],
  },
  'child-pet': {
    title: 'Children & Pet Safety',
    category: 'Family protection',
    description: 'A site-specific barrier planned around reachable gaps, climbable furniture, pet size and the way your family uses balconies, windows or internal voids.',
    points: ['Child and pet behaviour considered', 'Balconies, windows and duplex openings assessed', 'An additional precaution—not a replacement for supervision'],
    enquiry: 'Children safety nets',
    images: ['/public/assets/source-services/sk-child-safety.jpg', '/public/assets/source-services/sk-slider4.jpg', '/public/assets/source-services/bn-pets.webp'],
  },
  'bird-control': {
    title: 'Pigeon & Bird Control',
    category: 'Humane exclusion',
    description: 'Netting and deterrent systems that close recurring bird entry routes around balconies, ducts, ledges and terraces without trapping birds inside the protected area.',
    points: ['Entry routes and small edge gaps identified', 'Nets or spikes selected for the location', 'Cleaning and maintenance access considered'],
    enquiry: 'Pigeon or anti-bird nets',
    images: ['/public/assets/source-services/sk-pigeon.jpg', '/public/assets/source-services/bn-anti-bird.webp', '/public/assets/source-services/sk-spikes.jpg'],
  },
  'invisible-grills': {
    title: 'Invisible Grills',
    category: 'Open-view protection',
    description: 'Slim coated stainless-steel cable systems for balconies, windows and selected openings where customers prefer a more structured barrier with minimal visual interruption.',
    points: ['Cable grade, diameter and spacing specified', 'Supporting frame and fixing surfaces inspected', 'Tension, coating and fasteners checked at handover'],
    enquiry: 'Invisible grills',
    images: ['/public/assets/source-services/sk-invisible-grills.jpg', '/public/assets/source-services/sk-slider2.jpg', '/public/assets/source-services/sk-work-05.jpg'],
  },
  'duct-staircase': {
    title: 'Duct & Staircase Safety',
    category: 'Custom openings',
    description: 'Measured protection for stairwells, duplex voids, ventilation ducts and irregular openings where standard balcony layouts do not apply.',
    points: ['Irregular corners and direction changes measured', 'Ventilation and maintenance access preserved', 'Every edge and fixing point inspected'],
    enquiry: 'Duct area safety nets',
    images: ['/public/assets/source-services/sk-duct.jpg', '/public/assets/source-services/bn-staircase.webp', '/public/assets/staircase.png'],
  },
  sports: {
    title: 'Sports & Practice Nets',
    category: 'Sports containment',
    description: 'Practice and ball-stop netting designed around the sport, ball size, impact direction, available height and surrounding property.',
    points: ['Activity and high-impact zones assessed', 'Support structure and access gate planned', 'Suitable for schools, academies and private spaces'],
    enquiry: 'Cricket practice nets',
    images: ['/public/assets/source-services/sk-cricket.jpg', '/public/assets/source-services/sk-sports.jpg', '/public/assets/source-services/sk-slider7.jpg'],
  },
};

const coreKeys = Object.keys(serviceData);
let activeServiceKey = coreKeys[0];
let activeEnquiryChoice = serviceData[activeServiceKey].enquiry;
let motionApi = null;

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menu?.classList.toggle('is-open', !open);
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  });
});

const relatedImages = (title, primary) => {
  const name = title.toLowerCase();
  const choices = [primary];
  if (name.includes('balcony')) choices.push('/public/assets/source-services/bn-balcony.webp', '/public/assets/source-services/sk-slider1.jpg');
  else if (name.includes('child')) choices.push('/public/assets/source-services/sk-slider4.jpg', '/public/assets/source-services/bn-children.webp');
  else if (name.includes('pet')) choices.push('/public/assets/source-services/sk-slider3.jpg', '/public/assets/source-services/bn-pets.webp');
  else if (name.includes('staircase') || name.includes('duct')) choices.push('/public/assets/source-services/bn-staircase.webp', '/public/assets/source-services/bn-duct.webp');
  else if (name.includes('bird') || name.includes('pigeon')) choices.push('/public/assets/source-services/bn-pigeon.webp', '/public/assets/source-services/bn-bird-spikes.webp');
  else if (name.includes('invisible')) choices.push('/public/assets/source-services/sk-slider2.jpg', '/public/assets/source-services/sk-work-07.jpg');
  else if (name.includes('cricket') || name.includes('sport')) choices.push('/public/assets/source-services/sk-terrace-cricket.jpg', '/public/assets/source-services/sk-slider7.jpg');
  else if (name.includes('industrial')) choices.push('/public/assets/source-services/bn-industrial.webp', '/public/assets/source-services/sk-slider6.jpg');
  else if (name.includes('building') || name.includes('construction') || name.includes('glass')) choices.push('/public/assets/source-services/bn-building.webp', '/public/assets/source-services/sk-slider5.jpg');
  else if (name.includes('monkey')) choices.push('/public/assets/source-services/bn-monkey.webp', '/public/assets/source-services/sk-slider3.jpg');
  else if (name.includes('coconut')) choices.push('/public/assets/source-services/bn-coconut.webp', '/public/assets/source-services/sk-coconut.jpg');
  else if (name.includes('hanger') || name.includes('bamboo')) choices.push('/public/assets/source-services/sk-cloth-hanger.jpg', '/public/assets/source-services/sk-cloth-hangers-1062-x-531-px-2.jpg');
  else choices.push('/public/assets/source-services/bn-open-area.webp', '/public/assets/source-services/sk-work-09.jpg');
  return [...new Set(choices)].slice(0, 3);
};

const setShowcaseImage = (src, alt, button) => {
  const image = dialog?.querySelector('[data-showcase-image]');
  if (!image) return;
  const swap = () => {
    image.src = src;
    image.alt = alt;
    dialog.querySelectorAll('.showcase-thumb').forEach((thumb) => thumb.classList.toggle('is-active', thumb === button));
  };
  if (motionApi && !reduceMotion) {
    motionApi.animate(image, { opacity: [1, 0], scale: [1, .985] }, { duration: .16 }).then(() => {
      swap();
      motionApi.animate(image, { opacity: [0, 1], scale: [.985, 1] }, { duration: .34, ease: [0.22, 1, 0.36, 1] });
    });
  } else swap();
};

const renderShowcase = (data, key = null) => {
  if (!dialog) return;
  activeServiceKey = key || activeServiceKey;
  activeEnquiryChoice = data.enquiry || data.title;
  dialog.querySelector('[data-showcase-category]').textContent = data.category;
  dialog.querySelector('[data-showcase-title]').textContent = data.title;
  dialog.querySelector('[data-showcase-description]').textContent = data.description;
  dialog.querySelector('[data-showcase-points]').innerHTML = data.points.map((point, index) => `<div class="showcase-point"><span>0${index + 1}</span><div>${point}</div></div>`).join('');
  const thumbnails = dialog.querySelector('[data-showcase-thumbnails]');
  thumbnails.innerHTML = '';
  data.images.forEach((src, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `showcase-thumb${index === 0 ? ' is-active' : ''}`;
    button.setAttribute('aria-label', `Show ${data.title} photo ${index + 1}`);
    button.innerHTML = `<img src="${src}" alt="" />`;
    button.addEventListener('click', () => setShowcaseImage(src, `${data.title} installation photograph ${index + 1}`, button));
    thumbnails.append(button);
  });
  setShowcaseImage(data.images[0], `${data.title} installation photograph`, thumbnails.querySelector('.showcase-thumb'));
};

const openShowcase = (data, key = null) => {
  if (!dialog) return;
  renderShowcase(data, key);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('has-dialog');
  if (motionApi && !reduceMotion) {
    motionApi.animate(dialog, { opacity: [0, 1], scale: [.96, 1], y: [20, 0] }, { duration: .45, ease: [0.22, 1, 0.36, 1] });
    motionApi.animate(dialog.querySelectorAll('.showcase-copy > *'), { opacity: [0, 1], y: [18, 0] }, { duration: .42, delay: motionApi.stagger(.055), ease: [0.22, 1, 0.36, 1] });
  }
};

const closeShowcase = () => {
  if (!dialog?.open) return;
  const finish = () => {
    dialog.close();
    document.body.classList.remove('has-dialog');
  };
  if (motionApi && !reduceMotion) motionApi.animate(dialog, { opacity: [1, 0], scale: [1, .975], y: [0, 12] }, { duration: .2 }).then(finish);
  else finish();
};

document.querySelectorAll('[data-service-showcase]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const key = link.dataset.serviceShowcase;
    openShowcase(serviceData[key], key);
  });
});

document.querySelectorAll('.service-card').forEach((card) => {
  const image = card.querySelector(':scope > img');
  const title = card.querySelector('h4')?.textContent.trim();
  const description = card.querySelector('div > p')?.textContent.trim();
  const use = card.querySelector('.service-use')?.textContent.trim();
  if (!image || !title) return;
  const media = document.createElement('div');
  media.className = 'service-card-media';
  card.insertBefore(media, image);
  media.append(image);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'service-photo-button';
  button.textContent = 'View photos';
  button.setAttribute('aria-label', `View ${title} photos and details`);
  media.append(button);
  const show = () => openShowcase({
    title,
    category: card.closest('.catalogue-group')?.querySelector('header h3')?.textContent.trim() || 'SkyHaven service',
    description,
    points: [use || 'Site-specific measurement and recommendation', 'Clear material and fixing specification', 'Professional installation and final inspection'],
    enquiry: card.querySelector('[data-service-choice]')?.dataset.serviceChoice || title,
    images: relatedImages(title, image.getAttribute('src')),
  });
  button.addEventListener('click', show);
  image.addEventListener('click', show);
});

const galleryFigures = [...document.querySelectorAll('.gallery figure')];
galleryFigures.forEach((figure, index) => {
  figure.setAttribute('tabindex', '0');
  figure.setAttribute('role', 'button');
  figure.setAttribute('aria-label', `Open ${figure.querySelector('strong')?.textContent || 'installation'} photo gallery`);
  const openGallery = () => {
    const selected = [galleryFigures[index], galleryFigures[(index + 1) % galleryFigures.length], galleryFigures[(index + 2) % galleryFigures.length]];
    const title = figure.querySelector('strong')?.textContent || 'Installation gallery';
    openShowcase({
      title,
      category: 'Completed work gallery',
      description: 'Explore reference photographs showing the range of openings, materials and finished appearances available for discussion during a SkyHaven site visit.',
      points: ['Every property is measured individually', 'Final specification depends on the opening and risk', 'Ask us which solution best matches your space'],
      enquiry: 'Not sure - please advise',
      images: selected.map((item) => item.querySelector('img').getAttribute('src')),
    });
  };
  figure.addEventListener('click', openGallery);
  figure.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openGallery();
    }
  });
});

dialog?.querySelector('[data-showcase-close]')?.addEventListener('click', closeShowcase);
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) closeShowcase();
});
dialog?.addEventListener('close', () => document.body.classList.remove('has-dialog'));
dialog?.querySelector('[data-showcase-next]')?.addEventListener('click', () => {
  const current = Math.max(0, coreKeys.indexOf(activeServiceKey));
  const next = coreKeys[(current + 1) % coreKeys.length];
  renderShowcase(serviceData[next], next);
});
dialog?.querySelector('[data-showcase-enquire]')?.addEventListener('click', (event) => {
  event.preventDefault();
  if (serviceSelect) {
    const choices = [...serviceSelect.options].map((option) => option.value);
    serviceSelect.value = choices.includes(activeEnquiryChoice) ? activeEnquiryChoice : 'Not sure - please advise';
  }
  closeShowcase();
  if (!contactSection) {
    window.setTimeout(() => {
      window.location.href = `/contact.html?service=${encodeURIComponent(activeEnquiryChoice)}`;
    }, reduceMotion ? 0 : 220);
    return;
  }
  window.setTimeout(() => contactSection.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  }), reduceMotion ? 0 : 230);
});

if (requestedService && serviceSelect) {
  const choices = [...serviceSelect.options].map((option) => option.value);
  serviceSelect.value = choices.includes(requestedService) ? requestedService : 'Not sure - please advise';
}

document.querySelectorAll('[data-service-choice]').forEach((link) => {
  link.addEventListener('click', () => {
    if (serviceSelect) serviceSelect.value = link.dataset.serviceChoice;
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fields = Object.fromEntries(new FormData(form));
  const enquiry = [
    'Hello SkyHaven, I would like to request a free site visit.',
    '',
    `Name: ${fields.name}`,
    `Phone: ${fields.phone}`,
    `Location: ${fields.location}`,
    `Property type: ${fields.property}`,
    `Service: ${fields.service}`,
    `Details: ${fields.message || 'Not provided'}`,
  ].join('\n');
  const whatsappUrl = `https://wa.me/917207903116?text=${encodeURIComponent(enquiry)}`;
  formStatus.textContent = 'Your enquiry is ready. WhatsApp will open so you can review and send it to SkyHaven.';
  formStatus.classList.add('is-visible');
  if (['127.0.0.1', 'localhost'].includes(window.location.hostname)) {
    formStatus.textContent = 'Preview mode: the WhatsApp enquiry is ready. On the published website, WhatsApp will open here.';
    return;
  }
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
});

document.querySelector('[data-year]').textContent = String(new Date().getFullYear());

const header = document.querySelector('[data-header]');
const progress = document.querySelector('[data-scroll-progress]');
let scrollFrame = 0;
const updateScrollState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const value = available > 0 ? Math.min(1, window.scrollY / available) : 0;
  if (progress) progress.style.transform = `scaleX(${value})`;
  scrollFrame = 0;
};
updateScrollState();
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollState);
}, { passive: true });

const initMotion = async () => {
  if (reduceMotion) return;
  try {
    motionApi = await import('/public/vendor/motion.esm.js');
    if (!motionApi?.animate || !motionApi?.inView) throw new Error('Motion library unavailable');
    const { animate, inView, stagger } = motionApi;
    document.documentElement.dataset.motionStatus = 'ready';
    animate('.brand, .site-nav, .header-cta', { opacity: [0, 1], y: [-14, 0] }, { duration: .55, delay: stagger(.08), ease: [0.22, 1, 0.36, 1] });
    animate('.hero h1, .hero-copy > p, .hero-actions, .trust-line', { opacity: [0, 1], y: [28, 0] }, { duration: .72, delay: stagger(.09, { startDelay: .12 }), ease: [0.22, 1, 0.36, 1] });
    animate('.hero-media img', { opacity: [0, 1], scale: [1.04, 1] }, { duration: 1.05, ease: [0.22, 1, 0.36, 1] });

    const revealItems = document.querySelectorAll('.intro > *, .page-hero > *, .service-page-hero > *, .service-subnav, .service-page-details article, .multi-page-cta > *, .service-detail, .catalogue-group > header, .service-card, .material-table article, .process-steps li, .trust-points article, .gallery figure, .faq-list details');
    revealItems.forEach((element) => {
      element.dataset.motionReveal = '';
      element.style.opacity = '0';
      inView(element, () => {
        animate(element, { opacity: [0, 1], y: [30, 0] }, { duration: .62, ease: [0.22, 1, 0.36, 1] });
        return () => {};
      }, { amount: .12, margin: '0px 0px -5% 0px' });
    });
  } catch {
    document.documentElement.dataset.motionStatus = 'fallback';
    document.querySelectorAll('[data-motion-reveal]').forEach((element) => {
      element.style.opacity = '';
      element.style.transform = '';
    });
  }
};

initMotion();
