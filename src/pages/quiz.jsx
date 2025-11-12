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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selected) return setResult('Please select an answer first!');
    try{
      const res = await fetch('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        answer: selected,
        correctAnswer: question.correctAnswer[0]
      }),
    })

    const data = await res.json();
    if (res.ok){
      if (data.correct){
        setResult(data.message);
        setTimeout(() => generateQuiz(), 2000);
      } else {
        setResult('Try Again!');
      }
    } else {
      setResult(data.message || 'Something went wrong!');
    }
  } catch (err){
    console.error('Error submitting quiz:', err);
    setResult('Error submitting answer');
    }
  };

  return (
    <main>
      <h2>Daily Quiz</h2>

      {loading && <p>Loading Quiz...</p>}
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
                  onChange={() => setSelected(opt[0])}
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
