# Nutrition Lookup App

A comprehensive nutrition information application that provides detailed nutritional data for common foods, Indian foods, and high-protein options.

## Features

- **Extensive Food Database**: 526 foods including 456 Indian foods, 40 common foods, and 30 high-protein foods
- **Detailed Nutrition Information**: Protein, carbohydrates, calories, fiber, and fat content for all foods
- **Quantity Adjustment**: Adjust quantities in grams to see updated nutritional values
- **Food Search**: Search for any food by name with suggestions
- **Category Browsing**: Browse foods by category (Indian, Common, High-Protein)
- **Add Custom Foods**: Add your own foods to the database with custom nutritional values
- **Mobile-Friendly Interface**: Access from any device without installing software

## Installation

1. Clone this repository:
```
git clone https://github.com/yourusername/nutrition-app.git
cd nutrition-app
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
node server.js
```

4. Access the application at `http://localhost:3000`

## Project Structure

- `server.js` - Express server and API endpoints
- `nutrition_db.js` - Database module for food data management
- `public/` - Frontend files
  - `index.html` - Main application interface
  - `add-food.html` - Interface for adding new foods
- `food_database.json` - Combined food database
- `food_name_index.json` - Index for faster food lookups
- `indian_foods.json` - Indian foods data
- `common_foods.json` - Common foods data
- `high_protein_foods.json` - High-protein foods data
- `user_guide.md` - Comprehensive user guide

## Data Sources

- Indian foods data from IFCT2017 package
- Common and high-protein foods data from custom collection

## Technologies Used

- Node.js
- Express
- HTML/CSS/JavaScript
- Bootstrap 5

## Usage

See the [User Guide](user_guide.md) for detailed instructions on how to use the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
