import React, { useState, useEffect, Fragment } from "react";
import "../../App.css";
import { Button, CloseButton, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"
import * as BsIcons from "react-icons/bs";
import {  
    addBarangMasuk, getAllBarangMasuk, getAllMasterBarang, 
    addHistory, getKodePO, seeAllPurchasing, inventoryMasuk, 
    findInventory, newInventory, getUserName, addActivityMasuk, getSelectedProyek, getBarangMasukPO, 
    getAllSupplier, getInfo, getAllBarangKeluar, getAllSatuan, getSuratJalan, addBanyakBarangMasuk, selectOutstanding, updateOutstanding, seeAllOutstanding
} from "../../repository";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
//import { getKodePO } from "../../../../back-end/controller/purchasingController";

function BarangMasukPage(){

    const user = getUserName();
    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    
    const navigate = useNavigate();
    const proyek = getSelectedProyek()
    const initialState = {
        //kodebarang:"",
        namabarang: "",
        //kodemasuk: "", 
        //kodePO: [],
        namaPenerima: "",
        quantity: "",  
        noSuratJalan1: "",
        noSuratJalan2: "",
        tgl: datePickerIconst,
        lokasi: "",
        action: "",
        username: user.username,
        proyek: proyek,
        keterangan: "",
        satuan: "",
        supplier: "",
        action: "barang masuk"
    }

    const [inputs, setInputs] = useState(initialState);
    
    const [arrayBarang, setArrayBarang] = useState([]);
    let addArrayBarang = () => {
        setArrayBarang([...arrayBarang, {
            namabarang: "", 
            quantity: "", 
            satuan: "", 
            noSuratJalan: inputs.noSuratJalan1 + inputs.noSuratJalan2,
            namaPenerima: inputs.namaPenerima,
            tgl: inputs.tgl,
            lokasi: inputs.lokasi,
            status: "masuk",
            username: inputs.username,
            keterangan: "",
            proyek: inputs.proyek,
            supplier: inputs.supplier
        }])
    }
    
    let setKodePO = (kodePO) =>{
        setInputs({kodePO: kodePO})
    }

    let resetArrayBarang = () => {
        setArrayBarang([])
    }
    let handleArrayBarang = (i, e) => {
        let newArrayBarang = [...arrayBarang];
        newArrayBarang[i][e.target.name] = e.target.value;
        setArrayBarang(newArrayBarang);
        
        //console.log(arrayBarang[i]);
     }
    let kodePOArrayBarang = (i, kodePO) => {
        arrayBarang[i].kodePO = kodePO;
        //console.log(arrayBarang[i]);
     }

    //max-min input date
    const day = new Date();
    var mintgl = day.getDate() - 3;
    var year = day.getFullYear();
    var month = day.getMonth() + 1;
    if(month < 10){month = "0" + month}
    let minDate = year + '-' + month + '-' + mintgl;
    
    const [modal, setModal] = useState(false);
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
                    noSuratJalan: barang.noSuratJalan,
                    namaPenerima: barang.namaPenerima,
                    quantity: barang.quantity, 
                    satuan: barang.satuan,  
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
        getBarangMasukAPI();
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

    //data master barang 
    const [options, setOption] = useState([]);
    const [barang, setBarang] = useState(inputs.namabarang);
    const[PO, setPO] = useState([]);
    useEffect(() => {
        async function getNamaBarangAPI(){
            let optionData = []
            const data = await seeAllOutstanding();
            for (const barang of data){
                const newBarang = {
                    namabarang: barang.namabarang,
                    proyek: barang.proyek,
                    supplier: barang.supplier
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
                
            }
            const data2 = await getAllBarangKeluar();
            for(const barang of data2){
                const newBarang = {
                    namabarang: barang.namabarang,
                    proyek: barang.tujuan
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
            }
            setOption(optionData);

        }
        getNamaBarangAPI();
    }, [])

   /* const [optNamabarang, setOptNamabarang] = useState();
    useEffect(() => {
        async function getOptNamabarangAPI(){
            let optionData = []
            const data = await seeAllOutstanding();
            for (const barang of data){
                const newBarang = {
                    namabarang: barang.namabarang,
                    proyek: barang.proyek,
                    supplier: barang.supplier
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
                
            }
            setOptNamabarang(optionData);

        }
        getOptNamabarangAPI();
    }, [])*/

    const showModal = () => {
        setModal(!modal);
        setInputs(initialState);
        resetArrayBarang();
    };

    const choosePO = (item) => {
        if(PO === null){
            setPO(item);
        }else{
            setPO('');
        }
        
    }
    
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
   

    const resetInput = () => {
        setInputs(initialState)
        resetArrayBarang();
    };
    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
        
    };
    
    const [adding, setAdding] = useState(true);
    const add = async (event) => {
        event.preventDefault();
    
        if(window.confirm(
            "confirm adding: " + 
            "\n namabarang: " + arrayBarang.namabarang +
            "\n quantity: " + arrayBarang.quantity +
            "\n surat jalan: " + inputs.noSuratJalan1 + inputs.noSuratJalan2 + 
            "\n nama penerima: " + inputs.namaPenerima +
            "\n tgl: " + inputs.tgl +
            "\n lokasi: " + inputs.lokasi + 
            "\n keterangan: " + inputs.keterangan) === true){
                //let noSuratJalan = inputs.noSuratJalan1 + inputs.noSuratJalan2
    
                for(let i = 0; i < arrayBarang.length; i++){ //nanti bikinnya di function konversi biar gk keliatan ribet
                    if(arrayBarang[i].namabarang === "Papan 2/20. P 4mtr"){
                        /*if(arrayBarang[i].keterangan === ""){
                            arrayBarang[i].keterangan = "konversi dari " + arrayBarang[i].satuan + " ke lbr = x62"
                        }*/
                        arrayBarang[i].quantity = arrayBarang[i].quantity * 62;
                        arrayBarang[i].satuan = "lbr";
                    }
                    if(arrayBarang[i].namabarang === "Kaso Borneo 4/6. P 4mtr"){
                        arrayBarang[i].quantity = arrayBarang[i].quantity * 104;
                        arrayBarang[i].satuan = "btg";
                    }
                    if(arrayBarang[i].namabarang === "Kaso Borneo 5/7. P 4mtr"){
                      
                        arrayBarang[i].quantity = arrayBarang[i].quantity * 71;
                        arrayBarang[i].satuan = "btg";
                    } 
                    if(arrayBarang[i].namabarang === "Karpet Talang; 0.9x60 m"){
                      
                        arrayBarang[i].quantity = arrayBarang[i].quantity * 50;
                        arrayBarang[i].satuan = "m1";
                    }
                    /*if(arrayBarang[i].namabarang === "Paku 7 (23kg)" || "Paku 5 (23kg)" || "Paku 10 (23kg)"){
                        arrayBarang[i].quantity = arrayBarang[i].quantity * 23;
                        arrayBarang[i].satuan = "kg";
                    }
                    if(arrayBarang[i].namabarang === "Paku 7 (25kg)" || "Paku 5 (25kg)" || "Paku 10 (25kg)"){
                        arrayBarang[i].quantity = arrayBarang[i].quantity * 25;
                        arrayBarang[i].satuan = "kg";
                    }*/
                }
                
                await addBanyakBarangMasuk(arrayBarang);
                await inventoryMasuk(arrayBarang);
                await updateOutstanding(arrayBarang);
                addActivityMasuk(inputs);
                window.alert("item added as barang masuk");
                window.location.reload();
            }
        //showKonfirmasi();
        //navigate("/Barang_Masuk");   
        
         
    }
        
    const columns = 
        /*return */[
        {
            dataField: 'kodemasuk',
            text: 'Kode Masuk',
            sort: true
        }, 
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            filter: textFilter(),
            sort: true,
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
            dataField: 'satuan',
            text: 'Satuan'
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
        },
        {
            dataField: 'keterangan',
            text: 'Keterangan'
        }];
    
    const defaultSorted = [{
        dataField: 'tgl', // if dataField is not match to any column you defined, it will be ignored.
        order: 'desc' // desc or asc
    }];
/*
    const selectRow = {
        mode: 'checkbox',
        style: {background: 'red'}
    }

    const handleSelect = (row) => {
        setSelected(curr=>({...curr, selected, row}));
    }; */
    const [selected, setSelected] = useState();
    const [selecting, setSelecting] = useState(false);
    const handleClickToSelect = () => setSelecting(!selecting);
    const handleSelect = (event) => {
        event.preventDefault();
        setSelected({...selected, [event.target.name]: event.target.value});
        //console.log(selected);
    }

    const [konfirmasi, setKonfirmasi] = useState(false);

    const showKonfirmasi = () => {
        showModal();
        setKonfirmasi(!konfirmasi);
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

    const [pindah, setPindah] = useState(false);
    
    const pindahBarang = () => {
        setPindah(!pindah);
    }

    return(
        <>
          <Navbar />
            <h2 text-align="center">Barang Masuk</h2>
            <br/>
            
            <BootstrapTable keyField='kodemasuk' data={ rows } columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} 
            defaultSorted
            hover/>
                    
            <div>
                <BsIcons.BsFillPlusCircleFill className="addButton" size={50} onClick={showModal}/>
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
                        <h4>Nama Penerima:</h4>
                        <input type="text" class="form-control" name="namaPenerima" value={inputs.namaPenerima} 
                        onChange={handleInputChange} placeholder="wajib isi" required/>
                        <br/>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onClick={pindahBarang}></input>
                            <label class="form-check-label" for="flexCheckChecked">
                                dari proyek lain
                            </label>
                        </div>

                        { pindah ?
                        <>
                        <h4>Keterangan:</h4>
                        <input type="text" class="form-control" name="keterangan" value={inputs.keterangan} placeholder="wajib isi" onChange={handleInputChange} required/>
                        </>
                        :
                        <>
                         <h4>supplier: </h4> 
                         <input type="text" class="form-control" list="supplier" name="supplier" value={inputs.supplier} 
                         onChange={handleInputChange} required autoComplete="off" placeholder="wajib isi"></input>
                         <datalist id="supplier" name="supplier">
                            {options.map((item, index) => 
                                <option key={index} value={item.supplier}></option>
                                )
                            }
                         </datalist>
                        <h4>No Surat Jalan:</h4>
                        <div className="twoside">
                            <input type="text" class="side" list="noSuratJalan1" name="noSuratJalan1" value={inputs.noSuratJalan1} 
                            onChange={handleInputChange} placeholder="kode supplier" required/>
                            <datalist id="noSuratJalan1" name="noSuratJalan1">
                                {suppliers.map((item, index) => 
                                    <option key={index} value={item.code}>{item.namaSupplier}</option>
                                )}
                            </datalist>
                        </div>
                       
                        <div className="twoside">
                            <input type="text" class="side" list="noSuratJalan2" name="noSuratJalan2" value={inputs.noSuratJalan2} 
                            onChange={handleInputChange} placeholder="nomor surat jalan" required/>
                        </div>
                        </>
                        }
                        <h4>Tanggal Masuk:</h4>
                        <input type="date" class="form-control" name="tgl" value={inputs.tgl} 
                        onChange={handleInputChange} min={minDate} max={datePickerIconst} required/>
                        <h4>Lokasi:</h4>
                        <input type="text" class="form-control" name="lokasi" value={inputs.lokasi} 
                        onChange={handleInputChange} placeholder="wajib isi" required/>
                        { arrayBarang.map((item, index) => (
                            <div key={index}>
                         <h4>Nama Barang {index + 1}: </h4> 
                         <input type="text" class="form-control" list="namabarang" name="namabarang" value={item.namabarang} 
                         onChange={e => handleArrayBarang(index, e)} required autoComplete="off" placeholder="wajib isi"></input>
                         <datalist id="namabarang" name="namabarang">
                            {options.map((item, index) => 
                                <option key={index} value={item.namabarang}></option>
                                )
                            }
                         </datalist>
                         <div className="twoside">
                         <h4>Quantity:</h4>
                         <input type="number" step="any" class="form-control" name="quantity" value={item.quantity } 
                         onChange={e => handleArrayBarang(index, e)} min="1" placeholder="wajib isi" required/>
                         </div>
                         <div className="twoside">
                         <h4>Satuan:</h4>
                         <input type="text" class="form-control" list="satuan" name="satuan" value={item.satuan} 
                         onChange={e => handleArrayBarang(index, e)} required autoComplete="off" placeholder="wajib isi"></input>
                         <datalist id="satuan" name="satuan">
                             {satuan.map((item, index) => 
                                 <option key={index} value={item.satuan}></option>
                             )}
                         </datalist>      
                         </div>
                        <h4>Keterangan Barang {index + 1}:</h4>
                        <input type="text" class="form-control" name="keterangan" value={item.keterangan} onChange={e => handleArrayBarang(index, e)}/>
                        
                         </div>
                        ))
                        }
                        <br/>
                        <a onClick={addArrayBarang} href="#">tambah barang</a>
                        <br/><br/>
                        <div className="twoside">
                            <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                        </div>
                        <div className="twoside">
                            <Button class="btn btn-primary" type="submit">Confirm</Button>
                        </div>
                    </form>
                </Modal.Body>
                </Modal>
        </>
    );
}

export default BarangMasukPage;
