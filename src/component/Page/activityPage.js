import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { dateFilter, numberFilter, textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Navbar from "../Menu/navbar";
import "../../App.css";
import { getAllActivity, getSelectedProyek, seeAllActivity } from "../../repository";

function ActivityPage(){

    const [data, setData] = useState([]);
    const proyek = getSelectedProyek();
    useEffect(() => {
        async function getActivityAPI(){
            const data = await seeAllActivity();
            let rowsData = []
            for (const barang of data){
                const newBarang = {
                    username: barang.username,
                    action: barang.action,
                    tgl: barang.tgl,
                    proyek: barang.proyek
                }
               
                if(newBarang.proyek === proyek){
                    rowsData.push(newBarang);
                }
            }
            setData(rowsData);
        }
        getActivityAPI();
    }, [])

  

    const columns = [
        {
            dataField: 'username',
            text: 'nama',
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: 'action',
            text: 'Activity',
            sort: true
        }, 
        {
            dataField: 'tgl',
            Text: 'Tanggal',
            sort: true,
            filter: dateFilter()
        }   
    ];

    return(
        <>
        <Navbar />
        <h2 text-align="center">Activity</h2>
        <br/>
        <BootstrapTable 
            keyField='username' data={data} columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
        </>
    );
}

export default ActivityPage;