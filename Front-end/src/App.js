import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BarangKeluarPage from "./component/Page/barangKeluarPage";
import BarangMasukPage from "./component/Page/barangMasukPage";
import InventoryPage from "./component/Page/InventoryPage";
import Navbar from "./component/Menu/navbar";
import HistoryPage from "./component/Page/historyPage";
import BarangSisa from "./component/Page/barangSisaPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import './App.css';


function App() {
  return (
    <div className="App">
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/"/>
          <Route path='Barang_Masuk' element ={<BarangMasukPage/>}></Route>
          <Route path="Barang_Keluar" element={<BarangKeluarPage/>}></Route>
          <Route path="Inventory" element={<InventoryPage/>}></Route>
          <Route path="Barang_Sisa" element={<BarangSisa/>}></Route>
          <Route path="History" element={<HistoryPage/>}></Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
