import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCaseStudy();
  }, [slug]);

  const fetchCaseStudy = async () => {
    try {
      setError(false);
      const response = await api.get(`/case-studies/${slug}`);
      setCaseStudy(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching case study:', error);
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

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ErrorFeedback 
            message="We couldn't load this case study." 
            onRetry={fetchCaseStudy}
          />
          <div className="text-center mt-6">
            <Link to="/case-studies" className="btn-primary">
              Back to Case Studies
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
            <Link to="/case-studies" className="text-gray-600 hover:text-primary-600">Case Studies</Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{caseStudy.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                {caseStudy.industry}
              </span>
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {caseStudy.solutionType}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{caseStudy.title}</h1>
            <p className="text-xl text-gray-300">
              Client: {caseStudy.clientName} • {caseStudy.country}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image */}
          {caseStudy.images && caseStudy.images.length > 0 && (
            <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
              <img 
                src={caseStudy.images[0]} 
                alt={caseStudy.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Challenge */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">The Challenge</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{caseStudy.challenge}</p>
          </div>

          {/* Solution */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{caseStudy.solution}</p>
            
            {/* Technologies */}
            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Technologies Used:</h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Results Achieved</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{caseStudy.results}</p>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Interested in Similar Results?</h3>
            <p className="text-primary-100 mb-6">
              Let's discuss how we can help transform your operations with automation solutions.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link to="/case-studies" className="btn-secondary inline-flex">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Case Studies
          </Link>
        </div>
      </section>
    </div>
  );
}
