import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: 'Admin',
    category: '',
    tags: '',
    featuredImage: '',
    published: false
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blog');
      setBlogPosts(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Error fetching blog posts');
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

    const payload = {
      title: formData.title || '',
      content: formData.content || '',
      excerpt: formData.excerpt || '',
      author: formData.author || 'Admin',
      category: formData.category || '',
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      featuredImage: formData.featuredImage || '',
      published: formData.published || false
    };

    console.log('Submitting payload:', payload);

    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:5000/api/blog/${editingId}`, payload, config);
        console.log('Update response:', response.data);
        toast.success('Blog post updated successfully');
      } else {
        const response = await axios.post('http://localhost:5000/api/blog', payload, config);
        console.log('Create response:', response.data);
        toast.success('Blog post created successfully');
      }
      
      resetForm();
      fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error(error.response?.data?.error || 'Error saving blog post');
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title || '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      author: post.author || 'Admin',
      category: post.category || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      featuredImage: post.featuredImage || '',
      published: post.published || false
    });
    setEditingId(post._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`http://localhost:5000/api/blog/${id}`, config);
      toast.success('Blog post deleted successfully');
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Error deleting blog post');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      author: 'Admin',
      category: '',
      tags: '',
      featuredImage: '',
      published: false
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
        <h1 className="text-3xl font-bold text-gray-900">Manage Blog Posts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '+ Add Blog Post'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
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
              <label className="block text-sm font-medium mb-1">Excerpt *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="2"
                placeholder="Brief summary of the blog post"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="8"
                placeholder="Full blog post content"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Industry News, Technology, Case Studies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="automation, IoT, manufacturing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Featured Image URL</label>
              <input
                type="text"
                value={formData.featuredImage}
                onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/blog-image.jpg"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => handleInputChange('published', e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="published" className="text-sm font-medium">Published</label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                {editingId ? 'Update' : 'Create'} Blog Post
              </button>
              <button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">All Blog Posts ({blogPosts.length})</h2>
          
          {blogPosts.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No blog posts yet. Click "Add Blog Post" to create one.</p>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">By {post.author} {post.category && `• ${post.category}`}</p>
                      <p className="text-sm text-gray-500 mt-1">{post.excerpt?.substring(0, 120)}...</p>
                      <div className="flex items-center space-x-4 mt-2">
                        {post.published ? (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Published</span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Draft</span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <span className="text-xs text-gray-500">{post.tags.slice(0, 3).join(', ')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
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

export default ManageBlogPosts;
