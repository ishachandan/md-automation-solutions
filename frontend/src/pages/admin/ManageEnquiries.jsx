import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('https://md-automation-solutions.onrender.com/api/enquiries', config);
      setEnquiries(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Error fetching enquiries');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (enquiryId, newStatus, notes = '') => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await axios.put(
        `https://md-automation-solutions.onrender.com/api/enquiries/${enquiryId}/status`,
        { status: newStatus, notes },
        config
      );
      
      toast.success('Status updated successfully');
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
        const updated = await axios.get(`https://md-automation-solutions.onrender.com/api/enquiries/${enquiryId}`, config);
        setSelectedEnquiry(updated.data.data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    }
  };

  const handleQuoteUpload = async (enquiryId, quoteUrl) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.put(
        `https://md-automation-solutions.onrender.com/api/enquiries/${enquiryId}`,
        { quoteUrl },
        config
      );
      
      toast.success('Quote URL updated successfully');
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === enquiryId) {
        const updated = await axios.get(`https://md-automation-solutions.onrender.com/api/enquiries/${enquiryId}`, config);
        setSelectedEnquiry(updated.data.data);
      }
    } catch (error) {
      console.error('Error uploading quote:', error);
      toast.error('Error uploading quote');
    }
  };

  const viewDetails = async (enquiry) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`https://md-automation-solutions.onrender.com/api/enquiries/${enquiry._id}`, config);
      setSelectedEnquiry(response.data.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching enquiry details:', error);
      toast.error('Error fetching enquiry details');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      received: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      quote_sent: 'bg-purple-100 text-purple-800',
      won: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      received: 'Received',
      under_review: 'Under Review',
      quote_sent: 'Quote Sent',
      won: 'Won',
      lost: 'Lost'
    };
    return labels[status] || status;
  };

  const filteredEnquiries = statusFilter === 'all' 
    ? enquiries 
    : enquiries.filter(e => e.status === statusFilter);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Enquiries</h1>
          <p className="mt-2 text-gray-600">View and respond to customer enquiries</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-medium"
          >
            <option value="all">All Status</option>
            <option value="received">Received</option>
            <option value="under_review">Under Review</option>
            <option value="quote_sent">Quote Sent</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Enquiries ({filteredEnquiries.length})</h2>
          </div>
          
          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No enquiries found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry._id} className="border-2 border-gray-100 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{enquiry.companyName}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(enquiry.status)}`}>
                          {getStatusLabel(enquiry.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {enquiry.contactPerson} • {enquiry.email} • {enquiry.phone}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        {enquiry.industry} • {enquiry.projectType}
                      </p>
                      <p className="text-xs text-gray-400">
                        ID: {enquiry.enquiryId} • {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => viewDetails(enquiry)}
                        className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showDetails && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Enquiry Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Enquiry ID</label>
                    <p className="text-base text-gray-900 font-medium">{selectedEnquiry.enquiryId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                    <span className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(selectedEnquiry.status)}`}>
                      {getStatusLabel(selectedEnquiry.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Company Name</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.companyName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Contact Person</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.contactPerson}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Industry</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.industry}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Project Type</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.projectType}</p>
                  </div>
                </div>

                {selectedEnquiry.budgetRange && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Budget Range</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.budgetRange}</p>
                  </div>
                )}

                {selectedEnquiry.timeline && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Timeline</label>
                    <p className="text-base text-gray-900">{selectedEnquiry.timeline}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Requirements</label>
                  <p className="text-base text-gray-900 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">{selectedEnquiry.requirements}</p>
                </div>

                {selectedEnquiry.attachments && selectedEnquiry.attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Attachments</label>
                    <div className="space-y-2">
                      {selectedEnquiry.attachments.map((att, idx) => (
                        <a
                          key={idx}
                          href={att.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:underline block"
                        >
                          {att.fileName}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t-2 border-gray-100 pt-6">
                  <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Update Status</label>
                  <div className="flex space-x-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          const notes = prompt('Add notes (optional):');
                          handleStatusUpdate(selectedEnquiry._id, e.target.value, notes || '');
                          e.target.value = '';
                        }
                      }}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent font-medium"
                      defaultValue=""
                    >
                      <option value="">Select new status...</option>
                      <option value="received">Received</option>
                      <option value="under_review">Under Review</option>
                      <option value="quote_sent">Quote Sent</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 pt-6">
                  <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quote URL</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      defaultValue={selectedEnquiry.quoteUrl || ''}
                      placeholder="https://example.com/quote.pdf"
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                      id="quoteUrlInput"
                    />
                    <button
                      onClick={() => {
                        const url = document.getElementById('quoteUrlInput').value;
                        if (url) {
                          handleQuoteUpload(selectedEnquiry._id, url);
                        }
                      }}
                      className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 font-medium transition-colors"
                    >
                      Save
                    </button>
                  </div>
                  {selectedEnquiry.quoteUrl && (
                    <a
                      href={selectedEnquiry.quoteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:underline mt-2 inline-block"
                    >
                      View Current Quote
                    </a>
                  )}
                </div>

                {selectedEnquiry.statusHistory && selectedEnquiry.statusHistory.length > 0 && (
                  <div className="border-t-2 border-gray-100 pt-6">
                    <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Status History</label>
                    <div className="space-y-3">
                      {selectedEnquiry.statusHistory.map((history, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(history.status)}`}>
                            {getStatusLabel(history.status)}
                          </span>
                          <span className="text-gray-600 ml-3 text-sm">
                            {new Date(history.updatedAt).toLocaleString()}
                          </span>
                          {history.notes && (
                            <p className="text-gray-700 mt-2 text-sm">{history.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-6 border-t-2 border-gray-100">
                  <button
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEnquiries;
