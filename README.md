# MD Automation Solutions Platform

A comprehensive B2B industrial automation solutions platform built with the MERN stack. Features a modern, professional UI with separate portals for clients and administrators.

![Platform](https://img.shields.io/badge/Platform-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

### Public Website
- **Modern Landing Page** - Professional hero section with company overview
- **Solutions Catalog** - Browse automation solutions by category
- **Products Showcase** - Comprehensive product listings with filters
- **Case Studies** - Industry-specific success stories
- **Contact Form** - Integrated enquiry submission system
- **Partners Page** - Brand and channel partner showcase

### Client Portal
- **Dashboard** - View all enquiries and their status
- **Enquiry Management** - Track enquiry progress (Received, Under Review, Quote Sent, Won, Lost)
- **Quote Downloads** - Download quotations when available
- **Account Management** - Update profile information

### Admin Portal
- **Analytics Dashboard** - Visual insights with charts (status, industry, trends)
- **Enquiry Management** - Process enquiries, update status, add notes, upload quotes
- **Content Management** - Full CRUD for Solutions, Products, Case Studies, Blog Posts
- **User Management** - View and manage client accounts

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Recharts** - Data visualization
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image hosting
- **Nodemailer** - Email notifications
- **PDFKit** - PDF generation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)
- Gmail account (for email notifications)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/automation-solutions.git
cd automation-solutions
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=noreply@mdautomation.com
FRONTEND_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend directory (optional for development):

```env
VITE_API_URL=https://md-automation-solutions.onrender.com/api
```

### 4. Create Admin User

```bash
cd backend
node scripts/createAdmin.js
```

Default admin credentials:
- Email: `admin@mdautomation.com`
- Password: `admin123`

### 5. Seed Database (Optional)

```bash
cd backend
node scripts/SEED_ALL_DATA.js
```

This will populate your database with:
- 50 Solutions
- 50 Products
- 50 Case Studies
- 50 Sample Enquiries

## 🚀 Running the Application

### Development Mode

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```
Server runs on `https://md-automation-solutions.onrender.com`

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:3000`

### Production Build

**Frontend**:
```bash
cd frontend
npm run build
```

## 📱 Usage

### Access Points

- **Public Website**: `http://localhost:3000`
- **Admin Portal**: `http://localhost:3000/admin`
- **Client Dashboard**: `http://localhost:3000/dashboard` (after login)

### User Roles

**Admin**:
- Full access to admin portal
- Manage all content and enquiries
- View analytics

**Client**:
- Register and login
- Submit enquiries
- View own enquiries and quotes
- Download quotations

## 🌐 Deployment

See [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) for detailed deployment instructions for:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📁 Project Structure

```
automation-solutions/
├── backend/
│   ├── config/          # Database and service configs
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth, validation, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts (seed, admin)
│   ├── uploads/         # File upload directory
│   ├── utils/           # Helper functions
│   └── server.js        # Entry point
├── frontend/
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React context (Auth)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service
│   │   └── App.jsx      # Main app component
│   └── vite.config.js   # Vite configuration
└── README.md
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes (client and admin)
- CORS configuration
- Input validation
- XSS protection
- Rate limiting ready

## 🎨 Design System

- **Primary Color**: Pastel Blue (#38bdf8)
- **Accent Color**: Green (#34d399)
- **Typography**: Modern, clean sans-serif
- **Components**: Rounded corners (rounded-2xl), subtle shadows
- **Buttons**: Black with rounded-full style
- **Cards**: White with border and hover effects

## 📧 Email Notifications

The system sends automated emails for:
- New enquiry submissions (to admin)
- Enquiry status updates (to client)
- Quote availability notifications

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Enquiries
- `POST /api/enquiries` - Create enquiry
- `GET /api/enquiries` - Get all enquiries (admin)
- `GET /api/enquiries/my-enquiries` - Get user's enquiries
- `PUT /api/enquiries/:id/status` - Update status (admin)
- `POST /api/enquiries/:id/quote` - Upload quote (admin)

### Solutions
- `GET /api/solutions` - Get all solutions
- `GET /api/solutions/:slug` - Get single solution
- `POST /api/solutions` - Create solution (admin)
- `PUT /api/solutions/:id` - Update solution (admin)
- `DELETE /api/solutions/:id` - Delete solution (admin)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Case Studies
- `GET /api/case-studies` - Get all case studies
- `GET /api/case-studies/:slug` - Get single case study
- `POST /api/case-studies` - Create case study (admin)
- `PUT /api/case-studies/:id` - Update case study (admin)
- `DELETE /api/case-studies/:id` - Delete case study (admin)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Design inspired by modern B2B SaaS platforms
- UI components styled with Tailwind CSS
- Icons from Heroicons

## 📞 Support

For support, email support@mdautomation.com or open an issue in the repository.

---

**Built with ❤️ using the MERN Stack**
