import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    fetch("https://64307b10d4518cfb0e50e555.mockapi.io/modules")
      .then((response) => response.json())
      .then((data) => setWorkflows(data));
  }, []);

  return (
    <div className="workflow-list">
      <h1>Workflow List</h1>
      <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>InputType</th>
        <th>CreatedAt</th>
      </tr>
    </thead>
    <tbody>
      {workflows.map((workflow) => (
        <tr key={workflow.id}>
          <td>
            <Link to={`/workflow/${workflow.id}`}>
              {workflow.name}
            </Link>
          </td>
          <td>{workflow.input_type}</td>
          <td>{workflow.createdAt}</td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

export default Homepage;
