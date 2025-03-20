import CollapsibleSection from "../../components/CollapsibleSection";
import GameAnimation from "../../components/GameAnimation";

interface GameAnimationPageProps {
    positions1: [number, number][], 
    positions2: [number, number][],
};


const GameAnimationPage: React.FC<GameAnimationPageProps> = ({
    positions1,
    positions2,
}) => {
    return (
        <CollapsibleSection title="Game Animation">
            <div className="game-animation-page">
                {positions1.length > 0 && <GameAnimation positions1={positions1} positions2={positions2} />}
            </div>
        </CollapsibleSection>
    );
}

export default GameAnimationPage;