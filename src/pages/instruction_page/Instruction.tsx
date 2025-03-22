import { useState } from 'react';
import './Instruction.less';
import CollapsibleSection from '../../components/utils/CollapsibleSection';

const Instruction = () => {
  return (
    <CollapsibleSection title="Instructions">
      <div className="instruction">
        <p>
          <strong>Welcome to the Game Solver.</strong> The game setup is: two players with a <strong>3 × 3 matrix</strong>.
        </p>

        <p>
          Each player has four strategies: <strong>up</strong>, <strong>down</strong>, <strong>left</strong>, and <strong>right</strong>.
          The players cannot go beyond the matrix boundaries.
          At each position, the player can get a <strong>reward</strong> (or a <strong>punishment</strong> if the reward is negative).
          If both players land on the same position, the first player will receive an extra reward equal to the <strong>"Crash Value"</strong>, while the second player will receive an extra reward equal to the <strong>negative</strong> of the "Crash Value".
          All players discount their reward by a factor of <strong>"Discount Rate"</strong>, which should be between <strong>0 and 1 (exclusive)</strong>.
        </p>

        <p>
          <strong>To start the game solver</strong>, please input a valid <strong>Crash Value</strong>, <strong>Discount Rate</strong>, and the <strong>reward matrix</strong>.
          Note that in each cell of the reward matrix, the first input box is the reward for <strong>Player 1</strong>, and the second input box is the reward for <strong>Player 2</strong>.
        </p>
        <p>
          The default game mode is <strong>Zero Sum</strong>. For example, if player 1 is at (r1, c1) and player 2 is at (r2, c2), then the reward will be R1[r1][c1] - R2[r2][c2] for player 1 and R2[r2][c2] - R1[r1][c1] for player 2. 
          R1[r1][c1] and R2[r2][c2] are the value you put in the reward matrix. You can change the game mode to <strong>General Sum</strong>. Under this mode, if player 1 is at (r1, c1) and player 2 is at (r2, c2), then the reward will be R1[r1][c1] for player 1 and R2[r2][c2] for player 2.
        </p>
        <p>
          Once you've entered the required values, click the <strong>"Fetch Data"</strong> button and wait approximately <strong>10 minutes</strong> for the results. After the calculation finishes, you can input the proper starting positions of both players and click <strong>"Recalculate Optimal Policy"</strong> to see the optimal policy.
        </p>
      </div>
    </CollapsibleSection>
  );
};

export default Instruction;