# Royal Fashion Hive — Website v3.0

## Quick Start
1. Upload this folder to GitHub and enable GitHub Pages
2. Open your site → click **⚙ Admin** in the top nav
3. Go to **GitHub Sync** → enter your token → **Test & Save**
4. All admin changes now sync live to GitHub for everyone!

---

## GitHub Sync Setup

### 1. Create a Personal Access Token
Go to github.com/settings/tokens/new → select **repo** scope → Generate

### 2. Connect in Admin
Admin → GitHub Sync → enter Token, Repository (owner/repo), Branch → Test & Save

### 3. Use Admin
Edit anything → **Save & Sync** → commits to data/config.json → site updates in ~30 sec

---

## What's New in v3.0
- **GitHub Sync** — changes go live for all visitors, not just your device
- **Product & Logo images** — committed to data/images/ in your GitHub repo
- **WhatsApp Slider** — floating chat button bottom-right on the main site
- **Admin in Nav** — ⚙ Admin link in top navigation (removed bottom floating button)

---

## Security
- Brute-force lockout: 5 attempts = 5-min lockout
- Session expires after 30 min
- XSS protection, honeypot, form validation
- GitHub token stored only in your browser, never committed

---
*Royal Fashion Hive · 9 Creekbridge St, Craigieburn VIC 3064 · @royalfashionhive*
