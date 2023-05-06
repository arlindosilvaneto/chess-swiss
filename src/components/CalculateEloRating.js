import React, { useState } from 'react';

function CalculateEloRating() {
  const [white, setWhite] = useState('');
  const [black, setBlack] = useState('');
  const [kFactor, setKFactor] = useState(20);
  const [result, setResult] = useState('');
  const [newRatingWhite, setNewRatingWhite] = useState('');
  const [newRatingBlack, setNewRatingBlack] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    // Calculate expected scores
    const expectedScoreWhite = 1 / (1 + 10 ** ((black - white) / 400));
    const expectedScoreBlack = 1 / (1 + 10 ** ((white - black) / 400));

    // Determine actual scores
    let actualScoreWhite, actualScoreBlack;

    switch (result) {
      case 'W':
        actualScoreWhite = 1;
        actualScoreBlack = 0;
        break;
      case 'B':
        actualScoreWhite = 0;
        actualScoreBlack = 1;
        break;
      case 'D':
        actualScoreWhite = 0.5;
        actualScoreBlack = 0.5;
        break;
      default:
        alert(`Invalid result: ${result}. Expected W, B, or D.`);
        return;
    }

    // Calculate new ratings
    const newRatingWhite = white + kFactor * (actualScoreWhite - expectedScoreWhite);
    const newRatingBlack = black + kFactor * (actualScoreBlack - expectedScoreBlack);

    // Set new ratings
    setNewRatingWhite(newRatingWhite.toFixed(2));
    setNewRatingBlack(newRatingBlack.toFixed(2));
  }

  return (
    <div className='block'>
      <h1>Calculadora ELO</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="white-rating">Rating das Brancas:</label>
          <input type="number" id="white-rating" value={white} onChange={(event) => setWhite(parseFloat(event.target.value))} required />
        </div>
        <div>
          <label htmlFor="black-rating">Rating das Negras:</label>
          <input type="number" id="black-rating" value={black} onChange={(event) => setBlack(parseFloat(event.target.value))} required />
        </div>
        <div>
          <label htmlFor="k-factor">K-factor:</label>
          <input type="number" id="k-factor" value={kFactor} onChange={(event) => setKFactor(parseInt(event.target.value))} />
        </div>
        <div>
          <label htmlFor="result">Resultado:</label>
          <select id="result" value={result} onChange={(event) => setResult(event.target.value)} required>
            <option value=""></option>
            <option value="W">Brancas ganharam</option>
            <option value="B">Negras ganharam</option>
            <option value="D">Empate</option>
          </select>
        </div>
        <button type="submit">Calcular novos Ratings</button>
        {newRatingWhite && newRatingBlack && (
          <div>
            <p>Novo rating das Brancas: <b>{newRatingWhite}</b></p>
            <p>Novo rating das Negras: <b>{newRatingBlack}</b></p>
          </div>
        )}
      </form>
    </div>
  );
}

export default CalculateEloRating;
