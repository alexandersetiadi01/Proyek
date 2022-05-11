import React, {useState, useEffect, Fragment} from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { addBarangKeluar, getAllBarangKeluar, getAllBarangMasuk,
    findInventoryVPCA, findInventoryKKC, newInventory, inventoryKeluar, 
    addActivityKeluar, getUserName, getSelectedProyek, seeAllProyek, getAllSatuan, findInventoryGS, findInventoryGL, findInventoryGC, findInventorySLA16, findInventoryKCN, findInventory } from "../../repository";

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";
import Navbar from "../Menu/navbar";

function BarangKeluarPage(){
    const user = getUserName();
    const proyek = getSelectedProyek()
    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const initialState = {
        //kodebarang:"",
        namabarang: "",
        kodeKeluar: "", 
        namaPengambil: "",
        quantity: 0,
        progress: "",  
        tgl: datePickerIconst,
        proyek: proyek,
        username: user.username,
        keterangan: '',
        tujuan: '',
        satuan: ''
    }

    //max-min input date
    const day = new Date();
    var mintgl = day.getDate() - 3;
    var year = day.getFullYear();
    var month = day.getMonth();
    if(month < 10){month = "0" + month}
    let minDate = year + '-' + month + '-' + mintgl;
    

    const [inputs, setInputs] = useState(initialState);
    const showModal = () => {
        setModal(!modal);
        setInputs(initialState);
    };
    const resetInput = () => setInputs(initialState);
    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const keluarinBarang = async (event) => {
        event.preventDefault();
        const check = await findInventory(inputs.namabarang, inputs.proyek);
        console.log(check);
        if(check.quantity >= inputs.quantity){
            if(window.confirm(
                "confirm adding: " + 
                "\n namabarang: " + inputs.namabarang +
                "\n nama pengambil: " + inputs.namaPengambil +
                "\n quantity: " + inputs.quantity +
                "\n tgl: " + inputs.tgl + 
                "\n keterangan: " + inputs.keterangan + 
                "\n tujuan: " + inputs.tujuan) === true){
                    
                    await addBarangKeluar(inputs);
                    window.alert("berhasil menambah item sebagai barang keluar");
                    //addHistory(inputs);
                    inventoryKeluar(inputs);
                    addActivityKeluar(inputs)
                    showModal();
                    window.location.reload();
                    
            }
        }
        if(check.quantity < inputs.quantity){
            window.alert("jumlah barang di inventory tidak cukup")
        }
        
        /*
        if(proyek === "KANTOR KELURAHAN CILENGGANG"){
            const checkKKC = await findInventoryKKC(inputs.namabarang);
            if(checkKKC.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                        
                }
            }if(checkKKC.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup")
            }
        }
        if(proyek === "VANYA PARK CLUSTER AZURA"){
            const checkVPCA = await findInventoryVPCA(inputs.namabarang);
            if(checkVPCA.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                }
            } 
            if(checkVPCA.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup");
            }
        }
        if(proyek === "GATE CLUSTER"){
            console.log("gate cluster barang keluar")
            
            const checkGC = await findInventoryGC(inputs.namabarang);
            if(checkGC.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                }
            } 
            if(checkGC.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup");
            }
        }
        if(proyek === "GUDANG SERPONG"){
            const checkGS = await findInventoryGS(inputs.namabarang);
            if(checkGS.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                }
            } 
            if(checkGS.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup");
            }
        }
        if(proyek === "GUDANG LENGKONG"){
            const checkGL = await findInventoryGL(inputs.namabarang);
            console.log(checkGL.quantity)

            if(checkGL.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                }
            } 
            if(checkGL.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup");
            }
        }
        if(proyek === "KANAPARK CLUSTER NOBU"){
            const checkKCN = await findInventoryKCN(inputs.namabarang);
            if(checkKCN.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                }
            } 
            if(checkKCN.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup");
            }
        }if(proyek === "SERPONG LAGOON A16"){
            const checkSLA16 = await findInventorySLA16(inputs.namabarang);
            if(checkSLA16.quantity >= inputs.quantity){
                if(window.confirm(
                    "confirm adding: " + 
                    "\n namabarang: " + inputs.namabarang +
                    "\n nama pengambil: " + inputs.namaPengambil +
                    "\n quantity: " + inputs.quantity +
                    "\n tgl: " + inputs.tgl + 
                    "\n keterangan: " + inputs.keterangan + 
                    "\n tujuan: " + inputs.tujuan) === true){
                        
                        await addBarangKeluar(inputs);
                        window.alert("berhasil menambah item sebagai barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                }
            } 
            if(checkSLA16.quantity < inputs.quantity){
                window.alert("jumlah barang di inventory tidak cukup");
            }
        }
        //const check = await findInventory(inputs.namabarang); */
    }

    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        event.preventDefault();
        setSearch({...search, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        async function getAllBarangKeluarAPI(){
            const data = await getAllBarangKeluar()
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    namabarang: barang.namabarang,
                    kodeKeluar: barang.kodeKeluar, 
                    namaPengambil: barang.namaPengambil,
                    quantity: barang.quantity,
                    tgl: barang.tgl,
                    proyek: barang.proyek,
                    keterangan: barang.keterangan,
                    tujuan: barang.tujuan,
                    satuan: barang.satuan
                }
                if(newBarang.proyek === proyek){
                    rowsData.push(newBarang);
                }
                
            }
            setRows(rowsData);
        }
        getAllBarangKeluarAPI();
    }, [])

    //data master barang 
    const [options, setOption] = useState([]);

    useEffect(() => {
        async function getNamaBarangMasukAPI(){
            const data = await getAllBarangMasuk();
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
        getNamaBarangMasukAPI();
    }, [])

    const [tujuanProyek, setTujuanProyek] = useState([]);
    useEffect(() => {
        async function getProyekAPI(){
            const datas = await seeAllProyek()
            let rowsData = []
            for (const data of datas){
                const newData = {
                    namaProyek: data.namaProyek,
                   
                }
                rowsData.push(newData);
            }
            setTujuanProyek(rowsData);
        }
        getProyekAPI();
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
    
    const columns = [
        {
            dataField: 'kodeKeluar',
            text: 'Kode Keluar',
            sort: true
        }, 
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            filter: textFilter(),
            sort: true
        }, 
        {
            dataField: 'namaPengambil',
            text: 'Nama Pengambil',
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
            dataField: 'tgl',
            text: 'Tgl',
            filter: dateFilter(),
            sort: true
        },
        {
            dataField: 'keterangan',
            text: 'Keterangan',
        },
        {
            dataField: 'tujuan',
            text: 'Tujuan'
        }];
    const [pindah, setPindah] = useState(false);
    
    const pindahBarang = () => {
        setPindah(!pindah);
    }

    return(
        <>
        <Navbar />
        <h2 text-align="center">Barang Keluar</h2>
         {/*
            <div className="searchGroup">
                <input onChange={handleSearch} placeholder="masukan nama barang"></input>
                <Button>search</Button>
            </div> 
            */}
        <br/>
        <BootstrapTable keyField='kodekeluar' data={ rows } columns={ columns } 
        filter={ filterFactory() } pagination={paginationFactory()} 
        /*selectRow={{
            mode: "checkbox",
            clickToSelect: true,
            bgColor: "red"
        }}*/
        striped hover/>
        <div>
            <BsIcons.BsFillPlusCircleFill className="addButton" size={50} onClick={showModal}/>
        </div>  
        
            <Modal 
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Keluar Barang</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={keluarinBarang}>
                            
                            <h4>Nama Barang:</h4>
                            <input type="text" class="form-control" list="namabarang" name="namabarang" value={inputs.namabarang} onChange={handleInputChange} required autoComplete="off"></input>
                            <datalist id="namabarang" name="namabarang">
                                {options.map((item, index) => 
                                    <option key={index}>{item.namabarang}</option>
                                )}
                            </datalist>
                            <div className="twoside">
                        <h4>Quantity:</h4>
                        <input type="number" step="any" class="form-control" name="quantity" value={inputs.quantity } 
                        onChange={handleInputChange} min="1" placeholder="wajib isi" required/>
                        </div>
                        <div className="twoside">
                        <h4>Satuan:</h4>
                        <input type="text" class="form-control" list="satuan" name="satuan" value={inputs.satuan} 
                        onChange={handleInputChange} required autoComplete="off" placeholder="wajib isi"></input>
                        <datalist id="satuan" name="satuan">
                            {satuan.map((item, index) => 
                                <option key={index} value={item.satuan}></option>
                            )}
                        </datalist>      
                        </div>
                            <h4>Nama Pengambil:</h4>
                            <input type="text" class="form-control" name="namaPengambil" value={inputs.namaPengambil} onChange={handleInputChange} required></input>
                            {/*<h4>Progress:</h4>
                            <input type="number" name="progress" value={inputs.progress} onChange={handleInputChange} min="0" max={inputs.quantity}></input>
                                */}
                            <h4>Tanggal:</h4>
                            <input type="date" class="form-control" name="tgl" value={inputs.tgl} onChange={handleInputChange}
                             min={minDate} max={datePickerIconst} required></input>
                            <br/>
                            <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" onClick={pindahBarang}></input>
                            <label class="form-check-label" for="flexCheckChecked">
                                pindah proyek
                            </label>
                            </div>
                            { pindah ?
                            <>
                            <h4>Keterangan:</h4>
                            <input type="text" class="form-control" name="keterangan" value={inputs.keterangan} onChange={handleInputChange} 
                            autoComplete='off' required/>
                            <h4>Proyek Tujuan:</h4>
                            <select className="pilihProyek" class="form-control" name="tujuan" value={inputs.tujuan} onChange={handleInputChange} required>
                                <option value='' disabled>pilih proyek</option>
                                {tujuanProyek.map((item) => 
                                    <option value={item.namaProyek}>{item.namaProyek}</option>
                                )}
                            </select>
                            </>
                            :
                            <>
                            <h4>Keterangan:</h4>
                            <input type="text" class="form-control" name="keterangan" value={inputs.keterangan} onChange={handleInputChange} autoComplete='off' />
                            </>
                            }
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

export default BarangKeluarPage;