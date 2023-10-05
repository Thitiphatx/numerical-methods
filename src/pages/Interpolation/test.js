import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MatrixFieldForm = () => {
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill('')));

  const handleMatrixChange = (row, col, value) => {
    const updatedMatrix = matrix.map((rowArray, rowIndex) =>
      rowIndex === row
        ? rowArray.map((cell, colIndex) =>
            colIndex === col ? value : cell
          )
        : rowArray
    );
    setMatrix(updatedMatrix);
  };

  const addRow = () => {
    const newRow = Array(matrix[0].length).fill('');
    setMatrix([...matrix, newRow]);
  };

  const removeRow = () => {
    if (matrix.length > 1) {
      const updatedMatrix = matrix.slice(0, -1);
      setMatrix(updatedMatrix);
    }
  };

  const addColumn = () => {
    const updatedMatrix = matrix.map((row) => [...row, '']);
    setMatrix(updatedMatrix);
  };

  const removeColumn = () => {
    if (matrix[0].length > 1) {
      const updatedMatrix = matrix.map((row) => row.slice(0, -1));
      setMatrix(updatedMatrix);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Matrix Field Form</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          {matrix.map((row, rowIndex) => (
            <div className="form-group row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <div className="col-md-4" key={colIndex}>
                  <input
                    type="text"
                    className="form-control"
                    value={cell}
                    onChange={(e) =>
                      handleMatrixChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <div className="text-center">
            <button className="btn btn-primary mb-2" onClick={addRow}>
              Add Row
            </button>
            <button className="btn btn-danger mb-2" onClick={removeRow}>
              Remove Row
            </button>
          </div>
          <div className="text-center">
            <button className="btn btn-success mb-2" onClick={addColumn}>
              Add Column
            </button>
            <button className="btn btn-warning" onClick={removeColumn}>
              Remove Column
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixFieldForm;
