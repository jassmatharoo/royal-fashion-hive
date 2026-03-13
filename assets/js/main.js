/* =========================================================
   Royal Fashion Hive — Site Renderer v2.0
   ========================================================= */
document.addEventListener('DOMContentLoaded',()=>{
  const C=rfhGetConfig();
  applyTheme(C);renderNav(C);renderHero(C);renderMarquee(C);
  renderAbout(C);renderServices(C);renderCatalogue(C);
  renderTestimonials(C);renderPricing(C);renderContact(C);renderFooter(C);
  initScrollReveal();
  initContactForm();
  updatePageTitle(C);
});

function updatePageTitle(C){
  document.title=`${rfhSanitize(C.businessName)} — ${rfhSanitize(C.tagline)}`;
}

/* ── THEME ── */
function applyTheme(C){
  const r=document.documentElement.style;
  r.setProperty('--gold', C.colorGold);  r.setProperty('--gold2',C.colorGold2);
  r.setProperty('--gold3',C.colorGold3); r.setProperty('--bg',   C.colorBg);
  r.setProperty('--bg2',  C.colorBg2);   r.setProperty('--bg3',  C.colorBg3);
  r.setProperty('--cream',C.colorCream); r.setProperty('--muted',C.colorMuted);
}

/* ── NAV ── */
function renderNav(C){
  const n=document.getElementById('site-nav');if(!n)return;
  const logo=rfhGetLogo();
  const logoHtml=logo
    ?`<img src="${logo}" alt="Logo" style="width:42px;height:42px;border-radius:50%;object-fit:cover;box-shadow:0 0 16px rgba(201,150,12,.4)">`
    :`<div class="logo-crown">${rfhSanitize(C.logoEmoji)}</div>`;
  n.innerHTML=`
    <div class="nav-logo">
      ${logoHtml}
      <div class="logo-text">
        <strong>${rfhSanitize(C.businessName)}</strong>
        <span>${rfhSanitize(C.tagline)}</span>
      </div>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu">&#9776;</button>
    <ul class="nav-links" id="nav-links">
      <li><a href="#about">About</a></li><li><a href="#services">Products</a></li>
      <li><a href="#catalogue">Catalogue</a></li><li><a href="#testimonials">Reviews</a></li>
      <li><a href="#pricing">Offers</a></li><li><a href="#contact">Contact</a></li>
    </ul>
    <button class="nav-cta" onclick="rfhScrollTo('catalogue')">${rfhSanitize(C.heroBtnShop||'Shop Now')}</button>`;
  document.getElementById('hamburger').addEventListener('click',()=>{
    document.getElementById('nav-links').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a=>
    a.addEventListener('click',()=>document.getElementById('nav-links').classList.remove('open'))
  );
}

/* ── HERO ── */
function renderHero(C){
  const h=document.getElementById('hero-content');if(!h)return;
  const tags=(C.heroTags||[]).map(t=>`<span class="prod-tag">${rfhSanitize(t)}</span>`).join('');
  h.innerHTML=`
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

/* ── MARQUEE ── */
function renderMarquee(C){
  const t=document.getElementById('marquee-track');if(!t)return;
  const items=C.marqueeItems||[];
  t.innerHTML=[...items,...items].map(i=>`<span class="marquee-item">${rfhSanitize(i)}</span>`).join('');
}

/* ── ABOUT ── */
function renderAbout(C){
  const el=document.getElementById('about-content');if(!el)return;
  const vals=(C.aboutValues||[]).map(v=>`
    <div class="value-card">
      <div class="icon">${rfhSanitize(v.icon)}</div>
      <strong>${rfhSanitize(v.title)}</strong>
      <p>${rfhSanitize(v.desc)}</p>
    </div>`).join('');
  const logo=rfhGetLogo();
  const visualContent=logo
    ?`<img src="${logo}" alt="${rfhSanitize(C.businessName)}" style="width:85%;height:85%;object-fit:contain;filter:drop-shadow(0 0 30px rgba(201,150,12,.3))">`
    :`<div class="about-logo-big">🐝</div>`;
  el.innerHTML=`
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
        ${visualContent}
        <div class="about-tagline-big">${rfhSanitize(C.tagline)}</div>
        <span class="about-corner tl">✦</span><span class="about-corner tr">✦</span>
        <span class="about-corner bl">✦</span><span class="about-corner br">✦</span>
      </div>
    </div>`;
}

/* ── SERVICES ── */
function renderServices(C){
  const el=document.getElementById('services-grid');if(!el)return;
  el.innerHTML=(C.services||[]).map(s=>`
    <div class="service-card reveal">
      <div class="service-num">${rfhSanitize(s.num)}</div>
      <div class="service-icon">${rfhSanitize(s.icon)}</div>
      <h3>${rfhSanitize(s.title)}</h3>
      <p>${rfhSanitize(s.desc)}</p>
    </div>`).join('');
}

/* ── CATALOGUE ── */
function renderCatalogue(C){
  const filterEl=document.getElementById('catalogue-filters');
  const gridEl=document.getElementById('catalogue-grid');
  if(!filterEl||!gridEl)return;
  const cats=C.catalogueCategories||[{id:'all',label:'All Items'}];
  filterEl.innerHTML=cats.map((cat,i)=>
    `<button class="filter-btn${i===0?' active':''}" data-cat="${rfhSanitize(cat.id)}" onclick="rfhFilterProducts(this,'${rfhSanitize(cat.id)}')">${rfhSanitize(cat.label)}</button>`
  ).join('');
  gridEl.innerHTML=(C.products||[]).map(p=>{
    const img=rfhGetImage(p.id);
    const imgHtml=img
      ?`<img src="${img}" alt="${rfhSanitize(p.name)}" style="width:100%;height:100%;object-fit:cover">`
      :`<span style="font-size:3.8rem">${rfhSanitize(p.emoji)}</span>`;
    return `
      <div class="product-card reveal" data-cat="${rfhSanitize(p.cat)}">
        <div class="product-img">${imgHtml}${p.badge?`<span class="product-badge">${rfhSanitize(p.badge)}</span>`:''}</div>
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

/* ── TESTIMONIALS ── */
function renderTestimonials(C){
  const el=document.getElementById('testimonials-grid');if(!el)return;
  el.innerHTML=(C.testimonials||[]).map(t=>`
    <div class="testimonial-card reveal">
      <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
      <p>${rfhSanitize(t.text)}</p>
      <div class="testimonial-author">
        <div class="author-avatar">${rfhSanitize(t.initial)}</div>
        <div><div class="author-name">${rfhSanitize(t.name)}</div><div class="author-role">${rfhSanitize(t.role)}</div></div>
      </div>
    </div>`).join('');
}

/* ── PRICING ── */
function renderPricing(C){
  const el=document.getElementById('pricing-grid');if(!el)return;
  el.innerHTML=(C.pricingTiers||[]).map(tier=>`
    <div class="pricing-card${tier.featured?' featured':''} reveal">
      ${tier.featured?`<div class="featured-tag">${rfhSanitize(tier.featuredLabel||'Best Value')}</div>`:''}
      <div class="plan-name">${rfhSanitize(tier.name)}</div>
      <div class="plan-price">${rfhSanitize(tier.price)}</div>
      <div class="plan-period">${rfhSanitize(tier.period)}</div>
      <ul class="plan-features">
        ${(tier.features||[]).map(f=>`<li><span class="chk">✦</span>${rfhSanitize(f)}</li>`).join('')}
        ${(tier.disabled||[]).map(f=>`<li class="off"><span class="chk">✦</span>${rfhSanitize(f)}</li>`).join('')}
      </ul>
      <button class="btn-${tier.btnStyle==='gold'?'gold':'outline'}" style="width:100%" onclick="rfhScrollTo('contact')">${rfhSanitize(tier.btnText)}</button>
    </div>`).join('');
}

/* ── CONTACT ── */
function renderContact(C){
  const el=document.getElementById('contact-content');if(!el)return;
  el.innerHTML=`
    <div class="contact-grid">
      <div class="contact-info reveal">
        <p class="section-label">Find Us</p>
        <h2>Visit <em>${rfhSanitize(C.businessName)}</em></h2>
        <div class="divider"></div>
        <p>Come see our full collection in-store or reach out to enquire about items, custom orders, or bridal packages.</p>
        <div class="contact-detail"><div class="detail-icon">📍</div><div class="detail-text"><strong>Store Address</strong>${rfhSanitize(C.address)}</div></div>
        <div class="contact-detail"><div class="detail-icon">📞</div><div class="detail-text"><strong>Phone / WhatsApp</strong>${rfhSanitize(C.phone1)}${C.phone2?' &nbsp;|&nbsp; '+rfhSanitize(C.phone2):''}</div></div>
        ${C.workingHours?`<div class="contact-detail"><div class="detail-icon">🕐</div><div class="detail-text"><strong>Working Hours</strong>${rfhSanitize(C.workingHours)}</div></div>`:''}
        ${C.email?`<div class="contact-detail"><div class="detail-icon">✉️</div><div class="detail-text"><strong>Email</strong><a href="mailto:${rfhSanitize(C.email)}" style="color:var(--gold2)">${rfhSanitize(C.email)}</a></div></div>`:''}
        <div class="contact-detail"><div class="detail-icon">📱</div><div class="detail-text"><strong>Social Media</strong>@${rfhSanitize(C.instagram)}</div></div>
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
            <input type="email" id="cf-email" placeholder="you@example.com" maxlength="120" autocomplete="email"/>
            <div class="field-error" id="err-email"></div>
          </div>
          <div class="form-group">
            <label>I'm Interested In <span class="req">*</span></label>
            <select id="cf-interest" required>
              <option value="">— Please select —</option>
              ${(rfhGetConfig().products||[]).map(p=>`<option value="${rfhSanitize(p.name)}">${rfhSanitize(p.name)}</option>`).join('')}
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
          <div id="cf-honeypot" style="display:none"><input type="text" id="hp-field" tabindex="-1" autocomplete="off"></div>
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
        📞 <strong style="color:var(--gold2)">${rfhSanitize(C.phone1)}</strong>${C.phone2?` &nbsp;|&nbsp; 📞 <strong style="color:var(--gold2)">${rfhSanitize(C.phone2)}</strong>`:''}</p>
      </div>
    </div>`;
}

/* ── FOOTER ── */
function renderFooter(C){
  const el=document.getElementById('footer-content');if(!el)return;
  const logo=rfhGetLogo();
  const logoHtml=logo
    ?`<img src="${logo}" alt="Logo" style="width:40px;height:40px;border-radius:50%;object-fit:cover">`
    :`<div class="logo-crown">${rfhSanitize(C.logoEmoji)}</div>`;
  const pLinks=(C.products||[]).slice(0,6).map(p=>`<li><a href="#catalogue">${rfhSanitize(p.name)}</a></li>`).join('');
  el.innerHTML=`
    <div class="footer-top">
      <div class="footer-brand">
        <div class="nav-logo">
          ${logoHtml}
          <div class="logo-text"><strong>${rfhSanitize(C.businessName)}</strong><span>${rfhSanitize(C.tagline)}</span></div>
        </div>
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
        ${C.phone2?`<li><a href="tel:${rfhSanitize(C.phone2.replace(/\s/g,''))}">${rfhSanitize(C.phone2)}</a></li>`:''}
        <li><a href="https://facebook.com/${rfhSanitize(C.facebook)}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="https://instagram.com/${rfhSanitize(C.instagram)}" target="_blank" rel="noopener">@${rfhSanitize(C.instagram)}</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} <span class="gold">${rfhSanitize(C.businessName)}</span>. All rights reserved.</p>
      <p>🐝 <span class="gold">${rfhSanitize(C.tagline)}</span></p>
    </div>`;
}

/* ── CONTACT FORM VALIDATION ── */
function initContactForm(){
  const form=document.getElementById('contact-form');
  if(!form)return;
  // Char counter
  const msg=document.getElementById('cf-message');
  const counter=document.getElementById('cf-charcount');
  if(msg&&counter){
    msg.addEventListener('input',()=>{counter.textContent=`${msg.value.length} / 1000`;});
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    // Honeypot check (bot trap)
    if(document.getElementById('hp-field').value){return;}
    if(validateContactForm()){
      const btn=document.getElementById('cf-submit');
      btn.disabled=true;btn.textContent='Sending…';
      setTimeout(()=>{
        document.getElementById('cf-success').style.display='flex';
        document.getElementById('cf-error').style.display='none';
        form.reset();
        if(counter)counter.textContent='0 / 1000';
        btn.disabled=false;btn.textContent='Send Enquiry 👑';
      },800);
    } else {
      document.getElementById('cf-error').style.display='flex';
    }
  });
  // Live validation
  ['cf-name','cf-phone','cf-email','cf-interest'].forEach(id=>{
    const el=document.getElementById(id);
    if(el)el.addEventListener('blur',()=>validateField(id));
  });
}

function validateContactForm(){
  let ok=true;
  if(!validateField('cf-name'))ok=false;
  if(!validateField('cf-phone'))ok=false;
  if(!validateField('cf-email'))ok=false;
  if(!validateField('cf-interest'))ok=false;
  return ok;
}

function validateField(id){
  const el=document.getElementById(id);
  const errEl=document.getElementById('err-'+id.replace('cf-',''));
  if(!el||!errEl)return true;
  const val=el.value.trim();
  let err='';
  switch(id){
    case 'cf-name':
      if(!val)err='Name is required.';
      else if(val.length<2)err='Name must be at least 2 characters.';
      break;
    case 'cf-phone':
      if(!val)err='Phone number is required.';
      else if(!rfhValidatePhone(val))err='Enter a valid phone number.';
      break;
    case 'cf-email':
      if(val&&!rfhValidateEmail(val))err='Enter a valid email address.';
      break;
    case 'cf-interest':
      if(!val)err='Please select an item of interest.';
      break;
  }
  errEl.textContent=err;
  el.style.borderColor=err?'#e53935':'';
  return !err;
}

/* ── UTILS ── */
function rfhScrollTo(id){
  const el=document.getElementById(id);
  if(el)el.scrollIntoView({behavior:'smooth'});
}
function rfhFilterProducts(btn,cat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card=>{
    card.style.display=(cat==='all'||card.dataset.cat===cat)?'':'none';
  });
}
function initScrollReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
  },{threshold:0.08});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}
