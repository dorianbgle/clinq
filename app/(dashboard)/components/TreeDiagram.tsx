"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import './tree-diagram-styles.css'

// Dynamically import Tree with SSR disabled
const Tree = dynamic(() => import('react-d3-tree'), { ssr: false });

const Data = {
  name: 'Exclude Red Flags',
  attributes: {
    keyA: 'Pneumothorax',
    keyB: 'Myocardial Infarction',
    keyC: 'val 3',
  },
  children: [
    {
      name: 'Parent Node',
      attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
      },
      nodeSvgShape: {
        shape: 'rect', 
        shapeProps: {
          fill: 'blue',
        },
      },
      children: [
        {
          name: 'Inner Node',
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
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
        },
        {
          name: 'Level 2: B',
        },
      ],
    },
  ],
};

const TreeDiagram = () => {
  // const [isClient, setIsClient] = useState(false);

  // // Ensure the component is only rendered on the client side
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   // Render nothing on the server side
  //   return null;
  // }

  return (
    <div className="w-full h-96">
      <Tree
        data={Data}
        orientation="horizontal"
        rootNodeClassName="node__root" // Apply custom class for root node
        branchNodeClassName="node__branch" // Apply custom class for branch nodes
        leafNodeClassName="node__leaf" // Apply custom class for leaf nodes
      />
    </div>
  );
};

export default TreeDiagram;
