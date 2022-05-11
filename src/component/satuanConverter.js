import React from "react";

//https://griyamania.com/678/cara-menghitung-kubikasi-kayu/ patokan rumus utk kaso dan papan dari kubik ke batang

function konversi(arrayBarang){
    const result = []
    for(let i = 0; i < arrayBarang.length; i++){ //nanti bikinnya di function konversi biar gk keliatan ribet
        if(arrayBarang[i].namabarang === "Papan 2/20. P 4mtr"){
            /*if(arrayBarang[i].keterangan === ""){
                arrayBarang[i].keterangan = "konversi dari " + arrayBarang[i].satuan + " ke lbr = x62"
            }*/
            arrayBarang[i].quantity = arrayBarang[i].quantity * 62;
            arrayBarang[i].satuan = "lbr";
        }
        if(arrayBarang[i].namabarang === "Kaso Borneo 4/6. P 4mtr"){
            arrayBarang[i].quantity = arrayBarang[i].quantity * 104;
            arrayBarang[i].satuan = "btg";
        }
        if(arrayBarang[i].namabarang === "Kaso Borneo 5/7. P 4mtr"){
          
            arrayBarang[i].quantity = arrayBarang[i].quantity * 71;
            arrayBarang[i].satuan = "btg";
        } 
        if(arrayBarang[i].namabarang === "Karpet Talang; 0.9x60 m"){
          
            arrayBarang[i].quantity = arrayBarang[i].quantity * 50;
            arrayBarang[i].satuan = "m1";
        }
        if(arrayBarang[i].namabarang === "Paku 7 (23kg)" || "Paku 5 (23kg)" || "Paku 10 (23kg)"){
            arrayBarang[i].quantity = arrayBarang[i].quantity * 23;
            arrayBarang[i].satuan = "kg";
        }
        if(arrayBarang[i].namabarang === "Paku 7 (25kg)" || "Paku 5 (25kg)" || "Paku 10 (25kg)"){
            arrayBarang[i].quantity = arrayBarang[i].quantity * 25;
            arrayBarang[i].satuan = "kg";
        }
        result.push(arrayBarang[i])
    }

    return result
};

export default konversi