/* =========================================================
   Royal Fashion Hive — Site Configuration v2.0
   ========================================================= */
const RFH_DEFAULTS = {
  businessName:"Royal Fashion Hive", tagline:"Where Trends Buzz With Style",
  logoEmoji:"👑", footerTagline:"Premier destination for Punjabi fashion & Sikh essentials in Craigieburn, Victoria.",
  colorGold:"#c9960c",colorGold2:"#e8b422",colorGold3:"#f5d060",
  colorBg:"#0a0a0a",colorBg2:"#111111",colorBg3:"#1a1a1a",colorCream:"#f5edd8",colorMuted:"#9a8a6a",
  address:"9 Creekbridge Street, Craigieburn VIC 3064, Australia",
  addressShort:"9 Creekbridge St, Craigieburn VIC 3064",
  phone1:"0409 008 926",phone2:"0420 949 033",whatsapp:"61409008926",email:"",
  instagram:"royalfashionhive",facebook:"royalfashionhive",
  workingHours:"Mon–Sat, 10 AM – 7 PM",
  mapNote:"Serving Craigieburn, Mickleham, Roxburgh Park, Broadmeadows and surrounds.",
  heroEyebrow:"🐝 Craigieburn VIC 3064 · Est. Royal Fashion Hive",
  heroLine1:"Where Tradition",heroLine2:"Meets",heroGold:"Royal",heroLine3:"Elegance",
  heroTagline:"✦ Where Trends Buzz With Style ✦",
  heroSub:"Your one-stop destination for Punjabi suits, ladies designer wear, handbags, Punjabi Jutti, and authentic Sikh essentials — right here in Craigieburn, Victoria.",
  heroBtnShop:"Browse Collection",heroBtnContact:"Contact Us",
  heroTags:["Punjabi Suits","Ladies Handbags","Punjabi Jutti","Dumalla","Bana for All","Kanga · Kara · Kirpan"],
  heroStat1Num:"10+",heroStat1Label:"Product Categories",
  heroStat2Num:"100%",heroStat2Label:"Authentic Quality",
  heroStat3Num:"⭐ 5",heroStat3Label:"Star Service",
  marqueeItems:["🐝 Punjabi Suits","👜 Ladies Handbags","👟 Punjabi Jutti","🐝 Dumalla","✦ Kanga · Kara · Kirpan","👗 Girls Dresses","🐝 Bana for Men · Women · Kids","✦ Customised Suits"],
  aboutTitle:"Royal Fashion. <em>Real Heritage.</em>",
  aboutP1:"Royal Fashion Hive is Craigieburn's premier destination for authentic Punjabi and South Asian fashion. We proudly serve the local community with a curated selection of traditional clothing, accessories, and Sikh essentials.",
  aboutP2:"From beautifully embroidered ladies designer suits and boutique-style Punjabi wear, to handcrafted Juttis, Dumallas, and sacred Sikh items — everything is chosen with love, quality, and cultural pride.",
  aboutValues:[
    {icon:"🧵",title:"Premium Quality",desc:"Every item selected for fabric quality and craftsmanship."},
    {icon:"👑",title:"Royal Selection",desc:"Designer, boutique & customised styles for every occasion."},
    {icon:"📍",title:"Local & Accessible",desc:"9 Creekbridge St, Craigieburn VIC 3064."},
    {icon:"🤝",title:"Personal Service",desc:"Friendly team dedicated to finding your perfect look."}
  ],
  services:[
    {num:"01",icon:"👗",title:"Ladies Designer Suits",desc:"Exquisite suits featuring premium embroidery and luxurious fabrics — perfect for weddings, parties, and special events."},
    {num:"02",icon:"🥻",title:"Punjabi Suits",desc:"Traditional & contemporary Punjabi suits in cotton, georgette, silk, and chanderi for every occasion."},
    {num:"03",icon:"✨",title:"Boutique Style Suits",desc:"Exclusive boutique-inspired designs blending modern aesthetics with traditional Punjabi charm."},
    {num:"04",icon:"✂️",title:"Customised Suits",desc:"Get the perfect fit with our tailoring service. Share your measurements for a suit made just for you."},
    {num:"05",icon:"👘",title:"Designer Kurte",desc:"Stylish kurtas for everyday wear and special occasions — wide selection of prints and embellishments."},
    {num:"06",icon:"👜",title:"Ladies Handbags",desc:"Stunning range of handbags, totes, clutches, and potli bags — casual to bridal."},
    {num:"07",icon:"👟",title:"Ladies Punjabi Jutti",desc:"Handcrafted traditional Juttis in vibrant colours — the perfect finishing touch."},
    {num:"08",icon:"👗",title:"Girls Dresses",desc:"Adorable ethnic & fusion dresses for girls — colourful, comfortable, and crafted to impress."},
    {num:"09",icon:"🎽",title:"Bana for Men/Women/Kids",desc:"Authentic Sikh Bana for the whole family in high-quality fabric with traditional styling."},
    {num:"10",icon:"🧣",title:"Dumalla",desc:"Traditional Sikh Dumalla turbans in various fabrics and colours for ceremonial occasions."},
    {num:"11",icon:"⚔️",title:"Kanga / Kara / Kirpan",desc:"Sacred Sikh Panj Kakars available in authentic styles and premium materials."},
    {num:"12",icon:"🆕",title:"More Coming Soon",desc:"We're constantly expanding! Follow @royalfashionhive for new arrivals."}
  ],
  catalogueCategories:[
    {id:"all",label:"All Items"},{id:"suits",label:"Suits"},{id:"bags",label:"Handbags"},
    {id:"jutti",label:"Jutti"},{id:"sikh",label:"Sikh Essentials"},{id:"kids",label:"Kids"}
  ],
  products:[
    {id:1,emoji:"👗",badge:"New In",   cat:"suits",catLabel:"Ladies · Designer Suit",         name:"Heavy Embroidered Designer Suit",price:"Enquire",   note:"In-store pricing"},
    {id:2,emoji:"🥻",badge:"Popular",  cat:"suits",catLabel:"Punjabi Suits · Cotton/Silk",     name:"Traditional Punjabi Salwar Suit",price:"Enquire",   note:"Various styles"},
    {id:3,emoji:"✨",badge:"",         cat:"suits",catLabel:"Boutique Style · Exclusive",      name:"Boutique Style Luxury Suit",     price:"Enquire",   note:"Limited stock"},
    {id:4,emoji:"✂️",badge:"Custom",   cat:"suits",catLabel:"Customised · Made-to-Measure",    name:"Customised Suit (Your Design)",  price:"Contact Us",note:"Your measurements"},
    {id:5,emoji:"👜",badge:"Trending", cat:"bags", catLabel:"Ladies Handbags · Everyday",      name:"Designer Ladies Handbag",        price:"Enquire",   note:"Multiple styles"},
    {id:6,emoji:"👟",badge:"Handcrafted",cat:"jutti",catLabel:"Ladies Punjabi Jutti",          name:"Embroidered Punjabi Jutti",      price:"Enquire",   note:"All sizes"},
    {id:7,emoji:"🧣",badge:"",         cat:"sikh", catLabel:"Sikh Essentials · Dumalla",       name:"Traditional Sikh Dumalla",       price:"Enquire",   note:"Various colours"},
    {id:8,emoji:"⚔️",badge:"",         cat:"sikh", catLabel:"Sikh Essentials · Panj Kakars",   name:"Kanga / Kara / Kirpan",          price:"Enquire",   note:"Authentic items"},
    {id:9,emoji:"🎽",badge:"",         cat:"sikh", catLabel:"Bana · Men/Women/Kids",           name:"Sikh Bana — Full Family Range",  price:"Enquire",   note:"All ages & sizes"},
    {id:10,emoji:"👧",badge:"Adorable",cat:"kids", catLabel:"Girls Dresses · Kids",            name:"Ethnic Girls Party Dress",       price:"Enquire",   note:"Various sizes"},
    {id:11,emoji:"👘",badge:"",        cat:"suits",catLabel:"Designer Kurte · Casual & Formal",name:"Designer Kurta Collection",      price:"Enquire",   note:"Many prints"},
    {id:12,emoji:"👛",badge:"",        cat:"bags", catLabel:"Bags · Clutch / Potli",           name:"Bridal Potli & Clutch Bag",      price:"Enquire",   note:"Perfect for weddings"}
  ],
  testimonials:[
    {initial:"H",name:"Harpreet Kaur",      role:"Craigieburn, VIC", stars:5,text:"Absolutely love Royal Fashion Hive! Found the most beautiful Punjabi suit for my cousin's wedding. The quality is outstanding and the staff were so helpful in choosing the right design."},
    {initial:"G",name:"Gurjeet Singh",       role:"Mickleham, VIC",   stars:5,text:"Best place in Melbourne for authentic Sikh essentials! Got a Dumalla, Kara, and Kirpan all in one visit. Amazing selection at very reasonable prices. Highly recommend!"},
    {initial:"S",name:"Simranpreet Dhaliwal",role:"Roxburgh Park, VIC",stars:5,text:"I ordered a customised suit and was blown away by the result. It fit perfectly and the embroidery was stunning. Royal Fashion Hive truly lives up to its royal name!"}
  ],
  pricingTiers:[
    {name:"Walk-In Customer",price:"Free",period:"No membership required",featured:false,featuredLabel:"",
     features:["Browse full in-store collection","Personal styling assistance","View new arrivals first","Sikh essentials available"],
     disabled:["Loyalty discounts","Custom order priority"],btnText:"Visit Us Today",btnStyle:"outline"},
    {name:"Loyal Customer",price:"Exclusive",period:"For returning customers",featured:true,featuredLabel:"Best Value 👑",
     features:["Everything in Walk-In","Loyalty discounts on suits","Priority custom order slot","New arrivals notifications","Early access to sales","Special occasion packages"],
     disabled:[],btnText:"Call & Enquire",btnStyle:"gold"},
    {name:"Bulk / Wedding Orders",price:"Custom",period:"For families & events",featured:false,featuredLabel:"",
     features:["Bridal & family suit sets","Bulk order discounts","Coordinated outfit packages","Custom tailoring for all","Matching bags & Juttis","Dedicated consultation"],
     disabled:[],btnText:"Get a Quote",btnStyle:"outline"}
  ],
  adminPassword:"admin123"
};

