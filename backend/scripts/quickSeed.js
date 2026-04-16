require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('../models/Solution');
const Product = require('../models/Product');
const CaseStudy = require('../models/CaseStudy');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Solution.deleteMany({});
  await Product.deleteMany({});
  await CaseStudy.deleteMany({});

  // Create 10 Solutions
  const solutions = [];
  for (let i = 1; i <= 10; i++) {
    solutions.push({
      name: `Automation Solution ${i}`,
      slug: `automation-solution-${i}`,
      category: ['Industrial Automation', 'Process Control', 'SCADA Systems'][i % 3],
      description: `Advanced automation solution for industrial applications. Solution ${i} provides comprehensive control and monitoring capabilities.`,
      features: ['Real-time monitoring', 'Remote access', 'Data analytics', 'Predictive maintenance'],
      benefits: ['Increased efficiency', 'Reduced downtime', 'Cost savings', 'Improved safety'],
      industries: ['Manufacturing', 'Oil & Gas', 'Pharmaceuticals'],
      applications: ['Process automation', 'Quality control', 'Production monitoring'],
      technologies: ['PLC', 'SCADA', 'HMI', 'IoT'],
      images: [`https://placehold.co/800x600/38bdf8/white?text=Solution+${i}`],
      featured: i <= 3
    });
  }
  await Solution.insertMany(solutions);
  console.log('✓ 10 Solutions seeded');

  // Create 10 Products
  const products = [];
  for (let i = 1; i <= 10; i++) {
    products.push({
      name: `Industrial Product ${i}`,
      slug: `industrial-product-${i}`,
      category: ['Controllers', 'Sensors', 'Actuators', 'Drives'][i % 4],
      brand: ['Siemens', 'ABB', 'Schneider', 'Rockwell'][i % 4],
      description: `High-performance industrial product for automation systems. Product ${i} offers reliability and precision.`,
      features: ['High precision', 'Durable design', 'Easy integration', 'Low maintenance'],
      specifications: new Map([
        ['Power', '24V DC'],
        ['Operating Temp', '-20°C to 60°C'],
        ['Protection', 'IP67'],
        ['Warranty', '2 years']
      ]),
      applications: ['Manufacturing', 'Process control', 'Quality assurance'],
      industries: ['Automotive', 'Food & Beverage', 'Packaging'],
      images: [`https://placehold.co/800x600/34d399/white?text=Product+${i}`],
      inStock: true,
      featured: i <= 3
    });
  }
  await Product.insertMany(products);
  console.log('✓ 10 Products seeded');

  // Create 10 Case Studies
  const caseStudies = [];
  for (let i = 1; i <= 10; i++) {
    caseStudies.push({
      title: `Manufacturing Automation Project ${i}`,
      slug: `manufacturing-automation-project-${i}`,
      clientName: `Client Company ${i}`,
      industry: ['Manufacturing', 'Automotive', 'Pharmaceuticals', 'Food & Beverage'][i % 4],
      challenge: `The client faced significant challenges with manual processes, leading to inefficiencies and quality issues in their production line.`,
      solution: `We implemented a comprehensive automation solution including PLC systems, SCADA monitoring, and real-time data analytics to streamline operations.`,
      results: `Achieved 40% increase in productivity, 30% reduction in defects, and 25% cost savings within the first year of implementation.`,
      technologies: ['PLC', 'SCADA', 'HMI', 'IoT Sensors'],
      duration: `${3 + i} months`,
      teamSize: 5 + (i % 3),
      images: [`https://placehold.co/800x600/8b5cf6/white?text=Case+Study+${i}`],
      featured: i <= 3
    });
  }
  await CaseStudy.insertMany(caseStudies);
  console.log('✓ 10 Case Studies seeded');

  console.log('\n✅ Database seeded successfully!');
  console.log('Total: 30 records (10 solutions + 10 products + 10 case studies)');
  process.exit(0);
};

seedData().catch(err => {
  console.error('Error seeding:', err);
  process.exit(1);
});
