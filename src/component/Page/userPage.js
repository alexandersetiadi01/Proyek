import { useEffect, useState } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as BsIcons from "react-icons/bs";
import { getRole, userList } from "../../repository";
import Navbar from "../Menu/navbar";

function UserPage(){
    const initialState = {
        ID: "",
        username: "",
        password: "",
        accountLevel: ""
    }

    const columns = [
        {
            dataField: 'username',
            text: 'User',
            sort: true,
            filter: textFilter()
        }, 
        {
            dataField: 'accountLevel',
            text: 'Role',
            sort: true
    }];

    const [user, setUser] = useState();

    const register = () => {

    }

    const [modal, setModal] = useState(false);
    const showModal = () => {
        setModal(!modal);
    }
    const showNotif = () => {
        window.alert("your account have no permision to access this feature");
    }

    const [rows, setRows] = useState([]);

    useEffect(() => {
        async function getUserAPI(){
            const data = await userList()
            let rowsData = []
            for (const user of data){
                const newUser = {
                    username: user.username,
                    accountLevel: user.accountLevel
                }
                rowsData.push(newUser);
            }
            setRows(rowsData);
        }
        getUserAPI();
    }, [])

    return(
        <>
            <Navbar/>
            <h2>Users</h2>
            <br/>
            <BootstrapTable 
            keyField='ID' data={rows} columns={ columns } 
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
                <Modal.Title id="contained-modal-title-vcenter">Purchasing</Modal.Title>
                    <CloseButton onClick={showModal}/>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={register}>
                    <h4>username:</h4>
                    <input type="text"></input>
                    <h4>ID:</h4>
                    <input type="text"></input>
                    <h4>password:</h4>
                    <input type="text"></input>
                    <h4>accountLevel:</h4>
                    <input type="text"></input>
                    <br/><br/>
                    <Button type="submit">Register</Button>
                </form>
                </Modal.Body>
            
            </Modal>
        
        </>
    )
}

export default UserPage;