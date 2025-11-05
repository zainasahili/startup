import React, { useState, useEffect } from 'react';

export function Quiz() {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateQuiz();
  }, []);

  async function generateQuiz() {
    try {
      setLoading(true);
      setResult('');
      setSelected('');
      const res = await fetch('/api/quiz');

      const data = await res.json();
      setQuestion(data);
    
    } catch (err) {
      console.error('Error fetching quiz:', err);
      setResult('Failed to load quiz. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selected) return setResult('Please select an answer first!');
    if (selected === question.correctAnswer) {
      setResult('Correct!');
    } else {
      setResult(`Try again!`);
    }
  };

  return (
    <main>
      <h2>Daily Quiz</h2>

      {loading}
      {!loading && question && (
        <form className="quiz" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Today's Question</legend>
            <h3><strong>{question.question}</strong></h3>
            {question.options.map((opt, index) => (
              <p key={index}>
                <input
                  type="radio"
                  name="quiz"
                  value={opt}
                  onChange={() => setSelected(opt)}
                />{' '}
                {opt}
              </p>
            ))}
            <button type="submit" className="quiz_submit">Submit</button>
          </fieldset>
        </form>
      )}

      <section id="result" style={{ marginTop: '10px', fontWeight: 'bold' }}>{result}</section>
    </main>
  );
}
