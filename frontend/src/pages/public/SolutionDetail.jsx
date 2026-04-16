import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

export default function SolutionDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchSolution();
  }, [slug]);

  const fetchSolution = async () => {
    try {
      setError(false);
      const response = await api.get(`/solutions/${slug}`);
      setSolution(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching solution:', error);
      setError(true);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <LoadingSkeleton count={8} />
        </div>
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorFeedback 
            message="We couldn't load this solution. It may have been removed or doesn't exist." 
            onRetry={fetchSolution}
          />
          <div className="text-center mt-6">
            <Link to="/solutions" className="btn-primary">
              Back to Solutions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-primary-600">Home</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link to="/solutions" className="text-gray-600 hover:text-primary-600">Solutions</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{solution.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                {solution.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{solution.name}</h1>
              <p className="text-xl text-gray-300 mb-8">
                {solution.shortDescription || solution.description}
              </p>
              <Link to="/contact" className="btn-primary">
                Request a Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            {solution.images && solution.images.length > 0 && (
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={solution.images[0]} 
                  alt={solution.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{solution.description}</p>
              </div>

              {/* Features */}
              {solution.features && solution.features.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 bg-accent-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {solution.applications && solution.applications.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Applications</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.applications.map((app, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-700">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {solution.technologies && solution.technologies.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies Used</h2>
                  <div className="flex flex-wrap gap-3">
                    {solution.technologies.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Industries */}
              {solution.industries && solution.industries.length > 0 && (
                <div className="card">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Target Industries</h3>
                  <div className="space-y-2">
                    {solution.industries.map((industry, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {industry}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="card bg-gradient-to-br from-primary-600 to-primary-700 text-white">
                <h3 className="text-xl font-bold mb-3">Interested in This Solution?</h3>
                <p className="text-primary-100 mb-6">
                  Get in touch with our experts to discuss how this solution can benefit your operations.
                </p>
                <Link to="/contact" className="btn-secondary w-full justify-center bg-white text-primary-600 hover:bg-gray-100">
                  Contact Us
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Download Brochure */}
              {solution.brochureUrl && (
                <div className="card border-2 border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Download Brochure</h4>
                      <p className="text-sm text-gray-600">PDF Format</p>
                    </div>
                  </div>
                  <a 
                    href={solution.brochureUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-secondary w-full justify-center"
                  >
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Solutions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/solutions" className="btn-secondary inline-flex">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Solutions
          </Link>
        </div>
      </section>
    </div>
  );
}
