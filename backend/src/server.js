import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateToken, validateToken } from './utils.js';
import { initializeDatabase, createPlanner, getPlanner, updatePlanner } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
const frontendDir = join(__dirname, '../../frontend/dist');
app.use(express.static(frontendDir));

// Initialize database on startup
initializeDatabase();

// API endpoints
app.post('/api/planners', async (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !data.plan || !data.history) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const token = generateToken();
    const planner = await createPlanner(token, data);
    res.json(planner);
  } catch (err) {
    console.error('Create error:', err);
    res.status(500).json({ error: 'Failed to create planner' });
  }
});

app.get('/api/planners/:token', async (req, res) => {
  try {
    const { token } = req.params;
    if (!validateToken(token)) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const planner = await getPlanner(token);
    if (!planner) {
      return res.status(404).json({ error: 'Planner not found' });
    }

    res.json(planner);
  } catch (err) {
    console.error('Get error:', err);
    res.status(500).json({ error: 'Failed to fetch planner' });
  }
});

app.put('/api/planners/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { data } = req.body;

    if (!validateToken(token)) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    if (!data || !data.plan || !data.history) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const planner = await updatePlanner(token, data);
    if (!planner) {
      return res.status(404).json({ error: 'Planner not found' });
    }

    res.json(planner);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update planner' });
  }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(frontendDir, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
