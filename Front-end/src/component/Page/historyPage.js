import React from "react";
import { Table } from "react-bootstrap";

function HistoryPage(){
    return(
      <>
      <h2>History</h2>
      <br/>
        <div className="TableContent">
           <Table bordered>
               <thead>
                   <tr>
                       <th>Kode Barang</th>
                       <th>Nama Barang</th>
                       <th>Quantity</th>
                       <th>tanggal</th>
                       <th>status</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>0501010101</td>
                       <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                       <td>2</td>
                       <td>9/2/2022</td>
                       <td>masuk</td>
                   </tr>
                   <tr>
                       <td>0501010101</td>
                       <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                       <td>2</td>
                       <td>14/2/2022</td>
                       <td>keluar</td>
                   </tr>
               </tbody>
           </Table>
        </div>
        </>
    );
}

export default HistoryPage;