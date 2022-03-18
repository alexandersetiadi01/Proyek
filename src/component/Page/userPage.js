import { useEffect, useState } from "react";
import { Button, CloseButton, Modal } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as BsIcons from "react-icons/bs";
import { getRole, register, userList } from "../../repository";
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

    const [user, setUser] = useState(initialState);

    const handleInputChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    };

    const [modal, setModal] = useState(false);
    const showModal = () => {
        setModal(!modal);
    }
    const showNotif = () => {
        window.alert("your account have no permision to access this feature");
    }

    const addUser = async(event) => {
        event.preventDefault();
        register(user);
        window.alert("user added");
        window.location.reload();
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

    const checkRole = () => {
        if(getRole() === "ADMIN"){
            return true;
        }else{
            return false;
        }
    }

    return(
        <>
            <Navbar/>
            {checkRole() ?
            <>
            <h2>Users</h2>
            <br/>
            <BootstrapTable 
            keyField='ID' data={rows} columns={ columns } 
            filter={ filterFactory() } pagination={paginationFactory()} striped hover/>
    
            <div className="addButton">
                <BsIcons.BsFillPlusCircleFill size={50} onClick={showModal}/>
            </div>       
            
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
                <form onSubmit={addUser}>
                    <h4>username:</h4>
                    <input type="text" class="form-control" value={user.username} name="username" onChange={handleInputChange} required></input>
                    <h4>ID:</h4>
                    <input type="text" class="form-control" value={user.ID} name="ID" onChange={handleInputChange}required></input>
                    <h4>password:</h4>
                    <input type="text" class="form-control" value={user.password} name="password" onChange={handleInputChange}required></input>
                    <h4>accountLevel:</h4>
                    <select name="accountLevel" value={user.accountLevel} onChange={handleInputChange} required>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                        <option value="LOGISTIK">LOGISTIK</option>
                        <option value="PURCHASING">PURCHASING</option>
                    </select>
                
                    <br/><br/>
                    <Button type="submit">Register</Button>
                </form>
                </Modal.Body>
            
            </Modal>
            </>
            :
            <div className="content">
                <h2>your account have no permision to access this feature</h2>
            </div>
            }
            
        </>
    )
}

export default UserPage;