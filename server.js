// Simple web server for the nutrition app
const express = require('express');
const path = require('path');
const nutritionDb = require('./nutrition_db');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Load the database
nutritionDb.load();

// API Routes
// Get food by name
app.get('/api/food', (req, res) => {
  const { name } = req.query;
  
  if (!name) {
    return res.status(400).json({ error: 'Food name is required' });
  }
  
  const food = nutritionDb.getFoodByName(name);
  
  if (!food) {
    const searchResults = nutritionDb.searchFoods(name);
    return res.json({ 
      exact: null, 
      suggestions: searchResults.slice(0, 10) 
    });
  }
  
  return res.json({ exact: food, suggestions: [] });
});

// Search foods
app.get('/api/search', (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const results = nutritionDb.searchFoods(query);
  return res.json(results.slice(0, 20)); // Limit to 20 results
});

// Get foods by category
app.get('/api/category/:category', (req, res) => {
  const { category } = req.params;
  const foods = nutritionDb.getFoodsByCategory(category);
  return res.json(foods);
});

// Calculate nutrition for a specific quantity
app.get('/api/calculate', (req, res) => {
  const { foodId, grams } = req.query;
  
  if (!foodId || !grams) {
    return res.status(400).json({ error: 'Food ID and grams are required' });
  }
  
  const result = nutritionDb.calculateNutrition(foodId, parseFloat(grams));
  
  if (!result) {
    return res.status(404).json({ error: 'Food not found' });
  }
  
  return res.json(result);
});

// Add a new food item
app.post('/api/food', (req, res) => {
  try {
    const newFood = nutritionDb.addFood(req.body);
    return res.status(201).json(newFood);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Nutrition app server running on http://0.0.0.0:${PORT}`);
});
