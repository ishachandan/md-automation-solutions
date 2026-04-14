import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setError(false);
      const response = await api.get('/case-studies');
      setCaseStudies(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching case studies:', error);
      setError(true);
      setLoading(false);
    }
  };

  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry))];
  const filteredCaseStudies = selectedIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              CASE STUDIES
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Real Results, Real Impact
            </h1>
            <p className="text-xl text-gray-300">
              Discover how we've helped leading companies transform their operations with automation solutions that deliver measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Filter */}
      {industries.length > 2 && (
        <section className="bg-gray-50 border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Industry:</span>
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedIndustry === industry
                      ? 'bg-black text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {industry === 'all' ? 'All Industries' : industry}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : error ? (
            <ErrorFeedback message="We couldn't load the case studies at this time." onRetry={fetchCaseStudies} />
          ) : filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No case studies available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCaseStudies.map((study) => (
                <div key={study._id} className="card group">
                  <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden relative">
                    <img 
                      src={study.images?.[0] || 'https://placehold.co/600x400/e2e8f0/64748b?text=Case+Study'} 
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {study.featured && (
                      <div className="absolute top-2 right-2 bg-accent-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {study.industry}
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      {study.solutionType}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{study.title}</h3>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Client:</span> {study.clientName}
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Challenge</div>
                    <p className="text-sm text-gray-600 line-clamp-3">{study.challenge}</p>
                  </div>

                  {study.results && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Results</div>
                      <p className="text-sm text-gray-600 line-clamp-2">{study.results}</p>
                    </div>
                  )}

                  {study.technologies && study.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {study.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 3 && (
                          <span className="text-xs text-gray-500">+{study.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}

                  <Link 
                    to={`/case-studies/${study.slug}`} 
                    className="text-primary-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Read Full Story
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

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Track Record
            </h2>
            <p className="text-lg text-gray-600">
              Our solutions deliver measurable results across industries
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '35-50%', label: 'Avg. Capacity Increase' },
              { value: '60-75%', label: 'Defect Reduction' },
              { value: '20-30%', label: 'Energy Savings' },
              { value: '95%+', label: 'System Uptime' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how we can help you achieve similar results
          </p>
          <Link to="/contact" className="btn-primary">
            Start Your Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
