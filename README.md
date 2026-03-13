# Royal Fashion Hive — Website Package v2.0

## 🚀 Quick Start
1. Unzip → open `index.html` in any modern browser
2. Click the **⚙ Admin** button (bottom-right) to manage content
3. Default admin password: **admin123** — change it immediately!

---

## 📁 File Structure
```
royal-fashion-hive/
├── index.html          ← Main website
├── admin.html          ← Admin portal
├── README.md
└── assets/
    ├── css/
    │   ├── style.css   ← Site styles (fully responsive)
    │   └── admin.css   ← Admin styles
    └── js/
        ├── config.js   ← Config, image helpers, security utils
        ├── main.js     ← Site renderer + form validation
        └── admin.js    ← Admin portal logic
```

---

## 🖼 Image Uploads (NEW)
### Logo Upload
- Go to **Admin → General & Contact → Logo Upload**
- Upload any PNG/JPG (recommended: square, transparent PNG, under 200KB)
- The logo appears in: Navbar, About section, Footer
- If no logo is uploaded, the emoji icon is used as fallback

### Product Images
- Go to **Admin → Catalogue & Images**
- Expand any product card → click **Upload Image**
- The image replaces the emoji placeholder on the website
- Click **🗑 Remove** to delete and revert to emoji
- Recommended: 3:4 portrait ratio, under 500KB per image

**Storage note:** Images are stored in your browser's localStorage (~5MB limit).
For large product catalogues, host images on a web server and modify `main.js` to use URLs instead.

---

## 🔒 Security Features (NEW)
| Feature | Details |
|---|---|
| **Brute-force lockout** | 5 failed logins = 5-minute lockout |
| **Session timeout** | Auto-logout after 30 min of inactivity |
| **XSS protection** | All user input sanitised before rendering |
| **Honeypot trap** | Hidden field catches spam bots on contact form |
| **Form validation** | Required fields, email format, phone format checked |
| **Password strength meter** | Visual feedback when changing admin password |
| **Attempt counter** | Shows remaining attempts before lockout |

---

## 📱 Responsive Breakpoints
| Screen | Width | Layout |
|---|---|---|
| Mobile | < 600px | Single column, hamburger nav |
| Tablet | 600–900px | Two columns, collapsible nav |
| Desktop | 900–1400px | Full layout |
| Large | > 1400px | Extra padding |

---

## 💾 Backing Up Your Data
Open browser console on the site (F12) and run:
```js
// Export
JSON.stringify({config: localStorage.getItem('rfh_config'), logo: localStorage.getItem('rfh_logo')})

// Import (paste your backup string)
const data = JSON.parse('<your backup>');
localStorage.setItem('rfh_config', data.config);
localStorage.setItem('rfh_logo', data.logo);
```

---

## 🌐 Hosting
Upload the entire folder to any static host:
- **Netlify** — netlify.com (drag & drop)
- **cPanel** — upload via File Manager
- **GitHub Pages** — free static hosting

---

*Royal Fashion Hive · 9 Creekbridge Street, Craigieburn VIC 3064*
*🐝 Where Trends Buzz With Style*
