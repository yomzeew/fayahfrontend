import { useEffect,useState } from "react"
import currencyjson from "../dataJson/countrycurrency.json"
import api from "../services/api"
const Exchange=()=>{
    const [code,setcode]=useState('')
    const [currenycode,setcurrencycode]=useState('')
    const [showcountrymenu,setshowcountrymenu]=useState(false)
    const [country,setcountry]=useState('')
    const [showaddcurrency,setshowaddcurrency]=useState(false)
    const [data, setData]=useState('')
    const [amountusd,setamountusd]=useState('')
    const [amountcad,setamountcad]=useState('')
    const [amountpound,setamountpound]=useState('')
    const [amountng,setamountng]=useState('')
    const [amountcfa,setamountcfa]=useState('')
    const handleshowadd=()=>{
        setamountusd('')
           setamountng('')
           setcode('')
           setamountpound('')
           setamountcad('')
           setamountcfa('')
           setcountry('')
        setshowaddcurrency(!showaddcurrency)

    }
    const handlecountrymenu=()=>{
        
        setshowcountrymenu(!showcountrymenu)
    }
    const handlepickmenu=(values,country,code)=>{
        setcurrencycode(values)
        setcountry(country)
        setshowcountrymenu(false)
        setcode(code)
        return
    }
    const handlefetch=async()=>{
        try {
            const response = await api.get('/selectrate');
            console.log(response.data)
            setData(response.data);
            
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        handlefetch()
        

    },[])
    const handleadddata=async()=>{
        console.log(amountcfa)
        console.log(amountng)
        const rate=
            {
                "usd":amountusd, 
                "cad": amountcad, 
                "pound": amountpound,
                "ng": amountng,
                "cfa": amountcfa,
                "currency":currenycode,
                "code":code
            }
            console.log(rate)
            const dataset={country:country,rate:JSON.stringify(rate)}
            try {
                const response = await api.post('/addrate',dataset);
                if(response.status===201){
                    console.log('record added')
                    handlefetch()

                }
                else if (response.status===202){
                    console.log('record updated')
                    handlefetch()

                }
                
              } catch (error) {
                console.error(error);
              }


   

    }
    const handleedit=async(index)=>{
        const id=index+1
        try {
            const response = await api.get('/selectrate');
           const datas=response.data
        const mydata= datas.filter((items)=>{
            
            return(
                items.id===id
            )
           })
           const ratedata=JSON.parse(mydata[0].rate)
           console.log(ratedata.code)
           setamountusd(ratedata.usd)
           setamountng(ratedata.ng)
           setcode(ratedata.code)
           setamountpound(ratedata.pound)
           const code=ratedata.code
           const currency=ratedata.currency
           setcurrencycode(ratedata.currency)
           setamountcad(ratedata.cad)
           setamountcfa(ratedata.cfa)
           setcountry(mydata[0].country)
           console.log(mydata[0].country)
            
          } catch (error) {
            console.error(error);
          }
          setshowaddcurrency(!showaddcurrency)

    }
    return(
        <div className="flex-1 bg-slate-200 px-5 py-5 relative">
        <div className="flex justify-center">
        <div className="bg-fuchsia-950 flex justify-center items-center rounded-2xl px-5 py-3 text-white">Exchange Rate</div>
        </div>
        <div className="h-auto">
     <div className={showaddcurrency?"lg:mt-24 mt-7 py-7 flex flex-wrap gap-7 justify-center w-full blur-sm ":"lg:mt-24 mt-7 py-7 flex flex-wrap gap-7 justify-center w-full"}>
       {data.length>0? 
       (data.map((items,index)=>{
        const rate=JSON.parse(items.rate);
        return(
       <div onClick={()=>handleedit(index)} key={index} className="rounded-2xl h-36 w-36 shadow-sm bg-white">
            <div className="flex justify-center -mt-5">
                <span className={`fi fi-${rate.code} text-4xl rounded-2xl`}></span>
                </div>
                <div className="flex justify-center text-sm"><span>{items.country.toUpperCase()}</span></div>
                <div className="flex justify-center text-xs font-bold mt-4">
                    <div>
                    <div>&#xa3;1 (GBP)={rate.pound}
                    <span dangerouslySetInnerHTML={{ __html: rate.currency }}></span>
                    </div>
                    <div>&#xFF04;1(USD)={rate.usd}
                    <span dangerouslySetInnerHTML={{ __html: rate.currency }}></span></div>
                    <div>&#xFF04;1 (CAD)={rate.cad}
                    <span dangerouslySetInnerHTML={{ __html: rate.currency }}></span></div>
                   <div>
                     {items.country.toUpperCase()==='CAMEROUN' &&
                     <div>&#x20A6;1 (naira)={rate.ng}
                    <span dangerouslySetInnerHTML={{ __html:rate.currency }}></span></div>}
                    {items.country.toUpperCase()==='NIGERIA' &&
                    <div>1 (CFA)={rate.cfa}
                    <span dangerouslySetInnerHTML={{ __html: rate.currency }}></span></div>}
             
                    </div>


                    </div>
                    

                </div>

        </div>)})):
        <div className="text-fuchsia-950 text-sm text-center flex justify-center items-center h-36 w-36">
            No Rate Yet
            </div>}

        <div onClick={handleshowadd} className="rounded-2xl h-36 w-36 shadow-sm bg-white flex justify-center items-center">
            <span className="fa fa-3x fa-plus text-slate-400"></span>
        </div>
     </div>
    {showaddcurrency&& 
    <div className="absolute top-0 left-0 flex justify-center w-full items-center h-full  ">
        <div className="flex justify-center w-full">
        <div className="lg:w-80 w-72 border-2 border-slate-300 rounded-2xl pb-5 px-3 bg-slate-400">
            <div className="flex justify-center">
                <span className="fa fa-plus rounded-full bg-white py-3 px-3 -mt-5"></span>
            </div>
            <div onClick={handleshowadd} className="flex justify-end">
                <span className="fa fa-times text-white"></span>
            </div>
            <div className="flex justify-center mt-4">
                <div>
                <div>
                    <div onClick={handlecountrymenu} className=" cursor-pointer w-full rounded-2xl bg-fuchsia-950 text-sm flex justify-center py-3 text-white mb-2">{country||'Choose Country'}<span className="fa fa-arrow-down"></span></div>
                    {showcountrymenu &&
                   <div className="flex justify-center  bg-slate-300 rounded-2xl py-4 ">
                      
                            <div>
                        {currencyjson.map((items,index)=>(
                            <div key={index} onClick={()=>handlepickmenu(items.currencycode,items.country,items.code)} className="cursor-pointer text-fuchsia-950 border-b-2 border-slate-200">
                              <span className={`fi fi-${items.code}`}></span>  {items.country}
                            </div>

                        ))}
                        </div>
                    </div>   }  
                </div>
                <div className="w-full gap-2 justify-center flex mt-2">
                <div className="bg-fuchsia-950 rounded-2xl px-2 h-8  text-white items-center ">&#xFF04;1 USD</div>
                <div><input
                value={amountusd}
                 onChange={(e)=>setamountusd(e.target.value)} type="number" className="outline-1 outline-fuchsia-200 rounded-2xl px-3 w-24 h-8"/></div>
                 <div className="bg-fuchsia-950 rounded-2xl px-2 h-8  text-white items-center "><span dangerouslySetInnerHTML={{ __html: currenycode }}></span></div>

                </div>
                <div className="w-full gap-2 justify-center flex mt-2">
                <div className="bg-fuchsia-800 rounded-2xl px-2 h-8  text-white items-center ">&#xFF04;1 CAD</div>
                <div><input 
                value={amountcad}
                onChange={(e)=>setamountcad(e.target.value)} type="number" className="outline-1 outline-fuchsia-200 rounded-2xl px-3 w-24 h-8"/></div>
                 <div className="bg-fuchsia-800 rounded-2xl px-2 h-8  text-white items-center "><span dangerouslySetInnerHTML={{ __html: currenycode }}></span></div>

                </div>
                <div className="w-full gap-2 justify-center flex mt-2">
                <div className="bg-fuchsia-600 rounded-2xl px-2 h-8  text-white items-center ">&#xa3;1 Pound</div>
                <div><input
                value={amountpound} 
                onChange={(e)=>setamountpound(e.target.value)} type="number" className="outline-1 outline-fuchsia-200 rounded-2xl px-3 w-24 h-8"/></div>
                 <div className="bg-fuchsia-600 rounded-2xl px-2 h-8  text-white items-center "><span dangerouslySetInnerHTML={{ __html: currenycode }}></span></div>

                </div>
               
                <div className="w-full gap-2 justify-center flex mt-2">
                <div className="bg-fuchsia-600 rounded-2xl px-2 h-8  text-white items-center ">&#x20A6;1(naira)</div>
                <div><input 
                value={amountng}
                 onChange={(e)=>setamountng(e.target.value)} type="number" className="outline-1 outline-fuchsia-200 rounded-2xl px-3 w-24 h-8"/></div>
                 <div className="bg-fuchsia-600 rounded-2xl px-2 h-8  text-white items-center "><span dangerouslySetInnerHTML={{ __html: currenycode }}></span></div>

                </div>
        
                <div className="w-full gap-2 flex justify-center mt-2">
                <div className="bg-fuchsia-600 rounded-2xl px-2 h-8  text-white items-center ">1 CFA</div>
                <div><input
                value={amountcfa}
                 onChange={(e)=>setamountcfa(e.target.value)} type="number" className="outline-1 outline-fuchsia-200 rounded-2xl px-3 w-24 h-8"/></div>
                 <div className="bg-fuchsia-600 rounded-2xl px-2 h-8  text-white items-center "><span dangerouslySetInnerHTML={{ __html: currenycode }}></span></div>

                </div>
                
                <div className="mt-2 flex justify-center"><button onClick={handleadddata} className="bg-fuchsia-950 rounded-2xl text-white py-2 text-sm w-full">Submit</button></div>

                </div>
          
           
            </div>

        </div>

     </div>
     </div>}
     </div>
    

    </div>

    )
}
export default Exchange
