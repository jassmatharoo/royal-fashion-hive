/* =========================================================
   Royal Fashion Hive — Site Renderer v3.0
   ========================================================= */
document.addEventListener('DOMContentLoaded', async () => {
  let C = null;
  try { C = await rfhCloudLoad(); } catch(e) {}
  if (!C) C = rfhGetConfig();
  loadCloudImages(C);
  applyTheme(C); renderNav(C); renderHero(C); renderMarquee(C);
  renderAbout(C); renderServices(C); renderCatalogue(C);
  renderTestimonials(C); renderPricing(C); renderContact(C);
  renderFooter(C); renderWhatsApp(C);
  initScrollReveal(); initContactForm(C);
  document.title = `${rfhSanitize(C.businessName)} — ${rfhSanitize(C.tagline)}`;
});

async function loadCloudImages(C) {
  if (!rfhGetFirebaseUrl()) return;
  const cloudLogo = await rfhCloudGetImage('logo');
  if (cloudLogo && cloudLogo !== rfhGetLogo()) {
    rfhSaveLogo(cloudLogo);
    document.querySelectorAll('.logo-img-dynamic').forEach(el => { el.src = cloudLogo; });
  }
  for (const p of (C.products || [])) {
    if (!rfhGetImage(p.id)) {
      const img = await rfhCloudGetImage('prod_' + p.id);
      if (img) {
        rfhSaveImage(p.id, img);
        const el = document.querySelector(`[data-prod-img="${p.id}"]`);
        if (el) el.innerHTML = `<img src="${img}" alt="" style="width:100%;height:100%;object-fit:cover">`;
      }
    }
  }
}

function applyTheme(C) {
  const r = document.documentElement.style;
  r.setProperty('--gold', C.colorGold);   r.setProperty('--gold2', C.colorGold2);
  r.setProperty('--gold3', C.colorGold3); r.setProperty('--bg',    C.colorBg);
  r.setProperty('--bg2',   C.colorBg2);   r.setProperty('--bg3',   C.colorBg3);
  r.setProperty('--cream', C.colorCream); r.setProperty('--muted', C.colorMuted);
}

function renderNav(C) {
  const n = document.getElementById('site-nav'); if (!n) return;
  const logo = rfhGetLogo();
  const logoHtml = logo
    ? `<img src="${logo}" class="logo-img-dynamic" alt="Logo" style="width:42px;height:42px;border-radius:50%;object-fit:cover;box-shadow:0 0 16px rgba(201,150,12,.4)">`
    : `<div class="logo-crown">${rfhSanitize(C.logoEmoji)}</div>`;
  n.innerHTML = `
    <div class="nav-logo">
      ${logoHtml}
      <div class="logo-text">
        <strong>${rfhSanitize(C.businessName)}</strong>
        <span>${rfhSanitize(C.tagline)}</span>
      </div>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">&#9776;</button>
    <ul class="nav-links" id="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#services">Products</a></li>
      <li><a href="#catalogue">Catalogue</a></li>
      <li><a href="#testimonials">Reviews</a></li>
      <li><a href="#pricing">Offers</a></li>
      <li><a href="#contact">Contact</a></li>
      <li class="nav-admin-item"><a href="admin.html" class="nav-admin-link">⚙ Admin</a></li>
    </ul>
    <button class="nav-cta" onclick="rfhScrollTo('catalogue')">${rfhSanitize(C.heroBtnShop || 'Shop Now')}</button>`;
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a:not(.nav-admin-link)').forEach(a =>
    a.addEventListener('click', () => document.getElementById('nav-links').classList.remove('open'))
  );
}

function renderHero(C) {
  const h = document.getElementById('hero-content'); if (!h) return;
  const tags = (C.heroTags || []).map(t => `<span class="prod-tag">${rfhSanitize(t)}</span>`).join('');
  h.innerHTML = `
    <p class="hero-eyebrow">${rfhSanitize(C.heroEyebrow)}</p>
    <h1>${rfhSanitize(C.heroLine1)}<br>${rfhSanitize(C.heroLine2)} <span class="gold">${rfhSanitize(C.heroGold)}</span><br><span class="outline">${rfhSanitize(C.heroLine3)}</span></h1>
    <p class="hero-tagline">${rfhSanitize(C.heroTagline)}</p>
    <p class="hero-sub">${rfhSanitize(C.heroSub)}</p>
    <div class="hero-actions">
      <button class="btn-gold" onclick="rfhScrollTo('catalogue')">${rfhSanitize(C.heroBtnShop)}</button>
      <button class="btn-outline" onclick="rfhScrollTo('contact')">${rfhSanitize(C.heroBtnContact)}</button>
    </div>
    <div class="hero-products">${tags}</div>
    <div class="hero-stats">
      <div class="stat"><div class="stat-num">${rfhSanitize(C.heroStat1Num)}</div><div class="stat-label">${rfhSanitize(C.heroStat1Label)}</div></div>
      <div class="stat"><div class="stat-num">${rfhSanitize(C.heroStat2Num)}</div><div class="stat-label">${rfhSanitize(C.heroStat2Label)}</div></div>
      <div class="stat"><div class="stat-num">${rfhSanitize(C.heroStat3Num)}</div><div class="stat-label">${rfhSanitize(C.heroStat3Label)}</div></div>
    </div>`;
}

