import { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const ManageSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Process Automation',
    features: '',
    benefits: '',
    industries: '',
    image: '',
    featured: false
  });

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      const response = await api.get('/solutions');
      setSolutions(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching solutions:', error);
      toast.error('Error fetching solutions');
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
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category || 'Process Automation',
      features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f) : [],
      industries: formData.industries ? formData.industries.split(',').map(i => i.trim()).filter(i => i) : [],
      featured: formData.featured || false
    };

    if (formData.image) {
      payload.images = [formData.image];
    }

    try {
      if (editingId) {
        const response = await api.put(`/solutions/${editingId}`, payload);
        toast.success('Solution updated successfully');
        setSolutions(prev => prev.map(sol => sol._id === editingId ? response.data.data : sol));
      } else {
        const response = await api.post('/solutions', payload);
        toast.success('Solution created successfully');
        setSolutions(prev => [response.data.data, ...prev]);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving solution:', error);
      toast.error(error.response?.data?.error || 'Error saving solution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (solution) => {
    setFormData({
      name: solution.name || '',
      description: solution.description || '',
      category: solution.category || 'Process Automation',
      features: Array.isArray(solution.features) ? solution.features.join(', ') : '',
      benefits: '',
      industries: Array.isArray(solution.industries) ? solution.industries.join(', ') : '',
      image: Array.isArray(solution.images) && solution.images.length > 0 ? solution.images[0] : '',
      featured: solution.featured || false
    });
    setEditingId(solution._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;
    
    try {
      await api.delete(`/solutions/${id}`);
      toast.success('Solution deleted successfully');
      setSolutions(prev => prev.filter(sol => sol._id !== id));
    } catch (error) {
      console.error('Error deleting solution:', error);
      toast.error('Error deleting solution');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Process Automation',
      features: '',
      benefits: '',
      industries: '',
      image: '',
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Manage Solutions</h1>
          <p className="mt-2 text-gray-600">Create and edit automation solutions</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 font-medium transition-colors inline-flex items-center gap-2"
        >
          {showForm ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Solution
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Solution' : 'Create New Solution'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              >
                <option value="Process Automation">Process Automation</option>
                <option value="Quality Control">Quality Control</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Robotics">Robotics</option>
                <option value="IoT Solutions">IoT Solutions</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={formData.features}
                onChange={(e) => handleInputChange('features', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Industries (comma-separated)</label>
              <input
                type="text"
                value={formData.industries}
                onChange={(e) => handleInputChange('industries', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Manufacturing, Automotive, Pharma"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => handleInputChange('featured', e.target.checked)}
                className="mr-3 h-5 w-5 rounded"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-gray-700">Featured Solution</label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button disabled={isSubmitting} type="submit" className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 font-medium disabled:opacity-50 transition-colors">
                {isSubmitting ? 'Saving...' : (editingId ? 'Update Solution' : 'Create Solution')}
              </button>
              <button type="button" onClick={resetForm} disabled={isSubmitting} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-medium disabled:opacity-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Solutions ({solutions.length})</h2>
          
          {solutions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No solutions yet. Click "Add Solution" to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {solutions.map((solution) => (
                <div key={solution._id} className="border-2 border-gray-100 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{solution.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{solution.description}</p>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">{solution.category}</span>
                        {solution.featured && (
                          <span className="text-xs bg-accent-100 text-accent-700 px-3 py-1 rounded-full font-semibold">Featured</span>
                        )}
                        {solution.industries && solution.industries.length > 0 && (
                          <span className="text-xs text-gray-500">{solution.industries.join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(solution)}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(solution._id)}
                        className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200 font-medium transition-colors"
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

export default ManageSolutions;
