/** Command-line tool to generate Markov text. */

const {MarkovMachine} = require("./markov")
const fs = require('fs');
const axios = require("axios")
const process = require('process')


const type = process.argv[2]
const path = process.argv[3]

async function urlData(url) {
    let resp;
    try{
        resp = await axios.get(url)
    }catch(err){
        console.log("Error:",err)
        process.exit(1)
    }
    let mm = new MarkovMachine(resp.data)
            mm.makeText()
} 

function makeText(){
    if(type === "file"){
       fs.readFile(path,"utf8",function(err, data){
         if(err){
            console.log(err)
         }else{
            // console.log(data)
            let mm = new MarkovMachine(data)
            mm.makeText()
         }
       })
    }else if(type === "url") {
        urlData(path)
    }
}

makeText()




