import axios from "axios";

//const API_HOST = "http://localhost:8080"; 
const API_HOST = "https://dbsolution.herokuapp.com"

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

//barang masuk
async function addBarangMasuk(barang) {
    const response = await axios.post(API_HOST + "/api/barangMasuk/addBarangMasuk", barang);
  
    return response.data;
}

async function getAllBarangMasuk(){
    const response = await axios.get(API_HOST + "/api/barangMasuk/listBarangMasuk");

    return response.data;
}

async function getBarangMasukPO(namabarang){
    const response = await axios.get(API_HOST + "/api/barangMasuk/getPO", {params:{namabarang}});

    return response.data;
}

//barang sisa
async function addBarangSisa(barang) {
    const response = await axios.post(API_HOST + "/api/barangSisa/addbarangSisa", barang);
  
    return response.data;
}

async function getAllBarangSisa(){
    const response = await axios.get(API_HOST + "/api/barangSisa/listBarangSisa");

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
    const response = await axios.post(API_HOST + "/api/history/addHistory", barang);

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

async function getKodePO(){
    const response = await axios.get(API_HOST + "/api/purchasing/getPO");

    return response.data;
}


async function getInfo(barang){
    const response = await axios.get(API_HOST + "/api/purchasing/getInfo", barang);

    return response.data;
}


//activity
async function getAllActivity(){
    const response = await axios.get(API_HOST + "/api/activity/getActivity");

    return response.data;
}

async function seeAllActivity(){
    const response = await axios.get(API_HOST + "/api/activity");

    return response.data;
}

async function addActivityMasuk(activity){
    const response = await axios.post(API_HOST + "/api/activity/addActivityMasuk", activity);

    return response.data
}

async function addActivityKeluar(activity){
    const response = await axios.post(API_HOST + "/api/activity/addActivityKeluar", activity);

    return response.data
}

async function addActivitySisa(activity){
    const response = await axios.post(API_HOST + "/api/activity/addActivitySisa", activity);

    return response.data
}

//supplier
async function addSupplier(supplier){
    const response = await axios.post(API_HOST + "/api/supplier", supplier);

    return response.data
}


async function getAllSupplier(){
    const response = await axios.get(API_HOST + "/api/supplier");

    return response.data
}

async function selectSupplier(namaSupplier){
    const response = await axios.get(API_HOST + "/api/supplier/select", {params: {namaSupplier}});

    return response.data;
}

//proyek
async function seeAllProyek(){
    const response = await axios.get(API_HOST + "/api/proyek");

    return response.data;
}



//saving data locally
function setSelectedProyek(proyek){
    sessionStorage.setItem("proyek", proyek);
}

function getSelectedProyek(){
    return sessionStorage.getItem("proyek");
}

function setIsLogin(){
    sessionStorage.setItem("user", true);
}

function setLogOut(){
    sessionStorage.clear();
}

function setUserName(username){
    sessionStorage.setItem("username", username );
}

function getUserName() {
    return JSON.parse(sessionStorage.getItem("username"));
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
    addBarangMasuk, getAllBarangMasuk, addBarangSisa,getAllBarangSisa, getBarangMasukPO,
    addBarangKeluar, getAllBarangKeluar,
    getinventory, inventoryKeluar, inventoryMasuk, findInventory, newInventory,
    getHistory, addHistory,
    getUser, register, userList, setUserName, getUserName,
    seeAllPurchasing, addPurchasing, getKodePO, getInfo,
    setIsLogin, getLogin, setLogOut, setRole, getRole,
    getAllActivity, seeAllActivity, addActivityKeluar, addActivityMasuk, addActivitySisa,
    seeAllProyek, setSelectedProyek, getSelectedProyek,
    addSupplier, getAllSupplier, selectSupplier
}  
