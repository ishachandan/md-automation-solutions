import { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const ManageCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    clientName: 'Confidential Client',
    industry: '',
    solutionType: '',
    country: '',
    challenge: '',
    solution: '',
    technologies: '',
    results: '',
    image: '',
    videoUrl: '',
    featured: false
  });

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const response = await api.get('/case-studies');
      setCaseStudies(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast.error('Error fetching case studies');
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert comma-separated strings to arrays
    const payload = {
      title: formData.title || '',
      clientName: formData.clientName || 'Confidential Client',
      industry: formData.industry || '',
      solutionType: formData.solutionType || '',
      country: formData.country || '',
      challenge: formData.challenge || '',
      solution: formData.solution || '',
      technologies: formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(t => t) : [],
      results: formData.results || '',
      videoUrl: formData.videoUrl || '',
      featured: formData.featured || false
    };

    if (formData.image) {
      payload.images = [formData.image];
    }

    try {
      if (editingId) {
        const response = await api.put(`/case-studies/${editingId}`, payload);
        toast.success('Case study updated successfully');
        setCaseStudies(prev => prev.map(item => item._id === editingId ? response.data.data : item));
      } else {
        const response = await api.post('/case-studies', payload);
        toast.success('Case study created successfully');
        setCaseStudies(prev => [response.data.data, ...prev]);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving case study:', error);
      toast.error(error.response?.data?.error || 'Error saving case study');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (caseStudy) => {
    setFormData({
      title: caseStudy.title || '',
      clientName: caseStudy.clientName || 'Confidential Client',
      industry: caseStudy.industry || '',
      solutionType: caseStudy.solutionType || '',
      country: caseStudy.country || '',
      challenge: caseStudy.challenge || '',
      solution: caseStudy.solution || '',
      technologies: Array.isArray(caseStudy.technologies) ? caseStudy.technologies.join(', ') : '',
      results: caseStudy.results || '',
      image: Array.isArray(caseStudy.images) && caseStudy.images.length > 0 ? caseStudy.images[0] : '',
      videoUrl: caseStudy.videoUrl || '',
      featured: caseStudy.featured || false
    });
    setEditingId(caseStudy._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return;
    
    try {
      await api.delete(`/case-studies/${id}`);
      toast.success('Case study deleted successfully');
      setCaseStudies(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast.error('Error deleting case study');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      clientName: 'Confidential Client',
      industry: '',
      solutionType: '',
      country: '',
      challenge: '',
      solution: '',
      technologies: '',
      results: '',
      image: '',
      videoUrl: '',
      featured: false
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Case Studies</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Case Study'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Case Study' : 'Create New Case Study'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Client Name</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confidential Client"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Industry *</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Manufacturing, Automotive"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Solution Type *</label>
              <input
                type="text"
                value={formData.solutionType}
                onChange={(e) => handleInputChange('solutionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Process Automation, Quality Control"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., India, USA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Challenge *</label>
              <textarea
                value={formData.challenge}
                onChange={(e) => handleInputChange('challenge', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Describe the client's challenge"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Solution *</label>
              <textarea
                value={formData.solution}
                onChange={(e) => handleInputChange('solution', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Describe the solution provided"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma-separated)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => handleInputChange('technologies', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="PLC, SCADA, IoT Sensors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Results</label>
              <textarea
                value={formData.results}
                onChange={(e) => handleInputChange('results', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
                placeholder="Describe the outcomes and metrics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Video URL</label>
              <input
                type="text"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="featured" className="text-sm font-medium">Featured Case Study</label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button disabled={isSubmitting} type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                {isSubmitting ? 'Saving...' : (editingId ? 'Update Case Study' : 'Create Case Study')}
              </button>
              <button type="button" onClick={resetForm} disabled={isSubmitting} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium disabled:opacity-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Case Studies ({caseStudies.length})</h2>
          
          {caseStudies.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No case studies yet. Click "Add Case Study" to create one.</p>
          ) : (
            <div className="space-y-4">
              {caseStudies.map((caseStudy) => (
                <div key={caseStudy._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{caseStudy.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{caseStudy.clientName} - {caseStudy.industry}</p>
                      <p className="text-sm text-gray-500 mt-1">{caseStudy.challenge?.substring(0, 100)}...</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{caseStudy.solutionType}</span>
                        {caseStudy.featured && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Featured</span>
                        )}
                        {caseStudy.country && (
                          <span className="text-xs text-gray-500">{caseStudy.country}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(caseStudy)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(caseStudy._id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCaseStudies;
