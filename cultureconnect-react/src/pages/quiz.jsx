import React from 'react';

export function Quiz() {
  return (
    <main className="container-fluid bg-secondary text-center">
       <p>The daily quiz will show here but for now it's a placeholder</p>
        <form className = "quiz">
            <fieldset>
                <legend> Smaple question</legend>
                <h3><strong>In Japan, which greeting is most common?</strong></h3>
                <p><input type="radio" name="q1" value="a" /> Handshake</p>
                <p><input type="radio" name="q1" value="b" /> Bow</p>
                <p><input type="radio" name="q1" value="c" /> High-five</p>
                <button type="submit" className="quiz_submit">Submit</button>
            </fieldset>
        </form>
        <section id="result">Result will appear here</section>
    </main>
  );
}