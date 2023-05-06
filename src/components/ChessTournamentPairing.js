import React, { useState } from "react";

function ChessTournamentPairing() {
  const [numPlayers, setNumPlayers] = useState("");
  const [numRounds, setNumRounds] = useState("");
  const [pairings, setPairings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  function handleNumPlayersChange(event) {
    setNumPlayers(event.target.value);
  }

  function handleNumRoundsChange(event) {
    setNumRounds(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate input values
    if (numPlayers <= 0 || numRounds <= 0) {
      setErrorMessage("Number of players and rounds must be greater than 0");
      return;
    }

    // Calculate pairings
    const pairings = calculatePairings(numPlayers, numRounds);
    setPairings(pairings);
    setErrorMessage("");
  }

  function calculatePairings(numPlayers, numRounds) {
    // Create an array with player IDs
    const playerIds = Array.from({ length: numPlayers }, (_, index) => index + 1);

    // Create an array with round numbers
    const roundNumbers = Array.from({ length: numRounds }, (_, index) => index + 1);

    // Create an empty array to store pairings
    const pairings = [];

    // Loop through each round
    for (const roundNumber of roundNumbers) {
      // Shuffle the array of player IDs
      shuffleArray(playerIds);

      // Create an array of pairings for this round
      const roundPairings = [];

      // Loop through the array of player IDs and create pairings
      for (let i = 0; i < playerIds.length; i += 2) {
        const whitePlayer = playerIds[i];
        const blackPlayer = playerIds[i + 1];
        roundPairings.push({ round: roundNumber, white: whitePlayer, black: blackPlayer });
      }

      // Add the round pairings to the overall pairings array
      pairings.push(...roundPairings);
    }

    return pairings;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  return (
    <div className="block">
      <h1>Chess Tournament Pairing Generator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="num-players">Número de Jogadores:</label>
        <input
          type="number"
          id="num-players"
          name="num-players"
          value={numPlayers}
          onChange={handleNumPlayersChange}
        />

        <label htmlFor="num-rounds">Número de Rodadas:</label>
        <input
          type="number"
          id="num-rounds"
          name="num-rounds"
          value={numRounds}
          onChange={handleNumRoundsChange}
        />

        <button style={{display: 'block'}} type="submit">Gerar Pareamentos</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {pairings.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rodada</th>
              <th>Jogador de Brancas</th>
              <th>Jogador de Negras</th>
            </tr>
          </thead>
          <tbody>
            {pairings.map((pairing) => (
              <tr key={`${pairing.round}-${pairing.white}-${pairing.black}`}>
                <td>{pairing.round}</td>
                <td>{pairing.white}</td>
                <td>{pairing.black}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChessTournamentPairing;
