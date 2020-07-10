import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
import { isArray } from 'util';
const app = express();

app.use(express.json())

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    res.status(401).json({ error: 'malformatted parameters' });
  } else {
    const bmi = calculateBmi(height, weight);
    console.log(bmi);
    res.send(JSON.stringify({
      weight,
      height,
      bmi
    }));
  }
});

app.post('/exercises', (req, res) => {
  const daily_exercises = req.body.daily_exercises
  const target = Number(req.body.target)

  // check if data is provided
  if (!target || !daily_exercises) {
    res.status(401).json({ error: 'parameters missing' });
  }

  // check correct types of provided data
  if (!isArray(daily_exercises) || isNaN(target)) {
    res.status(401).json({ error: 'malformatted parameters' });
  }

  // check each item of the array
  for (let i = 0; i < daily_exercises.length; i++) {
    if (isNaN(Number(daily_exercises[i]))) {
      res.status(401).json({ error: 'malformatted parameters' });
    }
  }

  res.send(JSON.stringify(calculateExercises(target, daily_exercises)))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});