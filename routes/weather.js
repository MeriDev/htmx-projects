import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Define the path to the HTML file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, '../public/weather.html');

router.get('/', (req, res) => {
  res.sendFile(htmlPath);
});

//temp polling
let current_temp = 23;
router.get('/get-temperature', (req, res) => {
  current_temp += Math.random() * 2 - 1;
  res.send(current_temp.toFixed(1) + '°C');
});

export const weather = router;
