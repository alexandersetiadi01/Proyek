import React, {useState} from "react";
import { Table, Button, CloseButton } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";

function BarangKeluarPage(){
    const [barangKeluar, setBarangKeluar] = useState(false);
    const keluarinBarang = () => setBarangKeluar(!barangKeluar);
    
    return(
        <>
        <h2 text-align="center">Barang Keluar</h2>
        <br/>
            <div className="TableContent">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Kode Barang</th>
                            <th>Nama Barang</th>
                            <th>Quantity</th>
                            <th>Tanggal</th>
                            <th>Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0501010101</td>
                            <td>KERAMIK LANTAI MULIA NEO IVORY</td>
                            <td>0</td>
                            <td>14/2/2022</td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </Table>
                <div className="addButton">
                    <BsIcons.BsFillPlusCircleFill size={100} onClick={keluarinBarang}/>
                </div>
            </div>
            {barangKeluar && 
                <div className="modalBackground">
                    <div className="modalContainer">
                        <CloseButton onClick={keluarinBarang}/>
                        <form>
                            <h2>Barang Keluar</h2>
                            <h4>kode Keluar:</h4>
                            <input type="text" required></input>
                            <h4>nama barang:</h4>
                            <input type="text" required></input>
                            <h4>kode barang:</h4>
                            <input type="text" required></input>
                            <h4>no PO:</h4>
                            <input type="text" required></input>
                            <h4>quantity:</h4>
                            <input type="number" required></input>
                            <h4>Nama Pengambil:</h4>
                            <input type="text" required></input>
                            <h4>tanggal:</h4>
                            <input type="date" required></input>
                            <h4>quantity:</h4>
                            <input type="number" required></input>
                            <br/><br/>
                            <Button type="submit" onClick={keluarinBarang}>submit</Button>
                        </form>
                    </div>
                </div>
            }
            
        
        </>
    );
}

export default BarangKeluarPage;