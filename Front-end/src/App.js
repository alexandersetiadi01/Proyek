import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BarangKeluarPage from "./component/Page/barangKeluarPage";
import BarangMasukPage from "./component/Page/barangMasukPage";
import InventoryPage from "./component/Page/InventoryPage";
import Navbar from "./component/Menu/navbar";
import HistoryPage from "./component/Page/historyPage";
import BarangSisa from "./component/Page/barangSisaPage";
import MasterBarangPage from "./component/Page/masterBarangPage";
import PurchasingPage from "./component/Page/purchasingPage";
import LoginPage from "./component/Page/loginPage";
import UserPage from "./component/Page/userPage";
import { Button } from "react-bootstrap";
import Layout from "./layout";
//import requireAuth from "./auth/requireAuth";
import { BrowserRouter as Router, Route, Routes, useLocation, Outlet, useNavigate, Navigate, Link } from "react-router-dom";
import './App.css';
import { getLogin, getRole, getUser } from "./repository";
import PrivateRoutes from "./routes";
/*
function LogingIn() {
    const isLogin = false;

    if(isLogin){
      return(
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/Master_Barang" element={<MasterBarangPage/>}></Route>
            <Route path='Barang_Masuk' element ={<BarangMasukPage/>}></Route>
            <Route path="Barang_Keluar" element={<BarangKeluarPage/>}></Route>
            <Route path="Inventory" element={<InventoryPage/>}></Route>
            <Route path="Barang_Sisa" element={<BarangSisa/>}></Route>
            <Route path="History" element={<HistoryPage/>}></Route>
          </Routes>
        </Router>
      );
    };
}
*/
/*
function requireLogin() {
  const user = location.state.user;
  return(
    user !== null ? 
    <Outlet/> : <Navigate to="/Login" from="/Login" state={{from: location}} replace />
  )

}*/
export function UnknownPage(){
  //const navigate = useNavigate();
  //const location = useLocation();
  return(
    <div>
      <Navbar/>
      <h2>page not found</h2>
    </div>
  )
}

function renderPage(){
  if(getRole === "ADMIN"){
    return(
      <Routes>
           
              {/*<Route element={<PrivateRoutes isLoggedIn={account}/>}></Route>*/}
           
              <Route path="/Master_Barang" element={<MasterBarangPage/>}></Route>
              <Route path="/Purchasing" element={<PurchasingPage/>}></Route>
              <Route path='/Barang_Masuk' element ={<BarangMasukPage/>}></Route>
              <Route path="/Barang_Keluar" element={<BarangKeluarPage/>}></Route>
              <Route path="/Inventory" element={<InventoryPage/>}></Route>
              <Route path="/Barang_Sisa" element={<BarangSisa/>}></Route>
              <Route path="/History" element={<HistoryPage/>}></Route>
              <Route path="*" element={<UnknownPage/>}></Route>
            
          </Routes>
    )
  }else{
    return(
      <Routes>
            
              <Route path="/Master_Barang" element={<MasterBarangPage/>}></Route>
              <Route path='/Barang_Masuk' element ={<BarangMasukPage/>}></Route>
              <Route path="/Barang_Keluar" element={<BarangKeluarPage/>}></Route>
              <Route path="/Inventory" element={<InventoryPage/>}></Route>
              <Route path="/Barang_Sisa" element={<BarangSisa/>}></Route>
              <Route path="/History" element={<HistoryPage/>}></Route>
              <Route path="*" element={<UnknownPage/>}></Route>
            
          </Routes>
    )
  }
}

function App() {
  const [account, setAccount] = useState();
  useEffect(() => {
    setAccount(getLogin);
  });
  return(
    <div className="App">
        <Routes>
           
            <Route path="/" element={<LoginPage/>}></Route>
            <Route element={<PrivateRoutes/>}>  
              
            <Route path="/Master_Barang" element={<MasterBarangPage/>}></Route>
              <Route path="/Purchasing" element={<PurchasingPage/>}></Route>
              <Route path='/Barang_Masuk' element ={<BarangMasukPage/>}></Route>
              <Route path="/Barang_Keluar" element={<BarangKeluarPage/>}></Route>
              <Route path="/Inventory" element={<InventoryPage/>}></Route>
              <Route path="/Barang_Sisa" element={<BarangSisa/>}></Route>
              <Route path="/History" element={<HistoryPage/>}></Route>
              <Route path="/User_List" element={<UserPage/>}></Route>
              <Route path="*" element={<UnknownPage/>}></Route>
            </Route>
            
          </Routes>
    </div>
  );
}

export default App;
