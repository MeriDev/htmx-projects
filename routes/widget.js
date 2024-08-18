import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, '../public/widget.html');

router.get('/', (req, res) => {
  res.sendFile(htmlPath);
});

router.post('/search', async (req, res) => {
  try {
    const searchTerm = req.body.search.toLowerCase();
    if (!searchTerm) {
      return res.send('<tr></tr>');
    }
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const contacts = await response.json();

    const searchResults = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      const email = contact.email.toLowerCase();

      return name.includes(searchTerm) || email.includes(searchTerm);
    });

    setTimeout(() => {
      const searchResultsHTML = searchResults
        .map(
          result => `
          <tr>
              <td>
                <div class="my-4 p-2">${result.name}</div>
              </td>
              <td>
                <div class="my-4 p-2">${result.email}</div>
              </td>
          </tr>
      `
        )
        .join('');

      res.send(searchResultsHTML);
    }, 1000);
  } catch (error) {
    console.log(error);
    res.status(404).json('Something went wrong');
  }
});

export const widget = router;
