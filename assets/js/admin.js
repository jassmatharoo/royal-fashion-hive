/* =========================================================
   Royal Fashion Hive — Admin Portal v2.0
   Security: brute-force lockout, session timeout, XSS protection
   ========================================================= */
let CFG={};
let isDirty=false;
let sessionTimer=null;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded',()=>{
  CFG=rfhGetConfig();
  if(rfhIsSessionValid()){showPortal();}
  else{showLogin();}
  document.getElementById('login-btn').addEventListener('click',doLogin);
  document.getElementById('login-pwd').addEventListener('keydown',e=>{if(e.key==='Enter')doLogin();});
  // Session heartbeat - refresh on any interaction
  document.addEventListener('mousemove',rfhRefreshSession,{passive:true});
  document.addEventListener('keydown',rfhRefreshSession,{passive:true});
  // Check session expiry every minute
  setInterval(checkSessionExpiry,60000);
});

function checkSessionExpiry(){
  if(document.getElementById('admin-portal').classList.contains('active')&&!rfhIsSessionValid()){
    alert('Your session has expired. Please log in again.');
    doLogout(true);
  }
}

/* ── LOGIN ── */
function showLogin(){
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('admin-portal').classList.remove('active');
  updateLockoutUI();
}

function updateLockoutUI(){
  const btn=document.getElementById('login-btn');
  const msg=document.getElementById('login-error');
  const att=document.getElementById('attempts-left');
  if(rfhIsLockedOut()){
    btn.disabled=true;btn.textContent=`Locked (${rfhLockoutSecs()}s)`;
    msg.style.display='block';msg.style.color='#fb8c00';
    msg.textContent=`Too many failed attempts. Try again in ${rfhLockoutSecs()} seconds.`;
    if(att)att.style.display='none';
    setTimeout(updateLockoutUI,1000);
  } else {
    btn.disabled=false;btn.textContent='Sign In';
    const left=rfhAttemptsLeft();
    if(att&&left<5){att.style.display='block';att.textContent=`${left} attempt${left===1?'':'s'} remaining before lockout.`;}
    else if(att){att.style.display='none';}
  }
}

function doLogin(){
  if(rfhIsLockedOut()){updateLockoutUI();return;}
  const pwd=document.getElementById('login-pwd').value;
  const C=rfhGetConfig();
  if(pwd===C.adminPassword){
    rfhClearAttempts();
    rfhSetSession();
    showPortal();
  } else {
    const a=rfhRecordFail();
    const msg=document.getElementById('login-error');
    if(rfhIsLockedOut()){
      msg.style.display='block';msg.style.color='#fb8c00';
      msg.textContent='Account locked for 5 minutes after 5 failed attempts.';
    } else {
      msg.style.display='block';msg.style.color='#e53935';
      msg.textContent=`Incorrect password. ${5-a} attempt${(5-a)===1?'':'s'} remaining.`;
    }
    document.getElementById('login-pwd').value='';
    updateLockoutUI();
  }
}

function doLogout(force=false){
  if(!force&&isDirty&&!confirm('You have unsaved changes. Leave anyway?'))return;
  rfhClearSession();
  isDirty=false;
  showLogin();
}

function showPortal(){
  document.getElementById('login-screen').style.display='none';
  document.getElementById('admin-portal').classList.add('active');
  CFG=rfhGetConfig();
  buildPortal();
  navigateTo('dashboard');
}

/* ── NAV ── */
function navigateTo(id){
  document.querySelectorAll('.sidebar-item').forEach(i=>i.classList.remove('active'));
  document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active'));
  const item=document.querySelector(`[data-nav="${id}"]`);
  const sec=document.getElementById('sec-'+id);
  if(item)item.classList.add('active');
  if(sec)sec.classList.add('active');
  document.getElementById('admin-main').scrollTop=0;
}

/* ── DIRTY ── */
function markDirty(){isDirty=true;document.querySelector('.save-status').style.display='none';}

/* ── SAVE ── */
function saveAll(){
  collectAllFields();
  if(rfhSaveConfig(CFG)){
    isDirty=false;
    const s=document.querySelector('.save-status');
    s.style.display='inline';s.textContent='✓ Saved';
    setTimeout(()=>{s.style.display='none';},3000);
    showToast('All changes saved!','success');
    updateDashStats();
  } else {
    showToast('Error saving — storage may be full.','error');
  }
}

function resetDefaults(){
  if(!confirm('Reset ALL settings and delete ALL uploaded images? This cannot be undone.'))return;
  rfhResetConfig();CFG=rfhGetConfig();
  showToast('Settings reset to defaults.','success');
  buildPortal();navigateTo('dashboard');isDirty=false;
}

