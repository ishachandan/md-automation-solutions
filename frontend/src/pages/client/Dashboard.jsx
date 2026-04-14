import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth()
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      fetchEnquiries()
    }
  }, [isAuthenticated, navigate])

  const fetchEnquiries = async () => {
    try {
      const response = await api.get('/enquiries/my-enquiries')
      setEnquiries(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching enquiries:', error)
      toast.error('Error fetching enquiries')
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDownloadQuote = async (url) => {
    try {
      toast.info('Downloading quote...')
      const response = await api.get(url, { responseType: 'blob' })
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = blobUrl
      link.setAttribute('download', 'Quotation.pdf')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.error('Error downloading quote:', error)
      toast.error('Failed to download quote.')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-100 text-blue-700',
      under_review: 'bg-yellow-100 text-yellow-700',
      quote_sent: 'bg-purple-100 text-purple-700',
      won: 'bg-green-100 text-green-700',
      lost: 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusLabel = (status) => {
    const labels = {
      received: 'Received',
      under_review: 'Under Review',
      quote_sent: 'Quote Sent',
      won: 'Won',
      lost: 'Lost'
    }
    return labels[status] || status
  }

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => ['received', 'under_review'].includes(e.status)).length,
    completed: enquiries.filter(e => ['won', 'quote_sent'].includes(e.status)).length
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Enquiries</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Pending</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.pending}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Completed</h3>
            <p className="text-4xl font-bold text-gray-900">{stats.completed}</p>
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4">Account Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-gray-300">{user.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-gray-300">{user.company || 'Not provided'}</span>
                </div>
              </div>
            </div>
            <div className="w-20 h-20 bg-accent-400 rounded-full flex items-center justify-center text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Enquiries Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Enquiries</h2>
            <Link to="/contact" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 font-medium transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Enquiry
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-6">No enquiries yet. Submit your first enquiry to get started.</p>
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Submit Enquiry
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enquiries.map((enquiry) => (
                <div key={enquiry._id} className="border-2 border-gray-100 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Enquiry #{enquiry.enquiryId}</h3>
                      <p className="text-sm text-gray-500">{new Date(enquiry.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <span className={`text-xs px-4 py-2 rounded-full font-semibold ${getStatusColor(enquiry.status)}`}>
                      {getStatusLabel(enquiry.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Project Type</p>
                      <p className="text-sm font-medium text-gray-900">{enquiry.projectType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Industry</p>
                      <p className="text-sm font-medium text-gray-900">{enquiry.industry}</p>
                    </div>
                    {enquiry.budgetRange && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Budget Range</p>
                        <p className="text-sm font-medium text-gray-900">{enquiry.budgetRange}</p>
                      </div>
                    )}
                    {enquiry.timeline && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Timeline</p>
                        <p className="text-sm font-medium text-gray-900">{enquiry.timeline}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Requirements</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{enquiry.requirements?.substring(0, 200)}{enquiry.requirements?.length > 200 ? '...' : ''}</p>
                  </div>

                  {enquiry.quoteUrl && (
                    <div className="bg-accent-50 border-2 border-accent-200 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-accent-400 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-accent-900">Quote Available!</p>
                            <p className="text-xs text-accent-700">Your quotation is ready to download</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownloadQuote(enquiry.quoteUrl)}
                          className="px-4 py-2 bg-accent-400 text-white rounded-full hover:bg-accent-500 font-medium transition-colors text-sm inline-flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
