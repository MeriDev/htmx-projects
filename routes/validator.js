import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, '../public/validator.html');

router.get('/', (req, res) => {
  res.sendFile(htmlPath);
});

router.post('/contact/email', async (req, res) => {
  const submittedEmail = req.body.email;

  const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9._]+\.[A-Za-z]{2,4}$/;

  const isValid = {
    message: 'Your email is valid',
    class: 'text-green-700',
  };
  const isInvalid = {
    message: 'Please enter valid email',
    class: 'text-red-700',
  };

  if (!emailRegex.test(submittedEmail)) {
    return res.send(`
      <div class="mb-4" hx-target="this" hx-swap="outerHTML">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email Address</label
        >
        <input
          name="email"
          class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          value=${submittedEmail}
          hx-post="/contact/email"
          required
        />

        <div class="${isInvalid.class}">${isInvalid.message}</div>
      </div>
      `);
  } else {
    return res.send(`
      <div class="mb-4" hx-target="this" hx-swap="outerHTML">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
          >Email Address</label
        >
        <input
          name="email"
          class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          value=${submittedEmail}
          hx-post="/contact/email"
          required
        />

        <div class="${isValid.class}">${isValid.message}</div>
      </div>
      `);
  }
});

export const validator = router;