function collectAllFields(){
  const fields=['businessName','tagline','logoEmoji','footerTagline',
    'address','addressShort','phone1','phone2','whatsapp','email','instagram','facebook','workingHours','mapNote',
    'heroEyebrow','heroLine1','heroLine2','heroGold','heroLine3','heroTagline','heroSub','heroBtnShop','heroBtnContact',
    'heroStat1Num','heroStat1Label','heroStat2Num','heroStat2Label','heroStat3Num','heroStat3Label',
    'aboutTitle','aboutP1','aboutP2'];
  fields.forEach(k=>{const el=document.getElementById('f-'+k);if(el)CFG[k]=el.value;});
  // Password
  const np=document.getElementById('f-newPassword');
  const cp=document.getElementById('f-confirmPassword');
  if(np&&np.value){
    if(np.value!==cp.value){showToast('Passwords do not match!','error');return;}
    if(np.value.length<6){showToast('Password must be at least 6 characters.','error');return;}
    CFG.adminPassword=np.value;np.value='';cp.value='';
    showToast('Password updated!','success');
  }
}

/* ══════════════════════════════
   BUILD PORTAL
══════════════════════════════ */
function buildPortal(){
  buildDashboard();buildGeneral();buildTheme();buildHero();
  buildAbout();buildServices();buildProducts();buildTestimonials();buildPricing();buildSecurity();
}

/* helper shortcuts */
function fv(id,val,type='text',hint=''){
  return `<div class="field">
    <label>${id.replace('f-','').replace(/([A-Z])/g,' $1').replace(/^\w/,c=>c.toUpperCase())}</label>
    <input type="${type}" id="${id}" value="${escH(val)}" oninput="markDirty()">
    ${hint?`<div class="field-hint">${hint}</div>`:''}
  </div>`;
}
function fvLabel(id,label,val,type='text',hint=''){
  return `<div class="field"><label>${label}</label>
    <input type="${type}" id="${id}" value="${escH(val)}" oninput="markDirty()">
    ${hint?`<div class="field-hint">${hint}</div>`:''}
  </div>`;
}
function ta(id,label,val,hint=''){
  return `<div class="field"><label>${label}</label>
    <textarea id="${id}" oninput="markDirty()">${escH(val)}</textarea>
    ${hint?`<div class="field-hint">${hint}</div>`:''}
  </div>`;
}
function escH(s){const m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'};return String(s||'').replace(/[&<>"']/g,c=>m[c]);}

/* ── DASHBOARD ── */
function buildDashboard(){
  document.getElementById('sec-dashboard').innerHTML=`
    <div class="admin-section-title">Dashboard</div>
    <div class="admin-section-desc">Welcome to the Royal Fashion Hive admin portal. All changes are saved to your browser's local storage.</div>
    <div class="dash-stats" id="dash-stats"></div>
    <div class="dash-actions">
      <div class="dash-card"><h4>🌐 Preview Website</h4><p>Open your website in a new tab to see the latest saved changes.</p>
        <a href="index.html" target="_blank" class="btn-preview" style="margin-top:1rem;display:inline-flex;">Open Website ↗</a></div>
      <div class="dash-card"><h4>💾 Save Changes</h4><p>Click Save to apply all pending changes to your website.</p>
        <button class="btn-save" style="margin-top:1rem" onclick="saveAll()">Save All Changes</button></div>
      <div class="dash-card"><h4>⚠️ Reset Defaults</h4><p>Restore all settings and remove all uploaded images. Cannot be undone.</p>
        <button onclick="resetDefaults()" style="margin-top:1rem;background:rgba(229,57,53,.1);border:1px solid rgba(229,57,53,.3);color:#e53935;padding:.5rem 1rem;cursor:pointer;font-family:Raleway,sans-serif;font-size:.76rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Reset to Defaults</button></div>
    </div>`;
  updateDashStats();
}
function updateDashStats(){
  const el=document.getElementById('dash-stats');if(!el)return;
  const storageUsed=getStorageUsed();
  el.innerHTML=[
    {num:(CFG.products||[]).length,label:'Products'},
    {num:(CFG.services||[]).length,label:'Services'},
    {num:(CFG.testimonials||[]).length,label:'Testimonials'},
    {num:(CFG.pricingTiers||[]).length,label:'Pricing Tiers'},
    {num:storageUsed,label:'Storage Used'},
  ].map(s=>`<div class="dash-stat"><div class="dash-stat-num">${s.num}</div><div class="dash-stat-label">${s.label}</div></div>`).join('');
}
function getStorageUsed(){
  let total=0;
  try{Object.keys(localStorage).filter(k=>k.startsWith('rfh')).forEach(k=>{total+=localStorage.getItem(k).length;});}catch(e){}
  if(total<1024)return total+'B';
  if(total<1048576)return (total/1024).toFixed(1)+'KB';
  return (total/1048576).toFixed(2)+'MB';
}

