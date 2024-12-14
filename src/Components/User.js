// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const User = () => {
//   const [data, setData] = useState([]);
//   const SHEET_ID = "1MRf6aF8PN03w18_9BwKhTRc4zK4eNis9hm5m7ldFwdQ";
//   const API_KEY = "AIzaSyCz0y0Ot7zSeZ_eRfE1VBCJECZhW2HGkhk";
//   const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

//   useEffect(() => {
//     axios
//       .get(URL)
//       .then((response) => {
//         setData(response.data.values);
//       })
//       .catch((error) => {
//         console.error("Error fetching spreadsheet data:", error);
//       });
//   }, []);

//   const styles = {
//     container: {
//       textAlign: "center",
//       marginTop: "50px",
//       fontFamily: "Arial, sans-serif",
//       color: "#333",
//     },
//     title: {
//       fontSize: "2rem",
//       fontWeight: "bold",
//       marginBottom: "20px",
//       color: "#4CAF50",
//     },
//     table: {
//       margin: "0 auto",
//       borderCollapse: "collapse",
//       width: "80%",
//       boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//     },
//     th: {
//       backgroundColor: "#4CAF50",
//       color: "white",
//       padding: "10px",
//       fontSize: "1rem",
//       textAlign: "left",
//       border: "1px solid #ddd",
//     },
//     td: {
//       padding: "10px",
//       textAlign: "left",
//       border: "1px solid #ddd",
//       fontSize: "0.9rem",
//       backgroundColor: "#f9f9f9",
//     },
//     rowOdd: {
//       backgroundColor: "#f2f2f2",
//     },
//     rowEven: {
//       backgroundColor: "#ffffff",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>User Data</h2>
//       {data?.length &&
//         <table style={styles.table}>
//         <thead>
//           <tr>
//             {data[0]?.map((header, index) => (
//               <th style={styles.th} key={index}>
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.slice(1).map((row, rowIndex) => (
//             <tr
//               key={rowIndex}
//               style={rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd}
//             >
//               {row.map((cell, cellIndex) => (
//                 <td style={styles.td} key={cellIndex}>
//                   {cell}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       }
//     </div>
//   );
// };

// export default User;







import React, { useState, useEffect } from "react";
import { getUsers } from "./data";
import { utils, writeFile } from "xlsx";

const User = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from dataStore
    const users = getUsers();
    console.log(users);
    if (users.length > 0) {
      // Convert data to table format
      const tableData = [["Name", "Email", "Timestamp"], ...users.map((user) => [user.name, user.email, user.timestamp])];
      setData(tableData);
    }
  }, []);

  const handleDownload = () => {
    // Convert data to worksheet
    const worksheet = utils.aoa_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Users");

    // Download as Excel file
    writeFile(workbook, "UserData.xlsx");
  };

  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#4CAF50",
    },
    table: {
      margin: "0 auto",
      borderCollapse: "collapse",
      width: "80%",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px",
      fontSize: "1rem",
      textAlign: "left",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      textAlign: "left",
      border: "1px solid #ddd",
      fontSize: "0.9rem",
      backgroundColor: "#f9f9f9",
    },
    rowOdd: {
      backgroundColor: "#f2f2f2",
    },
    rowEven: {
      backgroundColor: "#ffffff",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Data</h2>
      {data.length > 1 && (
        <table style={styles.table}>
          <thead>
            <tr>
              {data[0]?.map((header, index) => (
                <th style={styles.th} key={index}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                {row.map((cell, cellIndex) => (
                  <td style={styles.td} key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button style={styles.button} onClick={handleDownload}>
        Download as Excel
      </button>
    </div>
  );
};

export default User;