function renderMarquee(C) {
  const t = document.getElementById('marquee-track'); if (!t) return;
  const items = C.marqueeItems || [];
  t.innerHTML = [...items, ...items].map(i => `<span class="marquee-item">${rfhSanitize(i)}</span>`).join('');
}

function renderAbout(C) {
  const el = document.getElementById('about-content'); if (!el) return;
  const vals = (C.aboutValues || []).map(v => `
    <div class="value-card">
      <div class="icon">${rfhSanitize(v.icon)}</div>
      <strong>${rfhSanitize(v.title)}</strong>
      <p>${rfhSanitize(v.desc)}</p>
    </div>`).join('');
  const logo = rfhGetLogo();
  const visual = logo
    ? `<img src="${logo}" class="logo-img-dynamic" alt="${rfhSanitize(C.businessName)}" style="width:85%;height:85%;object-fit:contain;filter:drop-shadow(0 0 30px rgba(201,150,12,.3))">`
    : `<div class="about-logo-big">🐝</div>`;
  el.innerHTML = `
    <div class="about-grid">
      <div class="about-text reveal">
        <p class="section-label">About Us</p>
        <h2>${C.aboutTitle}</h2>
        <div class="divider"></div>
        <p>${rfhSanitize(C.aboutP1)}</p>
        <p>${rfhSanitize(C.aboutP2)}</p>
        <div class="values-grid">${vals}</div>
      </div>
      <div class="about-visual reveal">
        ${visual}
        <div class="about-tagline-big">${rfhSanitize(C.tagline)}</div>
        <span class="about-corner tl">✦</span><span class="about-corner tr">✦</span>
        <span class="about-corner bl">✦</span><span class="about-corner br">✦</span>
      </div>
    </div>`;
}

function renderServices(C) {
  const el = document.getElementById('services-grid'); if (!el) return;
  el.innerHTML = (C.services || []).map(s => `
    <div class="service-card reveal">
      <div class="service-num">${rfhSanitize(s.num)}</div>
      <div class="service-icon">${rfhSanitize(s.icon)}</div>
      <h3>${rfhSanitize(s.title)}</h3>
      <p>${rfhSanitize(s.desc)}</p>
    </div>`).join('');
}

