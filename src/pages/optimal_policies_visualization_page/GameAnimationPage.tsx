import { useState } from "react";
import CollapsibleSection from "../../components/CollapsibleSection";
import GameAnimation from "../../components/GameAnimation";
import { JointStrategy } from "../../components/configs";
import OptimalPoliciesPage from "./OptimalPoliciesPage";

interface GameAnimationPageProps {
    player1Positions: [number, number][];
    player2Positions: [number, number][];
};


const GameAnimationPage: React.FC<GameAnimationPageProps> = ({
    player1Positions, player2Positions
}) => {

    return (
        <CollapsibleSection title="Optimal Policies Animation">
            <div className="game-animation-page">
                {player1Positions.length > 0 && <GameAnimation positions1={player1Positions} positions2={player2Positions} />}
            </div>
        </CollapsibleSection>
    );
}

export default GameAnimationPage;