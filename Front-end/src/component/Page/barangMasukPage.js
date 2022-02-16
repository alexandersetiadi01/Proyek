import React, { useState } from "react";
import "../../App.css";
import { Table, Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";

function BarangMasukPage(){
    const [barangMasuk, setBarangMasuk] = useState(false);
    const masukinBarang = () => setBarangMasuk(!barangMasuk);

    return(
        <>
        <h2 text-align="center">Barang Masuk</h2>
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
                        <tr>
                            <td>0501010101</td>
                            <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                            <td>0</td>
                            <td>9/2/2022</td>
                            <td>14/2/2022</td>
                        </tr>
                        <tr>
                            <td>0501010101</td>
                            <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                            <td>0</td>
                            <td>9/2/2022</td>
                            <td>14/2/2022</td>
                        </tr>
                        <tr>
                            <td>0501010101</td>
                            <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                            <td>0</td>
                            <td>9/2/2022</td>
                            <td>14/2/2022</td>
                        </tr>

                    </tbody>
                </Table>
                <div className="addButton">
                    <BsIcons.BsFillPlusCircleFill size={100} onClick={masukinBarang}/>
                </div>
            </div>
            {barangMasuk && 
                <div className="modalBackground">
                <div className="modalContainer">
                    <CloseButton onClick={masukinBarang}/>
                    <form>
                        <h2>Barang Masuk</h2>
                        <h4>kode masuk:</h4>
                        <input type="text" required></input>
                        <h4>nama barang:</h4>
                        <input type="text" required></input>
                        <h4>kode barang:</h4>
                        <input type="text" required></input>
                        <h4>no PO:</h4>
                        <input type="text" required></input>
                        <h4>quantity:</h4>
                        <input type="number" required></input>
                        <h4>no surat jalan:</h4>
                        <input type="text" required></input>
                        <h4>tanggal:</h4>
                        <input type="date" required></input>
                        <br/><br/>
                        <Button type="submit" onClick={masukinBarang}>submit</Button>
                    </form>
                </div>
            </div>
            }
            
        
        </>
    );
}

export default BarangMasukPage;