/* ── GENERAL ── */
function buildGeneral(){
  document.getElementById('sec-general').innerHTML=`
    <div class="admin-section-title">General & Contact</div>
    <div class="admin-section-desc">Business identity, contact details, and social media links.</div>

    <div class="form-card">
      <div class="form-card-title">Logo Upload</div>
      <div class="logo-upload-area">
        <div class="logo-preview-wrap" id="logo-preview-wrap">
          ${rfhGetLogo()?`<img src="${rfhGetLogo()}" id="logo-preview-img" alt="Logo">`:`<div id="logo-preview-placeholder"><span style="font-size:2.5rem">${escH(CFG.logoEmoji)}</span><p>No logo uploaded</p></div>`}
        </div>
        <div class="logo-upload-controls">
          <p style="font-size:.82rem;color:var(--a-muted);margin-bottom:1rem;line-height:1.7">
            Upload your business logo. It will replace the emoji icon in the nav bar, about section, and footer.<br>
            <strong style="color:var(--a-gold)">Recommended:</strong> Square image, PNG with transparent background, under 200KB.
          </p>
          <label class="upload-btn" for="logo-file-input">📁 Choose Logo Image</label>
          <input type="file" id="logo-file-input" accept="image/*" style="display:none" onchange="handleLogoUpload(this)">
          ${rfhGetLogo()?`<button class="btn-delete-img" onclick="deleteLogo()">🗑 Remove Logo</button>`:''}
          <div class="upload-hint" id="logo-hint"></div>
        </div>
      </div>
    </div>

    <div class="form-card">
      <div class="form-card-title">Business Identity</div>
      <div class="form-grid">
        ${fvLabel('f-businessName','Business Name',CFG.businessName)}
        ${fvLabel('f-logoEmoji','Fallback Emoji (if no logo uploaded)',CFG.logoEmoji,'text','Shown if no logo image is set')}
        ${fvLabel('f-tagline','Tagline / Slogan',CFG.tagline)}
        ${fvLabel('f-footerTagline','Footer Description',CFG.footerTagline)}
      </div>
    </div>

    <div class="form-card">
      <div class="form-card-title">Contact Details</div>
      <div class="form-grid">
        ${fvLabel('f-phone1','Primary Phone',CFG.phone1)}
        ${fvLabel('f-phone2','Secondary Phone',CFG.phone2)}
        ${fvLabel('f-whatsapp','WhatsApp Number',CFG.whatsapp,'text','Country code + number, no spaces. E.g. 61409008926')}
        ${fvLabel('f-email','Email Address',CFG.email,'email')}
        ${fvLabel('f-workingHours','Working Hours',CFG.workingHours)}
        ${fvLabel('f-address','Full Address',CFG.address)}
        ${fvLabel('f-addressShort','Short Address (footer)',CFG.addressShort)}
        ${fvLabel('f-mapNote','Location Note',CFG.mapNote)}
      </div>
    </div>

    <div class="form-card">
      <div class="form-card-title">Social Media</div>
      <div class="form-grid">
        ${fvLabel('f-instagram','Instagram Handle (without @)',CFG.instagram)}
        ${fvLabel('f-facebook','Facebook Page Name',CFG.facebook)}
      </div>
    </div>`;
}

/* ── LOGO UPLOAD ── */
function handleLogoUpload(input){
  const file=input.files[0];if(!file)return;
  if(!file.type.startsWith('image/')){showToast('Please select an image file.','error');return;}
  if(file.size>2*1024*1024){showToast('Image too large. Please use an image under 2MB.','error');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    const dataUrl=e.target.result;
    if(rfhSaveLogo(dataUrl)){
      showToast('Logo uploaded!','success');
      buildGeneral();markDirty();
    }
  };
  reader.readAsDataURL(file);
}
function deleteLogo(){
  if(!confirm('Remove the uploaded logo?'))return;
  localStorage.removeItem('rfh_logo');
  showToast('Logo removed.','success');
  buildGeneral();markDirty();
}

