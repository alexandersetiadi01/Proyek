import React from "react";
import { Table } from "react-bootstrap";
import "../../App.css";

function InventoryPage(){
    return(
        <>
        <h2 text-align="center">Inventory</h2>
        <br/>
        <div className="TableContent">
            
           <Table bordered>
               <thead>
                   <tr>
                       <th>Kode Barang</th>
                       <th>Nama Barang</th>
                       <th>Quantity</th>
                       <th>terakhir masuk</th>
                       <th>terakhir keluar</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>0501010101</td>
                       <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                       <td>0</td>
                       <td>9/2/2022</td>
                       <td>14/2/2022</td>
                   </tr>
               </tbody>
           </Table>
        </div>
        
        </>
    );
}

export default InventoryPage;