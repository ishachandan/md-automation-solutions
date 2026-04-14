# Frontend - Automation Solutions Website

React-based frontend for industrial automation solutions B2B platform.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Opens at: http://localhost:3000

## 📦 What's Included

### Pages (10 total):
- Home - Landing page with hero and features
- About - Company information
- Solutions - Automation solutions catalog
- Case Studies - Project portfolio
- Products - Partner products
- Partners - Global partnerships
- Contact - **Working enquiry form** ⭐
- Login - User authentication
- Register - Account creation
- Dashboard - Client dashboard

### Components:
- Navbar - Responsive navigation with mobile menu
- Footer - Site footer with links
- Layout components

## 🎨 Design

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Build**: Vite
- **Notifications**: React Toastify

## 🔌 API Integration

Frontend connects to backend at: `http://localhost:5000`

Configured in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

## 🧪 Test

1. Start backend first
2. Run `npm run dev`
3. Visit http://localhost:3000
4. Navigate through all pages
5. Submit contact form

## 📦 Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## 🎯 Key Features

✅ Fully responsive
✅ Working contact form
✅ User authentication
✅ Professional B2B design
✅ Mobile navigation
✅ Toast notifications
✅ Form validation
✅ Loading states

## 📁 Structure

```
src/
├── components/
│   └── layout/
│       ├── Navbar.jsx
│       └── Footer.jsx
├── pages/
│   ├── public/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Solutions.jsx
│   │   ├── CaseStudies.jsx
│   │   ├── Products.jsx
│   │   ├── Partners.jsx
│   │   ├── Contact.jsx ⭐
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── client/
│       └── Dashboard.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🎨 Tailwind Classes

Custom classes defined in `index.css`:
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card container
- `.input-field` - Form input
- `.section-title` - Section heading

## 🔗 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page |
| `/about` | About | Company info |
| `/solutions` | Solutions | Solutions catalog |
| `/case-studies` | CaseStudies | Portfolio |
| `/products` | Products | Products catalog |
| `/partners` | Partners | Partners showcase |
| `/contact` | Contact | Enquiry form ⭐ |
| `/login` | Login | Authentication |
| `/register` | Register | Registration |
| `/dashboard` | Dashboard | Client dashboard |

## 📞 Support

Check `FRONTEND_SETUP.md` for detailed setup instructions.

---

**Ready for demo! 🚀**