function renderCatalogue(C) {
  const filterEl = document.getElementById('catalogue-filters');
  const gridEl   = document.getElementById('catalogue-grid');
  if (!filterEl || !gridEl) return;
  const cats = C.catalogueCategories || [{ id: 'all', label: 'All Items' }];
  filterEl.innerHTML = cats.map((cat, i) =>
    `<button class="filter-btn${i === 0 ? ' active' : ''}" data-cat="${rfhSanitize(cat.id)}" onclick="rfhFilterProducts(this,'${rfhSanitize(cat.id)}')">${rfhSanitize(cat.label)}</button>`
  ).join('');
  gridEl.innerHTML = (C.products || []).map(p => {
    const img = rfhGetImage(p.id);
    const imgHtml = img
      ? `<img src="${img}" alt="${rfhSanitize(p.name)}" style="width:100%;height:100%;object-fit:cover">`
      : `<span style="font-size:3.8rem">${rfhSanitize(p.emoji)}</span>`;
    return `
      <div class="product-card reveal" data-cat="${rfhSanitize(p.cat)}">
        <div class="product-img" data-prod-img="${p.id}">
          ${imgHtml}
          ${p.badge ? `<span class="product-badge">${rfhSanitize(p.badge)}</span>` : ''}
        </div>
        <div class="product-info">
          <div class="cat">${rfhSanitize(p.catLabel)}</div>
          <h4>${rfhSanitize(p.name)}</h4>
          <div class="product-footer">
            <div><div class="price">${rfhSanitize(p.price)}</div><div class="price-note">${rfhSanitize(p.note)}</div></div>
            <button class="enquire-btn" onclick="rfhScrollTo('contact')">Enquire</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderTestimonials(C) {
  const el = document.getElementById('testimonials-grid'); if (!el) return;
  el.innerHTML = (C.testimonials || []).map(t => `
    <div class="testimonial-card reveal">
      <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
      <p>${rfhSanitize(t.text)}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${rfhSanitize(t.initial)}</div>
        <div><div class="author-name">${rfhSanitize(t.name)}</div><div class="author-role">${rfhSanitize(t.role)}</div></div>
      </div>
    </div>`).join('');
}

function renderPricing(C) {
  const el = document.getElementById('pricing-grid'); if (!el) return;
  el.innerHTML = (C.pricingTiers || []).map(tier => `
    <div class="pricing-card${tier.featured ? ' featured' : ''} reveal">
      ${tier.featured ? `<div class="featured-tag">${rfhSanitize(tier.featuredLabel || 'Best Value')}</div>` : ''}
      <div class="plan-name">${rfhSanitize(tier.name)}</div>
      <div class="plan-price">${rfhSanitize(tier.price)}</div>
      <div class="plan-period">${rfhSanitize(tier.period)}</div>
      <ul class="plan-features">
        ${(tier.features || []).map(f => `<li><span class="chk">✦</span>${rfhSanitize(f)}</li>`).join('')}
        ${(tier.disabled || []).map(f => `<li class="off"><span class="chk">✦</span>${rfhSanitize(f)}</li>`).join('')}
      </ul>
      <button class="btn-${tier.btnStyle === 'gold' ? 'gold' : 'outline'}" style="width:100%" onclick="rfhScrollTo('contact')">${rfhSanitize(tier.btnText)}</button>
    </div>`).join('');
}

function renderContact(C) {
  const el = document.getElementById('contact-content'); if (!el) return;
  el.innerHTML = `
    <div class="contact-grid">
      <div class="contact-info reveal">
        <p class="section-label">Find Us</p>
        <h2>Visit <em>${rfhSanitize(C.businessName)}</em></h2>
        <div class="divider"></div>
        <p>Come see our full collection in-store or reach out to enquire about items, custom orders, or bridal packages.</p>
        <div class="contact-detail"><div class="detail-icon">📍</div><div class="detail-text"><strong>Store Address</strong>${rfhSanitize(C.address)}</div></div>
        <div class="contact-detail"><div class="detail-icon">📞</div><div class="detail-text"><strong>Phone / WhatsApp</strong>${rfhSanitize(C.phone1)}${C.phone2 ? ' &nbsp;|&nbsp; ' + rfhSanitize(C.phone2) : ''}</div></div>
        ${C.workingHours ? `<div class="contact-detail"><div class="detail-icon">🕐</div><div class="detail-text"><strong>Working Hours</strong>${rfhSanitize(C.workingHours)}</div></div>` : ''}
        ${C.email ? `<div class="contact-detail"><div class="detail-icon">✉️</div><div class="detail-text"><strong>Email</strong><a href="mailto:${rfhSanitize(C.email)}" style="color:var(--gold2)">${rfhSanitize(C.email)}</a></div></div>` : ''}
        <div class="social-row">
          <a class="social-btn" href="https://facebook.com/${rfhSanitize(C.facebook)}" target="_blank" rel="noopener">👍 Facebook</a>
          <a class="social-btn" href="https://instagram.com/${rfhSanitize(C.instagram)}" target="_blank" rel="noopener">📸 Instagram</a>
        </div>
      </div>
      <div class="reveal">
        <form class="contact-form" id="contact-form" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label>Your Name <span class="req">*</span></label>
              <input type="text" id="cf-name" placeholder="e.g. Gurpreet Kaur" required maxlength="80" autocomplete="name"/>
              <div class="field-error" id="err-name"></div>
            </div>
            <div class="form-group">
              <label>Phone Number <span class="req">*</span></label>
              <input type="tel" id="cf-phone" placeholder="04XX XXX XXX" required maxlength="20" autocomplete="tel"/>
              <div class="field-error" id="err-phone"></div>
            </div>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="cf-email" placeholder="you@example.com" maxlength="120"/>
            <div class="field-error" id="err-email"></div>
          </div>
          <div class="form-group">
            <label>I'm Interested In <span class="req">*</span></label>
            <select id="cf-interest" required>
              <option value="">— Please select —</option>
              ${(C.products || []).map(p => `<option value="${rfhSanitize(p.name)}">${rfhSanitize(p.name)}</option>`).join('')}
              <option value="Wedding / Bridal Package">Wedding / Bridal Package</option>
              <option value="General Enquiry">General Enquiry</option>
            </select>
            <div class="field-error" id="err-interest"></div>
          </div>
          <div class="form-group">
            <label>Your Message</label>
            <textarea id="cf-message" placeholder="Tell us what you're looking for…" maxlength="1000"></textarea>
            <div class="char-count" id="cf-charcount">0 / 1000</div>
          </div>
          <div style="display:none"><input type="text" id="hp-field" tabindex="-1" autocomplete="off"></div>
          <div class="form-submit-row">
            <button type="submit" class="btn-gold" id="cf-submit">Send Enquiry 👑</button>
            <div class="form-success" id="cf-success" style="display:none">✅ Thanks! We'll be in touch soon.</div>
            <div class="form-error-msg" id="cf-error" style="display:none">⚠️ Please fix the errors above.</div>
          </div>
        </form>
        <div class="whatsapp-bar">
          <div><p>💬 Prefer WhatsApp?</p><small>Message us directly for a faster response</small></div>
          <button class="whatsapp-btn" onclick="window.open('https://wa.me/${rfhSanitize(C.whatsapp)}','_blank','noopener')">Chat on WhatsApp</button>
        </div>
      </div>
    </div>
    <div class="location-strip reveal">
      <div class="location-map-icon">🗺️</div>
      <div class="location-details">
        <h4>📍 ${rfhSanitize(C.address)}</h4>
        <p>${rfhSanitize(C.mapNote)}<br>
        📞 <strong style="color:var(--gold2)">${rfhSanitize(C.phone1)}</strong>${C.phone2 ? ` &nbsp;|&nbsp; 📞 <strong style="color:var(--gold2)">${rfhSanitize(C.phone2)}</strong>` : ''}</p>
      </div>
    </div>`;
}

function renderFooter(C) {
  const el = document.getElementById('footer-content'); if (!el) return;
  const logo = rfhGetLogo();
  const logoHtml = logo
    ? `<img src="${logo}" class="logo-img-dynamic" alt="Logo" style="width:40px;height:40px;border-radius:50%;object-fit:cover">`
    : `<div class="logo-crown">${rfhSanitize(C.logoEmoji)}</div>`;
  const pLinks = (C.products || []).slice(0, 6).map(p => `<li><a href="#catalogue">${rfhSanitize(p.name)}</a></li>`).join('');
  el.innerHTML = `
    <div class="footer-top">
      <div class="footer-brand">
        <div class="nav-logo">${logoHtml}<div class="logo-text"><strong>${rfhSanitize(C.businessName)}</strong><span>${rfhSanitize(C.tagline)}</span></div></div>
        <p>${rfhSanitize(C.footerTagline)}</p>
      </div>
      <div class="footer-col"><h4>Products</h4><ul>${pLinks}</ul></div>
      <div class="footer-col"><h4>Services</h4><ul>
        <li><a href="#services">Custom Tailoring</a></li>
        <li><a href="#services">Wholesale Orders</a></li>
        <li><a href="#pricing">Special Offers</a></li>
      </ul></div>
      <div class="footer-col"><h4>Contact</h4><ul>
        <li><a href="#contact">${rfhSanitize(C.addressShort)}</a></li>
        <li><a href="tel:${rfhSanitize(C.phone1.replace(/\s/g,''))}">${rfhSanitize(C.phone1)}</a></li>
        ${C.phone2 ? `<li><a href="tel:${rfhSanitize(C.phone2.replace(/\s/g,''))}">${rfhSanitize(C.phone2)}</a></li>` : ''}
        <li><a href="https://facebook.com/${rfhSanitize(C.facebook)}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="https://instagram.com/${rfhSanitize(C.instagram)}" target="_blank" rel="noopener">@${rfhSanitize(C.instagram)}</a></li>
        <li><a href="admin.html" style="opacity:.35;font-size:.75rem">⚙ Admin Portal</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} <span class="gold">${rfhSanitize(C.businessName)}</span>. All rights reserved.</p>
      <p>🐝 <span class="gold">${rfhSanitize(C.tagline)}</span></p>
    </div>`;
}

/* ══ WHATSAPP FLOATING SLIDER ══ */
function renderWhatsApp(C) {
  const wa = document.getElementById('wa-float'); if (!wa) return;
  const num = rfhSanitize(C.whatsapp || '61409008926');
  const msg = encodeURIComponent('Hi Royal Fashion Hive! I saw your website and would like to enquire about your collection.');
  const waSvg = `<svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  wa.innerHTML = `
    <div class="wa-panel" id="wa-panel">
      <div class="wa-panel-header">
        <div class="wa-panel-avatar">${waSvg.replace('28','22').replace('28','22')}</div>
        <div class="wa-panel-info">
          <strong>Royal Fashion Hive</strong>
          <span>🟢 Online — Usually replies instantly</span>
        </div>
        <button class="wa-panel-close" onclick="closeWaPanel()" aria-label="Close">✕</button>
      </div>
      <div class="wa-panel-body">
        <div class="wa-msg-bubble">
          <p>👋 Sat Sri Akal!</p>
          <p>Welcome to <strong>Royal Fashion Hive</strong>. How can we help you today?</p>
          <span class="wa-msg-time">Just now</span>
        </div>
      </div>
      <a class="wa-panel-btn" href="https://wa.me/${num}?text=${msg}" target="_blank" rel="noopener" onclick="closeWaPanel()">
        ${waSvg.replace('28','18').replace('28','18')} Start Chat on WhatsApp
      </a>
    </div>
    <button class="wa-fab" id="wa-fab" onclick="toggleWa()" aria-label="Chat on WhatsApp">
      <div class="wa-fab-icon">${waSvg}</div>
      <div class="wa-fab-close" style="display:none">✕</div>
      <span class="wa-fab-pulse"></span>
    </button>`;
  if (!sessionStorage.getItem('wa_shown')) {
    setTimeout(() => { openWaPanel(); sessionStorage.setItem('wa_shown','1'); }, 4500);
  }
}
let waOpen = false;
function toggleWa() { waOpen ? closeWaPanel() : openWaPanel(); }
function openWaPanel() {
  waOpen = true;
  document.getElementById('wa-panel').classList.add('open');
  document.querySelector('.wa-fab-icon').style.display = 'none';
  document.querySelector('.wa-fab-close').style.display = 'flex';
}
function closeWaPanel() {
  waOpen = false;
  document.getElementById('wa-panel').classList.remove('open');
  document.querySelector('.wa-fab-icon').style.display = 'flex';
  document.querySelector('.wa-fab-close').style.display = 'none';
}

/* ── CONTACT FORM ── */
function initContactForm(C) {
  const form = document.getElementById('contact-form'); if (!form) return;
  const msg = document.getElementById('cf-message'), counter = document.getElementById('cf-charcount');
  if (msg && counter) msg.addEventListener('input', () => { counter.textContent = `${msg.value.length} / 1000`; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (document.getElementById('hp-field').value) return;
    if (validateContactForm()) {
      const btn = document.getElementById('cf-submit');
      btn.disabled = true; btn.textContent = 'Sending…';
      setTimeout(() => {
        document.getElementById('cf-success').style.display = 'flex';
        document.getElementById('cf-error').style.display = 'none';
        form.reset(); if (counter) counter.textContent = '0 / 1000';
        btn.disabled = false; btn.textContent = 'Send Enquiry 👑';
      }, 800);
    } else { document.getElementById('cf-error').style.display = 'flex'; }
  });
  ['cf-name','cf-phone','cf-email','cf-interest'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
  });
}
function validateContactForm() {
  let ok = true;
  ['cf-name','cf-phone','cf-email','cf-interest'].forEach(id => { if (!validateField(id)) ok = false; });
  return ok;
}
function validateField(id) {
  const el = document.getElementById(id), errEl = document.getElementById('err-' + id.replace('cf-',''));
  if (!el || !errEl) return true;
  const val = el.value.trim(); let err = '';
  if (id==='cf-name')     { if (!val) err='Name is required.'; else if(val.length<2) err='Min 2 characters.'; }
  if (id==='cf-phone')    { if (!val) err='Phone is required.'; else if(!rfhValidatePhone(val)) err='Enter a valid phone number.'; }
  if (id==='cf-email')    { if (val && !rfhValidateEmail(val)) err='Enter a valid email address.'; }
  if (id==='cf-interest') { if (!val) err='Please select an item.'; }
  errEl.textContent = err; el.style.borderColor = err ? '#e53935' : '';
  return !err;
}

function rfhScrollTo(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({behavior:'smooth'}); }
function rfhFilterProducts(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => { card.style.display = (cat==='all'||card.dataset.cat===cat)?'':'none'; });
}
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
