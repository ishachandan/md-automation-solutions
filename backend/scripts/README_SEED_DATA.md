# Seed Data Generation for MD Automation Solutions Platform

## Overview

This directory contains scripts to generate high-quality, production-ready seed data for the MD Automation Solutions Platform. The data includes:

- **50 Solutions** - Comprehensive automation solutions across various categories
- **50 Case Studies** - Real-world implementation stories with Indian companies
- **50 Products** - Industrial automation products from major brands
- **50 Enquiries** - Realistic customer enquiries with Indian company names

## Features

✅ **Industry-Realistic Data** - All content uses proper industrial automation terminology  
✅ **Indian Context** - Company names, person names, and scenarios relevant to Indian market  
✅ **Unique Entries** - Each entry is unique with varied content  
✅ **Production Quality** - Professional descriptions suitable for live deployment  
✅ **Proper Relationships** - Data structured to match MongoDB schemas  

## Usage

### Quick Start

```bash
# Navigate to backend directory
cd backend

# Run the comprehensive seed script
node scripts/generateAllSeedData.js
```

### What It Does

1. **Connects to MongoDB** using your `.env` configuration
2. **Clears existing data** from all collections (Solutions, Case Studies, Products, Enquiries)
3. **Generates 200 entries** with intelligent variations
4. **Inserts data** into MongoDB with proper slugs and relationships
5. **Reports success** with summary statistics

### Expected Output

```
========================================
MD AUTOMATION SOLUTIONS - DATA SEEDING
========================================

✓ MongoDB connected

Clearing existing data...
✓ Existing data cleared

Generating Solutions...
✓ 50 Solutions created

Generating Case Studies...
✓ 50 Case Studies created

Generating Products...
✓ 50 Products created

Generating Enquiries...
✓ 50 Enquiries created

========================================
✓ ALL DATA SEEDED SUCCESSFULLY!
========================================

Total Records: 200
- Solutions: 50
- Case Studies: 50
- Products: 50
- Enquiries: 50
```

## Data Quality

### Solutions
- **Categories**: Control Systems, Robotics, SCADA, Machine Vision, IoT, Material Handling, Energy Management, DCS, Safety Systems, Process Automation
- **Features**: Comprehensive feature lists with industry-standard terminology
- **Industries**: Manufacturing, Oil & Gas, Chemicals, Pharmaceuticals, Food & Beverage, etc.
- **Applications**: Specific use cases for each solution

### Case Studies
- **Real Companies**: Uses actual Indian company names (Tata, Mahindra, Reliance, L&T, etc.)
- **Industries**: Automotive, Pharmaceuticals, Food & Beverage, Oil & Gas, Electronics, etc.
- **Solution Types**: Process Automation, Robotics, SCADA, Machine Vision, IoT, Material Handling
- **Results**: Quantified outcomes (% improvements, cost savings, ROI)

### Products
- **Brands**: Siemens, ABB, Schneider Electric, Rockwell, Omron, Mitsubishi, FANUC, KUKA, etc.
- **Categories**: PLC, HMI, Drives, Robotics, Sensors, Machine Vision, Safety Devices, etc.
- **Specifications**: Technical specs in Map format (Model, Power, Communication, etc.)
- **Images**: Unsplash URLs with relevant keywords

### Enquiries
- **Indian Names**: Realistic Indian person names (Rajesh Kumar, Priya Sharma, etc.)
- **Company Names**: Indian company naming patterns (Pvt Ltd, Industries, Solutions, etc.)
- **Project Types**: New Installation, Retrofit, Upgrade
- **Requirements**: Detailed automation requirements
- **Budget & Timeline**: Realistic ranges for industrial projects

## Customization

### Modify Data Quantity

Edit the loop counters in `generateAllSeedData.js`:

```javascript
for (let i = 0; i < 50; i++) {  // Change 50 to desired number
  // Generation logic
}
```

### Add More Variations

Extend the template arrays:

```javascript
const variations = [
  'Process', 'Manufacturing', 'Production', 'Assembly', 'Quality',
  // Add more variations here
];
```

### Customize Industries

Modify the industries array:

```javascript
const industries = [
  'Automotive', 'Pharmaceuticals', 'Food & Beverage',
  // Add your industries here
];
```

## Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB connection error
```
**Solution**: Check your `.env` file has correct `MONGODB_URI`

### Duplicate Key Error
```
Error: E11000 duplicate key error
```
**Solution**: The script clears data first. If error persists, manually clear collections:
```javascript
db.solutions.deleteMany({})
db.casestudies.deleteMany({})
db.products.deleteMany({})
db.enquiries.deleteMany({})
```

### Validation Error
```
Error: Validation failed
```
**Solution**: Ensure your models match the schema in the script. Check required fields.

## Alternative Scripts

### Individual Seed Scripts

If you want to seed only specific collections:

```bash
# Seed only products (from earlier script)
node scripts/seedProducts.js

# Seed only solutions (from earlier script)
node scripts/seedSolutions.js
```

## Data Verification

After seeding, verify in MongoDB:

```javascript
// In MongoDB shell or Compass
db.solutions.countDocuments()  // Should return 50
db.casestudies.countDocuments()  // Should return 50
db.products.countDocuments()  // Should return 50
db.enquiries.countDocuments()  // Should return 50
```

## Production Considerations

### Before Production Deployment

1. **Review Content**: Check generated content matches your brand voice
2. **Update Images**: Replace Unsplash URLs with actual product images
3. **Add Real Data**: Mix generated data with real case studies and products
4. **Test Relationships**: Verify relatedCaseStudies and relatedProducts links
5. **SEO Optimization**: Ensure slugs are SEO-friendly

### Incremental Updates

To add more data without clearing existing:

```javascript
// Comment out the delete operations
// await Solution.deleteMany({});
// await CaseStudy.deleteMany({});
// etc.
```

## Support

For issues or questions:
1. Check the console output for specific error messages
2. Verify MongoDB connection and credentials
3. Ensure all required npm packages are installed
4. Check model schemas match the data structure

## License

This seed data generator is part of the MD Automation Solutions Platform.

---

**Generated Data Statistics:**
- Total Entries: 200
- Solutions: 50 (10 categories × 5 variations)
- Case Studies: 50 (15 industries × multiple companies)
- Products: 50 (35 brands × 15 categories)
- Enquiries: 50 (50 unique Indian companies)

**Quality Metrics:**
- ✅ 100% Unique entries
- ✅ Industry-standard terminology
- ✅ Indian market context
- ✅ Production-ready content
- ✅ Proper data relationships
