import express from 'express';
import scanRouter from './routes/scan.route';

const app = express();
const PORT = process.env.PORT || 8080;

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/scans', scanRouter);

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
