import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { seeAllProyek, setSelectedProyek } from "../../repository";
import "../../App.css"

function ProyekPage() {

    const initialState = {
        namaProyek: ""
    }

    const [input, setInput] = useState(initialState);
    const [proyek, setProyek] = useState([]);
    useEffect(() => {
        async function getProyekAPI(){
            const datas = await seeAllProyek()
            let rowsData = []
            for (const data of datas){
                const newData = {
                    namaProyek: data.namaProyek,
                   
                }
                rowsData.push(newData);
            }
            setProyek(rowsData);
        }
        getProyekAPI();
    }, [])

    const handleInputChange = (event) => {
        setInput({...input, [event.target.name]: event.target.value});
    }

    const navigate = useNavigate();

    const selectProyek = (event) => {
        event.preventDefault();
        setSelectedProyek(input.namaProyek);
        navigate("/History");
    }

    const back = () => {
        sessionStorage.clear();
        navigate("/");
    }
   
    return(
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <h2>Pilih Proyek</h2>
                        <form onSubmit={selectProyek}>
                            <select className="pilihProyek" class="form-control" name="namaProyek" value={input.namaProyek} onChange={handleInputChange} required>
                                <option value="" disabled>pilih proyek</option>
                                {proyek.map((item, index) => 
                                    <option value={item.namaProyek}>{item.namaProyek}</option>
                                )}
                            </select>
                            <br/><br/>    
                            <Button onClick={back}>Back</Button>                            
                            <Button type="submit">Confirm</Button>            
                        </form>

                </div>
            </div>
        
        </>
    )
}

export default ProyekPage;