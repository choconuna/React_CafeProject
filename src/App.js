import './App.css';
import React  from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './component/ui/Header';
import Footer from "./component/ui/Footer";
import LoginPage from "./component/page/LoginPage";
import JoinPage from "./component/page/JoinPage";

function App() {
  
  return (    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
