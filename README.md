# Iraqi Student ID Generator 🇮🇶

![Logo](/assets/images/logo.svg)

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/SANDRO00O/schoolid.svg)](https://github.com/SANDRO00O/schoolid/stargazers)
[![Forks](https://img.shields.io/github/forks/SANDRO00O/schoolid.svg)](https://github.com/SANDRO00O/schoolid/network/members)
[![Issues](https://img.shields.io/github/issues/SANDRO00O/schoolid.svg)](https://github.com/SANDRO00O/schoolid/issues)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fschoolid.karrarnazim.space)](https://schoolid.karrarnazim.space)
[![Green Hosting](https://img.shields.io/badge/green-hosting-brightgreen.svg)](https://app.greenweb.org/api/v3/greencheckimage/schoolid.karrarnazim.space?nocache=true)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/SANDRO00O/schoolid)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SANDRO00O/schoolid/pulls)
[![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SANDRO00O/schoolid)

A free web tool for creating professional Iraqi school ID cards easily and quickly. Designed specifically to meet the needs of Iraqi schools and parents.

---

## ✨ Key Features

- **Professional Design**
  - Two ready templates (male & female)
  - Authentic Arabic layout, RTL support
  - Circular photos with rounded corners
  - High-resolution output (1011×639 px)
- **Data Input**
  - Fields: Full name, grade, school, address, phone
  - Image upload (JPG, PNG, WEBP)
  - Intuitive UI & real-time validation
- **Available Options**
  - Direct download (PNG)
  - Instant sharing (Web Share API)
  - Live preview & responsive design
- **Privacy & Security**
  - No cloud storage; all processing on your device
  - No data collection; open source & GDPR-compliant
- **Advanced Features**
  - PWA support & offline capability
  - Fast loading, SEO optimized

---

## 🛠 Technology Stack

**Languages:**  
- CSS (73.1%)  
- HTML (19.6%)  
- JavaScript (7.3%)

**Frontend:**  
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

- HTML5 Canvas for card generation
- Vanilla JavaScript
- CSS3 responsive design
- Service Workers for offline use
- Web APIs: Canvas API & Web Share API

---

## 🚀 Quick Start

**Prerequisites:**  
- Modern web browser (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)

**Installation:**
```bash
# Clone the repository
git clone https://github.com/SANDRO00O/schoolid.git

# Navigate to directory
cd schoolid

# Run locally with any web server
python -m http.server 8000        # Python
npx serve .                       # Node.js
php -S localhost:8000             # PHP
```

**Usage Example:**
```javascript
const studentData = {
  name: "أحمد محمود عبدالله",
  grade: "السادس الابتدائي",
  school: "مدرسة الرشيد الابتدائية", 
  address: "بغداد - الكرخ",
  phone: "07701234567",
  gender: "male",
  photo: "student-photo.jpg"
};
```

---

## 📁 Project Structure

```
schoolid/
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   └── all.css
│   ├── js/
│   │   ├── script.js
│   │   ├── header.js
│   │   ├── sw.js
│   │   └── html2canvas.min.js
│   ├── fonts/
│   │   └── NotoKufiArabic...
│   ├── images/
│   │   ├── logo.svg
│   │   ├── male.svg
│   │   ├── female.svg
│   │   └── logo-*.png
│   ├── template/
│   │   ├── male-template.png
│   │   └── female-template.png
│   └── links/
│       ├── About.html
│       └── privacy.html
├── index.html
├── README.md
├── LICENSE
└── service-worker.js
```

---

## 🔧 Configuration

Main configuration is in `script.js`:
```javascript
const config = {
    gender: 'female',
    templatePaths: {
        female: '/assets/template/female-template.png',
        male: '/assets/template/male-template.png'
    },
    colors: {
        female: '#ba1971',
        male: '#1976d2'
    },
    canvasSettings: {
        userImage: { x: 125, y: 145, size: 270, radius: 35 },
        textPositions: {
            name: { x: 815, y: 160 },
            grade: { x: 815, y: 260 },
            school: { x: 785, y: 363 },
            place: { x: 805, y: 465 },
            phone: { x: 805, y: 565 }
        }
    }
};
```

---

## 🌐 Browser Compatibility

| Browser        | Status          | Notes                 |
|----------------|-----------------|-----------------------|
| Chrome         | ✅ Fully Supported | Version 80+        |
| Firefox        | ✅ Fully Supported | Version 75+        |
| Safari         | ✅ Fully Supported | Version 13+        |
| Edge           | ✅ Fully Supported | Version 80+        |
| Mobile Browsers| ✅ Fully Supported | All modern browsers |

---

## 📊 Performance Metrics

- ⚡ Load Time: < 3 seconds
- 🖼 Output Size: ~200-500KB
- 📱 Responsive: 320px+ screens
- 🔄 Generation Time: < 2 seconds
- 📦 PWA Score: 90+ (Lighthouse)

---

## 🎯 Usage Guide

**Step 1:** Fill Student Information  
**Step 2:** Select Gender  
**Step 3:** Upload Photo  
**Step 4:** Generate & Download  

---

## 🤝 Contributing

We welcome contributions!

1. Report Bugs 📝 (GitHub Issues)
2. Suggest Features 💡 (Feature Request)
3. Improve Documentation 📚
4. Code Development 🔧

**Workflow:**
```bash
git checkout -b feature/AmazingFeature
git add .
git commit -m 'Add some AmazingFeature'
git push origin feature/AmazingFeature
# Open Pull Request
```

**Code Standards:**
- Semantic HTML
- BEM CSS methodology
- Clean, commented JS
- RTL Arabic support
- Responsive design

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🌱 Sustainability

![Green Hosting](https://app.greenweb.org/api/v3/greencheckimage/schoolid.karrarnazim.space?nocache=true)  
This website runs on environmentally friendly green hosting ✅

---

## 🚀 Deployment

Live: [schoolid.karrarnazim.space](https://schoolid.karrarnazim.space)

**Local Development:**
```bash
npx live-server --port=3000
# Static files, no build required
```

---

## 📈 Analytics & Monitoring

- Google Analytics
- PageSpeed Insights
- Uptime Monitoring: 99.9%

---

## 🔮 Roadmap

**Short Term (Q1 2025):**
- More template designs
- Multi-language support
- Custom color schemes
- QR code integration

**Medium Term (Q2 2025):**
- Direct printing
- Batch generation
- Advanced photo editing
- Database integration

**Long Term (Q3 2025+):**
- Mobile app
- Admin dashboard
- API for developers
- School system integration

---

## 🐛 Troubleshooting

- **Download button missing:** Ensure all fields are filled and image uploaded
- **Canvas issues:** Clear browser cache or try another browser
- **Arabic text issues:** Check Noto Kufi Arabic font loading

---

## 📞 Support & Contact

- 🌐 [Website](https://schoolid.karrarnazim.space)
- 📧 Email: karrarnazim.space
- 🐛 [Bug Reports](https://github.com/SANDRO00O/schoolid/issues)
- 💬 [Discussions](https://github.com/SANDRO00O/schoolid/discussions)
- 📚 [Wiki](https://github.com/SANDRO00O/schoolid/wiki)

---

## 🙏 Acknowledgments

- Noto Fonts
- Font Awesome
- Green Web Foundation
- All contributors

---

Made with 💙 for Iraqi Students | © 2025 Karrar Nazim - All Rights Reserved.

⭐ Star this repo if you find it useful! ⭐