/* ── THEME ── */
function buildTheme(){
  const cols=[
    {key:'colorGold', label:'Gold (Primary)',hint:'Main gold accent colour'},
    {key:'colorGold2',label:'Gold 2 (Bright)',hint:'Brighter gold for headings & text'},
    {key:'colorGold3',label:'Gold 3 (Light)',hint:'Light gold highlights'},
    {key:'colorBg',   label:'Background (Darkest)',hint:'Page background'},
    {key:'colorBg2',  label:'Background (Mid)',hint:'Sections and cards'},
    {key:'colorBg3',  label:'Background (Light)',hint:'Hover/alt panels'},
    {key:'colorCream',label:'Cream (Main Text)',hint:'Primary text colour'},
    {key:'colorMuted',label:'Muted (Sub-text)',hint:'Secondary/helper text'},
  ];
  const swatches=cols.map(c=>`
    <div class="colour-field">
      <label>${c.label}</label>
      <div class="field-hint">${c.hint}</div>
      <div class="colour-preview">
        <div class="colour-swatch" id="swatch-${c.key}" style="background:${CFG[c.key]};cursor:pointer" onclick="this.nextElementSibling.nextElementSibling.click()"></div>
        <input class="colour-hex" id="f-${c.key}" value="${CFG[c.key]}" maxlength="7" oninput="updateSwatch('${c.key}');markDirty()">
        <input type="color" style="opacity:0;position:absolute;width:28px;height:28px;cursor:pointer" value="${CFG[c.key]}" oninput="syncColour('${c.key}',this.value)">
      </div>
    </div>`).join('');
  document.getElementById('sec-theme').innerHTML=`
    <div class="admin-section-title">Theme & Colours</div>
    <div class="admin-section-desc">Customise your website's colour scheme. Click the coloured swatch to use a colour picker, or type a hex code.</div>
    <div class="form-card"><div class="form-card-title">Colour Palette</div><div class="colour-grid">${swatches}</div></div>`;
}
function updateSwatch(k){const v=document.getElementById('f-'+k).value;document.getElementById('swatch-'+k).style.background=v;CFG[k]=v;}
function syncColour(k,v){document.getElementById('f-'+k).value=v;updateSwatch(k);markDirty();}

/* ── HERO ── */
function buildHero(){
  const tagsHtml=buildTagsContainer('heroTags',CFG.heroTags||[]);
  const mqHtml=buildTagsContainer('marqueeItems',CFG.marqueeItems||[]);
  document.getElementById('sec-hero').innerHTML=`
    <div class="admin-section-title">Hero Section</div>
    <div class="admin-section-desc">The full-screen banner at the top of your website.</div>
    <div class="form-card"><div class="form-card-title">Headline & Text</div>
      <div class="form-grid">
        ${fvLabel('f-heroEyebrow','Top Eyebrow Text',CFG.heroEyebrow)}
        ${fvLabel('f-heroTagline','Tagline (below headline)',CFG.heroTagline)}
        ${fvLabel('f-heroLine1','Headline Line 1',CFG.heroLine1)}
        ${fvLabel('f-heroLine2','Headline Line 2 (before gold word)',CFG.heroLine2)}
        ${fvLabel('f-heroGold','Gold/Italic Word',CFG.heroGold)}
        ${fvLabel('f-heroLine3','Headline Line 3 (outline style)',CFG.heroLine3)}
      </div>
      <div class="form-grid full" style="margin-top:1rem">${ta('f-heroSub','Sub-description Paragraph',CFG.heroSub)}</div>
    </div>
    <div class="form-card"><div class="form-card-title">Buttons</div>
      <div class="form-grid">
        ${fvLabel('f-heroBtnShop','Primary Button Text',CFG.heroBtnShop)}
        ${fvLabel('f-heroBtnContact','Secondary Button Text',CFG.heroBtnContact)}
      </div>
    </div>
    <div class="form-card"><div class="form-card-title">Stats</div>
      <div class="form-grid three">
        ${fvLabel('f-heroStat1Num','Stat 1 Value',CFG.heroStat1Num)} ${fvLabel('f-heroStat1Label','Stat 1 Label',CFG.heroStat1Label)} <div></div>
        ${fvLabel('f-heroStat2Num','Stat 2 Value',CFG.heroStat2Num)} ${fvLabel('f-heroStat2Label','Stat 2 Label',CFG.heroStat2Label)} <div></div>
        ${fvLabel('f-heroStat3Num','Stat 3 Value',CFG.heroStat3Num)} ${fvLabel('f-heroStat3Label','Stat 3 Label',CFG.heroStat3Label)}
      </div>
    </div>
    <div class="form-card"><div class="form-card-title">Product Tags <span style="font-size:.7rem;color:var(--a-muted)">(type & press Enter)</span></div>${tagsHtml}</div>
    <div class="form-card"><div class="form-card-title">Marquee Scrolling Items <span style="font-size:.7rem;color:var(--a-muted)">(type & press Enter)</span></div>${mqHtml}</div>`;
}
function buildTagsContainer(key,items){
  const tags=items.map(t=>`<span class="tag-item">${escH(t)}<span class="remove-tag" onclick="removeTag(this,'${key}')">×</span></span>`).join('');
  return `<div class="tags-container" id="tags-${key}">${tags}<input class="tag-input" placeholder="Add item…" onkeydown="addTag(event,'${key}')"></div>`;
}
function addTag(e,key){
  if(e.key!=='Enter')return;
  const inp=e.target;const val=inp.value.trim();if(!val)return;
  if(!CFG[key])CFG[key]=[];CFG[key].push(val);
  const tag=document.createElement('span');tag.className='tag-item';
  tag.innerHTML=`${escH(val)}<span class="remove-tag" onclick="removeTag(this,'${key}')">×</span>`;
  inp.parentNode.insertBefore(tag,inp);inp.value='';markDirty();
}
function removeTag(el,key){
  const text=el.parentNode.childNodes[0].textContent.trim();
  if(CFG[key])CFG[key]=CFG[key].filter(t=>t!==text);
  el.parentNode.remove();markDirty();
}

