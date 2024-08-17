import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// convert temp
// °C = (°F - 32) × 5/9
app.post('/convert', (req, res) => {
  setTimeout(() => {
    const fahrenheit_temp = parseFloat(req.body.fahrenheit);
    const celsius_temp = (fahrenheit_temp - 32) * (5 / 9);
    res.send(`
      <p>
    ${fahrenheit_temp}°F is equal to ${celsius_temp.toFixed(2)}°C </p>
      `);
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Server listennig on port ${PORT}`);
});
