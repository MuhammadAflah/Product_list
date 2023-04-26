import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function App() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((response) => {
//         console.log(response.data)
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>Name</th>
//           <th>Description</th>
//           <th>Price</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product) => (
//           <tr key={product.id}>
//             <td>{product.id}</td>
//             <td>{product.name}</td>
//             <td>{product.description}</td>
//             <td>{product.price}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default App;