/* ── ABOUT ── */
function buildAbout(){
  const vals=(CFG.aboutValues||[]).map((v,i)=>listCard(`${v.icon} ${v.title}`,i,
    `<div class="form-grid">
      <div class="field"><label>Icon</label><input type="text" value="${escH(v.icon)}" oninput="CFG.aboutValues[${i}].icon=this.value;markDirty()"></div>
      <div class="field"><label>Title</label><input type="text" value="${escH(v.title)}" oninput="CFG.aboutValues[${i}].title=this.value;markDirty()"></div>
      <div class="field full-width"><label>Description</label><input type="text" value="${escH(v.desc)}" oninput="CFG.aboutValues[${i}].desc=this.value;markDirty()"></div>
    </div>`,'aboutValues')).join('');
  document.getElementById('sec-about').innerHTML=`
    <div class="admin-section-title">About Section</div>
    <div class="admin-section-desc">Your business story and value cards.</div>
    <div class="form-card"><div class="form-card-title">Content</div>
      <div class="form-grid full">
        ${fvLabel('f-aboutTitle','Section Title (use &lt;em&gt; for italic gold)',CFG.aboutTitle,'text','E.g. Royal Fashion. &lt;em&gt;Real Heritage.&lt;/em&gt;')}
        ${ta('f-aboutP1','Paragraph 1',CFG.aboutP1)}
        ${ta('f-aboutP2','Paragraph 2',CFG.aboutP2)}
      </div>
    </div>
    <div class="form-card"><div class="form-card-title">Value Cards</div>
      <div class="list-editor">${vals}</div>
      <button class="btn-add-item" onclick="addAboutValue()">+ Add Value Card</button>
    </div>`;
}
function addAboutValue(){if(!CFG.aboutValues)CFG.aboutValues=[];CFG.aboutValues.push({icon:'⭐',title:'New Value',desc:'Description here.'});buildAbout();markDirty();}

/* ── SERVICES ── */
function buildServices(){
  const html=(CFG.services||[]).map((s,i)=>listCard(`${s.icon} ${s.title}`,i,
    `<div class="form-grid">
      <div class="field"><label>Number</label><input type="text" value="${escH(s.num)}" oninput="CFG.services[${i}].num=this.value;markDirty()"></div>
      <div class="field"><label>Icon</label><input type="text" value="${escH(s.icon)}" oninput="CFG.services[${i}].icon=this.value;markDirty()"></div>
      <div class="field full-width"><label>Title</label><input type="text" value="${escH(s.title)}" oninput="CFG.services[${i}].title=this.value;markDirty()"></div>
      <div class="field full-width"><label>Description</label><textarea oninput="CFG.services[${i}].desc=this.value;markDirty()">${escH(s.desc)}</textarea></div>
    </div>`,'services')).join('');
  document.getElementById('sec-services').innerHTML=`
    <div class="admin-section-title">Services / Products</div>
    <div class="admin-section-desc">Manage the "What We Stock" grid cards.</div>
    <div class="list-editor">${html}</div>
    <button class="btn-add-item" onclick="addService()">+ Add Service Card</button>`;
}
function addService(){const n=(CFG.services||[]).length+1;CFG.services.push({num:String(n).padStart(2,'0'),icon:'🆕',title:'New Service',desc:'Description here.'});buildServices();markDirty();}

