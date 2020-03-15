import express from 'express';
import cors from 'cors';
import scanRouter from './routes/scan.route';

const app = express();
const PORT = process.env.PORT || 8080;

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/scans', scanRouter);
app.use((req, res) => {
  return res.status(404).send({ error: 'API not found' });
});

app.use((err, req, res) => {
  return res.status(500).send({ error: err });
});

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
