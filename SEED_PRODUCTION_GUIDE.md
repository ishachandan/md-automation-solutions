# Production Database Seeding Guide

## Overview
Your production database on Render is currently empty. This guide will help you seed it with 50 solutions, 50 products, 50 case studies, and 50 enquiries.

## Steps to Seed Production Database

### Option 1: Using Render Shell (Recommended)

1. **Go to Render Dashboard**
   - Navigate to: https://dashboard.render.com
   - Click on your backend service: `md-automation-solutions`

2. **Open Shell**
   - Click on the "Shell" tab in the left sidebar
   - This opens a terminal connected to your production server

3. **Run the Seed Script**
   ```bash
   cd backend
   node scripts/seedProduction.js
   ```

4. **Verify Success**
   - You should see output showing 50 of each type seeded
   - Total: 200 records

5. **Check Your Website**
   - Visit: https://md-automation-solutions.vercel.app
   - Public pages should now show all solutions, products, case studies
   - Admin panel should show all data

### Option 2: Using Local Connection to Production DB

If you prefer to run from your local machine:

1. **Update Local .env**
   - Temporarily change `MONGO_URI` in `backend/.env` to your production MongoDB connection string
   - The production string is: `mongodb+srv://deshmukhishac14_db_user:Kkl1hyJ84BkgjH77@automation-solutions.qqqrdgm.mongodb.net/automation-solutions`

2. **Run Seed Script Locally**
   ```bash
   cd backend
   node scripts/seedProduction.js
   ```

3. **Restore Local .env**
   - Change `MONGO_URI` back to your local MongoDB connection

## What Gets Seeded

### Solutions (50)
- Various automation solutions across different categories
- Industrial Automation, Process Control, SCADA, PLC, HMI, etc.
- Realistic descriptions, features, applications
- 6 featured solutions

### Products (50)
- Products from major brands (Siemens, ABB, Schneider, etc.)
- Different categories (PLCs, HMIs, Drives, Motors, Sensors, etc.)
- Complete specifications
- 6 featured products

### Case Studies (50)
- Real-world project scenarios from Indian cities
- Different industries and solution types
- Detailed challenges, solutions, and results
- 6 featured case studies

### Enquiries (50)
- Sample enquiries with different statuses
- Various industries, project types, budgets
- Realistic contact information
- Different stages: received, under_review, quote_sent, won, lost

## Troubleshooting

### If seed fails with connection error:
- Verify MongoDB connection string in Render environment variables
- Check that `MONGO_URI` is set correctly

### If you see "duplicate key error":
- The database already has some data
- The script clears existing data first, so this shouldn't happen
- If it does, you may need to manually clear collections first

### If data doesn't appear on website:
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check browser console for API errors
- Verify `VITE_API_URL` in Vercel is correct

## Admin Login

After seeding, login to admin panel:
- URL: https://md-automation-solutions.vercel.app/login
- Email: admin@mdautomation.com
- Password: admin123

You should now see all 50 solutions, products, case studies, and enquiries in the admin dashboard!

## Notes

- The seed script is safe to run multiple times
- It clears existing data before seeding
- All data is generated inline (no external files needed)
- Images use placeholder.co with color-coded categories
- Data includes realistic Indian context (cities, companies, etc.)
