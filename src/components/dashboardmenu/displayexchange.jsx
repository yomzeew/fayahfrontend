import Countrydata from "/node_modules/flag-icons/country.json"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import currencycode from './jsonfile/currency.json'
import api from "../services/api";
import { useEffect, useState } from "react";
const ExchangeRate=()=>{
    const[data, setdata]=useState([])
    const Fetchdata=async()=>{
        try{
            const response=await api.get('/getallrate')
            const datares=response.data
            setdata(datares)
            console.log(datares)
            console.log(Countrydata)


        }
        catch(error){
            console.error(error)
        }
    }
    useEffect(()=>{
        Fetchdata()

    },[])

    return(
        <div className="w-full flex justify-center mt-10">
            <div className="flex flex-wrap gap-10 justify-center">
        {data.length>0? 
       (data.map((items,index)=>{
        const rate=JSON.parse(items.rate);
        const getcode=items.country;
        const code=Countrydata.filter((items)=>{
            return(
                items.name===getcode
            )
            
        })
        const currency=currencycode.filter((items)=>{
            return(
                items.country===getcode
            )
        })
        

        return(
       <div key={index}  className="rounded-2xl h-64 w-72 md:w-96 shadow-lg bg-slate-200 mt-10">
            <div className="flex justify-center -mt-5">
            <span className={`fi fi-${code[0].code} text-4xl rounded-2xl`}></span>
                
                
            </div>
            <div className="text-center text-xl font-bold">{getcode}</div>
            <div className="mt-1 overflow-y-scroll h-52">
           {rate.map((iteminner,indexinner)=>(
            <div className="">
                <div className="text-center"><span className="text-lg">{iteminner.country}</span> - {iteminner.code} -<span className="text-xl font-bold">{iteminner.amountrate}{currency[0].currency_code}</span> </div>


            </div>

           )) }
           </div>
                
               
        </div>)})):
        <div className="text-fuchsia-950 text-sm text-center flex justify-center items-center h-36 w-36">
            No Rate Yet
            </div>}
            </div>
        </div>

    )
}
export default ExchangeRate