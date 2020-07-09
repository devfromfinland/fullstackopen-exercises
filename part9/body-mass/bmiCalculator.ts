const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height * 0.01, 2)

  switch (true) {
    case (bmi < 15):
      return 'Very severely underweight'
    case (bmi >= 15 && bmi < 16):
      return 'Severely underweight'
    case (bmi >= 16 && bmi < 18.5):
      return 'Underweight'
    case (bmi >= 18.5 && bmi < 25):
      return 'Normal (healthy weight)'
    case (bmi >= 25 && bmi < 30):
      return 'Overweight'
    case (bmi >= 30 && bmi < 35):
      return 'Obese Class I (Moderately obese)'
    case (bmi >= 35 && bmi < 40):
      return 'Obese Class II (Severely obese)'
    case (bmi >= 40):
      return 'Obese Class III (Very severely obese)'
    default:
      throw new Error('Something is wrong!')
  }
}

// console.log(process.argv)
const h = Number(process.argv[2])
const w = Number(process.argv[3])

console.log(calculateBmi(h, w))