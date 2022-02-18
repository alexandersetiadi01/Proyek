import axios from "axios";

const API_HOST = "http://localhost:8080";

//master barang
async function createBarang(barang) {
    const response = await axios.post(API_HOST + "/api/masterBarang", barang);
  
    return response.data;
}

async function getAllMasterBarang(){
    const response = await axios.get(API_HOST + "/api/masterBarang");

    return response.data;
}

async function getMasterBarangByName(namabarang){
    const response = await axios.get(API_HOST + `/api/masterBarang/search/${namabarang}`);

    return response.data;
}

//barang masuk
async function addBarangMasuk(barang) {
    const response = await axios.post(API_HOST + "/api/barangMasuk", barang);
  
    return response.data;
}

async function getAllBarangMasuk(){
    const response = await axios.get(API_HOST + "/api/barangMasuk");

    return response.data;
}

/*async function getBarangMasukByName(namabarang){
    const response = await axios.get(API_HOST + "/api/barangMasuk/", namabarang);

    return response.data;
}
*/

//barang keluar
async function addBarangKeluar(barang) {
    const response = await axios.post(API_HOST + "/api/barangKeluar", barang);
  
    return response.data;
}

async function getAllBarangKeluar(){
    const response = await axios.get(API_HOST + "/api/barangKeluar");

    return response.data;
}

export{
    createBarang, getAllMasterBarang, getMasterBarangByName,
    addBarangMasuk, getAllBarangMasuk,
    addBarangKeluar, getAllBarangKeluar
}  