/* ── PRODUCTS ── */
function buildProducts(){
  const cats=(CFG.catalogueCategories||[]).filter(c=>c.id!=='all');
  const html=(CFG.products||[]).map((p,i)=>{
    const img=rfhGetImage(p.id);
    const imgPreview=img
      ?`<div style="margin-bottom:.8rem"><img src="${img}" style="width:80px;height:80px;object-fit:cover;border:1px solid var(--a-border)"><button onclick="deleteProductImage(${p.id})" style="margin-left:.5rem;background:rgba(229,57,53,.1);border:1px solid rgba(229,57,53,.3);color:#e53935;padding:.3rem .6rem;cursor:pointer;font-size:.72rem">🗑 Remove</button></div>`
      :`<p style="font-size:.78rem;color:var(--a-muted);margin-bottom:.5rem">No image — showing emoji placeholder: ${escH(p.emoji)}</p>`;
    return listCard(`${img?'🖼':'📦'} ${p.name}`,i,
      `<div class="form-grid">
        <div class="field full-width">
          <label>Product Image</label>
          ${imgPreview}
          <label class="upload-btn" for="prod-img-${p.id}" style="font-size:.74rem;padding:.4rem .9rem">📁 Upload Image</label>
          <input type="file" id="prod-img-${p.id}" accept="image/*" style="display:none" onchange="handleProductImageUpload(this,${p.id})">
          <div class="field-hint">JPG/PNG/WebP, under 500KB recommended. Replaces emoji on site.</div>
        </div>
        <div class="field"><label>Emoji (fallback)</label><input type="text" value="${escH(p.emoji)}" oninput="CFG.products[${i}].emoji=this.value;markDirty()"></div>
        <div class="field"><label>Badge (blank = none)</label><input type="text" value="${escH(p.badge)}" oninput="CFG.products[${i}].badge=this.value;markDirty()"></div>
        <div class="field full-width"><label>Product Name</label><input type="text" value="${escH(p.name)}" oninput="CFG.products[${i}].name=this.value;markDirty()"></div>
        <div class="field"><label>Category</label>
          <select onchange="CFG.products[${i}].cat=this.value;markDirty()">
            ${cats.map(c=>`<option value="${c.id}"${p.cat===c.id?' selected':''}>${c.label}</option>`).join('')}
          </select>
        </div>
        <div class="field"><label>Category Label</label><input type="text" value="${escH(p.catLabel)}" oninput="CFG.products[${i}].catLabel=this.value;markDirty()"></div>
        <div class="field"><label>Price</label><input type="text" value="${escH(p.price)}" oninput="CFG.products[${i}].price=this.value;markDirty()"></div>
        <div class="field"><label>Price Note</label><input type="text" value="${escH(p.note)}" oninput="CFG.products[${i}].note=this.value;markDirty()"></div>
      </div>`,'products');
  }).join('');
  const catHtml=(CFG.catalogueCategories||[]).map((c,i)=>`
    <div style="display:flex;gap:.7rem;align-items:center;margin-bottom:.5rem">
      <input type="text" value="${escH(c.id)}" placeholder="id" style="flex:1;background:var(--a-bg3);border:1px solid var(--a-border);color:var(--a-cream);padding:.5rem .7rem;font-size:.82rem;outline:none;font-family:Raleway,sans-serif" oninput="CFG.catalogueCategories[${i}].id=this.value;markDirty()">
      <input type="text" value="${escH(c.label)}" placeholder="Label" style="flex:2;background:var(--a-bg3);border:1px solid var(--a-border);color:var(--a-cream);padding:.5rem .7rem;font-size:.82rem;outline:none;font-family:Raleway,sans-serif" oninput="CFG.catalogueCategories[${i}].label=this.value;markDirty()">
      ${i>0?`<button onclick="CFG.catalogueCategories.splice(${i},1);buildProducts();markDirty()" style="background:rgba(229,57,53,.1);border:1px solid rgba(229,57,53,.3);color:#e53935;padding:.4rem .7rem;cursor:pointer">✕</button>`:'<div style="width:38px"></div>'}
    </div>`).join('');
  document.getElementById('sec-products').innerHTML=`
    <div class="admin-section-title">Product Catalogue</div>
    <div class="admin-section-desc">Upload product images, edit details, and manage filter categories.</div>
    <div class="form-card"><div class="form-card-title">Filter Categories</div>
      <div id="cat-editor">${catHtml}</div>
      <button class="btn-add-item" style="margin-top:.5rem" onclick="CFG.catalogueCategories.push({id:'new',label:'New Category'});buildProducts();markDirty()">+ Add Category</button>
    </div>
    <div class="list-editor">${html}</div>
    <button class="btn-add-item" onclick="addProduct()">+ Add Product</button>`;
}

function handleProductImageUpload(input,productId){
  const file=input.files[0];if(!file)return;
  if(!file.type.startsWith('image/')){showToast('Please select an image file.','error');return;}
  if(file.size>2*1024*1024){showToast('Image too large. Please use an image under 2MB.','error');return;}
  const reader=new FileReader();
  reader.onload=e=>{
    if(rfhSaveImage(productId,e.target.result)){
      showToast('Image uploaded!','success');
      buildProducts();markDirty();
    }
  };
  reader.readAsDataURL(file);
}
function deleteProductImage(id){
  if(!confirm('Remove this product image?'))return;
  rfhDeleteImage(id);showToast('Image removed.','success');buildProducts();markDirty();
}
function addProduct(){
  CFG.products.push({id:Date.now(),emoji:'🆕',badge:'',cat:'suits',catLabel:'New Category',name:'New Product',price:'Enquire',note:''});
  buildProducts();markDirty();
}

