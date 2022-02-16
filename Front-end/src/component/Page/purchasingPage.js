import React from "react";


function PurchasingPage(){
    return(
        <div>
            <title>Purchasing Page</title>
            <br></br>
            <form>
                <h2>Purchasing</h2>
                <h4>No PO:</h4>
                <input type="text" required></input>
                <h4>nama barang:</h4>
                <input type="text" required></input>
                <h4>harga:</h4>
                <input type="text" required></input>
                <h4>quantity:</h4>
                <input type="text" required></input>
                <h4>total harga:</h4>
                <input type="text" required></input>
                <h4>Supplier:</h4>
                <input type="text" required></input>
                <h4>tanggal:</h4>
                <input type="date" required></input>
                <br/><br/>
                <button type="submit">submit</button>
            </form>
        </div>
    );
}
export default PurchasingPage;
