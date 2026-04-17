import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

export default function Solutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchSolutions();
  }, []);

  const fetchSolutions = async () => {
    try {
      setError(false);
      const response = await api.get('/solutions');
      setSolutions(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching solutions:', error);
      setError(true);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(solutions.map(s => s.category))];
  const filteredSolutions = selectedCategory === 'all' 
    ? solutions 
    : solutions.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              SOLUTIONS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Automation Solutions for Every Industry
            </h1>
            <p className="text-xl text-gray-300">
              Comprehensive automation solutions designed to boost efficiency, ensure quality, and drive digital transformation across manufacturing operations.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 2 && (
        <section className="bg-gray-50 border-b border-gray-200 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Filter by:</span>
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
                  {cat === 'all' ? 'All Solutions' : cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <ErrorFeedback message="We couldn't load the solutions at this time." onRetry={fetchSolutions} />
          ) : filteredSolutions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No solutions available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSolutions.map((solution) => (
                <div key={solution._id} className="card group">
                  {solution.images && solution.images.length > 0 && (
                    <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden">
                      <img 
                        src={solution.images[0]} 
                        alt={solution.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    {solution.category}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{solution.name}</h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {solution.description}
                  </p>

                  {solution.features && solution.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {solution.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                        {solution.features.length > 3 && (
                          <span className="text-xs text-gray-500">+{solution.features.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {solution.industries && solution.industries.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Industries:</div>
                      <div className="text-sm text-gray-700">{solution.industries.slice(0, 3).join(', ')}</div>
                    </div>
                  )}

                  <Link 
                    to={`/solutions/${solution.slug}`} 
                    className="text-primary-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Learn More
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Need Help Choosing the Right Solution?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our automation experts can help you find the perfect solution for your specific needs
          </p>
          <Link to="/contact" className="btn-primary">
            Contact an Expert
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
