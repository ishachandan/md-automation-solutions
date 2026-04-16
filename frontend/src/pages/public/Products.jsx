import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(false);
      const response = await api.get('/products');
      setProducts(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(true);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const brands = ['all', ...new Set(products.map(p => p.brand))];
  
  const filteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'all' || p.category === selectedCategory;
    const brandMatch = selectedBrand === 'all' || p.brand === selectedBrand;
    return categoryMatch && brandMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              PRODUCTS
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Premium Automation Components
            </h1>
            <p className="text-xl text-gray-300">
              Industrial automation products from world-leading manufacturers like Siemens, ABB, Schneider Electric, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-50 border-b border-gray-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Category Filter */}
          {categories.length > 2 && (
            <div className="mb-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Category:</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat === 'all' ? 'All Categories' : cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brand Filter */}
          {brands.length > 2 && (
            <div>
              <div className="flex items-center gap-3 overflow-x-auto">
                <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Brand:</span>
                {brands.slice(0, 10).map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedBrand === brand
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {brand === 'all' ? 'All Brands' : brand}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton count={8} />
          ) : error ? (
            <ErrorFeedback message="We couldn't load the products at this time." onRetry={fetchProducts} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No products found matching your filters.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); }}
                className="mt-4 text-primary-600 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="card group">
                    <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                      <img 
                        src={product.images?.[0] || 'https://placehold.co/400x400/e2e8f0/64748b?text=Product'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.featured && (
                        <div className="absolute top-2 right-2 bg-accent-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    <div className="text-sm text-primary-600 font-semibold mb-1">{product.brand}</div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
                    
                    <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 mb-3">
                      {product.category}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    {product.datasheetUrl && (
                      <a
                        href={product.datasheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 hover:underline block mb-3 inline-flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Datasheet
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us and we'll help you source the right components for your project
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
