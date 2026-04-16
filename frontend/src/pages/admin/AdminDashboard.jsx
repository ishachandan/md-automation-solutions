import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    solutions: 0,
    caseStudies: 0,
    products: 0,
    blogPosts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      console.log('Fetching stats...');

      const [enquiries, solutions, caseStudies, products, blog] = await Promise.all([
        axios.get('https://md-automation-solutions.onrender.com/api/enquiries', config).catch(err => {
          console.error('Enquiries fetch error:', err);
          return { data: { data: [] } };
        }),
        axios.get('https://md-automation-solutions.onrender.com/api/solutions').catch(err => {
          console.error('Solutions fetch error:', err);
          return { data: { data: [] } };
        }),
        axios.get('https://md-automation-solutions.onrender.com/api/case-studies').catch(err => {
          console.error('Case studies fetch error:', err);
          return { data: { data: [] } };
        }),
        axios.get('https://md-automation-solutions.onrender.com/api/products').catch(err => {
          console.error('Products fetch error:', err);
          return { data: { data: [] } };
        }),
        axios.get('https://md-automation-solutions.onrender.com/api/blog').catch(err => {
          console.error('Blog fetch error:', err);
          return { data: { data: [] } };
        }),
      ]);

      console.log('Stats fetched successfully');

      setStats({
        enquiries: enquiries.data.data.length,
        solutions: solutions.data.data.length,
        caseStudies: caseStudies.data.data.length,
        products: products.data.data.length,
        blogPosts: blog.data.data.length,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Enquiries', value: stats.enquiries, color: 'bg-primary-500', bgLight: 'bg-primary-50', textColor: 'text-primary-600', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Solutions', value: stats.solutions, color: 'bg-accent-500', bgLight: 'bg-accent-50', textColor: 'text-accent-600', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Case Studies', value: stats.caseStudies, color: 'bg-purple-500', bgLight: 'bg-purple-50', textColor: 'text-purple-600', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { label: 'Products', value: stats.products, color: 'bg-orange-500', bgLight: 'bg-orange-50', textColor: 'text-orange-600', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { label: 'Blog Posts', value: stats.blogPosts, color: 'bg-indigo-500', bgLight: 'bg-indigo-50', textColor: 'text-indigo-600', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  console.log('Rendering AdminDashboard with stats:', stats);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className={`${card.bgLight} ${card.textColor} rounded-xl p-3 w-fit mb-4`}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/enquiries"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-primary-100 text-primary-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Enquiries</h3>
            <p className="text-sm text-gray-600">View and respond to customer enquiries</p>
          </Link>

          <Link
            to="/admin/solutions"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-accent-100 text-accent-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Solutions</h3>
            <p className="text-sm text-gray-600">Create and edit automation solutions</p>
          </Link>

          <Link
            to="/admin/case-studies"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-purple-100 text-purple-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Case Studies</h3>
            <p className="text-sm text-gray-600">Add and update success stories</p>
          </Link>

          <Link
            to="/admin/products"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-orange-100 text-orange-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Products</h3>
            <p className="text-sm text-gray-600">Manage product catalog and inventory</p>
          </Link>

          <Link
            to="/admin/blog"
            className="group p-6 border-2 border-gray-200 rounded-xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="bg-indigo-100 text-indigo-600 rounded-lg p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Manage Blog</h3>
            <p className="text-sm text-gray-600">Create and publish blog posts</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
