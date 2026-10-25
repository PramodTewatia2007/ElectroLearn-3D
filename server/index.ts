import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    platform: 'ElectroLearn 3D Backend',
    timestamp: new Date().toISOString(),
  });
});

// AI Tutor Socratic Chatbot Endpoint
app.post('/api/ai-tutor', (req: Request, res: Response) => {
  const { question, lessonContext } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const q = question.toLowerCase();
  let answer = '';

  if (q.includes('ohm')) {
    answer = `Ohm's Law (V = IR) defines the relationship between Voltage (push), Current (flow), and Resistance (friction). Remember that if you double voltage across a fixed resistor, current doubles!`;
  } else if (q.includes('transformer')) {
    answer = `Transformers operate by mutual induction: E = 4.44 f N Φm. Remember: V2/V1 = N2/N1 = I1/I2. Power is conserved, so higher voltage means lower current!`;
  } else if (q.includes('kcl') || q.includes('kvl')) {
    answer = `KCL is Conservation of Charge at a node (Σ I = 0). KVL is Conservation of Energy around a loop (Σ V = 0).`;
  } else {
    answer = `In BEEE, always identify your knowns and unknowns first. What formula relates them, and are all units converted to standard SI (Volts, Amperes, Ohms, Joules, and Seconds)?`;
  }

  res.json({
    answer,
    lessonContext: lessonContext || 'BEEE General',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`ElectroLearn 3D API Server listening on port ${PORT}`);
});
