import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    description: '',
    specifications: '',
    industries: '',
    image: '',
    datasheetUrl: '',
    manualUrl: '',
    featured: false,
    inStock: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
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
    
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login first');
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Convert comma-separated strings to arrays and parse specifications
    const payload = {
      name: formData.name || '',
      brand: formData.brand || '',
      category: formData.category || '',
      description: formData.description || '',
      industries: formData.industries ? formData.industries.split(',').map(i => i.trim()).filter(i => i) : [],
      datasheetUrl: formData.datasheetUrl || '',
      manualUrl: formData.manualUrl || '',
      featured: formData.featured || false,
      inStock: formData.inStock !== undefined ? formData.inStock : true
    };

    // Parse specifications (format: "key1:value1, key2:value2")
    if (formData.specifications) {
      const specsObj = {};
      formData.specifications.split(',').forEach(spec => {
        const [key, value] = spec.split(':').map(s => s.trim());
        if (key && value) specsObj[key] = value;
      });
      payload.specifications = specsObj;
    }

    if (formData.image) {
      payload.images = [formData.image];
    }

    console.log('Submitting payload:', payload);

    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:5000/api/products/${editingId}`, payload, config);
        console.log('Update response:', response.data);
        toast.success('Product updated successfully');
      } else {
        const response = await axios.post('http://localhost:5000/api/products', payload, config);
        console.log('Create response:', response.data);
        toast.success('Product created successfully');
      }
      
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.error || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    // Convert specifications Map to string format
    let specsString = '';
    if (product.specifications) {
      specsString = Object.entries(product.specifications)
        .map(([key, value]) => `${key}:${value}`)
        .join(', ');
    }

    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || '',
      description: product.description || '',
      specifications: specsString,
      industries: Array.isArray(product.industries) ? product.industries.join(', ') : '',
      image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '',
      datasheetUrl: product.datasheetUrl || '',
      manualUrl: product.manualUrl || '',
      featured: product.featured || false,
      inStock: product.inStock !== undefined ? product.inStock : true
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      category: '',
      description: '',
      specifications: '',
      industries: '',
      image: '',
      datasheetUrl: '',
      manualUrl: '',
      featured: false,
      inStock: true
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
          <h1 className="text-4xl font-bold text-gray-900">Manage Products</h1>
          <p className="mt-2 text-gray-600">Manage product catalog and inventory</p>
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
              Add Product
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{editingId ? 'Edit Product' : 'Create New Product'}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brand *</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="e.g., Siemens, ABB, Schneider"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="e.g., PLC, Sensors, Drives"
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
                placeholder="Product description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specifications (format: key1:value1, key2:value2)</label>
              <input
                type="text"
                value={formData.specifications}
                onChange={(e) => handleInputChange('specifications', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                placeholder="Voltage:24V DC, Current:10A, Power:240W"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Datasheet URL</label>
                <input
                  type="text"
                  value={formData.datasheetUrl}
                  onChange={(e) => handleInputChange('datasheetUrl', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Manual URL</label>
                <input
                  type="text"
                  value={formData.manualUrl}
                  onChange={(e) => handleInputChange('manualUrl', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="mr-3 h-5 w-5 rounded"
                />
                <label htmlFor="featured" className="text-sm font-semibold text-gray-700">Featured Product</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={formData.inStock}
                  onChange={(e) => handleInputChange('inStock', e.target.checked)}
                  className="mr-3 h-5 w-5 rounded"
                />
                <label htmlFor="inStock" className="text-sm font-semibold text-gray-700">In Stock</label>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button type="submit" className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 font-medium transition-colors">
                {editingId ? 'Update' : 'Create'} Product
              </button>
              <button type="button" onClick={resetForm} className="px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-medium transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Products ({products.length})</h2>
          
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No products yet. Click "Add Product" to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product._id} className="border-2 border-gray-100 rounded-xl p-6 hover:border-gray-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.brand} - {product.category}</p>
                      <p className="text-sm text-gray-500 mb-3">{product.description?.substring(0, 100)}...</p>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">{product.category}</span>
                        {product.featured && (
                          <span className="text-xs bg-accent-100 text-accent-700 px-3 py-1 rounded-full font-semibold">Featured</span>
                        )}
                        {product.inStock ? (
                          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">In Stock</span>
                        ) : (
                          <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-semibold">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 font-medium transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
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

export default ManageProducts;
