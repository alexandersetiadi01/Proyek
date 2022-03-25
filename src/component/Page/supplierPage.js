import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { addSupplier, getAllSupplier, getRole, updateSupplier } from "../../repository";
import Navbar from "../Menu/navbar";
import * as BsIcons from "react-icons/bs";
import { Button, CloseButton, Modal } from "react-bootstrap";

function SupplierPage() {
    const [modal, setModal] = useState(false);
    const [inputs, setInputs] = useState([])

    const initialState = {
        namaSupplier: '',
        Pic: '',
        tlp: '',
        code: ''
    }
    const resetInput = () => setInputs(initialState);
    const showModal = () => {
        setModal(!modal)
        setInputs(initialState)
    };

    const handleInputChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
        
    };

    const columns = [
        {
            dataField: 'namaSupplier',
            text: 'Supplier',
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: 'Pic',
            text: 'Pic',
            filter: textFilter()
        },
        {
            dataField: 'tlp',
            text: 'No. telp'
        },
        {
            dataField: 'code',
            text: 'code'
        }
    ];

    const [rows, setRows] = useState([]);
    useEffect(() => {
        async function getSupplierAPI(){
            const data = await getAllSupplier()
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    namaSupplier: barang.namaSupplier,
                    Pic: barang.Pic, 
                    tlp: barang.tlp,
                    code: barang.code,
                }
                rowsData.push(newBarang);
            }
            setRows(rowsData);
        }
        getSupplierAPI();
    }, [])
    const checkRole = () => {
        if(getRole() === "PURCHASING" || getRole() === "ADMIN"){
            return true;
        }else{
            return false;
        }
    }

    const [update, setUpdate] = useState(initialState);
    const handleUpdateChange = (event) => {
        setUpdate({...update, [event.target.name]: event.target.value});
        
    }
    const [updateModal, setUpdateModal] = useState(false);
    const updating = () => {
        setUpdateModal(!updateModal);
    }
    
    const rowEvent = {
        onDoubleClick: (event, row) => {
            setUpdate(row);
            console.log(update);
            updating();
        }
    }

    const alterSupplier = (event) => {
        event.preventDefault();
        if(window.confirm(
            "confirm update supplier: " + update.namaSupplier + 
            "\n Pic: " + update.Pic + 
            "\n No. telp: " + update.tlp +
            "\n code: " + update.code) === true){
                updateSupplier(update);
                window.alert('supplier updated')
                updating();
                window.location.reload();
            }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(window.confirm(
            "confirm adding: " + 
            "\n Supplier: " + inputs.namaSupplier +
            "\n Pic: " + inputs.Pic + 
            "\n No. telp: " + inputs.tlp +
            "\n code: " + inputs.code) === true){
                addSupplier(inputs);
                window.alert("new supplier added");
                showModal();
                window.location.reload();
            }
    }

    return(
        <>
            <Navbar/>
            <h2>Supplier</h2>
            <br/>            
            {checkRole() === true ?
            <>
            <h4>double click to update</h4>
            <BootstrapTable
            keyField='namabarang' data={rows} columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover 
            rowEvents={rowEvent}/>
            
            <div className="addButton">
                <BsIcons.BsFillPlusCircleFill size={50} onClick={showModal}/>
            </div>
            </>
            :
            <>
            <BootstrapTable
            keyField='namabarang' data={rows} columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
            </>
            }
            <Modal
                show={modal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Add Supplier</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <h4>Supplier:</h4>
                        <input type="text" class="form-control" name="namaSupplier" value={inputs.namaSupplier} onChange={handleInputChange} autoComplete="off" required></input>
                        <h4>Pic:</h4>
                        <input type="text" class="form-control" name="Pic" value={inputs.Pic} onChange={handleInputChange}></input>
                        <h4>No. telp:</h4>
                        <input type="text" class="form-control" name="tlp" value={inputs.tlp} onChange={handleInputChange}
                        placeholder="xxxx-xxxxxxx"></input>
                        <h4>code:</h4>
                        <input type="text" class="form-control" name="code" value={inputs.code} onChange={handleInputChange}></input>
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
                show={updateModal}
                size="lg-down"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">Update Supplier {update.namaSupplier} </Modal.Title>
                    <CloseButton onClick={updating}/>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={alterSupplier}>
                        <h4>Pic:</h4>
                        <input type="text" class="form-control" name="Pic" value={update.Pic} onChange={handleUpdateChange}></input>
                        <h4>No. telp:</h4>
                        <input type="text" class="form-control" name="tlp" value={update.tlp} onChange={handleUpdateChange}
                        placeholder="xxxx-xxxxxxx"></input>
                        <h4>code:</h4>
                        <input type="text" class="form-control" name="code" value={update.code} onChange={handleUpdateChange}></input>
                        
                        <br/><br/>
                        <div className="twoside">
                        <Button class="btn btn-danger" onClick={resetInput}>Reset</Button>
                        </div>
                        <div className="twoside">
                            <Button class="btn btn-primary" type="submit">Edit</Button>
                        </div>
                    </form>
               </Modal.Body>
               
            </Modal>
        </>
    )
}

export default SupplierPage;