import React, { useEffect, useState } from "react";
import "../../App.css";
import { Table, Button, CloseButton, Modal } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import { checkMasterBarang, createBarang, getAllMasterBarang, getRole } from "../../repository";
import * as XLSX from 'xlsx';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from "react-bootstrap-table2-paginator";
import { useNavigate } from "react-router-dom";
import Navbar from "../Menu/navbar";

function MasterBarangPage(){
    
    const [modal, setModal] = useState(false);
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
        proyek: "",
        totalQTY: 0
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
            await createBarang(inputs);
            window.alert("item added");
            showModal();
            //navigate("/Master_Barang");  
            window.location.reload();
           
        }
        
        /*console.log(checkMasterBarang(inputs));
        await createBarang(inputs);
        window.alert("item added");
        showModal();
        navigate("/Master_Barang");  */
        //window.location.reload();
        
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
            filter: textFilter(),
            sort: true
        },
        {
            dataField: 'merk',
            text: 'Merk',
            filter: textFilter(),
            sort: true
        },
        {
            dataField: 'type',
            text: 'Type',
            filter: textFilter(),
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

    //console.log(getRole());
    
    return(
        <>  
          <Navbar />
            <h2 text-align="center">Master Barang</h2>
            
            <BootstrapTable
            keyField='namabarang' data={ rows } columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
            {getRole() === "ADMIN" ? 
                <div className="addButton">
                    <BsIcons.BsFillPlusCircleFill size={50} onClick={showModal}/>
                </div>
            :
                <div className="addButton">
                    <BsIcons.BsFillPlusCircleFill size={50} onClick={showNotif}/>
                </div>
            }
            
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
                        <input type="text" name="namabarang" value={inputs.namabarang} onChange={handleInputChange} autoComplete="off" required></input>
                        <h4>Category:</h4>
                        <input type="text" name="category" value={inputs.category} onChange={handleInputChange} required></input>
                        <h4>Sub Category:</h4>
                        <input type="text" name="subCategory" value={inputs.subCategory} onChange={handleInputChange}></input>
                        <h4>Merk:</h4>
                        <input type="text" name="merk" value={inputs.merk} onChange={handleInputChange}></input>
                        <h4>Type:</h4>
                        <input type="text" name="type" value={inputs.type} onChange={handleInputChange}></input>
                        <h4>Satuan:</h4>
                        <input type="text" name="satuan" value={inputs.satuan} onChange={handleInputChange} required></input>
                        <h4>Ukuran:</h4>
                        <input type="text" name="ukuran" value={inputs.ukuran} onChange={handleInputChange} required></input>
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
