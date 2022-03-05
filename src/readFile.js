import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function ReadFile() {
    const[result, setResult] = useState();

    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        console.log(data);
        setResult(data);
        };
        reader.readAsBinaryString(file);
    };

    const handleSUbmit = () => {

    }
    return (
        <div>
            <form onSubmit={handleSUbmit}>
                <input type="file" onChange={onChange} required/>
                <br/>
                <button type="submit">Upload</button>
            </form>     
        </div>
    );
}