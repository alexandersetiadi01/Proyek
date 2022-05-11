import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { numberFilter, textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
import "../../App.css";
import { getAllBarang, getAllBarangKeluar, getAllBarangMasuk, getInventory, getinventory, getinventoryGC, getinventoryGL, getinventoryGS, getinventoryKCN, getinventoryKKC, getinventorySLA16, getinventoryVPCA, getSelectedProyek } from "../../repository";

function InventoryPage(){

    const [stock, setStock] = useState([]);
    const proyek = getSelectedProyek();

    useEffect(() => {
        async function getinventoryAPI(){
            let rowsData = []
            /*
                if(proyek === "VANYA PARK CLUSTER AZURA"){
                    const data = await getinventoryVPCA();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan
                        }            
                        rowsData.push(newBarang);
                    }
                }
                if(proyek === "KANTOR KELURAHAN CILENGGANG"){
                    const data = await getinventoryKKC();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan
                        }            
                        rowsData.push(newBarang);
                    }
                }
                if(proyek === "GUDANG LENGKONG"){
                    const data = await getinventoryGL();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan
                        }            
                        rowsData.push(newBarang);
                    }
                }
                if(proyek === "GUDANG SERPONG"){
                    const data = await getinventoryGS();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan
                        }            
                        rowsData.push(newBarang);
                    }
                }
                if(proyek === "GATE CLUSTER"){
                    const data = await getinventoryGC();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan
                        }            
                        rowsData.push(newBarang);
                    }
                }
                if(proyek === "SERPONG LAGOON A16"){
                    const data = await getinventorySLA16();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan
                        }            
                        rowsData.push(newBarang);
                    }
                }
                if(proyek === "KANAPARK CLUSTER NOBU"){
                    const data = await getinventoryKCN();
                    for (const barang of data){
                        const newBarang = {
                            namabarang: barang.namabarang,
                            quantity: barang.quantity,
                            proyek: barang.proyek,
                            satuan: barang.satuan,
                        }            
                        rowsData.push(newBarang);
                    }
                }
                
               */
            const data = await getInventory();
            for (const barang of data){
                if(barang.proyek === proyek){
                    const newBarang = {
                        namabarang: barang.namabarang,
                        quantity: barang.quantity,
                        proyek: barang.proyek,
                        satuan: barang.satuan
                    }
                           
                    rowsData.push(newBarang);
                }
                
            }
            setStock(rowsData);
            
        }
        getinventoryAPI();
    }, [])

    const columns = [
        {
            dataField: 'namabarang',
            text: 'Nama Barang',
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: 'quantity',
            text: 'Quantity',
            sort: true
        }, 
        {
            dataField: 'satuan',
            text: 'Satuan'
        }, 
        {
            dataField: 'proyek',
            text: 'Proyek',
            sort: true
        }];

    return(
        <>
        <Navbar />
        <h2 text-align="center">Inventory</h2>
        <br/>
        {/* total quantity = barang masuk + barang sisa - barang keluar */}
        <BootstrapTable 
            keyField='kodemasuk' data={stock} columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
        </>
    );
}

export default InventoryPage;