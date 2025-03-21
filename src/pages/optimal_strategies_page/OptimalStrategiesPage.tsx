import CollapsibleSection from '../../components/utils/CollapsibleSection';
import { Arrow, HighlightCell, player1Color, player2Color, StrategiesGivenOpponentPosition } from '../../components/configs';
import MatrixGrid from '../../components/MatrixGrid';

const arrowsPlayer1: Arrow[] = [
    { fromRow: 0, fromCol: 0, toRow: 0, toCol: 1, probability: 0.5 },
    { fromRow: 0, fromCol: 0, toRow: 1, toCol: 0, probability: 0.5 },
    { fromRow: 0, fromCol: 1, toRow: 0, toCol: 0, probability: 0.2 },
    { fromRow: 0, fromCol: 1, toRow: 1, toCol: 1, probability: 0.35 },
    { fromRow: 0, fromCol: 1, toRow: 0, toCol: 2, probability: 0.45 },
    { fromRow: 0, fromCol: 2, toRow: 0, toCol: 1, probability: 0.2 },
    { fromRow: 0, fromCol: 2, toRow: 1, toCol: 2, probability: 0.8 },
    { fromRow: 1, fromCol: 0, toRow: 0, toCol: 0, probability: 0.1 },
    { fromRow: 1, fromCol: 0, toRow: 1, toCol: 1, probability: 0.9 },
    { fromRow: 1, fromCol: 0, toRow: 2, toCol: 0, probability: 0 },
    { fromRow: 1, fromCol: 1, toRow: 1, toCol: 0, probability: 0.1 },
    { fromRow: 1, fromCol: 1, toRow: 1, toCol: 2, probability: 0.7 },
    { fromRow: 1, fromCol: 1, toRow: 0, toCol: 1, probability: 0.1 },
    { fromRow: 1, fromCol: 1, toRow: 2, toCol: 1, probability: 0.1 },
    { fromRow: 1, fromCol: 2, toRow: 1, toCol: 1, probability: 0.9 },
    { fromRow: 1, fromCol: 2, toRow: 0, toCol: 2, probability: 0 },
    { fromRow: 1, fromCol: 2, toRow: 2, toCol: 2, probability: 0.1 },
    { fromRow: 2, fromCol: 0, toRow: 2, toCol: 1, probability: 0.4 },
    { fromRow: 2, fromCol: 0, toRow: 1, toCol: 0, probability: 0.6 },
    { fromRow: 2, fromCol: 1, toRow: 2, toCol: 0, probability: 0 },
    { fromRow: 2, fromCol: 1, toRow: 1, toCol: 1, probability: 0 },
    { fromRow: 2, fromCol: 1, toRow: 2, toCol: 2, probability: 1 },
    { fromRow: 2, fromCol: 2, toRow: 2, toCol: 1, probability: 0.3 },
    { fromRow: 2, fromCol: 2, toRow: 1, toCol: 2, probability: 0.7 },
];
  
type OptimalStrategiesPageProps = {
  strategies: StrategiesGivenOpponentPosition[][];
};


const OptimalStrategiesPage: React.FC<OptimalStrategiesPageProps> = ({
  strategies,
}) => {
  return (
    <CollapsibleSection title="Optimal Strategies">
      <div className="optimal-strategyPage">
        <div>
          {
            strategies.map((strategy, index) => {
              let color = player1Color, opponentColor = player2Color;
              if (index === 1) {
                color = player2Color;
                opponentColor = player1Color;
              }
              return <div>
                <h2>Player {index + 1}</h2>
                <div>
                  {
                    strategy.map((entry, index2) => {
                      let highlightedCell: HighlightCell = { color: opponentColor, row: entry.opponentPos[0], col: entry.opponentPos[1] };
                      return <MatrixGrid key={`optimal-strategiesPage-matrix-player${index + 1}-${index2}`} arrowsPlayer1={entry.strategies} header={`the opponent is at \n position ${entry.opponentPos}`} colorPlayer1={color} highlightedCell={highlightedCell} />
                    })
                  }
                </div>

              </div>
            })
          }
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default OptimalStrategiesPage;
