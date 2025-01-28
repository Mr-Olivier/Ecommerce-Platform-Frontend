// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./index.css";
// import LoginForm from "./components/Auth/LoginForm";
// import SignUpForm from "./components/Auth/SignUpForm";
// import Customer from "./components/dashboards/Customer";
// import AdminDashboard from "./components/dashboards/admin";
// import LandingPage from "./pages/LandingPage";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/signup" element={<SignUpForm />} />
//         <Route path="/customer" element={<Customer />} />
//         <Route path="admin" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// src/App.tsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import LandingPage from "./pages";
// import "./styles/index.css";

// function App() {
//   return (
//     <CartProvider>
//       <WishlistProvider>
//         <Router>
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             {/* Add other routes here */}
//           </Routes>
//         </Router>
//       </WishlistProvider>
//     </CartProvider>
//   );
// }

// export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css"; // This should now work

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
