import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OptimalPoliciesPage from './pages/optimal_policies_page/OptimalPoliciesPage';
import OptimalStrategiesPage from './pages/optimal_strategies_page/OptimalStrategiesPage';
import NodesGraph from './components/NodesGraph';
import { getGameResult } from './api_calls/apiCall';
import { Arrow, PoliciesGivenOpponentPosition } from './components/configs';
import LoadingPage from './pages/loading_page/LoadingPage';
import GameAnimationPage from './pages/game_animation_page/GameAnimationPage';
import GameInput from './components/GameInput';
import { GameInputContext } from './contexts/GameInputContext';
import JointStrategiesPage from './pages/joint_strategies_page/JointStrategiesPage';

function App() {
  const [arrows, setArrows] = useState<Arrow[][]>([]);
  const [arrowsJointPolicy, setArrowsJointPolicy] = useState<Arrow[][][]>([]);
  const [policies, setPolicies] = useState<PoliciesGivenOpponentPosition[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [positionsForAllPlayers, setPositionsForAllPlayers] = useState<[number, number][][]>([[], []]);
  const [message, setMessage] = useState<string>("");

   const initialMatrix = Array(3)
      .fill(null)
      .map(() => Array(3).fill([0, 0]));
  
    const [rewardMatrix, setRewardMatrix] = useState<number[][][]>(initialMatrix);
    const [crashValue, setCrashValue] = useState<number>(10);
    const [discountRate, setDiscountRate] = useState<number>(0.9);


  const handleButtonClick = async () => {
    console.log("click");
    setMessage("");
    setLoading(true);
    let {arrows, policies, positionsForAllPlayers, arrowsJointPolicy} = await getGameResult(rewardMatrix, crashValue, discountRate, (message) => setMessage(message));
    console.log(arrows)
    setArrows(arrows);
    setPolicies(policies);
    setPositionsForAllPlayers(positionsForAllPlayers);
    setArrowsJointPolicy(arrowsJointPolicy);
    setLoading(false);
  }

  return (
    <div className="App">
      { !loading && 
      <div className='content'>
        
        <GameInputContext.Provider value={{rewardMatrix, setRewardMatrixCallback: (matrix) => setRewardMatrix(matrix), crashValue, setCrashValueCallback: (value) => setCrashValue(value), discountRate, setDiscountRateCallback: (value) => setDiscountRate(value)}}>
          <GameInput/>
        </GameInputContext.Provider>

        <div>
          <button onClick={()=>{handleButtonClick();}}>Fetch Data</button>
        </div>
        
        <GameAnimationPage positions1={positionsForAllPlayers[0]} positions2={positionsForAllPlayers[1]}/>
        <OptimalPoliciesPage arrows={arrows}/>
        <JointStrategiesPage arrows={arrowsJointPolicy}/>
        <OptimalStrategiesPage policies={policies} />
      </div>
      }
      {loading && <LoadingPage content={message}/>}
      {/* <NodesGraph rows={9} cols={9} spacing={100}/> */}
    </div>
  );
}

export default App;
