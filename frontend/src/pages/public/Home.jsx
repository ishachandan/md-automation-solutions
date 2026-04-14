import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function Home() {
  const [solutions, setSolutions] = useState([]);
  const [products, setProducts] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [solutionsRes, productsRes, caseStudiesRes] = await Promise.all([
        api.get('/solutions?featured=true'),
        api.get('/products?featured=true'),
        api.get('/case-studies?featured=true')
      ]);
      setSolutions(solutionsRes.data.data?.slice(0, 3) || []);
      setProducts(productsRes.data.data?.slice(0, 4) || []);
      setCaseStudies(caseStudiesRes.data.data?.slice(0, 3) || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                Industry 4.0 Solutions
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Boost efficiency, ensure quality, embrace the Connected Factory
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Manufacturers are reimagining operations with our automation solutions, empowering Connected Factories to excel in an Industry 4.0 world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-accent">
                  Contact an Expert
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/solutions" className="btn-secondary">
                  Explore Solutions
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl opacity-20 absolute inset-0 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800" 
                alt="Industrial Automation" 
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Expert Engineers' },
              { value: '15+', label: 'Years Experience' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Solutions</h2>
            <p className="section-subtitle mx-auto">
              Comprehensive automation solutions tailored to your industry needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {solutions.map((solution) => (
              <div key={solution._id} className="card group cursor-pointer">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-400 transition-colors">
                  <svg className="w-6 h-6 text-accent-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{solution.description}</p>
                <Link to={`/solutions/${solution.slug}`} className="text-primary-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/solutions" className="btn-primary">
              View All Solutions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle mx-auto">
              Premium automation components from world-leading manufacturers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <div key={product._id} className="card group">
                <div className="aspect-square bg-gray-100 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src={product.images?.[0] || 'https://placehold.co/400x400/e2e8f0/64748b?text=Product'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-sm text-primary-600 font-semibold mb-1">{product.brand}</div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 mb-3">
                  {product.category}
                </div>
                <Link to={`/products`} className="text-sm text-primary-600 font-medium hover:underline">
                  View Details →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn-primary">
              Browse All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle mx-auto">
              Real-world results from our automation implementations
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {caseStudies.map((study) => (
              <div key={study._id} className="card group">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src={study.images?.[0] || 'https://placehold.co/600x400/e2e8f0/64748b?text=Case+Study'} 
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-sm text-accent-600 font-semibold mb-2">{study.industry}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{study.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{study.challenge}</p>
                <Link to={`/case-studies/${study.slug}`} className="text-primary-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Read Case Study
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/case-studies" className="btn-primary">
              View All Case Studies
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Operations?</h2>
          <p className="text-xl mb-8 text-primary-50">
            Let's discuss how our automation solutions can help you achieve your goals
          </p>
          <Link to="/contact" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
            Get Started Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
