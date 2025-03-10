import { Arrow, player1Color, player2Color } from "../../components/configs";
import MatrixGrid from "../../components/MatrixGrid";

type JointPolicyPageProps = {
    arrows: Arrow[][][];
  };
  
  
  const JointPolicyPage: React.FC<JointPolicyPageProps> = ({
    arrows,
  }) => {
    return (
      <div className="joint-policy-page">
        <h1>Joint Strategy</h1>
        <div>
          {arrows.map((arrow, index) => {
            let header = `player 1 at (${arrow[0][0].fromRow}, ${arrow[0][0].fromCol}), player 2 at (${arrow[1][0].fromRow}, ${arrow[1][0].fromCol})`;
            return <MatrixGrid key={`joint-policy-page-matrix-${index}`} arrowsPlayer1={arrow[0]} arrowsPlayer2={arrow[1]} header={header} isApplyNudge={true} colorPlayer1={player1Color} colorPlayer2={player2Color}/>
          })}
        </div>
       
      </div>
    );
  }
  
  export default JointPolicyPage;