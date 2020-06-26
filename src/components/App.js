import React, { useState, useEffect } from "react";

// // PNG
import pierre from "../assets/png/pierre.png";
import feuille from "../assets/png/feuille.png";
import ciseaux from "../assets/png/ciseaux.png";
import fabigeon from "../assets/png/fabigeon.png";
import fabiosaure from "../assets/png/fabiosaure.png";
import fabioCultist from "../assets/png/fabiocultist.png";

import "./app.scss";

// PNG to Component
export const Pierre = () => <img src={pierre} alt="Pierre"></img>;

export const Feuille = () => <img src={feuille} alt="Feuille"></img>;

export const Ciseaux = () => <img src={ciseaux} alt="Ciseaux"></img>;

export const Fabigeon = () => <img src={fabigeon} alt="Fabigeon"></img>;

export const Fabiosaure = () => <img src={fabiosaure} alt="Fabiosaure"></img>;

export const FabioCultist = () => (
  <img src={fabioCultist} alt="FabioCultist"></img>
);

const choices = [
  { id: 1, name: "Pierre", component: Pierre, losesTo: [2, 4] },
  { id: 2, name: "Feuille", component: Feuille, losesTo: [3, 5] },
  { id: 3, name: "Ciseaux", component: Ciseaux, losesTo: [1, 4] },
  { id: 4, name: "Fabigeon", component: Fabigeon, losesTo: [2, 5] },
  { id: 5, name: "Fabiosaure", component: Fabiosaure, losesTo: [1, 2] },
];

function App() {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    resetGame();
  }, []);

  function resetGame() {
    setGameState(undefined);
    setUserChoice(undefined);

    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }

  function handleUserChoice(choice) {
    const chosenChoice = choices.find((c) => c.id === choice);
    setUserChoice(chosenChoice);

    // console.log(chosenChoice);
    // console.log(computerChoice);

    // Loss
    if (
      chosenChoice.losesTo.forEach((choice) => {
        if (choice === computerChoice.id) {
          setLosses((losses) => losses + 1);
          setGameState("lose");
        }
      })
    ) {
      // console.log('Lose');
    } else if (
      computerChoice.losesTo.forEach((choice) => {
        if (choice === chosenChoice.id) {
          setWins((wins) => wins + 1);
          setGameState("win");
        }
      })
    ) {
      // console.log('Win');
    } else if (computerChoice.id === chosenChoice.id) {
      setGameState("draw");
    }
  }

  function renderComponent(choice) {
    const Component = choice.component;
    return <Component />;
  }

  return (
    <div className="app">
      <div className="info">
        <h2>P3FC: Pierre Fabigeon Fabiosaure Feuille Ciseaux</h2>

        <div className="stats">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins <= 1 ? "Victoire" : "Victoires"}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses <= 1 ? "Défaite" : "Défaites"}</span>
          </div>
        </div>

        <details className="rules">
          <summary>Règles</summary>
          <Rules />
        </details>
      </div>

      {/* Modal Win/Lose/Draw */}
      {gameState && (
        <div className={`game-state ${gameState}`}>
          <div className="modal">
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              {gameState === "win" && (
                <p>
                  Ce n'est pas possible mais vous avez gagné, le Maître a
                  surement eu <em>pitié</em> de vous.
                </p>
              )}
              {gameState === "lose" && (
                <p>
                  Comme prévu de la part du grand maître, il vous à{" "}
                  <strong>écrasé</strong> comme l'insecte que vous êtes !
                </p>
              )}
              {gameState === "draw" && (
                <p>
                  Égalité, ce n'est que partie remise, le Maître fini{" "}
                  <em>toujours</em> par gagné !
                </p>
              )}

              <p>{renderComponent(computerChoice)}</p>
            </div>
            <button onClick={() => resetGame()}>Revanche !</button>
          </div>
        </div>
      )}

      <div className="choices">
        <div>Étudiant O'Clock</div>
        <div />
        <div>FabioCultist</div>

        <div className="player-choices">
          <button className="svg-icon" onClick={() => handleUserChoice(1)}>
            <Pierre />
          </button>
          <button className="svg-icon" onClick={() => handleUserChoice(2)}>
            <Feuille />
          </button>
          <button className="svg-icon" onClick={() => handleUserChoice(3)}>
            <Ciseaux />
          </button>
          <button className="svg-icon" onClick={() => handleUserChoice(4)}>
            <Fabigeon />
          </button>
          <button className="svg-icon" onClick={() => handleUserChoice(5)}>
            <Fabiosaure />
          </button>
        </div>

        <div className="vs">VS</div>

        <div>
          {/* <button className="fabiocultist-choice">?</button> */}
          <button className="svg-icon fabiocultist-choice">
            <FabioCultist />
          </button>
        </div>
      </div>
    </div>
  );
}

const Rules = () => (
  <div className="rules-list">
    <div className="choice">
      <ul className="pierre">
      Pierre
      <li>Écrase <span className="fabiosaure">Fabiosaure</span></li>
      <li>Écrase les <span className="ciseaux">ciseaux</span></li>
      </ul>
    </div>
    <div className="choice">
      <ul className="fabigeon">
      Fabigeon
      <li>Défèque sur les <span className="ciseaux">ciseaux</span></li>
      <li>Défèque sur la <span className="pierre">pierre</span></li>
      </ul>
    </div>
    <div className="choice">
      <ul className="fabiosaure">
      Fabiosaure
      <li>Mange <span className="fabigeon">Fabigeon</span></li>
      <li>Marche sur la <span className="feuille">feuille</span></li>
      </ul>
    </div>
    <div className="choice">
      <ul className="feuille">
      Feuille
      <li>Recouvre la <span className="pierre">pierre</span></li>
      <li>Bloque la vue de <span className="fabigeon">Fabigeon</span></li>
      </ul>
    </div>
    <div className="choice">
      <ul className="ciseaux">
      Ciseaux
      <li>Coupe la <span className="feuille">feuille</span></li>
      <li>Coupe <span className="fabiosaure">Fabiosaure</span></li>
      </ul>
    </div>
  </div>
);

export default App;
