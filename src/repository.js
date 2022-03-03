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


async function checkMasterBarang(namabarang){
    const response = await axios.get(API_HOST + "/api/masterBarang/check", {params:{namabarang}});

    return response.data;
}

async function getMasterBarangByName(namabarang){
    const response = await axios.get(API_HOST + `/api/masterBarang/search/${namabarang}`);

    return response.data;
}

//barang masuk + barang sisa
async function addBarangMasuk(barang) {
    const response = await axios.post(API_HOST + "/api/barangMasuk/addBarangMasuk", barang);
  
    return response.data;
}

async function addBarangSisa(barang) {
    const response = await axios.post(API_HOST + "/api/barangMasuk/addbarangSisa", barang);
  
    return response.data;
}

async function getAllBarangMasuk(){
    const response = await axios.get(API_HOST + "/api/barangMasuk/listBarangMasuk");

    return response.data;
}


async function getAllBarangSisa(){
    const response = await axios.get(API_HOST + "/api/barangMasuk/listBarangSisa");

    return response.data;
}


async function getAllBarang(){
    const response = await axios.get(API_HOST + "/api/barangMasuk/");

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

//inventory

async function getinventory(){
    const response = await axios.get(API_HOST + "/api/inventory/");

    return response.data;
}

async function newInventory(barang){
    const response = await axios.post(API_HOST + "/api/inventory/", barang);

    return response.data;
}

async function findInventory(namabarang){
    const response = await axios.get(API_HOST + "/api/inventory/find", {params:{namabarang}});

    return response.data;
}

async function inventoryMasuk(barang){
    const response = await axios.put(API_HOST + "/api/inventory/inventoryMasuk", barang);

    return response.data;
}

async function inventoryKeluar(barang){
    const response = await axios.put(API_HOST + "/api/inventory/inventoryKeluar", barang);

    return response.data;
}

//history
async function getHistory(){
    const response = await axios.get(API_HOST + "/api/history/list");

    return response.data;
}

async function addHistory(barang){
    const response = await axios.get(API_HOST + "/api/history/addHistory");

    return response.data;
}

//user
async function getUser(ID, password){
    const response = await axios.get(API_HOST + "/api/users/login", {params: {ID, password}});

    return response.data;
}
/*async function getUser(user){
    const response = await axios.get(API_HOST + "/api/user/login", user);

    return response.data;
}*/
async function register(user){
    const response = await axios.post(API_HOST + "/api/users", user);

    return response.data;
}

async function userList(){
    const response = await axios.get(API_HOST + "/api/users");

    return response.data;
}


//purchasing
async function seeAllPurchasing(){
    const response = await axios.get(API_HOST + "/api/purchasing");

    return response.data;
}

async function addPurchasing(barang){
    const response = await axios.post(API_HOST + "/api/purchasing", barang);

    return response.data;
}

async function getKodePO(namabarang){
    const response = await axios.get(API_HOST + "/api/purchasing/KodePO", {params: {namabarang}});

    return response.data;
}

function setIsLogin(){
    sessionStorage.setItem("user", true);
}

function setLogOut(){
    sessionStorage.clear();
}

function getLogin(){
    return sessionStorage.getItem("user");
}

function setRole(role){
    sessionStorage.setItem("role", role);
}

function getRole(){
    return sessionStorage.getItem("role");
}


export{
    createBarang, getAllMasterBarang, getMasterBarangByName, checkMasterBarang,
    addBarangMasuk, getAllBarangMasuk, addBarangSisa,getAllBarangSisa, getAllBarang,
    addBarangKeluar, getAllBarangKeluar,
    getinventory, inventoryKeluar, inventoryMasuk, findInventory, newInventory,
    getHistory, addHistory,
    getUser, register, userList,
    seeAllPurchasing, addPurchasing, getKodePO,
    setIsLogin, getLogin, setLogOut, setRole, getRole
}  
