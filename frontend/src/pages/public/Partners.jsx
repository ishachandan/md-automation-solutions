import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import ErrorFeedback from '../../components/common/ErrorFeedback';

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setError(false);
      const response = await api.get('/partners');
      setPartners(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching partners:', error);
      setError(true);
      setLoading(false);
    }
  };

  const brands = [
    { name: 'Siemens', logo: 'https://logo.clearbit.com/siemens.com' },
    { name: 'ABB', logo: 'https://logo.clearbit.com/abb.com' },
    { name: 'Schneider Electric', logo: 'https://logo.clearbit.com/se.com' },
    { name: 'Rockwell Automation', logo: 'https://logo.clearbit.com/rockwellautomation.com' },
    { name: 'Omron', logo: 'https://logo.clearbit.com/omron.com' },
    { name: 'Mitsubishi Electric', logo: 'https://logo.clearbit.com/mitsubishielectric.com' },
    { name: 'FANUC', logo: 'https://logo.clearbit.com/fanuc.com' },
    { name: 'KUKA', logo: 'https://logo.clearbit.com/kuka.com' },
    { name: 'Yaskawa', logo: 'https://logo.clearbit.com/yaskawa.com' },
    { name: 'Cognex', logo: 'https://logo.clearbit.com/cognex.com' },
    { name: 'Keyence', logo: 'https://logo.clearbit.com/keyence.com' },
    { name: 'Sick', logo: 'https://logo.clearbit.com/sick.com' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              PARTNERS
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trusted by Industry Leaders
            </h1>
            <p className="text-xl text-gray-300">
              We partner with world-leading manufacturers to deliver premium automation solutions
            </p>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Technology Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Authorized distributors and system integrators for premium automation brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 flex items-center justify-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center">
                    <img 
                      src={brand.logo} 
                      alt={brand.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="hidden text-2xl font-bold text-gray-400">
                      {brand.name.substring(0, 2)}
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">{brand.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Channel Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Channel Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our network of authorized distributors and resellers
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : error ? (
            <ErrorFeedback message="We couldn't load the partners at this time." onRetry={fetchPartners} />
          ) : partners.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">No channel partners listed at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <div key={partner._id} className="card">
                  {partner.logo && (
                    <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                      <img 
                        src={partner.logo} 
                        alt={partner.companyName}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{partner.companyName}</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {partner.city}, {partner.state}
                    </div>
                    {partner.email && (
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {partner.email}
                      </div>
                    )}
                    {partner.phone && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {partner.phone}
                      </div>
                    )}
                  </div>
                  {partner.specializations && partner.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {partner.specializations.slice(0, 3).map((spec, idx) => (
                        <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Become a Partner</h2>
          <p className="text-xl mb-8 text-primary-50">
            Join our network of authorized distributors and grow your business with us
          </p>
          <Link to="/contact" className="btn-primary bg-white text-gray-900 hover:bg-gray-100">
            Partner With Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Partnership Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Why partner with MD Automation Solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Competitive Margins',
                description: 'Attractive pricing and margin structures for our partners'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: 'Technical Support',
                description: 'Dedicated technical team to support your projects'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: 'Training & Certification',
                description: 'Comprehensive training programs for your team'
              }
            ].map((benefit, idx) => (
              <div key={idx} className="card text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-accent-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
