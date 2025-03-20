import { useState } from "react";
import CollapsibleSection from "../../components/CollapsibleSection";
import GameAnimation from "../../components/GameAnimation";
import { JointStrategy } from "../../components/configs";

interface GameAnimationPageProps {
    jointStrategiesMap: Map<string, JointStrategy>,
};


const GameAnimationPage: React.FC<GameAnimationPageProps> = ({
    jointStrategiesMap
}) => {
    const [player1StartingPosition, setPlayer1StartingPosition] = useState<number[]>([0, 0]);
    const [player2StartingPosition, setPlayer2StartingPosition] = useState<number[]>([2, 2]);
    const [player1Positions, setPlayer1Positions] = useState<[number, number][]>([]);
    const [player2Positions, setPlayer2Positions] = useState<[number, number][]>([]);
    const [steps, setSteps] = useState<number>(10);

    const handlePlayerStartingPositionChange = (player: number, row: number, col: number) => {
        let newStartingPosition = [row, col];
        if(player === 1) {
            setPlayer1StartingPosition(newStartingPosition);
        } else {
            setPlayer2StartingPosition(newStartingPosition);
        }
    }

    const onRecalculateOptimalPolicies = () => {
        let positionsStr = `${player1StartingPosition[0]},${player1StartingPosition[1]},${player2StartingPosition[0]},${player2StartingPosition[1]}`;
        let player1Positions: [number, number][] = [[player1StartingPosition[0], player1StartingPosition[1]]], player2Positions: [number, number][] = [[player2StartingPosition[0], player2StartingPosition[1]]];
        console.log(positionsStr, steps)      
        for (let i = 0; i < steps; i++) {
            let jointStrategy = jointStrategiesMap.get(positionsStr);
            if (jointStrategy !== undefined) {
                // randomly pick one strategy for each player according to the probability at the current position
                for(let player = 0; player < jointStrategy.transitions.length; player++){
                    let transitions = jointStrategy.transitions[player];
                    const random = Math.random();
                    let cumulative = 0;
                    for(const transition of transitions){
                        cumulative += transition.probability;
                        if(random < cumulative) {
                            let nextRow = transition.nextPositions[0], nextCol = transition.nextPositions[1];
                            if(player == 0){
                                positionsStr = `${nextRow},${nextCol},`;
                                player1Positions.push([nextRow, nextCol]);
                            } else {
                                positionsStr += `${nextRow},${nextCol}`;
                                player2Positions.push([nextRow, nextCol]);
                            }
                            break;
                        }
                    }
                }
                
            } else break;
        }
        setPlayer1Positions(player1Positions);
        setPlayer2Positions(player2Positions);
    }

    return (
        <CollapsibleSection title="Game Animation">
            <div className="game-animation-textbox-container">
                <div className="game-animation-textbox">
                    <label>Player 1 starting position</label>
                    <input
                        type="number"
                        step="1"
                        value={player1StartingPosition[0]}
                        onChange={(e) => handlePlayerStartingPositionChange(1, parseInt(e.target.value), player1StartingPosition[1])}
                        style={{ width: "40px", textAlign: "center" }}
                    />
                    {" , "/* Comma separator */}
                    <input
                        type="number"
                        step="1"
                        value={player1StartingPosition[1]}
                        onChange={(e) => handlePlayerStartingPositionChange(1, player1StartingPosition[0], parseInt(e.target.value))}
                        style={{ width: "40px", textAlign: "center" }}
                    />
                </div>

                <div className="game-input-textbox">
                    <label>Player 2 starting position</label>
                    <input
                        type="number"
                        step="1"
                        value={player2StartingPosition[0]}
                        onChange={(e) => handlePlayerStartingPositionChange(2, parseInt(e.target.value), player2StartingPosition[1])}
                        style={{ width: "40px", textAlign: "center" }}
                    />
                    {" , "/* Comma separator */}
                    <input
                        type="number"
                        step="1"
                        value={player2StartingPosition[1]}
                        onChange={(e) => handlePlayerStartingPositionChange(2, player2StartingPosition[0], parseInt(e.target.value))}
                        style={{ width: "40px", textAlign: "center" }}
                    />
                </div>
                <div>
                    <label>steps</label>
                    <input
                        type="number"
                        step="1"
                        value={steps}
                        onChange={(e) => setSteps(parseInt(e.target.value))}
                        style={{ width: "40px", textAlign: "center" }}
                    />
                </div>
            </div>
            <button onClick={()=>{onRecalculateOptimalPolicies();}}>Recalculate the Optimal Policy</button>
            <div className="game-animation-page">
                {player1Positions.length > 0 && <GameAnimation positions1={player1Positions} positions2={player2Positions} />}
            </div>
        </CollapsibleSection>
    );
}

export default GameAnimationPage;