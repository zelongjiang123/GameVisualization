import CollapsibleSection from '../../components/CollapsibleSection';
import { Arrow, player1Color, player2Color } from '../../components/configs';
import MatrixGrid from '../../components/MatrixGrid';

const arrowsPlayer1: Arrow[] = [
  { fromRow: 0, fromCol: 0, toRow: 0, toCol: 1 },
  { fromRow: 0, fromCol: 1, toRow: 1, toCol: 1 },
  { fromRow: 1, fromCol: 1, toRow: 2, toCol: 1 },
  { fromRow: 2, fromCol: 1, toRow: 1, toCol: 1 },
  { fromRow: 1, fromCol: 1, toRow: 0, toCol: 1 },
  { fromRow: 0, fromCol: 1, toRow: 1, toCol: 1 },
  { fromRow: 1, fromCol: 1, toRow: 1, toCol: 0 },
  { fromRow: 1, fromCol: 0, toRow: 0, toCol: 0 },
  { fromRow: 0, fromCol: 0, toRow: 1, toCol: 0 },
  { fromRow: 1, fromCol: 0, toRow: 2, toCol: 0 },
];

const arrowsPlayer2: Arrow[] = [
  { fromRow: 2, fromCol: 2, toRow: 1, toCol: 2 },
  { fromRow: 1, fromCol: 2, toRow: 2, toCol: 2 },
  { fromRow: 2, fromCol: 2, toRow: 1, toCol: 2 },
  { fromRow: 1, fromCol: 2, toRow: 0, toCol: 2 },
  { fromRow: 0, fromCol: 2, toRow: 0, toCol: 1 },
  { fromRow: 0, fromCol: 1, toRow: 0, toCol: 0 },
  { fromRow: 0, fromCol: 0, toRow: 1, toCol: 0 },
  { fromRow: 1, fromCol: 0, toRow: 0, toCol: 0 },
  { fromRow: 0, fromCol: 0, toRow: 1, toCol: 0 },
  { fromRow: 1, fromCol: 0, toRow: 0, toCol: 0 },
];


type OptimalPoliciesPageProps = {
  arrows: Arrow[][];
};


const OptimalPoliciesPage: React.FC<OptimalPoliciesPageProps> = ({
  arrows,
}) => {
  return (
    <CollapsibleSection title="Optimal Policies">
      <div className="optimal-policiesPage">
        <div>
          {arrows.map((arrow, index) => {
            return <MatrixGrid key={`optimal-policiesPage-matrix-${index}`} arrowsPlayer1={[arrow[0]]} arrowsPlayer2={[arrow[1]]} header={`step ${index}`} isApplyNudge={true} colorPlayer1={player1Color} colorPlayer2={player2Color} />
          })}
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default OptimalPoliciesPage;
