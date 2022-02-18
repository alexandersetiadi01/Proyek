import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BarangKeluarPage from "./component/Page/barangKeluarPage";
import BarangMasukPage from "./component/Page/barangMasukPage";
import InventoryPage from "./component/Page/InventoryPage";
import Navbar from "./component/Menu/navbar";
import HistoryPage from "./component/Page/historyPage";
import BarangSisa from "./component/Page/barangSisaPage";
import MasterBarangPage from "./component/Page/masterBarangPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

function App() {

  return (
    <div className="App">
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/Master_Barang" element={<MasterBarangPage/>}></Route>
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
