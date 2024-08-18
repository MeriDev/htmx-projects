import express from 'express';
import { converter } from './routes/converter.js';
import { weather } from './routes/weather.js';
import { widget } from './routes/widget.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', widget);
app.use('/weather', weather);
app.use('/converter', converter);

app.listen(PORT, () => {
  console.log(`Server listennig on port ${PORT}`);
});
