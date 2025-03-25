// Database access module for the nutrition app
const fs = require('fs');

class NutritionDatabase {
  constructor() {
    this.database = null;
    this.nameIndex = null;
    this.loaded = false;
  }

  // Load the database from files
  load() {
    try {
      if (!this.loaded) {
        console.log('Loading nutrition database...');
        this.database = JSON.parse(fs.readFileSync('food_database.json', 'utf8'));
        this.nameIndex = JSON.parse(fs.readFileSync('food_name_index.json', 'utf8'));
        this.loaded = true;
        console.log(`Database loaded with ${this.database.length} food items`);
      }
      return true;
    } catch (error) {
      console.error('Error loading database:', error);
      return false;
    }
  }

  // Get food by exact name (case insensitive)
  getFoodByName(name) {
    if (!this.loaded) this.load();
    
    const normalizedName = name.toLowerCase();
    const id = this.nameIndex[normalizedName];
    
    if (id) {
      return this.getFoodById(id);
    }
    
    return null;
  }

  // Get food by ID
  getFoodById(id) {
    if (!this.loaded) this.load();
    
    return this.database.find(food => food.id === id) || null;
  }

  // Search foods by partial name match
  searchFoods(query) {
    if (!this.loaded) this.load();
    
    const normalizedQuery = query.toLowerCase();
    
    return this.database.filter(food => 
      food.name.toLowerCase().includes(normalizedQuery)
    );
  }

  // Get foods by category
  getFoodsByCategory(category) {
    if (!this.loaded) this.load();
    
    return this.database.filter(food => food.category === category);
  }

  // Get high protein foods (more than specified grams of protein per 100g)
  getHighProteinFoods(minProtein = 15) {
    if (!this.loaded) this.load();
    
    return this.database.filter(food => 
      food.nutritionalContent.protein >= minProtein
    );
  }

  // Calculate nutrition for a specific quantity in grams
  calculateNutrition(foodId, grams) {
    const food = this.getFoodById(foodId);
    
    if (!food) return null;
    
    // Default serving size is 100g
    const servingSize = food.servingSize || 100;
    const ratio = grams / servingSize;
    
    // Calculate scaled nutrition values
    const scaledNutrition = {};
    
    for (const [key, value] of Object.entries(food.nutritionalContent)) {
      scaledNutrition[key] = parseFloat((value * ratio).toFixed(2));
    }
    
    // If there are additional nutrients, scale those too
    const scaledAdditionalNutrients = {};
    
    if (food.additionalNutrients) {
      for (const [key, value] of Object.entries(food.additionalNutrients)) {
        scaledAdditionalNutrients[key] = parseFloat((value * ratio).toFixed(2));
      }
    }
    
    return {
      food: food.name,
      category: food.category,
      quantity: grams,
      nutrition: scaledNutrition,
      additionalNutrients: Object.keys(scaledAdditionalNutrients).length > 0 ? 
        scaledAdditionalNutrients : undefined
    };
  }

  // Add a new food item to the database
  addFood(foodData) {
    if (!this.loaded) this.load();
    
    // Validate required fields
    if (!foodData.name || !foodData.category || !foodData.nutritionalContent) {
      throw new Error('Missing required fields: name, category, or nutritionalContent');
    }
    
    // Create a unique ID
    let prefix = 'GEN';
    if (foodData.category === 'Indian') prefix = 'IND';
    else if (foodData.category === 'High-Protein') prefix = 'HPR';
    else if (foodData.category === 'Custom') prefix = 'CUS';
    
    const id = `${prefix}${String(this.database.length + 1).padStart(4, '0')}`;
    
    // Create the new food entry
    const newFood = {
      id,
      name: foodData.name,
      category: foodData.category,
      nutritionalContent: {
        protein: foodData.nutritionalContent.protein || 0,
        carbohydrates: foodData.nutritionalContent.carbohydrates || 0,
        calories: foodData.nutritionalContent.calories || 0,
        fiber: foodData.nutritionalContent.fiber || 0,
        fat: foodData.nutritionalContent.fat || 0
      },
      servingSize: foodData.servingSize || 100,
      additionalNutrients: foodData.additionalNutrients || {}
    };
    
    // Add to database
    this.database.push(newFood);
    
    // Update name index
    this.nameIndex[foodData.name.toLowerCase()] = id;
    
    // Save the updated database
    this.saveDatabase();
    
    return newFood;
  }

  // Save the database to files
  saveDatabase() {
    try {
      fs.writeFileSync('food_database.json', JSON.stringify(this.database, null, 2));
      fs.writeFileSync('food_name_index.json', JSON.stringify(this.nameIndex, null, 2));
      console.log('Database saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving database:', error);
      return false;
    }
  }
}

module.exports = new NutritionDatabase();
