import React from "react";
import { Table } from "react-bootstrap";

function BarangSisa(){
    return(
        <>
        <h2 text-align="center">Barang Sisa</h2>
        <br/>
        <div className="TableContent">
            
           <Table bordered>
               <thead>
                   <tr>
                       <th>Kode Barang</th>
                       <th>Nama Barang</th>
                       <th>Quantity</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>0501010101</td>
                       <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                       <td>0</td>
                   </tr>
               </tbody>
           </Table>
        </div>
        </>
    );
}

export default BarangSisa;