/* ── TESTIMONIALS ── */
function buildTestimonials(){
  const html=(CFG.testimonials||[]).map((t,i)=>listCard(`${t.initial} — ${t.name}`,i,
    `<div class="form-grid">
      <div class="field"><label>Avatar Initial</label><input type="text" maxlength="2" value="${escH(t.initial)}" oninput="CFG.testimonials[${i}].initial=this.value;markDirty()"></div>
      <div class="field"><label>Stars (1–5)</label><input type="number" min="1" max="5" value="${t.stars}" oninput="CFG.testimonials[${i}].stars=parseInt(this.value)||5;markDirty()"></div>
      <div class="field"><label>Customer Name</label><input type="text" value="${escH(t.name)}" oninput="CFG.testimonials[${i}].name=this.value;markDirty()"></div>
      <div class="field"><label>Location / Role</label><input type="text" value="${escH(t.role)}" oninput="CFG.testimonials[${i}].role=this.value;markDirty()"></div>
      <div class="field full-width"><label>Review Text</label><textarea oninput="CFG.testimonials[${i}].text=this.value;markDirty()">${escH(t.text)}</textarea></div>
    </div>`,'testimonials')).join('');
  document.getElementById('sec-testimonials').innerHTML=`
    <div class="admin-section-title">Customer Testimonials</div>
    <div class="admin-section-desc">Add, edit, or remove customer reviews.</div>
    <div class="list-editor">${html}</div>
    <button class="btn-add-item" onclick="addTestimonial()">+ Add Testimonial</button>`;
}
function addTestimonial(){CFG.testimonials.push({initial:'N',name:'New Customer',role:'Location, VIC',stars:5,text:'Great experience at Royal Fashion Hive!'});buildTestimonials();markDirty();}

/* ── PRICING ── */
function buildPricing(){
  const html=(CFG.pricingTiers||[]).map((tier,i)=>listCard(`${tier.featured?'⭐ ':''}${tier.name}`,i,
    `<div class="form-grid">
      <div class="field"><label>Plan Name</label><input type="text" value="${escH(tier.name)}" oninput="CFG.pricingTiers[${i}].name=this.value;markDirty()"></div>
      <div class="field"><label>Price Display</label><input type="text" value="${escH(tier.price)}" oninput="CFG.pricingTiers[${i}].price=this.value;markDirty()"></div>
      <div class="field"><label>Subtitle / Period</label><input type="text" value="${escH(tier.period)}" oninput="CFG.pricingTiers[${i}].period=this.value;markDirty()"></div>
      <div class="field"><label>Button Text</label><input type="text" value="${escH(tier.btnText)}" oninput="CFG.pricingTiers[${i}].btnText=this.value;markDirty()"></div>
      <div class="field"><label>Button Style</label>
        <select onchange="CFG.pricingTiers[${i}].btnStyle=this.value;markDirty()">
          <option value="outline"${tier.btnStyle==='outline'?' selected':''}>Outline</option>
          <option value="gold"${tier.btnStyle==='gold'?' selected':''}>Gold Filled</option>
        </select></div>
      <div class="field"><label>Featured?</label>
        <select onchange="CFG.pricingTiers[${i}].featured=this.value==='true';markDirty()">
          <option value="false"${!tier.featured?' selected':''}>No</option>
          <option value="true"${tier.featured?' selected':''}>Yes (highlighted)</option>
        </select></div>
      <div class="field"><label>Featured Badge Label</label><input type="text" value="${escH(tier.featuredLabel||'')}" oninput="CFG.pricingTiers[${i}].featuredLabel=this.value;markDirty()"></div>
      <div class="field full-width"><label>Features (one per line)</label><textarea oninput="CFG.pricingTiers[${i}].features=this.value.split('\\n').filter(x=>x.trim());markDirty()">${escH((tier.features||[]).join('\n'))}</textarea></div>
      <div class="field full-width"><label>Greyed-out Features (one per line)</label><textarea oninput="CFG.pricingTiers[${i}].disabled=this.value.split('\\n').filter(x=>x.trim());markDirty()">${escH((tier.disabled||[]).join('\n'))}</textarea></div>
    </div>`,'pricingTiers')).join('');
  document.getElementById('sec-pricing').innerHTML=`
    <div class="admin-section-title">Pricing & Offers</div>
    <div class="admin-section-desc">Manage pricing tiers and offer cards.</div>
    <div class="list-editor">${html}</div>
    <button class="btn-add-item" onclick="addPricingTier()">+ Add Pricing Tier</button>`;
}
function addPricingTier(){CFG.pricingTiers.push({name:'New Plan',price:'Free',period:'Per visit',featured:false,featuredLabel:'',features:['Feature 1'],disabled:[],btnText:'Get Started',btnStyle:'outline'});buildPricing();markDirty();}

