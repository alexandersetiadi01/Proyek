import React, { useState, useEffect, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
import * as BsIcons from "react-icons/bs";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { getAllBarangKeluar, getAllBarangMasuk, getSelectedProyek, seeAllOutstanding, seeAllPurchasing } from "../../repository";

function OutstandingPage() {
    const proyek = getSelectedProyek()
    const initialState = {
        namabarang: '',
        ordered: 0,
        outstanding: 0,
        proyek: proyek,
        supplier: '',
        tgl: ''
    }

    const [inputs, setInputs] = useState();    
    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getOutstandingAPI(){
            const data = await seeAllOutstanding();
            let optionData = []
            for (const barang of data){
                const newBarang = {
                    namabarang: barang.namabarang,
                    ordered: barang.ordered,
                    outstanding: barang.outstanding,
                    proyek: barang.proyek,
                    supplier: barang.supplier,
                    tgl: barang.tgl,
                    satuan: barang.satuan
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
            }
            setRows(optionData);
        }
        getOutstandingAPI();
    }, [])

    const columns = [
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            filter: textFilter(),
            sort: true
        },
        {
            dataField: 'supplier',
            text: 'supplier',
            filter: textFilter(),
        },
        {
            dataField: 'outstanding',
            text: 'total outstanding',
        },
        {
            dataField: 'ordered',
            text: 'total order'
            
        },
        {
            dataField: 'satuan',
            text: 'satuan'
            
        },
        {
            dataField: 'tgl',
            text: 'tgl terbaru',
        }/*,
        {
            dataField: 'keterangan',
            text: 'Keterangan'
        }*/];

    const [modal, setModal] = useState();
    const resetInput = () => setInputs(initialState);

    const showModal = () => {
        setModal(!modal);            
        setInputs(initialState);
    };

    const add = () => {
        
    }
    
    return(
        <>
        <Navbar />
        <h2 text-align="center">outstanding</h2>
        <br/>
        <BootstrapTable keyField='kodemasuk' data={rows} columns={ columns } 
        filter={ filterFactory() } pagination={paginationFactory()} 
        striped hover/>     

        {/*<BsIcons.BsFillPlusCircleFill className="addButton" size={50} onClick={showModal}/>*/}
        
        <Modal 
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Outstanding</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>{/*
                <form onSubmit={add}>
                        <h4>Nama Barang:</h4>
                        <input type="text" class="form-control" placeholder="wajib isi" list="namabarang" name="namabarang" 
                        value={inputs.namabarang} onChange={handleInputChange} required autoComplete="off"></input>
                        <datalist id="namabarang" name="namabarang">
                            {options.map((item, index) => 
                                <option key={index}>{item.namabarang}</option>
                            )}
                        </datalist>
                        <h4>Ordered:</h4>
                        <input type="number" class="form-control" name="ordered" value={inputs.quantity} 
                        onChange={handleInputChange} min="0" placeholder="wajib isi"required/>
                        <h4>outstanding:</h4>
                        <input type="number" class="form-control" name="outstanding" value={inputs.outstanding} 
                        onChange={handleInputChange} placeholder="wajib isi" required/>
                        <h4>Keterangan:</h4>
                        <input type="text" class="form-control" name="keterangan" value={inputs.keterangan} 
                        onChange={handleInputChange}/>
                        <br/><br/>
                        <div className="twoside">
                            <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                        </div>
                        <div className="twoside">
                            <Button class="btn btn-primary" type="submit">Add</Button>
                        </div>
                    </form>*/}
                </Modal.Body>
                </Modal>

        </>
    )
}

export default OutstandingPage