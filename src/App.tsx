import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import OptimalPoliciesPage from './pages/optimal_policies_page/OptimalPoliciesPage';
import OptimalStrategiesPage from './pages/optimal_strategies_page/OptimalStrategiesPage';
import NodesGraph from './components/NodesGraph';
import { getGameResult } from './api_calls/apiCall';
import { Arrow, JointStrategy, StrategiesGivenOpponentPosition } from './components/configs';
import LoadingPage from './pages/loading_page/LoadingPage';
import GameAnimationPage from './pages/game_animation_page/GameAnimationPage';
import GameInput from './pages/game_input_page/GameInput';
import { GameInputContext } from './contexts/GameInputContext';
import JointStrategiesPage from './pages/joint_strategies_page/JointStrategiesPage';
import Instruction from './pages/instruction_page/Instruction';
import { join } from 'path';

function App() {
  const [arrowsOptimalPolicies, setArrowsOptimalPolicies] = useState<Arrow[][]>([]);
  const [arrowsJointStrategies, setArrowsJointStrategies] = useState<Arrow[][][]>([]);
  const [strategiesGivenOpponentPosition, setStrategiesGivenOpponentPosition] = useState<StrategiesGivenOpponentPosition[][]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [jointStrategiesMap, setJointStrategiesMap] = useState<Map<string, JointStrategy>>(new Map());

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
    let {jointStrategiesMap, arrowsOptimalPolicies, strategiesGivenOpponentPosition, arrowsJointStrategies} = await getGameResult(rewardMatrix, crashValue, discountRate, (message) => setMessage(message));
    setArrowsOptimalPolicies(arrowsOptimalPolicies);
    setStrategiesGivenOpponentPosition(strategiesGivenOpponentPosition);
    setArrowsJointStrategies(arrowsJointStrategies);
    setJointStrategiesMap(jointStrategiesMap);
    setLoading(false);
  }

  return (
    <div className="App">
      { !loading && 
      <div className='content'>
        <Instruction/>
        <GameInputContext.Provider value={{rewardMatrix, setRewardMatrixCallback: (matrix) => setRewardMatrix(matrix), crashValue, setCrashValueCallback: (value) => setCrashValue(value), discountRate, setDiscountRateCallback: (value) => setDiscountRate(value)}}>
          <GameInput onFetchData={handleButtonClick}/>
        </GameInputContext.Provider>

        <div>
          
        </div>
        
        <GameAnimationPage jointStrategiesMap={jointStrategiesMap}/>
        <OptimalPoliciesPage arrows={arrowsOptimalPolicies}/>
        <JointStrategiesPage arrows={arrowsJointStrategies}/>
        <OptimalStrategiesPage strategies={strategiesGivenOpponentPosition} />
      </div>
      }
      {loading && <LoadingPage content={message}/>}
      {/* <NodesGraph rows={9} cols={9} spacing={100}/> */}
    </div>
  );
}

export default App;
