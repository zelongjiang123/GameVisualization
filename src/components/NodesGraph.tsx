import React, { useEffect, useState } from "react";

type Node = {
  id: number;
  x: number;
  y: number;
};

type Edge = {
  from: number;
  to: number;
};
const radius = 10;
const generateGridNodes = (rows: number, cols: number, spacing: number): Node[] => {
  let nodes: Node[] = [];
  let id = 0;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      nodes.push({ id: id++, x: col * spacing + 2 * radius, y: row * spacing + 2 * radius});
    }
  }
  return nodes;
};

// Generates edges between adjacent nodes
const generateGridEdges = (nodes: Node[], cols: number): Edge[] => {
  let edges: Edge[] = [];
  nodes.forEach((node) => {
    // Connect to the right neighbor
    if ((node.id + 1) % cols !== 0) {
      edges.push({ from: node.id, to: node.id + 1 });
    }
    // Connect to the bottom neighbor
    if (node.id + cols < nodes.length) {
      edges.push({ from: node.id, to: node.id + cols });
    }
  });
  return edges;
};

const NodesGraph: React.FC<{ rows: number; cols: number; spacing: number }> = ({ rows, cols, spacing }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  useEffect(() => {
    const newNodes = generateGridNodes(rows, cols, spacing);
    const newEdges = generateGridEdges(newNodes, cols);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [rows, cols, spacing]);

  return (
    <svg width={cols * spacing + 200} height={rows * spacing + 200}>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
        </marker>
      </defs>

      {/* Draw edges */}
      {edges.map((edge, index) => {
        const fromNode = nodes.find((n) => n.id === edge.from);
        const toNode = nodes.find((n) => n.id === edge.to);
        if (!fromNode || !toNode) return null;

        return (
          <line
            key={index}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="black"
            strokeWidth="2"
            markerEnd="url(#arrow)"
          />
        );
      })}

      {/* Draw nodes */}
      {nodes.map((node) => (
        <circle key={node.id} cx={node.x} cy={node.y} r={radius} fill="lightblue" stroke="black" />
      ))}
    </svg>
  );
};

export default NodesGraph;
