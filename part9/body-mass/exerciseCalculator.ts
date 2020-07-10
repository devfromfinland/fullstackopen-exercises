interface ExercisesResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (target: number, dailyHours: Array<number>): ExercisesResult => {
  const trainingDays = dailyHours.length - count(dailyHours, 0);
  const rate = countTarget(dailyHours, target) / dailyHours.length;
  
  let rating = 0;
  let ratingDescription = '';
  if (rate > 0.7) {
    rating = 3;
    ratingDescription = 'excellent job, keep up the good work';
  } else if (rate > 0.3) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you should work harder';
  }

  return {
    periodLength: dailyHours.length,
    trainingDays,
    success: trainingDays === dailyHours.length ? true : false,
    rating,
    ratingDescription,
    target: target ? target : 0,
    average: average(dailyHours)
  };
};

const sum = (arr: Array<number>): number => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

const average = (arr: Array<number>): number => {
  return sum(arr) / arr.length;
};

const count = (arr: Array<number>, num: number): number => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      result++;
    }
  }
  return result;
};

const countTarget = (arr: Array<number>, min: number) : number => {
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= min) {
      result++;
    }
  }
  return result;
}

const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const arr = [];
  for (let i = 2; i < process.argv.length; i++) {
    if (isNaN(Number(process.argv[i]))) {
      throw new Error('Provided values were not numbers');
    } else {
      arr.push(Number(process.argv[i]));
    }
  }
  return arr;
};

try {
  let arr = parseArguments(process.argv);
  const target = Number(arr.shift());
  console.log(calculateExercises(target, arr));
} catch (error) {
  console.log('Something is wrong', error);
}
