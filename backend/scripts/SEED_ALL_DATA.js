/**
 * COMPREHENSIVE SEED SCRIPT FOR MD AUTOMATION SOLUTIONS PLATFORM
 * 
 * This script seeds:
 * - 50 Solutions
 * - 50 Case Studies  
 * - 50 Products
 * - 50 Enquiries
 * 
 * All data is production-quality, industry-realistic content
 * 
 * Usage: node backend/scripts/SEED_ALL_DATA.js
 */

const mongoose = require('mongoose');
const Solution = require('../models/Solution');
const CaseStudy = require('../models/CaseStudy');
const Product = require('../models/Product');
const Enquiry = require('../models/Enquiry');
const slugify = require('../utils/slugify');
const generateEnquiryId = require('../utils/generateEnquiryId');
require('dotenv').config();

// Import data modules
const { solutions } = require('./data/solutions-data');
const { caseStudies } = require('./data/casestudies-data');
const { products } = require('./data/products-data');
const { enquiries } = require('./data/enquiries-data');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB connected successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedAll = async () => {
  try {
    console.log('\n========================================');
    console.log('MD AUTOMATION SOLUTIONS - DATA SEEDING');
    console.log('========================================\n');

    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Solution.deleteMany({});
    await CaseStudy.deleteMany({});
    await Product.deleteMany({});
    await Enquiry.deleteMany({});
    console.log('✓ Existing data cleared\n');

    // Seed Solutions
    console.log('Seeding Solutions...');
    const solutionsWithSlugs = solutions.map(sol => ({
      ...sol,
      slug: slugify(sol.name),
      features: sol.features.split(', '),
      industries: sol.industries.split(', '),
      applications: sol.applications ? sol.applications.split(', ') : [],
      technologies: sol.technologies ? sol.technologies.split(', ') : [],
      images: [sol.image || 'https://source.unsplash.com/featured/?automation,industrial']
    }));
    await Solution.insertMany(solutionsWithSlugs);
    console.log(`✓ ${solutionsWithSlugs.length} Solutions seeded\n`);

    // Seed Case Studies
    console.log('Seeding Case Studies...');
    const caseStudiesWithSlugs = caseStudies.map(cs => ({
      ...cs,
      slug: slugify(cs.title),
      clientName: cs.client,
      technologies: cs.technologies.split(', '),
      images: [cs.image || 'https://source.unsplash.com/featured/?industry,automation']
    }));
    await CaseStudy.insertMany(caseStudiesWithSlugs);
    console.log(`✓ ${caseStudiesWithSlugs.length} Case Studies seeded\n`);

    // Seed Products
    console.log('Seeding Products...');
    const productsWithSlugs = products.map(prod => ({
      ...prod,
      slug: slugify(prod.name),
      industries: prod.industries,
      images: [prod.image || 'https://source.unsplash.com/featured/?industrial,equipment'],
      specifications: prod.specifications ? new Map(Object.entries(parseSpecifications(prod.specifications))) : new Map()
    }));
    await Product.insertMany(productsWithSlugs);
    console.log(`✓ ${productsWithSlugs.length} Products seeded\n`);

    // Seed Enquiries
    console.log('Seeding Enquiries...');
    const enquiriesWithIds = enquiries.map((enq, index) => ({
      ...enq,
      enquiryId: generateEnquiryId()
    }));
    await Enquiry.insertMany(enquiriesWithIds);
    console.log(`✓ ${enquiriesWithIds.length} Enquiries seeded\n`);

    console.log('========================================');
    console.log('✓ ALL DATA SEEDED SUCCESSFULLY!');
    console.log('========================================\n');
    console.log(`Total Records: ${solutionsWithSlugs.length + caseStudiesWithSlugs.length + productsWithSlugs.length + enquiriesWithIds.length}`);
    console.log(`- Solutions: ${solutionsWithSlugs.length}`);
    console.log(`- Case Studies: ${caseStudiesWithSlugs.length}`);
    console.log(`- Products: ${productsWithSlugs.length}`);
    console.log(`- Enquiries: ${enquiriesWithIds.length}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error seeding data:', error);
    process.exit(1);
  }
};

// Helper function to parse specifications string into object
function parseSpecifications(specString) {
  const specs = {};
  const parts = specString.split(' | ');
  parts.forEach(part => {
    const [key, value] = part.split(': ');
    if (key && value) {
      specs[key.trim()] = value.trim();
    }
  });
  return specs;
}

// Run the seed script
seedAll();
