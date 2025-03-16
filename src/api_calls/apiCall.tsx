import { Arrow, PoliciesGivenOpponentPosition, Strategy } from "../components/configs";


interface GetGameResultResponse {
    arrows: Arrow[][];
    policies: PoliciesGivenOpponentPosition[][];
    positionsForAllPlayers: [number, number][][];
    arrowsJointPolicy: Arrow[][][],
}

interface GetGameResultAPIResponse {
    optimalStrategies: number[][][];
    optimalPolicies: {
        opponentPositions: number[],
        transitions: { nextPositions: number[], positions: number[], probability: number }[]
    }[];
}
const server_url_local = "http://localhost:5000";
// const server_url = "https://game-solver-backend.onrender.com";
const server_url = "https://www.zelongjiang.cc";

export async function getGameResult(rewardMatrix: number[][][], crashValue: number, discountRate: number, onMessage: (message: string) => void): Promise<GetGameResultResponse> {

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
            }

            const response = await fetch(`${server_url}/api/start_game`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                reject(response.statusText);
            }

            const sessionId = await response.text();

            const eventSource = new EventSource(`${server_url}/api/game_result?sessionId=${sessionId}`);

            let result: GetGameResultResponse = {
                arrows: [],
                policies: [],
                positionsForAllPlayers: [],
                arrowsJointPolicy: [],
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
                        let arrows: Arrow[][] = [];
                        let positionsForAllPlayers: [number, number][][] = [[], []];

                        if (parsedResponse.optimalStrategies !== undefined) {
                            let positions = parsedResponse.optimalStrategies;
                            let positionsPlayer1: [number, number][] = [], positionsPlayer2: [number, number][] = [];

                            for (let i = 0; i < positions[0].length - 1; i++) {
                                arrows.push([
                                    { fromRow: positions[0][i][0], fromCol: positions[0][i][1], toRow: positions[0][i + 1][0], toCol: positions[0][i + 1][1] },
                                    { fromRow: positions[1][i][0], fromCol: positions[1][i][1], toRow: positions[1][i + 1][0], toCol: positions[1][i + 1][1] }
                                ]);
                            }

                            for (let i = 0; i < positions[0].length; i++) {
                                positionsPlayer1.push([positions[0][i][0], positions[0][i][1]]);
                                positionsPlayer2.push([positions[1][i][0], positions[1][i][1]]);
                            }

                            positionsForAllPlayers[0] = positionsPlayer1;
                            positionsForAllPlayers[1] = positionsPlayer2;
                        }


                        let policyListPlayer1: PoliciesGivenOpponentPosition[] = [];
                        let policyListPlayer2: PoliciesGivenOpponentPosition[] = [];

                        if (parsedResponse.optimalPolicies !== undefined) {
                            let policies = parsedResponse.optimalPolicies;
                            for (let i = 0; i < policies.length / 2; i++) {
                                let strategies: Arrow[] = [];
                                for (const strategy of policies[i].transitions) {
                                    strategies.push({ fromRow: strategy.positions[0], fromCol: strategy.positions[1], toRow: strategy.nextPositions[0], toCol: strategy.nextPositions[1], probability: strategy.probability });
                                }
                                policyListPlayer1.push({ opponentPos: policies[i].opponentPositions, strategies: strategies });
                            }
                            for (let i = policies.length / 2; i < policies.length; i++) {
                                let strategies: Arrow[] = [];
                                for (const strategy of policies[i].transitions) {
                                    strategies.push({ fromRow: strategy.positions[0], fromCol: strategy.positions[1], toRow: strategy.nextPositions[0], toCol: strategy.nextPositions[1], probability: strategy.probability });
                                }
                                policyListPlayer2.push({ opponentPos: policies[i].opponentPositions, strategies: strategies });
                            }
                        }

                        
                        let arrowsJointPolicy: Arrow[][][] = [];
                        if(parsedResponse.jointPolicies !== undefined){
                            let jointPolicies = parsedResponse.jointPolicies;
                            for(let i=0; i<jointPolicies.length; i++){
                                let policies: Arrow[][] = [];
                                for(const transitionList of jointPolicies[i].transitions){
                                    let transitions: Arrow[] = [];
                                    for(const transition of transitionList){
                                        transitions.push({fromRow: transition.positions[0], fromCol: transition.positions[1], toRow: transition.nextPositions[0], toCol: transition.nextPositions[1], probability: transition.probability});
                                    }
                                    policies.push(transitions);
                                }
                                arrowsJointPolicy.push(policies);
                            }
                        }

                        result = { arrows, policies: [policyListPlayer1, policyListPlayer2], positionsForAllPlayers, arrowsJointPolicy };
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
