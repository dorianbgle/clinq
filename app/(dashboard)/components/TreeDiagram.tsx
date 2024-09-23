"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import './tree-diagram-styles.css';

// Dynamically import Tree with SSR disabled
const Tree = dynamic(() => import('react-d3-tree'), { ssr: false });

// Define types for the node data
interface NodeAttributes {
  [key: string]: string;
}

interface NodeData {
  name: string;
  attributes?: NodeAttributes;
  children?: NodeData[];
  nodeSvgShape?: {
    shape: string;
    shapeProps: {
      fill: string;
      width?: number;
      height?: number;
      x?: number;
      y?: number;
    };
  };
  styles?: {
    node: {
      name: { fill: string };
    };
  };
}

// Define the data structure
const Data: NodeData = {
  name: 'Exclude Red Flags',
  styles: {
    node: {
      name: { fill: '#FFFFFF' }, // Set text color to white
    },
  },
  children: [
    {
      name: 'Targeted Hx/PES',
  
      nodeSvgShape: {
        shape: 'rect',
        shapeProps: {
          fill: 'blue',
        },
      },
      styles: {
        node: {
          name: { fill: '#FFFFFF' }, // Set text color to white
        },
      },
      children: [
        {
          name: 'Inner Node',
         
          nodeSvgShape: {
            shape: 'rect',
            shapeProps: {
              width: 50,
              height: 20,
              x: -10,
              y: -10,
              fill: 'green',
            },
          },
          styles: {
            node: {
              name: { fill: '#FFFFFF' }, // Set text color to white
            },
          },
        },
        {
          name: 'Level 2: B',
          styles: {
            node: {
              name: { fill: '#FFFFFF' }, // Set text color to white
            },
          },
        },
      ],
    },
  ],
};

const TreeDiagram: React.FC = () => {
  // State to keep track of the selected node's data
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);

  // Define the function to handle node clicks
  const handleNodeClick = (nodeData: any): void => {
    setSelectedNode(nodeData);
  };

  return (
    <div className="w-full h-96">
      <Tree
        data={Data}
        orientation="horizontal"
        translate={{ x: 150, y: 150 }}
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        pathFunc="step"
        // Use the built-in `nodeSize` and `separation` props for layout adjustment if necessary
        // Define the onClick function directly inside the data structure for each node
      />
      {selectedNode && selectedNode.attributes && (
        <div
          className="attribute-box"
          style={{
            position: 'absolute',
            top: (selectedNode as any).y + 100, // Type assertion used for 'y' property
            left: (selectedNode as any).x, // Type assertion used for 'x' property
          }}
        >
          <h4>Node Attributes:</h4>
          <ul>
            {Object.entries(selectedNode.attributes).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TreeDiagram;
