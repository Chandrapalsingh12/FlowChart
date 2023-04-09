import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, { Controls, Background, addEdge } from "reactflow";

import "reactflow/dist/style.css";

function WorkflowDesigner() {
  const { id } = useParams();
  const [workflow, setWorkflow] = useState({});
  const [modules, setModules] = useState([]);
  const [elements, setElements] = useState([]);
  const [hasInputEdge, setHasInputEdge] = useState(false);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    // Fetching the workflow data
    fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/modules/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setWorkflow(data);

        // Create the initial Input node with the workflow input type
        const inputNode = {
          id: "input",
          type: "input",
          data: { label: `Input (${data.input_type})` },
          position: { x: 0, y: 0 },
        };

        setElements([inputNode]);
      });

    // Fetching the module data
    fetch(
      `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        setModules(data);
        const moduleNodes = data.map((module) => ({
          id: module.id,
          type: "output",
          data: {
            label: `${module.input_type}--> ${module.name}--> ${module.output_type}`,
          },
          position: { x: 100, y: 200 },
        }));
        setElements((prevElements) => [...prevElements, ...moduleNodes]);
      });
  }, [id, limit]);

  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => els.filter((el) => !elementsToRemove.includes(el)));

  // Handle node creation by adding the new node to the elements state
  const onNodeDragStop = (event, node) => {
    console.log(node);
    const updatedElements = elements.map((el) => {
      if (el.id === node.id) {
        el.position = { x: node.position.x, y: node.position.y };
      }
      return el;
    });
    setElements(updatedElements);
  };

  const handleConnect = (params) => {
    const targetId = params.target;
    const targetElement = elements.find((el) => el.id === targetId);
    if (targetElement.type === "input") {
      setHasInputEdge(true);
    }
  };

  const handleElementsRemove = (elementsToRemove) => {
    const targetElements = elementsToRemove.filter(
      (el) => el.target && el.target === moduleId
    );
    if (targetElements.length > 0) {
      setHasInputEdge(false);
    }
  };

  const handleRightClick = () => {
    setLimit(limit + 1);
  };

  // console.log(elements);

  return (
    <div className="container">
      <h1>WorkFlow Name: {workflow.name}</h1>
      <div className="grid">
        <div className="left-section">
          <p style={{ textAlign: "center" }}>Module </p>
          <hr />

          <div className="box-container">
          {modules.map((module,key) => (
            <div className="boxs" key={key}>
              <div className="inp">{module.input_type}</div>
              <div className="val">{module.name}</div>
              <div className="out">{module.output_type}</div>
            </div>
          ))}
          </div>

          <div className="button-container">
            <button className="button-left" onClick={() => setLimit(limit - 1)}>
            Remove Node
            </button>
            <button className="button-right" onClick={handleRightClick}>
            Add Node
            </button>
          </div>
        </div>
        <div className="right-section">
          <ReactFlow
            nodes={elements}
            onNodeDragStop={onNodeDragStop}
            onConnect={handleConnect}
            onEdgesDelete={onElementsRemove}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default WorkflowDesigner;
