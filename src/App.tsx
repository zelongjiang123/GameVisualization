import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OptimalStrategyPage from './pages/optimal_strategy_page/OptimalStrategyPage';
import OptimalPolicyPage from './pages/optimal_policy_page/OptimalPolicyPage';
import NodesGraph from './components/NodesGraph';
import { getGameResult } from './api_calls/apiCall';
import { Arrow, PoliciesGivenOpponentPosition } from './components/configs';
import LoadingPage from './pages/loading_page/LoadingPage';
import GameAnimationPage from './pages/game_animation_page/GameAnimationPage';
import GameInput from './components/GameInput';
import { GameInputContext } from './contexts/GameInputContext';

function App() {
  const [arrows, setArrows] = useState<Arrow[][]>([]);
  const [policies, setPolicies] = useState<PoliciesGivenOpponentPosition[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [positionsForAllPlayers, setPositionsForAllPlayers] = useState<[number, number][][]>([[], []]);
  const [message, setMessage] = useState<string>("");

   const initialMatrix = Array(3)
      .fill(null)
      .map(() => Array(3).fill([0, 0]));
  
    const [rewardMatrix, setRewardMatrix] = useState<number[][][]>(initialMatrix);


  const handleButtonClick = async () => {
    console.log("click");
    setMessage("");
    setLoading(true);
    let {arrows, policies, positionsForAllPlayers} = await getGameResult(rewardMatrix, (message) => setMessage(message));
    console.log(arrows)
    setArrows(arrows);
    setPolicies(policies);
    setPositionsForAllPlayers(positionsForAllPlayers);
    setLoading(false);
  }

  return (
    <div className="App">
      { !loading && 
      <div className='content'>
        <div>
        <button onClick={()=>{handleButtonClick();}}>Fetch Data</button>
        </div>
        <GameInputContext.Provider value={{rewardMatrix, setRewardMatrixCallback: (matrix) => setRewardMatrix(matrix)}}>
          <GameInput/>
        </GameInputContext.Provider>
        
        <GameAnimationPage positions1={positionsForAllPlayers[0]} positions2={positionsForAllPlayers[1]}/>
        <OptimalStrategyPage arrows={arrows}/>
        <OptimalPolicyPage policies={policies} />
      </div>
      }
      {loading && <LoadingPage content={message}/>}
      {/* <NodesGraph rows={9} cols={9} spacing={100}/> */}
    </div>
  );
}

export default App;
