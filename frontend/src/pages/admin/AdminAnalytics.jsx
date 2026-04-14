import { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchAnalytics = async () => {
      try {
        setError(false);
        const response = await api.get('/enquiries/analytics');
        if (isMounted) {
          setAnalytics(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        // Minor clean up: changed error to warn logic per PR review notes.
        console.warn('Failed to load analytics', err);
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchAnalytics();
    
    return () => {
      isMounted = false; // Addressed Phase 2 PR review: unmount check mapping guard
    };
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
        <ErrorFeedback message="Failed to load analytics data. Make sure you are authorized." onRetry={() => window.location.reload()} />
      </div>
    );
  }

  // Addressed Phase 2 PR review: Null Guards to prevent nested map breakages
  const safeStatusCounts = analytics?.statusCounts || [];
  const safeIndustryCounts = analytics?.industryCounts || [];
  const safeMonthlyTrends = analytics?.monthlyTrends || [];
  const safeConversion = analytics?.conversionStats || { won: 0, lost: 0, total: 0, rate: 0 };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
      
      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Enquiries</p>
          <p className="text-5xl font-bold text-gray-900">{analytics.totalEnquiries}</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-accent-100 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-2">Conversion Rate</p>
          <p className="text-5xl font-bold text-gray-900">{safeConversion.rate}%</p>
          <p className="text-sm text-gray-500 mt-2">{safeConversion.won} won out of {safeConversion.total} total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart: Status */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Enquiries by Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={safeStatusCounts} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="count" nameKey="_id">
                  {safeStatusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Industry */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Enquiries by Industry</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={safeIndustryCounts}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="_id" tick={{fontSize: 12}} />
                <YAxis allowDecimals={false} />
                <RechartsTooltip cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="count" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Line Chart: Monthly Trends */}
      <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safeMonthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <RechartsTooltip />
              <Line type="monotone" dataKey="count" stroke="#38bdf8" strokeWidth={3} dot={{r: 5, strokeWidth: 2, fill: '#38bdf8'}} activeDot={{r: 7}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
