import React, { useEffect, useState } from "react";
import "../../App.css";
import { Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { checkMasterBarang, createBarang, getAllMasterBarang, getAllSatuan, getRole, getSelectedProyek, updateMasterBarang } from "../../repository";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";
import Navbar from "../Menu/navbar";

function MasterBarangPage(){
    
    const [modal, setModal] = useState(false);
    const proyek = getSelectedProyek();
    const navigate = useNavigate();
    const initialState = {
        //kodebarang:"",
        namabarang: "",
        category: "", 
        subCategory: "",
        type: "",
        merk: "",  
        satuan: "",
        ukuran: "",
        proyek: ""
    }
    const [inputs, setInputs] = useState(initialState);
    const resetInput = () => setInputs(initialState);
    const showModal = () => {
        setModal(!modal)
        setInputs(initialState)
    };
    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    };

    const masukinBarang = async (event) => {
        event.preventDefault();
        const check = await checkMasterBarang(inputs.namabarang);
        if(check !== null){
            window.alert("item already exist");
        }else{
            if(window.confirm(
                "confirm adding: " + 
                "\n namabarang: " + inputs.namabarang +
                "\n category: " + inputs.category + 
                "\n sub category: " + inputs.subCategory + 
                "\n type: " + inputs.type +
                "\n merk: " + inputs.merk +
                "\n satuan: " + inputs.satuan +
                "\n ukuran: " + inputs.ukuran) === true){
                    await createBarang(inputs);
                    window.alert("item added");
                    showModal();
                    //navigate("/Master_Barang");  
                    window.location.reload();
            }
        }

        
    }

    const [rows, setRows] = useState([]);
    
    useEffect(() => {
        async function getMasterBarangAPI(){
            const data = await getAllMasterBarang()
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    namabarang: barang.namabarang,
                    category: barang.category, 
                    subCategory: barang.subCategory,
                    type: barang.type,
                    merk: barang.merk,  
                    satuan: barang.satuan,
                    ukuran: barang.ukuran,
                }
                rowsData.push(newBarang);
            }
            setRows(rowsData);
        }
        getMasterBarangAPI();
    }, [])

    const columns = [
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: 'category',
            text: 'Category',
            filter: textFilter(),
            sort: true
        }, 
        {
            dataField: 'subCategory',
            text: 'Sub Category',
            sort: true
        },
        {
            dataField: 'merk',
            text: 'Merk',
            sort: true
        },
        {
            dataField: 'type',
            text: 'Type',
            sort: true
    
        },
        {
            dataField: 'satuan',
            text: 'Satuan',
            sort: true
        },
        {
            dataField: 'ukuran',
            text: 'Ukuran',
            sort: true
        }];

    const showNotif = () => {
        window.alert("your account have no permision to access this feature");
    }

    const checkRole = () => {
        if(getRole() === "ADMIN" || getRole() === "PURCHASING"){
            return true;
        }else{
            return false;
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
            console.log(update);
            updating();
        }
    }

    const alterBarang = (event) => {
        event.preventDefault();
        if(window.confirm(
            "confirm update: " + update.namabarang +
                "\n category: " + update.category + 
                "\n sub category: " + update.subCategory + 
                "\n type: " + update.type +
                "\n merk: " + update.merk +
                "\n satuan: " + update.satuan +
                "\n ukuran: " + update.ukuran) === true){
                updateMasterBarang(update);
                window.alert('master barang updated');
                updating();
                window.location.reload();
            }
        
    }

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


    return(
        <>  
          <Navbar />
            <h2 text-align="center">Master Barang</h2>
            <br/>
            {checkRole() === true ?
            <>
            <h4>double click to update</h4>
            <BootstrapTable
            keyField='namabarang' data={ rows } columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover 
            rowEvents={rowEvent}/>
            
            <div className="forButton">
                <BsIcons.BsFillPlusCircleFill className="addButton" size={50} onClick={showModal}/>
            </div>
            </>
            :
            <>
            <BootstrapTable
            keyField='namabarang' data={ rows } columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover />
            </>
            }
            <Modal
                show={updateModal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Update Barang {update.namabarang}</Modal.Title>
                    <CloseButton onClick={updating}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={alterBarang}>
                        <h4>Category:</h4>
                        <input type="text" class="form-control" name="category" value={update.category} onChange={handleUpdateChange} required></input>
                        <h4>Sub Category:</h4>
                        <input type="text" class="form-control" name="subCategory" value={update.subCategory} onChange={handleUpdateChange}></input>
                        <h4>Merk:</h4>
                        <input type="text" class="form-control" name="merk" value={update.merk} onChange={handleUpdateChange}></input>
                        <h4>Type:</h4>
                        <input type="text" class="form-control" name="type" value={update.type} onChange={handleUpdateChange}></input>
                        <h4>Satuan:</h4>
                        <input type="text" class="form-control" list="satuan" name="satuan" value={update.satuan} 
                        onChange={handleUpdateChange} required autoComplete="off" placeholder="wajib isi"></input>
                        <datalist id="satuan" name="satuan">
                            {satuan.map((item, index) => 
                                <option key={index} value={item.satuan}></option>
                            )}
                        </datalist> 
                        <h4>Ukuran:</h4>
                        <input type="text" class="form-control" name="ukuran" value={update.ukuran} onChange={handleUpdateChange} required></input>
                        <button type="submit" hidden></button>
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
            <Modal
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Master Barang</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={masukinBarang}>
                        <h4>Nama barang:</h4>
                        <input type="text" name="namabarang" class="form-control" value={inputs.namabarang} onChange={handleInputChange} autoComplete="off" required></input>
                        <h4>Category:</h4>
                        <input type="text" name="category" class="form-control" value={inputs.category} onChange={handleInputChange} required></input>
                        <h4>Sub Category:</h4>
                        <input type="text" name="subCategory" class="form-control" value={inputs.subCategory} onChange={handleInputChange}></input>
                        <h4>Merk:</h4>
                        <input type="text" name="merk" class="form-control" value={inputs.merk} onChange={handleInputChange}></input>
                        <h4>Type:</h4>
                        <input type="text" name="type" class="form-control" value={inputs.type} onChange={handleInputChange}></input>
                        <h4>Satuan:</h4>
                        <input type="text" class="form-control" list="satuan" name="satuan" value={inputs.satuan} 
                        onChange={handleInputChange} required autoComplete="off" placeholder="wajib isi"></input>
                        <datalist id="satuan" name="satuan">
                            {satuan.map((item, index) => 
                                <option key={index} value={item.satuan}></option>
                            )}
                        </datalist> 
                        <h4>Ukuran:</h4>
                        <input type="text" name="ukuran" class="form-control" value={inputs.ukuran} onChange={handleInputChange} required></input>
                        <button type="submit" hidden></button>
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

export default MasterBarangPage;
