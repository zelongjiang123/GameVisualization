import { Arrow, GameType, JointStrategy, StrategiesGivenOpponentPosition, Strategy } from "../components/configs";


interface GetGameResultResponse {
    strategiesGivenOpponentPosition: StrategiesGivenOpponentPosition[][];
    arrowsJointStrategies: Arrow[][][],
    jointStrategiesMap: Map<string, JointStrategy>;
}

const server_url_local = "http://localhost:5000";
// const server_url = "https://game-solver-backend.onrender.com";
const server_url = "https://www.zelongjiang.cc";

export async function getGameResult(rewardMatrix: number[][][], crashValue: number, discountRate: number, gameType: GameType, onMessage: (message: string) => void): Promise<GetGameResultResponse> {

    return new Promise(async (resolve, reject) => {
        try {

            /**
             * It needs to use EventSource to update the status (iteration) of the call,
             * but EventSource can only be used with GET api. I do not want to put the parameters into 
             * the url because it might be too long. Therefore, it needs to call the start_game (POST) first,
             * and then call the game_result (GET)
             */

            const data = {
                rewardMatrix,
                crashValue,
                discountRate,
                gameType,
            }

            const response = await fetch(`${server_url_local}/api/start_game`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                reject(response.statusText);
            }

            const sessionId = await response.text();

            const eventSource = new EventSource(`${server_url_local}/api/game_result?sessionId=${sessionId}`);

            let result: GetGameResultResponse = {
                strategiesGivenOpponentPosition: [],
                arrowsJointStrategies: [],
                jointStrategiesMap: new Map(),
            };

            eventSource.onmessage = (event) => {
                try {
                    const parsedResponse = JSON.parse(event.data);
                    // Collect intermediate messages
                    if (parsedResponse.message !== undefined) {
                        // console.log(parsedResponse.message);
                        onMessage(parsedResponse.message); // Process messages like "Iteration complete"
                    } else if (parsedResponse.End !== undefined) {
                        eventSource.close();
                        resolve(result); // Resolve with the final game result
                    } else {
                        // console.log(parsedResponse);
                        let strategyListPlayer1: StrategiesGivenOpponentPosition[] = [];
                        let strategyListPlayer2: StrategiesGivenOpponentPosition[] = [];

                        if (parsedResponse.optimalStrategies !== undefined) {
                            // calculate the optimal strategies for each player given the other player's position
                            let optimalStrategies = parsedResponse.optimalStrategies;
                            for (let i = 0; i < optimalStrategies.length / 2; i++) {
                                let strategies: Arrow[] = [];
                                for (const strategy of optimalStrategies[i].transitions) {
                                    strategies.push({ fromRow: strategy.positions[0], fromCol: strategy.positions[1], toRow: strategy.nextPositions[0], toCol: strategy.nextPositions[1], probability: strategy.probability });
                                }
                                strategyListPlayer1.push({ opponentPos: optimalStrategies[i].opponentPositions, strategies: strategies });
                            }
                            for (let i = optimalStrategies.length / 2; i < optimalStrategies.length; i++) {
                                let strategies: Arrow[] = [];
                                for (const strategy of optimalStrategies[i].transitions) {
                                    strategies.push({ fromRow: strategy.positions[0], fromCol: strategy.positions[1], toRow: strategy.nextPositions[0], toCol: strategy.nextPositions[1], probability: strategy.probability });
                                }
                                strategyListPlayer2.push({ opponentPos: optimalStrategies[i].opponentPositions, strategies: strategies });
                            }
                        }

                        
                        let arrowsJointStrategies: Arrow[][][] = [];
                        let jointStrategiesMap: Map<string, JointStrategy> = new Map();
                        if(parsedResponse.jointStrategies !== undefined){
                            // calculate the optimal joint strategies for every state (positions)
                            let jointStrategies: JointStrategy[] = parsedResponse.jointStrategies;
                            for(let i=0; i<jointStrategies.length; i++){
                                let strategies: Arrow[][] = [];
                                for(const transitionList of jointStrategies[i].transitions){
                                    let transitions: Arrow[] = [];
                                    for(const transition of transitionList){
                                        transitions.push({fromRow: transition.positions[0], fromCol: transition.positions[1], toRow: transition.nextPositions[0], toCol: transition.nextPositions[1], probability: transition.probability});
                                    }
                                    strategies.push(transitions);
                                }
                                arrowsJointStrategies.push(strategies);
                                
                                let positions = jointStrategies[i].positions;
                                jointStrategiesMap.set(`${positions[0][0]},${positions[0][1]},${positions[1][0]},${positions[1][1]}`, jointStrategies[i]);
                            }

                        }

                        result = { strategiesGivenOpponentPosition: [strategyListPlayer1, strategyListPlayer2], arrowsJointStrategies, jointStrategiesMap };
                    }
                } catch (error) {
                    console.error("Error parsing SSE message:", error);
                }
            };

            eventSource.onerror = (error) => {
                console.error("SSE connection error:", error);
                eventSource.close(); // Close SSE on error
                reject(error); // Reject promise on error
            };
        } catch (error) {
            // Handle errors (network issues, invalid JSON, etc.)
            console.error("Error sending game data:", error);
            reject(error);
        }
    });
}
