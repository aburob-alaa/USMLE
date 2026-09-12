import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, '../../data/planners.json');

const planners = new Map();

export async function initializeDatabase() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const records = JSON.parse(data);
    for (const [token, planner] of Object.entries(records)) {
      planners.set(token, planner);
    }
    console.log(`Loaded ${planners.size} planners from disk`);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Database load error:', err);
    }
    console.log('Starting with empty database');
  }
}

async function persist() {
  try {
    const dir = path.dirname(DB_FILE);
    await fs.mkdir(dir, { recursive: true });
    const records = Object.fromEntries(planners);
    await fs.writeFile(DB_FILE, JSON.stringify(records, null, 2));
  } catch (err) {
    console.error('Persist error:', err);
  }
}

export async function createPlanner(token, data) {
  const now = new Date().toISOString();
  const planner = {
    token,
    data,
    createdAt: now,
    updatedAt: now,
  };
  planners.set(token, planner);
  await persist();
  return planner;
}

export async function getPlanner(token) {
  return planners.get(token);
}

export async function updatePlanner(token, data) {
  const planner = planners.get(token);
  if (!planner) return null;

  planner.data = data;
  planner.updatedAt = new Date().toISOString();
  planners.set(token, planner);
  await persist();
  return planner;
}
