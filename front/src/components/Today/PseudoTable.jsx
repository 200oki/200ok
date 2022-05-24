import React from "react";

const PseudoTable = () => {
  const columns = [1, 2, 3, 4, 5, 6, 7];
  const rows = [1, 2, 3, 4, 5, 6];
  return rows.map((row, index) => {
    return (
      <tr key={index}>
        {columns.map((column, index) => {
          return (
            <td key={index} style={{ padding: "0" }}>
              <div style={{ width: "170px", padding: "0" }} />
            </td>
          );
        })}
      </tr>
    );
  });
};
export default PseudoTable;
