import React, {useState, useEffect, Fragment} from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { addBarangKeluar, getAllBarangKeluar, getAllBarangMasuk, addHistory, 
    findInventory, newInventory, inventoryKeluar, addActivityKeluar, getUserName, getSelectedProyek, seeAllProyek } from "../../repository";

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
        tgl: "",
        proyek: proyek,
        username: user.username,
        keterangan: '',
        tujuan: ''
    }
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
        event.preventDefault();
        const check = await findInventory(inputs.namabarang);
        if(check.quantity >= inputs.quantity){
            if(window.confirm(
                "confirm adding: " + 
                "\n namabarang: " + inputs.namabarang +
                "\n kode keluar: " + inputs.kodeKeluar + 
                "\n nama pengambil: " + inputs.namaPengambil +
                "\n quantity: " + inputs.quantity +
                "\n tgl: " + inputs.tgl + 
                "\n keterangan: " + inputs.keterangan + 
                "\n tujuan: " + inputs.tujuan) === true){
                    
                    if(check === null) {
                        console.log("not enough item in inventory");
                        //newInventory(inputs);
                        //window.location.reload();
                    }else{
                        await addBarangKeluar(inputs);
                        window.alert("item added as barang keluar");
                        //addHistory(inputs);
                        inventoryKeluar(inputs);
                        addActivityKeluar(inputs)
                        showModal();
                        window.location.reload();
                    } 
            }
        }else{
            window.alert("jumlah barang di inventory tidak cukup")
        }
        
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
                    tujuan: barang.tujuan
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
        /*{
            dataField: 'progress',
            text: 'Progress',
    
        },*/
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
                            <h4>Quantity:</h4>
                            <input type="number" class="form-control" name="quantity" value={inputs.quantity} onChange={handleInputChange} min="0" required></input>
                            <h4>Nama Pengambil:</h4>
                            <input type="text" class="form-control" name="namaPengambil" value={inputs.namaPengambil} onChange={handleInputChange} required></input>
                            {/*<h4>Progress:</h4>
                            <input type="number" name="progress" value={inputs.progress} onChange={handleInputChange} min="0" max={inputs.quantity}></input>
                                */}
                            <h4>Tanggal:</h4>
                            <input type="date" class="form-control" name="tgl" value={inputs.tgl} onChange={handleInputChange}
                             min={datePickerIconst} max={datePickerIconst} required></input>
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