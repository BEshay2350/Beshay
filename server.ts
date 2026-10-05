import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchLiveGoldPrices } from './src/server/goldPriceService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Endpoint for Live Gold Prices
app.get('/download-standalone', (_req, res) => {
  const filePath = path.resolve(__dirname, 'public/alzahra_gold_standalone_html_php.zip');
  res.download(filePath, 'alzahra_gold_standalone_html_php.zip');
});

app.get('/download-full', (_req, res) => {
  const filePath = path.resolve(__dirname, 'public/alzahra_gold_full_project.zip');
  res.download(filePath, 'alzahra_gold_full_project.zip');
});

app.get('/api/gold-prices', async (req: Request, res: Response) => {
  try {
    const forceFresh = req.query.refresh === 'true';
    const prices = await fetchLiveGoldPrices(forceFresh);
    res.json({
      success: true,
      data: prices,
    });
  } catch (error) {
    console.error('Error fetching live gold prices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch live prices',
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
