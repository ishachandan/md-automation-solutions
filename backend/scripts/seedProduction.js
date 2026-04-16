/**
 * PRODUCTION DATABASE SEED SCRIPT
 * Generates 50 Solutions, 50 Products, 50 Case Studies, 50 Enquiries
 * All data is inline - no external files needed
 * 
 * Usage: node backend/scripts/seedProduction.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Solution = require('../models/Solution');
const Product = require('../models/Product');
const CaseStudy = require('../models/CaseStudy');
const Enquiry = require('../models/Enquiry');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Solution categories and data
const solutionCategories = [
  'Industrial Automation', 'Process Control', 'SCADA Systems', 
  'PLC Programming', 'HMI Solutions', 'Motion Control',
  'Robotics Integration', 'IoT Solutions', 'Energy Management',
  'Building Automation'
];

const industries = [
  'Manufacturing', 'Oil & Gas', 'Pharmaceuticals', 'Food & Beverage',
  'Automotive', 'Chemical', 'Water Treatment', 'Power Generation',
  'Mining', 'Textile', 'Packaging', 'Steel', 'Cement'
];

const technologies = [
  'Siemens PLC', 'Allen Bradley', 'Schneider Electric', 'ABB',
  'Mitsubishi', 'Delta', 'Omron', 'SCADA', 'HMI', 'IoT Sensors',
  'Industrial Ethernet', 'Profibus', 'Modbus', 'OPC UA'
];

// Generate 50 Solutions
const generateSolutions = () => {
  const solutions = [];
  for (let i = 1; i <= 50; i++) {
    const category = solutionCategories[i % solutionCategories.length];
    const industry = industries.slice(0, 3 + (i % 3));
    const tech = technologies.slice(i % 5, (i % 5) + 4);
    
    solutions.push({
      name: `${category} Solution ${i}`,
      slug: `${category.toLowerCase().replace(/\s+/g, '-')}-solution-${i}`,
      category: category,
      industries: industry,
      description: `Comprehensive ${category.toLowerCase()} solution designed for ${industry[0].toLowerCase()} industry. This advanced system provides real-time monitoring, control, and optimization capabilities. Solution ${i} integrates seamlessly with existing infrastructure while offering scalability for future expansion. Our proven methodology ensures minimal downtime during implementation and maximum ROI.`,
      shortDescription: `Advanced ${category.toLowerCase()} for ${industry[0]} with real-time monitoring and control.`,
      features: [
        'Real-time monitoring and control',
        'Remote access and diagnostics',
        'Predictive maintenance alerts',
        'Data analytics and reporting',
        'Energy optimization',
        'Seamless integration',
        'Scalable architecture',
        '24/7 technical support'
      ],
      applications: [
        'Process automation',
        'Quality control',
        'Production monitoring',
        'Asset management',
        'Energy management'
      ],
      technologies: tech,
      images: [`https://placehold.co/800x600/38bdf8/white?text=${encodeURIComponent(category + ' ' + i)}`],
      featured: i <= 6,
      createdAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000)
    });
  }
  return solutions;
};

// Product brands and categories
const productBrands = [
  'Siemens', 'ABB', 'Schneider Electric', 'Rockwell Automation',
  'Mitsubishi Electric', 'Omron', 'Delta Electronics', 'Honeywell',
  'Emerson', 'Yokogawa'
];

const productCategories = [
  'PLCs', 'HMIs', 'Drives', 'Motors', 'Sensors', 'Actuators',
  'Controllers', 'Relays', 'Switches', 'Power Supplies'
];

// Generate 50 Products
const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 50; i++) {
    const brand = productBrands[i % productBrands.length];
    const category = productCategories[i % productCategories.length];
    const industry = industries.slice(i % 4, (i % 4) + 3);
    
    products.push({
      name: `${brand} ${category} Model ${1000 + i}`,
      slug: `${brand.toLowerCase().replace(/\s+/g, '-')}-${category.toLowerCase()}-${1000 + i}`,
      brand: brand,
      category: category,
      description: `High-performance ${category.toLowerCase()} from ${brand}. Model ${1000 + i} offers exceptional reliability, precision, and ease of integration. Designed for demanding industrial environments with advanced features and robust construction. Ideal for ${industry[0].toLowerCase()} applications requiring superior performance and longevity.`,
      specifications: new Map([
        ['Model Number', `${brand.substring(0, 3).toUpperCase()}-${1000 + i}`],
        ['Power Supply', i % 2 === 0 ? '24V DC' : '230V AC'],
        ['Operating Temperature', '-20°C to 60°C'],
        ['Protection Rating', i % 3 === 0 ? 'IP67' : 'IP65'],
        ['Communication', i % 2 === 0 ? 'Ethernet/IP' : 'Profinet'],
        ['Warranty', '2 years'],
        ['Certification', 'CE, UL, cUL']
      ]),
      images: [`https://placehold.co/800x600/34d399/white?text=${encodeURIComponent(brand + ' ' + category)}`],
      industries: industry,
      featured: i <= 6,
      inStock: i % 5 !== 0,
      createdAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000)
    });
  }
  return products;
};

// Case study data
const clientTypes = [
  'Manufacturing Plant', 'Processing Facility', 'Production Unit',
  'Industrial Complex', 'Factory', 'Refinery', 'Mill', 'Plant'
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Ahmedabad',
  'Hyderabad', 'Kolkata', 'Surat', 'Vadodara', 'Coimbatore', 'Nashik'
];

// Generate 50 Case Studies
const generateCaseStudies = () => {
  const caseStudies = [];
  for (let i = 1; i <= 50; i++) {
    const industry = industries[i % industries.length];
    const clientType = clientTypes[i % clientTypes.length];
    const city = cities[i % cities.length];
    const tech = technologies.slice(i % 6, (i % 6) + 3);
    const solutionType = solutionCategories[i % solutionCategories.length];
    
    const productivity = 30 + (i % 20);
    const costSaving = 20 + (i % 15);
    const defectReduction = 25 + (i % 20);
    
    caseStudies.push({
      title: `${industry} Automation Success at ${city} ${clientType}`,
      slug: `${industry.toLowerCase().replace(/\s+/g, '-')}-automation-${city.toLowerCase()}-${i}`,
      clientName: `${city} ${clientType} Pvt. Ltd.`,
      industry: industry,
      solutionType: solutionType,
      country: 'India',
      challenge: `The ${city}-based ${clientType.toLowerCase()} was facing significant operational challenges including manual processes, frequent equipment downtime, quality inconsistencies, and high energy consumption. Their legacy systems were outdated and unable to meet modern production demands. The lack of real-time monitoring made it difficult to identify and resolve issues promptly, leading to production delays and increased operational costs.`,
      solution: `We implemented a comprehensive ${solutionType.toLowerCase()} using ${tech.join(', ')} technologies. The solution included automated process control, real-time monitoring dashboards, predictive maintenance systems, and energy management modules. Our team conducted thorough site surveys, designed custom control logic, programmed PLCs, configured SCADA systems, and provided extensive training to the client's operations team. The phased implementation ensured minimal disruption to ongoing operations.`,
      technologies: tech,
      results: `The automation project delivered exceptional results: ${productivity}% increase in production efficiency, ${costSaving}% reduction in operational costs, ${defectReduction}% decrease in product defects, 40% reduction in energy consumption, and 99.5% system uptime. The client achieved ROI within 18 months and gained competitive advantage through improved quality and faster time-to-market.`,
      images: [`https://placehold.co/800x600/8b5cf6/white?text=${encodeURIComponent(industry + ' Case Study')}`],
      featured: i <= 6,
      publishedDate: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000)
    });
  }
  return caseStudies;
};

// Enquiry data
const companyNames = [
  'Tech Industries', 'Global Manufacturing', 'Prime Automation', 'Elite Systems',
  'Advanced Solutions', 'Precision Engineering', 'Smart Industries', 'Future Tech',
  'Innovative Manufacturing', 'Dynamic Systems'
];

const contactNames = [
  'Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Reddy', 'Vikram Singh',
  'Anjali Gupta', 'Rahul Mehta', 'Pooja Desai', 'Arjun Nair', 'Kavita Joshi'
];

const projectTypes = ['New Installation', 'Retrofit', 'Upgrade'];
const budgetRanges = ['Under $10k', '$10k-$50k', '$50k-$100k', '$100k-$500k', 'Above $500k'];
const timelines = ['Urgent (< 1 month)', '1-3 months', '3-6 months', '6-12 months', 'Beyond 12 months'];
const statuses = ['received', 'under_review', 'quote_sent', 'won', 'lost'];

// Generate 50 Enquiries
const generateEnquiries = () => {
  const enquiries = [];
  for (let i = 1; i <= 50; i++) {
    const company = `${companyNames[i % companyNames.length]} ${i}`;
    const contact = contactNames[i % contactNames.length];
    const industry = industries[i % industries.length];
    const projectType = projectTypes[i % projectTypes.length];
    const budget = budgetRanges[i % budgetRanges.length];
    const timeline = timelines[i % timelines.length];
    const status = statuses[i % statuses.length];
    const city = cities[i % cities.length];
    
    const enquiryId = `ENQ${new Date().getFullYear()}${String(i).padStart(4, '0')}`;
    
    enquiries.push({
      enquiryId: enquiryId,
      companyName: company,
      contactPerson: contact,
      email: `${contact.toLowerCase().replace(/\s+/g, '.')}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: `+91 ${9000000000 + i}`,
      industry: industry,
      projectType: projectType,
      requirements: `We are looking to ${projectType.toLowerCase()} automation systems at our ${city} facility. Our ${industry.toLowerCase()} operations require modern control systems with real-time monitoring, data analytics, and remote access capabilities. The project scope includes ${3 + (i % 5)} production lines with integration to existing ERP systems. We need a comprehensive solution that ensures minimal downtime during implementation and provides scalability for future expansion.`,
      budgetRange: budget,
      timeline: timeline,
      status: status,
      adminNotes: status === 'won' ? 'Project successfully completed. Client very satisfied.' : 
                  status === 'lost' ? 'Lost to competitor on pricing.' :
                  status === 'quote_sent' ? 'Quote sent. Awaiting client response.' :
                  status === 'under_review' ? 'Technical team reviewing requirements.' :
                  'New enquiry received. Needs initial assessment.',
      createdAt: new Date(Date.now() - (50 - i) * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - (50 - i) * 12 * 60 * 60 * 1000)
    });
  }
  return enquiries;
};

// Main seed function
const seedDatabase = async () => {
  try {
    console.log('\n========================================');
    console.log('MD AUTOMATION - PRODUCTION SEED');
    console.log('========================================\n');

    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Solution.deleteMany({});
    await Product.deleteMany({});
    await CaseStudy.deleteMany({});
    await Enquiry.deleteMany({});
    console.log('✓ Existing data cleared\n');

    // Generate and insert data
    console.log('Generating Solutions...');
    const solutions = generateSolutions();
    await Solution.insertMany(solutions);
    console.log(`✓ ${solutions.length} Solutions seeded\n`);

    console.log('Generating Products...');
    const products = generateProducts();
    await Product.insertMany(products);
    console.log(`✓ ${products.length} Products seeded\n`);

    console.log('Generating Case Studies...');
    const caseStudies = generateCaseStudies();
    await CaseStudy.insertMany(caseStudies);
    console.log(`✓ ${caseStudies.length} Case Studies seeded\n`);

    console.log('Generating Enquiries...');
    const enquiries = generateEnquiries();
    await Enquiry.insertMany(enquiries);
    console.log(`✓ ${enquiries.length} Enquiries seeded\n`);

    console.log('========================================');
    console.log('✓ DATABASE SEEDED SUCCESSFULLY!');
    console.log('========================================\n');
    console.log(`Total Records: ${solutions.length + products.length + caseStudies.length + enquiries.length}`);
    console.log(`- Solutions: ${solutions.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Case Studies: ${caseStudies.length}`);
    console.log(`- Enquiries: ${enquiries.length}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed
seedDatabase();
