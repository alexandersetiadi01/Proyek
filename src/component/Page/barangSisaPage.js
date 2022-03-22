import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import * as BsIcons from "react-icons/bs";
import { getAllBarangSisa, getAllMasterBarang, getAllBarangKeluar, addBarangSisa, 
    findInventory, newInventory, inventoryMasuk, addActivitySisa, addHistory, getUserName, getSelectedProyek, getAllSupplier} from "../../repository";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
 
function BarangSisa(){
    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    const navigate = useNavigate();
    const user = getUserName();
    const proyek = getSelectedProyek();
    const initialState = {
        //kodebarang:"",
        namabarang: "",
        //kodemasuk: "", 
        kodePO: "",
        namaPenerima: "",
        quantity: "",  
        noSuratJalan1: "",
        noSuratJalan2: "",
        tgl: "",
        status: "",
        lokasi: "",
        username: user.username,
        proyek: proyek,
        keterangan: ''
    }

    const columns = [
        {
            dataField: 'kodesisa',
            text: 'Kode Sisa',
            sort: true
        }, 
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            filter: textFilter(),
            sort: true
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
        },
        {
            dataField: 'keterangan',
            text: 'Keterangan'
        }];

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
                    kodesisa: barang.kodeSisa, 
                    kodePO: barang.kodePO,
                    noSuratJalan: barang.noSuratJalan,
                    namaPenerima: barang.namaPenerima,
                    quantity: barang.quantity,  
                    tgl: barang.tgl,
                    lokasi: barang.lokasi,
                    proyek: barang.proyek,
                    keterangan: barang.keterangan
                }
                if(newBarang.proyek === proyek){
                    rowsData.push(newBarang);
                }
                
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
                    proyek: barang.proyek
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
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
        event.preventDefault();
        if(window.confirm(
            "confirm adding: " + 
            "\n namabarang: " + inputs.namabarang +
            "\n nama penerima: " + inputs.namaPenerima +
            "\n quantity: " + inputs.quantity +
            "\n tgl: " + inputs.tgl +
            "\n lokasi: " + inputs.lokasi + 
            "\n keterangan: " + inputs.keterangan) === true){
                 await addBarangSisa(inputs);
                //addHistory(inputs)
                addActivitySisa(inputs)
                const check = await findInventory(inputs.namabarang);
                if(check === null){
                    newInventory(inputs);
                    showModal();
                    window.alert("item added as barang sisa");
                    window.location.reload();
                }else{
                    inventoryMasuk(inputs);
                    window.alert("item added as barang sisa");
                    window.location.reload();
                } 
        }
        
    }

    const [suppliers, setSuppliers] = useState([]);
    
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

    return(
        <>
        <Navbar />
        <h2 text-align="center">Barang Sisa</h2>
        <br/>
        <BootstrapTable keyField='kodemasuk' data={ rows } columns={ columns } 
        filter={ filterFactory() } pagination={paginationFactory()} 
        /*selectRow={{
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "red"
        }}*/
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
                        <input type="text" class="form-control" placeholder="wajib isi" list="namabarang" name="namabarang" 
                        value={inputs.namabarang} onChange={handleInputChange} required autoComplete="off"></input>
                        <datalist id="namabarang" name="namabarang">
                            {options.map((item, index) => 
                                <option key={index}>{item.namabarang}</option>
                            )}
                        </datalist>
                        <h4>Nama Penerima:</h4>
                        <input type="text" class="form-control" name="namaPenerima" value={inputs.namaPenerima} 
                        onChange={handleInputChange} placeholder="wajib isi" required/>
                        <h4>Quantity:</h4>
                        <input type="number" class="form-control" name="quantity" value={inputs.quantity} 
                        onChange={handleInputChange} min="0" placeholder="wajib isi"required/>
                        
                        <h4>Tanggal Masuk:</h4>
                        <input type="date" class="form-control" name="tgl" value={inputs.tgl} onChange={handleInputChange} 
                         min={datePickerIconst} max={datePickerIconst} required/>
                        <h4>Lokasi:</h4>
                        <input type="text" class="form-control" name="lokasi" value={inputs.lokasi} 
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
                    </form>
                </Modal.Body>
                </Modal>
        </>
    );
}

export default BarangSisa;