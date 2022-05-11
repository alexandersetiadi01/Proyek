import React, { useState, useEffect, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
import * as BsIcons from "react-icons/bs";
import { Button, CloseButton, Modal } from "react-bootstrap";
import {addActivityAsset, addAsset, findAsset, getSelectedProyek, getUserName, seeAllAsset, updateAsset} from "../../repository";

function AssetPage() {
    const proyek = getSelectedProyek()
    const datePickerIconst = new Date().toLocaleDateString('en-ca');
    const user = getUserName();
    const initialState = {
        asset: '',
        nomor: '',
        entry: '',
        lokasi: '',
        proyek: proyek,
        username: user.username,
        Pic: '',
        keterangan: ''
    }

    const [inputs, setInputs] = useState(initialState);    
    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };
    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getAssetAPI(){
            const data = await seeAllAsset();
            let optionData = []
            for (const barang of data){
                const newBarang = {
                    asset: barang.asset,
                    nomor: barang.nomor,
                    entry: barang.entry,
                    lokasi: barang.lokasi,
                    proyek: barang.proyek, 
                    Pic: barang.Pic,
                    keterangan: barang.keterangan
                }
                if(newBarang.proyek === proyek){
                    optionData.push(newBarang);
                }
            }
            setRows(optionData);
        }
        getAssetAPI();
    }, [])

    const columns = [
        {
            dataField: 'asset',
            text: 'Asset',
            filter: textFilter(),
            sort: true
        },
        {
            dataField: 'nomor',
            text: 'Nomor', 
            filter: textFilter(),
            sort: true
        },
        
        {
            dataField: 'entry',
            text: 'Tgl Entry'
            
        },
        {
            dataField: 'lokasi',
            text: 'lokasi'
        },
        
        {
            dataField: 'Pic',
            text: 'Pic'
            
        },
        {
            dataField: 'keterangan',
            text: 'keterangan'
        }];

    const [modal, setModal] = useState();
    const resetInput = () => setInputs(initialState);

    const showModal = () => {
        setModal(!modal);            
        setInputs(initialState);
    };

    const add = async () => {
        const found = await findAsset(inputs.nomor);
        if(found === null){
            if(window.confirm("confirm adding: " + 
            "\n Nama Asset: " + inputs.asset +
            "\n Nomor: " + inputs.nomor + 
            "\n Tgl Entry: " + inputs.entry+ 
            "\n Lokasi: " + inputs.lokasi + 
            "\n keterangan: " + inputs.keterangan +
            "\n Pic: " + inputs.Pic) === true){
                addAsset(inputs);
                addActivityAsset(inputs);
                showModal();
                window.location.reload();
            }
        }else{
            window.alert('asset already exist');
        }
    }
    
    const [updateModal, setUpdateModal] = useState(false);
    const updating = () => {
        setUpdateModal(!updateModal);
    }
    const [update, setUpdate] = useState(initialState);
    const handleUpdateChange = (event) => {
        setUpdate({...update, [event.target.name]: event.target.value});
        
    }
    const rowEvent = {
        onDoubleClick: (event, row) => {
            setUpdate(row);
            updating();
        }
    }

    const alterAsset = () => {
        
        if(window.confirm(
            "confirm update asset: " + update.asset + "-" + update.nomor +
            "\n Tgl Entry: " + update.entry + 
            "\n Lokasi: " + update.lokasi + 
            "\n keterangan: " + update.keterangan +
            "\n Pic: " + update.Pic) === true){
                updateAsset(update);
                window.alert('asset updated');
                updating();
                window.location.reload();
        }
    }

    return(
        <>
        <Navbar />
        <h2 text-align="center">Asset</h2>
        <br/>
        <h4>double click to update</h4>
        <BootstrapTable keyField='kodemasuk' data={rows} columns={ columns } 
        filter={ filterFactory() } pagination={paginationFactory()} 
        striped hover
        rowEvents={rowEvent}/>     

        <BsIcons.BsFillPlusCircleFill className="addButton" size={50} onClick={showModal}/>
        
        <Modal 
        show={modal}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Add Asset</Modal.Title>
            <CloseButton onClick={showModal}/>
        </Modal.Header>
        <Modal.Body>{
            <form onSubmit={add}>
                <h4>Nama Asset:</h4>     
                <input type="text" class="form-control" placeholder="wajib isi"  name="asset" 
                value={inputs.asset} onChange={handleInputChange} required autoComplete="off"></input>
                <h4>Nomor Asset:</h4>
                <input type="text" class="form-control" name="nomor" value={inputs.nomor} 
                onChange={handleInputChange} min="0" placeholder="wajib isi" autoComplete="off" required/>
                <h4>Tgl Entry:</h4>
                <input type="date" class="form-control" name="entry" max={datePickerIconst} value={inputs.entry} 
                onChange={handleInputChange} placeholder="wajib isi" required/>
                <h4>Lokasi:</h4>
                <input type="text" class="form-control" name="lokasi" value={inputs.lokasi} 
                onChange={handleInputChange} placeholder="wajib isi" required/>
                <h4>PIC:</h4>
                <input type="text" class="form-control" name="Pic" value={inputs.Pic} 
                onChange={handleInputChange} placeholder="wajib isi" required/>
                <h4>Keterangan:</h4>
                <input type="text" class="form-control" name="keterangan" value={inputs.keterangan} 
                onChange={handleInputChange} placeholder="wajib isi" required/>
                <br/><br/>
                <div className="twoside">
                    <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                </div>
                <div className="twoside">
                    <Button class="btn btn-primary" type="submit">Add</Button>
                </div>
            </form>}
        </Modal.Body>
        </Modal>

        <Modal 
        show={updateModal}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Update Asset: {update.asset}-{update.nomor}</Modal.Title>
            <CloseButton onClick={updating}/>
        </Modal.Header>
        <Modal.Body>{
            <form onSubmit={alterAsset}>
                <h4>Tgl Entry:</h4>
                <input type="date" class="form-control" name="entry" max={datePickerIconst} value={update.entry} 
                onChange={handleUpdateChange} placeholder="wajib isi" required/>
                <h4>Lokasi:</h4>
                <input type="text" class="form-control" name="lokasi" value={update.lokasi} 
                onChange={handleUpdateChange} required/>
                <h4>Pic:</h4>
                <input type="text" class="form-control" name="Pic" value={update.Pic} 
                onChange={handleUpdateChange} placeholder="wajib isi" required/>
                <h4>Keterangan:</h4>
                <input type="text" class="form-control" name="keterangan" value={update.keterangan} 
                onChange={handleUpdateChange} placeholder="wajib isi" required/>
                <br/><br/>
                <div className="twoside">
                    <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                </div>
                <div className="twoside">
                    <Button class="btn btn-primary" type="submit">Add</Button>
                </div>
            </form>}
        </Modal.Body>
        </Modal>

        </>
    )
}

export default AssetPage