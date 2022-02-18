import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import { Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import {  addBarangMasuk, getAllBarangMasuk, getAllMasterBarang } from "../../repository";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";

function BarangMasukPage(){

    const datePickerIconst = new Date().toLocaleDateString('en-ca');

    const initialState = {
        //kodebarang:"",
        namabarang: "",
        //kodemasuk: "", 
        kodePO: "",
        namaPenerima: "",
        quantity: "",  
        noSuratJalan: "",
        tgl: ""
    }

    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState(initialState);
    
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        event.preventDefault();
        setSearch({...search, [event.target.name]: event.target.value});
    }

    //data barang masuk
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getBarangMasukAPI(){
            const data = await getAllBarangMasuk();
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    namabarang: barang.namabarang,
                    kodemasuk: barang.kodemasuk, 
                    kodePO: barang.kodePO,
                    noSuratJalan: barang.noSuratJalan,
                    namaPenerima: barang.namaPenerima,
                    quantity: barang.quantity,  
                    tgl: barang.tgl
                }
                rowsData.push(newBarang);
            }
            setRows(rowsData);
        }
        getBarangMasukAPI();
    }, [])

    //data master barang 
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

    const showModal = () => {
        setModal(!modal);
    };
   
    const resetInput = () => setInputs(initialState);
    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const add = async (event) => {
        event.preventDefault();
        if(inputs !== ""){
            await addBarangMasuk(inputs);
            window.alert("item added")
            showModal();
            window.location.reload();
        }
        else{
            window.alert("")
        }
    }

    const columns = [
    {
        dataField: 'kodemasuk',
        text: 'Kode Masuk',
        sort: true
    }, 
    {
        dataField: 'namabarang',
        text: 'Nama Barang',
        filter: textFilter(),
        sort: true
    }, 
    {
        dataField: 'kodePO',
        text: 'Kode PO',
    },
    {
        dataField: 'namaPenerima',
        text: 'Nama Penerima',
        sort: true
    },
    {
        dataField: 'quantity',
        text: 'Quantity',
        sort: true
    },
    {
        dataField: 'noSuratJalan',
        text: 'No Surat Jalan',

    },
    {
        dataField: 'tgl',
        text: 'tgl Masuk',
        filter: dateFilter(),
        sort: true
    }];

    return(
        <>
            <h2 text-align="center">Barang Masuk</h2>
             {/*
            <div className="searchGroup">
                <input onChange={handleSearch} placeholder="masukan nama barang"></input>
                <Button>search</Button>
            </div> 
            */}
            <br/>
            
            <BootstrapTable keyField='kodemasuk' data={ rows } columns={ columns } filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
                    
            <div className="addButton">
                <BsIcons.BsFillPlusCircleFill size={50} onClick={showModal}/>
            </div>  
        
                <Modal 
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Masuk Barang</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={add}>
                        <h4>Nama Barang:</h4>
                        <input type="text" list="namabarang" name="namabarang" value={inputs.namabarang} onChange={handleInputChange} required autoComplete="off"></input>
                        <datalist id="namabarang" name="namabarang">
                            {options.map((item, index) => 
                                <option key={index}>{item.namabarang}</option>
                            )}
                        </datalist>
                        <h4>Nama Penerima:</h4>
                        <input type="text" name="namaPenerima" value={inputs.namaPenerima} onChange={handleInputChange} required/>
                        <h4>No. PO</h4>
                        <input type="text" name="kodePO" value={inputs.kodePO} onChange={handleInputChange} autoComplete="off" required/>
                        <h4>Quantity:</h4>
                        <input type="number" name="quantity" value={inputs.quantity} onChange={handleInputChange} min="0" required/>
                        <h4>No Surat Jalan:</h4>
                        <input type="text" name="noSuratJalan" value={inputs.noSuratJalan} onChange={handleInputChange} required/>
                        <h4>Tanggal Masuk:</h4>
                        <input type="date" name="tgl" value={inputs.tgl} onChange={handleInputChange} max={datePickerIconst} required/>
                        <br/><br/>
                        <div className="twoside">
                            <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                        </div>
                        <div className="twoside">
                            <Button class="btn btn-primary" type="submit">Add</Button>
                        </div>
                    </form>
                </Modal.Body>
                </Modal>
        
        </>
    );
}

export default BarangMasukPage;