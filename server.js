const express = require('express');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname)));

// Define homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🔧 Define sitemap route
app.get('/sitemap.xml', async (req, res) => {
  const links = [
    { url: '/', changefreq: 'monthly', priority: 1.0 },
    { url: '/about.html', changefreq: 'monthly', priority: 0.8 },
    // Add more static pages as needed
  ];

  const stream = new SitemapStream({ hostname: 'https://kanhaikumarsah.com.np' });

  res.header('Content-Type', 'application/xml');
  const sitemap = await streamToPromise(Readable.from(links).pipe(stream));
  res.send(sitemap.toString());
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
