import express from 'express';
import cors from 'cors';
import authRoutes from './auth.js';
import apiRoutes from './api.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'homeopulse-server' }));
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`HomeoPulse API running on http://localhost:${PORT}`));
