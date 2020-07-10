import express from 'express';
// import cors from 'cors';
const app = express();

// app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (req, res) => {
  console.log('request', req);
  res.send('patients list');
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});