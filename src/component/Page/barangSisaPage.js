import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import * as BsIcons from "react-icons/bs";
import { getAllBarangSisa, getAllMasterBarang, getAllBarangKeluar, addBarangSisa} from "../../repository";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
 
function BarangSisa(){
    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    const navigate = useNavigate();

    const initialState = {
        //kodebarang:"",
        namabarang: "",
        //kodemasuk: "", 
        kodePO: "",
        namaPenerima: "",
        quantity: "",  
        noSuratJalan: "",
        tgl: "",
        status: "",
        lokasi: ""
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
            text: 'Qty',
            sort: true
        },
        {
            dataField: 'noSuratJalan',
            text: 'No Surat Jalan',
    
        },
        {
            dataField: 'tgl',
            text: 'Tgl',
            filter: dateFilter(),
            sort: true
        },
        {
            dataField: 'lokasi',
            text: 'Lokasi',
            filter: textFilter(),
            sort: true
        }
    ];

    const [modal, setModal] = useState(false);

    const [inputs, setInputs] = useState(initialState);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getBarangSisaAPI(){
            const data = await getAllBarangSisa();
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
                    tgl: barang.tgl,
                    lokasi: barang.lokasi
                }
                rowsData.push(newBarang);
            }
            setRows(rowsData);
        }
        getBarangSisaAPI();
    }, [])
    
    //data master barang 
    const [options, setOption] = useState([]);

    useEffect(() => {
        async function getNamaBarangKeluar(){
            const data = await getAllBarangKeluar();
            let optionData = []
            for (const barang of data){
                const newBarang = {
                    namabarang: barang.namabarang,
                }
                optionData.push(newBarang);
            }
            setOption(optionData);
        }
        getNamaBarangKeluar();
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
            await addBarangSisa(inputs);
            window.alert("item added")
            showModal();
            //navigate("/Barang_Sisa");
            window.location.reload();
        }
        else{
            window.alert("")
        }
    }

    return(
        <>
        <Navbar />
        <h2 text-align="center">Barang Sisa</h2>
        <br/>
        <BootstrapTable keyField='kodemasuk' data={ rows } columns={ columns } 
        filter={ filterFactory() } pagination={paginationFactory()} 
        selectRow={{
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "red"
        }}
        striped hover/>

        <div className="addButton">
                <BsIcons.BsFillPlusCircleFill size={50} onClick={showModal}/>
            </div>  
        
                <Modal 
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Sisa Barang</Modal.Title>
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
                        <h4>Lokasi:</h4>
                        <input type="text" name="lokasi" value={inputs.lokasi} onChange={handleInputChange} required/>
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

export default BarangSisa;