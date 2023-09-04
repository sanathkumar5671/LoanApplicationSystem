import React from "react";

const DataDisplay = ({ data }) => {
  // Check if the data is empty or not an array
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  } else if ("message" in data) {
    return <div className="message">{data["message"]}</div>;
  }

  // Extract the keys from the first object in the data as table headers
  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={colIndex}>{item[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataDisplay;