/* ── Config ── */
function rfhGetConfig(){
  try{const s=localStorage.getItem('rfh_config');if(s)return Object.assign({},RFH_DEFAULTS,JSON.parse(s));}
  catch(e){console.warn(e);}
  return Object.assign({},RFH_DEFAULTS);
}
function rfhSaveConfig(c){
  try{localStorage.setItem('rfh_config',JSON.stringify(c));return true;}
  catch(e){console.error(e);return false;}
}
function rfhResetConfig(){
  localStorage.removeItem('rfh_config');
  localStorage.removeItem('rfh_logo');
  Object.keys(localStorage).filter(k=>k.startsWith('rfh_img_')).forEach(k=>localStorage.removeItem(k));
}

/* ── Images ── */
function rfhSaveLogo(dataUrl){
  try{localStorage.setItem('rfh_logo',dataUrl);return true;}
  catch(e){if(e.name==='QuotaExceededError')alert('Storage full! Try a smaller image (under 200KB recommended).');return false;}
}
function rfhGetLogo(){return localStorage.getItem('rfh_logo')||null;}
function rfhSaveImage(id,dataUrl){
  try{localStorage.setItem('rfh_img_'+id,dataUrl);return true;}
  catch(e){if(e.name==='QuotaExceededError')alert('Storage full! Remove some images to free space.');return false;}
}
function rfhGetImage(id){return localStorage.getItem('rfh_img_'+id)||null;}
function rfhDeleteImage(id){localStorage.removeItem('rfh_img_'+id);}

