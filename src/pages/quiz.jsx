import React, { useState } from 'react';

export function Quiz() {

  const [selected, setSelected] = useState("");
  const [result, setResult] = useState('');

  const answer = 'b';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selected === answer) {
      setResult('Correct!');
    } else if (selected) {
      setResult('Try again! Hint: It is a gesture of respect.');
    } else {
      setResult('Please select an answer first!');
    }
  };

  return (
    <main>
       <p>The daily quiz will show here but for now it's a sample questions</p>
        <form className = "quiz" onSubmit={handleSubmit}>
            <fieldset>
                <legend> Smaple question</legend>
                <h3><strong>In Japan, which greeting is most common?</strong></h3>
                <p><input type="radio" name="q1" value="a" onChange={() => setSelected('a')}/>{''} Handshake</p>
                <p><input type="radio" name="q1" value="b" onChange={() => setSelected('b')}/>{''} Bow</p>
                <p><input type="radio" name="q1" value="c" onChange={() => setSelected('c')}/>{''} High-five</p>
                <button type="submit" className="quiz_submit">Submit</button>
            </fieldset>
        </form>
        <section id="result" style={{ marginTop: '10px', fontWeight: 'bold' }}>{result}</section>
    </main>
  );
}