interface MathQuestion {
  question: string;
  answer: number;
}

export function generateMathQuestions(count: number = 3): MathQuestion[] {
  const questions: MathQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const question = generateMathQuestion();
    questions.push(question);
  }
  return questions;
}

// Generate a random math question from available types
function generateMathQuestion(): MathQuestion {
  const types = [generateAddition, generateSubtraction, generateMultiplication, generateDivision];
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex]();
}

function generateAddition(): MathQuestion {
  const a = Math.floor(Math.random() * 50) + 1;
  const b = Math.floor(Math.random() * 50) + 1;
  const answer = a + b;
  return {
    question: `${a} + ${b} = ?`,
    answer
  };
}

function generateSubtraction(): MathQuestion {
  const a = Math.floor(Math.random() * 50) + 20;
  const b = Math.floor(Math.random() * (a - 1)) + 1;
  const answer = a - b;
  return {
    question: `${a} - ${b} = ?`,
    answer
  };
}

function generateMultiplication(): MathQuestion {
  const a = Math.floor(Math.random() * 12) + 1;
  const b = Math.floor(Math.random() * 12) + 1;
  const answer = a * b;
  return {
    question: `${a} × ${b} = ?`,
    answer
  };
}

function generateDivision(): MathQuestion {
  const b = Math.floor(Math.random() * 10) + 2;
  const answer = Math.floor(Math.random() * 15) + 1;
  const a = b * answer;
  return {
    question: `${a} ÷ ${b} = ?`,
    answer
  };
}

function generateOptions(correctAnswer: number): number[] {
  // pilihan ganda dihapus
  return [];
}

export function formatMathQuiz(questions: MathQuestion[]): string {
  // Format hanya satu soal
  const q = questions[0];
  return `🧮 *Kuis Matematika Menantang*\n\n${q.question}\n\nBalas dengan jawaban angka yang benar!`;
}

export function checkMathAnswers(questions: MathQuestion[], userAnswers: string): { score: number; details: string } {
  // Hanya reply jika benar
  const q = questions[0];
  const { correct, details } = checkSingleMathAnswer(q, userAnswers);
  return {
    score: correct ? 1 : 0,
    details: correct ? details : ''
  };
}

export function checkSingleMathAnswer(question: MathQuestion, userAnswer: string): { correct: boolean; details: string } {
  const userValue = Number(userAnswer.trim());
  const correct = userValue === question.answer;
  let details = '';
  if (correct) {
    details = `✅ Jawaban kamu benar! (${question.question} = ${question.answer})`;
  } else {
    details = `❌ Jawaban salah. Yang benar: ${question.answer}`;
  }
  return { correct, details };
}
