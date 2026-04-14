import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/public/Home'
import About from './pages/public/About'
import Solutions from './pages/public/Solutions'
import CaseStudies from './pages/public/CaseStudies'
import Products from './pages/public/Products'
import Partners from './pages/public/Partners'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import Dashboard from './pages/client/Dashboard'
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageSolutions from './pages/admin/ManageSolutions'
import ManageCaseStudies from './pages/admin/ManageCaseStudies2'
import ManageProducts from './pages/admin/ManageProducts'
import ManageBlogPosts from './pages/admin/ManageBlogPosts'
import ManageEnquiries from './pages/admin/ManageEnquiries'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Admin Routes - No Navbar/Footer */}
            <Route path="/admin/*" element={
              <ProtectedRoute adminOnly={true}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="solutions" element={<ManageSolutions />} />
              <Route path="case-studies" element={<ManageCaseStudies />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="blog" element={<ManageBlogPosts />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>

            {/* Public and Client Routes - With Navbar/Footer */}
            <Route path="*" element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/solutions" element={<Solutions />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
