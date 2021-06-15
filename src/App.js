import React, { useState, useEffect } from "react";
import PaginationComponent from "./component/PaginationComponent";

import "./App.css";

function App() {
  const [stateVariable, setStateVariable] = useState([]);
  const [isResponse, setIsResponse] = useState(false);

  // const [paginationData, setPaginationData] = useState([]);
  const [showPerPage, setShowPerPage] = useState(3);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  useEffect(() => {
    // send HTTP request
    fetch("https://reqres.in/api/user?page-2")
      .then((res) => res.json())
      .then((result) => {
        if (!isResponse) {
          setStateVariable(result.data);
          setIsResponse(true);
        }
      });
  });
  return (
    <div className="App">
      <div className="container">
        <h3 className="text-center list-user">List of Users</h3>
        {stateVariable.slice(pagination.start, pagination.end).map((post) => (
          <div className="row row-border" key={post.id}>
            <div className="col-md-2 mb-2">
              <h5>{post.id} .)</h5>
            </div>
            <div className="col-md-3 mb-3">
              <h5> Name: {post.name} </h5>
            </div>
            <div className="col-md-2 mb-2">
              <h5> Year: {post.year} </h5>
            </div>
            <div className="col-md-2 mb-2">
              <h5> Color; {post.color} </h5>
            </div>
            <div className="col-md-2 mb-2">
              <h5> Pantone: {post.pantone_value} </h5>
            </div>
          </div>
        ))}

        <PaginationComponent
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={stateVariable.length}
        />
      </div>
    </div>
  );
}

export default App;
