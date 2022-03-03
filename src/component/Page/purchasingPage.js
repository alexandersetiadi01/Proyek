import React, { useEffect, useState } from "react";
import "../../App.css";
import { Table, Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { addPurchasing, seeAllPurchasing, getAllMasterBarang, getRole } from "../../repository";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Menu/navbar";
function PurchasingPage(){

    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    const location = useLocation();
    const initialState = {
        kodePO: "",
        namabarang: "",
        harga: 0,
        quantity: 0,
        supplier: "",
        tgl: "",
        totalHarga: 0,
        proyek: ""
    }

    const [modal, setModal] = useState(false);
    const showModal = () => {
        setModal(!modal);
    };

    const [inputs, setInputs] = useState(initialState);

    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const calculating = inputs.harga * inputs.quantity;

    const resetInput = () => {
        setInputs(initialState);
    };

    const purchase = async(event) =>{
        event.preventDefault();
        addPurchasing(inputs);
        window.alert("purchase added");
        showModal();
        window.location.reload();
    }

    const columns = [
        {
            dataField: 'kodePO',
            text: 'No PO',
            sort: true,
        },
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'quantity',
            text: 'Quantity',
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
            dataField: 'tgl',
            text: 'Tanggal',
            sort: true,
            filter: dateFilter()
        },
        {
            dataField: 'supplier',
            text: 'Supplier',
            sort: true,
            filter: textFilter()
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
                    proyek: barang.proyek
                }
                rowsData.push(newBarang);
            }
            setRows(rowsData);
        }
        getPurchasingAPI();
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

    const checkRole = () => {
        if(getRole() === "ADMIN"){
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
                        <h4>No PO:</h4>
                        <input type="text" name="kodePO" value={inputs.kodePO} onChange={handleInputChange} required></input>
                        <h4>Nama Barang</h4>
                        <input type="text" list="namabarang" name="namabarang" value={inputs.namabarang} onChange={handleInputChange} required autoComplete="off"></input>
                            <datalist id="namabarang" name="namabarang">
                                {options.map((item, index) => 
                                    <option key={index}>{item.namabarang}</option>
                                )}
                            </datalist>
                        <h4>Quantity:</h4>
                        <input type="number" name="quantity" value={inputs.quantity} onChange={handleInputChange} min="0"></input>
                        <h4>Harga:</h4>
                        <input type="number" name="harga" value={inputs.harga} onChange={handleInputChange} min="0"></input>
                        <h4>supplier:</h4>
                        <input type="text" name="supplier" value={inputs.supplier} onChange={handleInputChange} required></input>
                        <h4>Tanggal:</h4>
                            <input type="date" name="tgl" value={inputs.tgl} onChange={handleInputChange} 
                            max={datePickerIconst} required></input>                        
                        <button type="submit" hidden></button>
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
                <h2>your account have no permision to access this feature</h2>
            </div>
            }
        </>
    );
}

export default PurchasingPage;
