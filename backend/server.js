const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// BMI Calculation API
app.post('/api/calculate-bmi', (req, res) => {
  const { weight, height, age, gender } = req.body;
  const h = height / 100;
  const bmi = (weight / (h * h)).toFixed(1);
  
  let category, calories, water, steps;
  if (bmi < 18.5) {
    category = 'Underweight';
    calories = gender === 'male' ? 2700 : 2300;
    water = 8;
    steps = 8000;
  } else if (bmi < 25) {
    category = 'Normal';
    calories = gender === 'male' ? 2500 : 2000;
    water = 8;
    steps = 10000;
  } else if (bmi < 30) {
    category = 'Overweight';
    calories = gender === 'male' ? 2200 : 1800;
    water = 10;
    steps = 12000;
  } else {
    category = 'Obese';
    calories = gender === 'male' ? 2000 : 1600;
    water = 12;
    steps = 15000;
  }
  
  res.json({ bmi, category, calories, water, steps });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Health Tracker API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});