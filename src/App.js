import './App.css';
import CalculateEloRating from './components/CalculateEloRating';
import ChessTournamentPairing from './components/ChessTournamentPairing';

function App() {
  return (
    <div className="App">
      <ChessTournamentPairing />
      <CalculateEloRating />
    </div>
  );
}

export default App;
