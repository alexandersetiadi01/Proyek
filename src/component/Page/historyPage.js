import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { dateFilter, textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getAllBarang, getAllBarangKeluar, getHistory } from "../../repository";
import Navbar from "../Menu/navbar";
function HistoryPage(){

    const [data, setData] = useState([]);

    useEffect(() => {
        async function getHistoryAPI(){
            const dataBarangMasuk = await getAllBarang();
            let rowsData = []
            for (const barang of dataBarangMasuk){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    namabarang: barang.namabarang,
                    kodePO: barang.kodePO,
                    quantity: barang.quantity,  
                    tgl: barang.tgl,
                    lokasi: barang.lokasi,
                    status: barang.status
                }
                rowsData.push(newBarang);
            }
            const dataBarangKeluar = await getAllBarangKeluar();
            for (const barang of dataBarangKeluar){
                const newBarang = {
                    //kodebarang: barang.kodebarang,
                    namabarang: barang.namabarang,
                    kodePO: barang.kodePO,
                    quantity: barang.quantity,  
                    tgl: barang.tgl,
                    lokasi: barang.lokasi,
                    status: barang.status
                }
                rowsData.push(newBarang);
            }
            setData(rowsData);
        }
        getHistoryAPI();
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
            dataField: 'status',
            text: 'Status',
            sort: true,
            filter: textFilter()
        },
        {
            dataField: 'lokasi',
            text: 'Lokasi',
            sort: true,
            filter: textFilter()
        }
    ];
    return(
        <>
          <Navbar />
            <h2>History Barang</h2>
            <br/>
            <BootstrapTable 
                    keyField='kodemasuk' data={data} columns={ columns } 
                    filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
        </>
    );
}

export default HistoryPage;