# Nutrition App User Guide

## Overview
The Nutrition App is a simple web-based tool that provides nutritional information for a wide variety of foods, including common foods, Indian foods, and high-protein options. The app allows you to search for foods, view their nutritional content, adjust quantities, and even add your own custom foods.

## Accessing the App
Access the app through any web browser at: http://3000-inunldihh2ht5g4kp17y6-b2fcf0e7.manus.computer

No installation or login required - simply open the URL on your phone, tablet, or computer.

## Features

### 1. Food Search
- Type any food name in the search box and click "Search"
- The app will find exact matches or suggest similar foods
- Click on any suggestion to view its nutritional information

### 2. Browse by Category
- Click on category buttons to browse foods by type:
  - Indian Foods (456 items)
  - Common Foods (40 items)
  - High-Protein Foods (30 items)
- Click on any food in the category list to view its details

### 3. Nutritional Information
For each food, you can view:
- Calories
- Protein (g)
- Carbohydrates (g)
- Fat (g)
- Fiber (g)
- Additional nutrients (when available)

### 4. Quantity Adjustment
- Enter any quantity in grams in the "Quantity" field
- Click "Calculate" to see nutritional values adjusted for that quantity
- Default serving size is 100g

### 5. Adding New Foods
- Click the "Add New Food" button at the top of the main page
- Fill in the food details:
  - Name
  - Category
  - Serving size
  - Nutritional content (protein, carbs, calories, fiber, fat)
  - Optional additional nutrients
- Click "Add Food" to save to the database
- Your new food will be immediately available for lookup

## Database Information
The app contains a comprehensive database with:
- 456 Indian foods (from IFCT2017 database)
- 40 common foods
- 30 high-protein foods
- Any custom foods you add

## Tips for Best Use
- For most accurate results, use specific food names
- When adding custom foods, ensure nutritional values are per serving size
- Use the category browsing feature to discover new foods
- Adjust quantities to match your actual portion sizes

## Technical Information
- The app runs on a Node.js server with Express
- Data is stored in JSON format
- The interface is fully responsive and works on all devices
- All nutritional calculations are performed server-side for accuracy

## Future Improvements
- The current URL is temporary for demonstration purposes
- For a permanent solution, the app could be deployed to a free hosting service
- Additional features could include meal planning, nutritional goals, and data export
