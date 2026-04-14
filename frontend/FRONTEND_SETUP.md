# Frontend Setup Guide

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The website will open at: **http://localhost:3000**

### 3. Start Backend (In Another Terminal)
```bash
cd backend
npm run dev
```

Backend runs at: **http://localhost:5000**

## ✅ What's Built

### Pages (All Working):
1. **Home** (/) - Hero, features, industries, CTA
2. **About** (/about) - Company info, stats, expertise
3. **Solutions** (/solutions) - 6 automation solutions
4. **Case Studies** (/case-studies) - 4 success stories
5. **Products** (/products) - Partner products catalog
6. **Partners** (/partners) - 6 global partners
7. **Contact** (/contact) - **Working enquiry form** ⭐
8. **Login** (/login) - User authentication
9. **Register** (/register) - User registration
10. **Dashboard** (/dashboard) - Client dashboard

### Features:
✅ Responsive design (mobile, tablet, desktop)
✅ Professional UI with Tailwind CSS
✅ Working navigation with mobile menu
✅ Contact form connected to backend API
✅ Authentication system (login/register)
✅ Toast notifications
✅ Clean, modern design

## 🧪 How to Test

### Test the Website:

1. **Visit Home Page**: http://localhost:3000
   - See hero section, features, industries

2. **Navigate Pages**: Click menu items
   - About, Solutions, Case Studies, Products, Partners

3. **Submit Enquiry**: Go to Contact page
   - Fill form and submit
   - Check email for confirmation!

4. **Register Account**: Go to Register
   - Create account
   - Auto-login to dashboard

5. **Login**: Go to Login
   - Login with credentials
   - View dashboard

### Test Backend Connection:

The contact form submits to: `POST /api/enquiries`

When you submit:
- ✅ Data saved to MongoDB
- ✅ Confirmation email sent to you
- ✅ Notification email sent to admin
- ✅ Success toast appears

## 📱 Responsive Design

The website works on:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

Test by resizing browser window!

## 🎨 Design Features

- Clean, professional B2B design
- Primary color: Blue (#3b82f6)
- Card-based layout
- Hover effects
- Smooth transitions
- Mobile-friendly navigation

## 🔧 Tech Stack

- **React 18** - UI framework
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Axios** - API calls (via fetch)
- **React Toastify** - Notifications

## 📝 For Tomorrow's Demo

### Show These Features:

1. **Homepage** - Professional landing page
2. **Solutions Page** - 6 automation solutions
3. **Case Studies** - Real-world examples
4. **Contact Form** - Working enquiry system ⭐
5. **Partners Page** - Global partnerships
6. **Responsive Design** - Works on mobile

### Key Talking Points:

✅ "Database-driven website with MERN stack"
✅ "Working enquiry system with email notifications"
✅ "Professional B2B design for automation industry"
✅ "Responsive across all devices"
✅ "User authentication and dashboard"
✅ "Based on real automation companies (Cotmac, Monk)"

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder.

## 📞 Need Help?

- Frontend runs on port 3000
- Backend runs on port 5000
- Check browser console for errors
- Check backend terminal for API logs

---

**Everything is ready for your demo tomorrow! 🎉**
