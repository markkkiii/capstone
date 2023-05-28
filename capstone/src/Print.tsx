import React from 'react';

interface PrintProps {
  handleClose: () => void;
}

const Print: React.FC<PrintProps> = ({ handleClose }) => {
  return (
    <div className="print-container">
      <h2>Print Form</h2>
      <div className="text-container">
        <div className="label">O.R. Number:</div>
        <input type="text" className="textbox" />
      </div>
      <div className="text-container">
        <div className="label">Amount Paid:</div>
        <input type="text" className="textbox" />
      </div>
      <div className="text-container">
        <div className="label">O.R. Date:</div>
        <input type="text" className="textbox" />
      </div>
      <div className="button-container">
        <button className="print-button">Print FSEC</button>
        <button className="cancel-button" onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Print;