/* ── Security ── */
const _LK='rfh_lockout_until',_LA='rfh_login_attempts',_SE='rfh_sess_exp';
function rfhIsLockedOut(){return Date.now()<parseInt(localStorage.getItem(_LK)||0);}
function rfhLockoutSecs(){return Math.ceil((parseInt(localStorage.getItem(_LK)||0)-Date.now())/1000);}
function rfhRecordFail(){
  const a=(parseInt(localStorage.getItem(_LA)||0))+1;
  localStorage.setItem(_LA,a);
  if(a>=5){localStorage.setItem(_LK,Date.now()+300000);localStorage.removeItem(_LA);}
  return a;
}
function rfhClearAttempts(){localStorage.removeItem(_LA);localStorage.removeItem(_LK);}
function rfhSetSession(){sessionStorage.setItem('rfh_admin','1');sessionStorage.setItem(_SE,Date.now()+1800000);}
function rfhIsSessionValid(){
  return sessionStorage.getItem('rfh_admin')==='1'&&Date.now()<parseInt(sessionStorage.getItem(_SE)||0);
}
function rfhRefreshSession(){if(rfhIsSessionValid())sessionStorage.setItem(_SE,Date.now()+1800000);}
function rfhClearSession(){sessionStorage.removeItem('rfh_admin');sessionStorage.removeItem(_SE);}
function rfhAttemptsLeft(){return 5-parseInt(localStorage.getItem(_LA)||0);}

/* ── XSS sanitiser ── */
function rfhSanitize(s){
  const m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'};
  return String(s||'').replace(/[&<>"']/g,c=>m[c]);
}

/* ── Validators ── */
function rfhValidateEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(e).trim());}
function rfhValidatePhone(p){return /^[\d\s\+\-\(\)]{7,16}$/.test(String(p).trim());}
function rfhPasswordStrength(p){
  let s=0;
  if(p.length>=8)s++;if(p.length>=12)s++;
  if(/[A-Z]/.test(p))s++;if(/[0-9]/.test(p))s++;if(/[^A-Za-z0-9]/.test(p))s++;
  if(s<=1)return{level:'weak',  label:'Weak',  color:'#e53935'};
  if(s<=2)return{level:'fair',  label:'Fair',  color:'#fb8c00'};
  if(s<=3)return{level:'good',  label:'Good',  color:'#fdd835'};
  return        {level:'strong',label:'Strong',color:'#43a047'};
}
