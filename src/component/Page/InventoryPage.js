import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { numberFilter, textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
import "../../App.css";
import { getAllBarang, getAllBarangKeluar, getAllBarangMasuk, getinventory } from "../../repository";

function InventoryPage(){

    const [stock, setStock] = useState([]);

    useEffect(() => {
        async function getinventoryAPI(){
            const data = await getinventory();
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    namabarang: barang.namabarang,
                    quantity: barang.quantity  
                }
                rowsData.push(newBarang);
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