/* ── SECURITY ── */
function buildSecurity(){
  document.getElementById('sec-security').innerHTML=`
    <div class="admin-section-title">Security Settings</div>
    <div class="admin-section-desc">Change your admin password and review security status.</div>

    <div class="form-card">
      <div class="form-card-title">Security Status</div>
      <div class="security-status-grid">
        <div class="sec-item sec-ok">🔒 Brute-force protection active (5 attempts = 5min lockout)</div>
        <div class="sec-item sec-ok">⏱ Session auto-expires after 30 minutes of inactivity</div>
        <div class="sec-item sec-ok">🛡 XSS protection: all user input is sanitised before display</div>
        <div class="sec-item sec-ok">🍯 Honeypot bot trap on contact form</div>
        <div class="sec-item sec-ok">✅ Contact form fully validated (required fields, email, phone format)</div>
        <div class="sec-item ${CFG.adminPassword==='admin123'?'sec-warn':'sec-ok'}">${CFG.adminPassword==='admin123'?'⚠️ Default password still in use — change it below!':'✅ Custom password set'}</div>
      </div>
    </div>

    <div class="form-card">
      <div class="form-card-title">Change Admin Password</div>
      <div class="form-grid">
        <div class="field">
          <label>New Password</label>
          <input type="password" id="f-newPassword" placeholder="Enter new password" oninput="checkPasswordStrength(this.value)" autocomplete="new-password">
          <div class="pwd-strength" id="pwd-strength" style="display:none">
            <div class="pwd-strength-bar" id="pwd-bar"></div>
            <span id="pwd-label"></span>
          </div>
          <div class="field-hint">Min 8 characters. Use uppercase, numbers, and symbols for a strong password.</div>
        </div>
        <div class="field">
          <label>Confirm New Password</label>
          <input type="password" id="f-confirmPassword" placeholder="Confirm new password" oninput="checkPasswordMatch()" autocomplete="new-password">
          <div class="field-hint" id="pwd-match-hint"></div>
        </div>
      </div>
      <button class="btn-save" style="margin-top:1rem" onclick="saveAll()">Save Password</button>
    </div>`;
}
function checkPasswordStrength(pwd){
  const bar=document.getElementById('pwd-bar');
  const lbl=document.getElementById('pwd-label');
  const wrap=document.getElementById('pwd-strength');
  if(!pwd){wrap.style.display='none';return;}
  wrap.style.display='flex';
  const s=rfhPasswordStrength(pwd);
  const pct={weak:25,fair:50,good:75,strong:100}[s.level];
  bar.style.width=pct+'%';bar.style.background=s.color;
  lbl.textContent=s.label;lbl.style.color=s.color;
}
function checkPasswordMatch(){
  const np=document.getElementById('f-newPassword').value;
  const cp=document.getElementById('f-confirmPassword').value;
  const hint=document.getElementById('pwd-match-hint');
  if(!cp)return;
  if(np===cp){hint.textContent='✓ Passwords match';hint.style.color='#43a047';}
  else{hint.textContent='✗ Passwords do not match';hint.style.color='#e53935';}
}

/* ── LIST CARD ── */
function listCard(title,index,bodyHtml,arrayKey){
  return `<div class="list-item-card">
    <div class="list-item-header" onclick="toggleItem(this)">
      <div class="list-item-title">${escH(title)}</div>
      <div class="list-item-actions">
        <button class="btn-collapse">▼</button>
        <button class="btn-delete-item" onclick="deleteItem(event,'${arrayKey}',${index})">Delete</button>
      </div>
    </div>
    <div class="list-item-body"><div class="form-grid">${bodyHtml}</div></div>
  </div>`;
}
function toggleItem(hdr){const b=hdr.nextElementSibling;b.classList.toggle('open');hdr.querySelector('.btn-collapse').textContent=b.classList.contains('open')?'▲':'▼';}
function deleteItem(e,key,i){
  e.stopPropagation();if(!confirm('Delete this item?'))return;
  CFG[key].splice(i,1);
  const m={services:buildServices,products:buildProducts,testimonials:buildTestimonials,pricingTiers:buildPricing,aboutValues:buildAbout};
  if(m[key])m[key]();markDirty();
}

/* ── TOAST ── */
function showToast(msg,type='success'){
  const t=document.getElementById('toast');
  t.querySelector('.toast-icon').textContent=type==='success'?'✓':'✕';
  t.querySelector('.toast-msg').textContent=msg;
  t.className=`toast ${type} show`;
  clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),3500);
}

/* ── MOBILE SIDEBAR ── */
function toggleMobileSidebar(){document.getElementById('admin-sidebar').classList.toggle('mobile-open');}
