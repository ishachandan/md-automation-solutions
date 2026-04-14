import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent-400 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              ABOUT US
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Empowering Industry 4.0 Transformation
            </h1>
            <p className="text-xl text-gray-300">
              Leading provider of industrial automation solutions, helping manufacturers excel in the connected factory era.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At MD Automation Solutions, we're dedicated to transforming manufacturing operations through cutting-edge automation technology. Our mission is to empower businesses to achieve operational excellence, improve quality, and drive sustainable growth.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We believe that every manufacturer deserves access to world-class automation solutions that are tailored to their unique needs and challenges.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  <span className="text-gray-700">Innovation-Driven</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  <span className="text-gray-700">Customer-Centric</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                  <span className="text-gray-700">Results-Focused</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800" 
                alt="Our Mission" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Innovation',
                description: 'We continuously explore new technologies and methodologies to deliver cutting-edge solutions that keep our clients ahead of the curve.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Quality',
                description: 'We maintain the highest standards in everything we do, from solution design to implementation and ongoing support.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Partnership',
                description: 'We build long-term relationships with our clients, working as trusted partners to achieve their business objectives.'
              }
            ].map((value, idx) => (
              <div key={idx} className="card">
                <div className="w-16 h-16 bg-accent-100 rounded-xl flex items-center justify-center mb-4 text-accent-600">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive automation capabilities across multiple domains
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Process Automation', count: '200+' },
              { name: 'Robotics Integration', count: '150+' },
              { name: 'SCADA Systems', count: '100+' },
              { name: 'IoT Solutions', count: '80+' },
              { name: 'Machine Vision', count: '120+' },
              { name: 'Energy Management', count: '90+' },
              { name: 'Safety Systems', count: '110+' },
              { name: 'System Integration', count: '250+' }
            ].map((expertise, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">{expertise.count}</div>
                <div className="text-gray-700 font-medium">{expertise.name}</div>
                <div className="text-sm text-gray-500 mt-1">Projects</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert engineers and consultants dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Engineers' },
              { value: '15+', label: 'Years Experience' },
              { value: '200+', label: 'Clients Served' },
              { value: '500+', label: 'Projects Completed' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your operations? Get in touch with our team
          </p>
          <Link to="/contact" className="btn-primary">
            Contact Us
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
