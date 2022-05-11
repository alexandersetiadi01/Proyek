import React, { useEffect, useState } from "react";
import "../../App.css";
import { Table, Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { addPurchasing, seeAllPurchasing, getAllMasterBarang, getRole, getSelectedProyek, 
    getAllSupplier, getKodePO, addOutstanding, addActivityPurchasing, getUserName, getAllSatuan } from "../../repository";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Menu/navbar";

function PurchasingPage(){

    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    const location = useLocation();
    const user = getUserName();
    const proyek = getSelectedProyek()
    const [suppliers, setSuppliers] = useState([]);
    const initialState = {
        kodePO: "",
        namabarang: "",
        harga: 0,
        quantity: 0,
        supplier: "",
        tgl: datePickerIconst,
        totalHarga: 0,
        satuan: "",
        proyek: proyek,
        username: user.username
    }

    const [modal, setModal] = useState(false);
    const showModal = () => {
        setModal(!modal);
    };

    //max-min input date
    const day = new Date();
    var mintgl = day.getDate() - 3;
    var year = day.getFullYear();
    var month = day.getMonth() + 1;
    if(month < 10){month = "0" + month}
    let minDate = year + '-' + month + '-' + mintgl;

    const [inputs, setInputs] = useState(initialState);

    const handleInputChange = async (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});   
       // const supplier = await selectSupplier(inputs.supplier);
       // console.log('code: ' + supplier.code)
        
    };
    const resetInput = () => {
        setInputs(initialState);
        setArrayBarang([]);
    };

    const [arrayBarang, setArrayBarang] = useState([]);
    let addArrayBarang = () => {
        setArrayBarang([...arrayBarang, {
            kodePO: inputs.kodePO,
            namabarang: "", 
            quantity: 0, 
            harga: 0, 
            supplier: inputs.supplier,
            tgl: inputs.tgl,
            totalHarga: 0,
            username: inputs.username,
            proyek: inputs.proyek,
            satuan: ""
        }])
    }
  
    let handleArrayBarang = (i, e) => {
        let newArrayBarang = [...arrayBarang];
        newArrayBarang[i][e.target.name] = e.target.value;
        newArrayBarang[i].totalHarga = newArrayBarang[i].quantity * newArrayBarang[i].harga
        setArrayBarang(newArrayBarang);
        console.log(arrayBarang[i]);
     }

    const purchase = async(event) =>{
        event.preventDefault();
        if(window.confirm(
            "confirm adding: " + 
            "\n namabarang: " + inputs.namabarang +
            "\n kode PO: " + inputs.kodePO + 
            "\n harga satuan: " + inputs.harga +
            "\n quantity: " + inputs.quantity + 
            "\n tgl: " + inputs.tgl +
            "\n supplier: " + inputs.supplier) === true){
                addPurchasing(arrayBarang);
                window.alert("purchase added");
                addOutstanding(arrayBarang);
                addActivityPurchasing(inputs);
                showModal();
                window.location.reload();
            }
    }

    const columns = [
        {
            dataField: 'kodePO',
            text: 'No PO',
            sort: true,
        },
        {
            dataField: 'namabarang',
            text: 'Barang',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'quantity',
            text: 'Quantity',
            sort: true,
        },
        {
            dataField: 'satuan',
            text: 'Satuan',
            sort: true,
        },
        {
            dataField: 'harga',
            text: 'Harga',
            sort: true,
        },
        {
            dataField: 'totalHarga',
            text: 'Total Harga',
            sort: true,
        },
        {
            dataField: 'supplier',
            text: 'Supplier',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'tgl',
            text: 'Tanggal',
            sort: true,
            filter: dateFilter()
        }  
    ]

    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getPurchasingAPI(){
            const data = await seeAllPurchasing()
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    kodePO: barang.kodePO,
                    namabarang: barang.namabarang,
                    harga: "Rp. " + barang.harga,
                    quantity: barang.quantity,
                    totalHarga: "Rp. " + barang.totalHarga,
                    supplier: barang.supplier,
                    tgl: barang.tgl,
                    proyek: barang.proyek,
                    satuan: barang.satuan
                }
                if(newBarang.proyek === proyek){
                    rowsData.push(newBarang);
                }
            }
            setRows(rowsData);
        }
        getPurchasingAPI();
    }, [])

    const [satuan, setSatuan] = useState([]);
    useEffect(() => {
        async function getSatuanAPI(){
            const data = await getAllSatuan();
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    satuan: barang.satuan
                }
                rowsData.push(newBarang);
            }
            setSatuan(rowsData);
        }
        getSatuanAPI();
    }, [])

    const [options, setOption] = useState([]);
    useEffect(() => {
        async function getNamaMasterBarang(){
            const data = await getAllMasterBarang();
            let optionData = []
            for (const barang of data){
                const newBarang = {
                    namabarang: barang.namabarang,
                }
                optionData.push(newBarang);
            }
            setOption(optionData);
        }
        getNamaMasterBarang();
    }, [])
    const [PO, setPO] = useState([]);
    useEffect(() => {
        async function getPO(){
            const data = await getKodePO();
            let optionData = []
            for (const barang of data){
                const newBarang = {
                    kodePO: barang.kodePO,
                    proyek: barang.proyek
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
          
            }
            setPO(optionData);
        }
        getPO();
    }, [])

    useEffect(() => {
        async function getSupplierAPI(){
            const data = await getAllSupplier()
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    namaSupplier: barang.namaSupplier,
                    Pic: barang.Pic, 
                    telp: barang.telp,
                    code: barang.code,
                }
                rowsData.push(newBarang);
            }
            setSuppliers(rowsData);
        }
        getSupplierAPI();
    }, [])

    const checkRole = () => {
        if(getRole() === "ADMIN" || getRole() === "PURCHASING"){
            return true;
        }else{
            return false;
        }
    }

    const showNotif = () => {
        window.alert("your account have no permision to access this feature");
    }

    return(
        <>
          <Navbar />
          { checkRole() ?
          <>
            <h2  text-align="center">Purchasing</h2>
            <br></br>
            <BootstrapTable 
            keyField='kodePO' data={ rows } columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
            <div className="addButton">
                <BsIcons.BsFillPlusCircleFill size={50} onClick = {showModal} />
            </div>

            <Modal
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Purchasing</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={purchase}>
                    {/*<div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" name="kodePO" value={inputs.kodePO} onChange={handleInputChange} required></input>
          </div>*/}
                        <h4>supplier:</h4>
                        <select class="form-control" value={inputs.supplier} name="supplier" onChange={handleInputChange} required>
                            <option value="" disabled>pilih supplier</option>
                            {suppliers.map((item, index) => 
                                <option key={index}>{item.namaSupplier}</option>
                            )}
                        </select>
                        <h4>No PO:</h4> 
                        <input type="text" class="form-control" list="kodePO" name="kodePO" value={inputs.kodePO} onChange={handleInputChange} 
                        required autoComplete="off"></input>
                        <datalist id="kodePO" name="kodePO">
                                {PO.map((item, index) => 
                                    <option key={index}>{item.kodePO}</option>
                                )}
                            </datalist>
                            
                        {/*<input type="text" name="supplier" value={inputs.supplier} onChange={handleInputChange} required></input>*/}
                        <h4>Tanggal:</h4>
                            <input type="date" class="form-control" name="tgl" value={inputs.tgl} onChange={handleInputChange} 
                            min={minDate} max={datePickerIconst} required></input>                        
                        { arrayBarang.map((item, index) => (
                        <div key={index}>
                        <h4>Nama Barang</h4>
                        <input type="text" class="form-control" list="namabarang" name="namabarang" value={arrayBarang.namabarang} onChange={e => handleArrayBarang(index, e)} required autoComplete="off"></input>
                            <datalist id="namabarang" name="namabarang">
                                {options.map((item, index) => 
                                    <option key={index}>{item.namabarang}</option>
                                )}
                            </datalist>
                        <div className="twoside">
                        <h4>Quantity:</h4>
                        <input type="number" class="form-control" name="quantity" value={arrayBarang.quantity} onChange={e => handleArrayBarang(index, e)} min="0"></input>
                        </div>
                        <div className="twoside">
                        <h4>Satuan</h4>
                        <input type="text" class="form-control" list="satuan" name="satuan" value={item.satuan} 
                         onChange={e => handleArrayBarang(index, e)} required autoComplete="off" placeholder="wajib isi"></input>
                         <datalist id="satuan" name="satuan">
                             {satuan.map((item, index) => 
                                 <option key={index} value={item.satuan}></option>
                             )}
                         </datalist>  
                        </div>
                        <h4>Harga:</h4>
                        <input type="number" class="form-control" name="harga" value={arrayBarang.harga} onChange={e => handleArrayBarang(index, e)} min="0"></input>
                        </div>
                        ))
                        }
                        <a onClick={addArrayBarang} href="#">tambah barang</a>
                        <br/><br/>
                        <div className="twoside">
                            <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                        </div>
                        <div className="twoside">
                            <Button class="btn btn-primary" type="submit">Add Purchasing</Button>
                        </div>
                    </form>
               </Modal.Body>
               
            </Modal>
            </>
            :
            <div className="content">
                <h2>your account level have no permision to access this feature</h2>
            </div>
            }
        </>
    );
}

export default PurchasingPage;
