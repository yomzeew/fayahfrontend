import React, { useState,useEffect } from 'react';
import datacountry from './countries.json'
import currencycode from './jsonfile/currency.json'
import api from '../services/api';
function SetNewRate() {
  const[country,setcountry]=useState('')
  const[showview,setshowview]=useState(false)
  const [rate,setrate]=useState([])
  const [errormessage,seterrormessage]=useState('')
  const [ratevalue,setratevalue]=useState([])
  const [amountrate,setamountrate]=useState('')
  const [codecurrency,setcodecurrency]=useState('')
  const [countrycurrency, setcountrycurrency]=useState('')
  const [showaddrate,setshowaddrate]=useState(false)
  const [showcurrencycode,setshowcurrencycode]=useState(false)
 const [changevalue,setchangevalue]=useState('')
  const handleshowRate=()=>{
    if(!country){
      seterrormessage('Select Country')
      return

    }
    setshowaddrate(true)

  }
  const handlepickCode=(value,valuetwo)=>{
    setcodecurrency(value)
    setcountrycurrency(valuetwo)
    setshowcurrencycode(false)

  }
  useEffect(()=>{
   
  },[ratevalue])
  const addRate=async()=>{
    const RateObject={country:countrycurrency,code:codecurrency,amountrate:amountrate}
    console.log(RateObject)
    const newRateArray=[...ratevalue,RateObject]
    console.log(newRateArray)
    setratevalue((prevRateValue) => [...prevRateValue, RateObject]);

    
    const data={country:country,rate:JSON.stringify(newRateArray)}
    try {
        const response = await api.post('/addnewrate',data);
        const checkstatus=response.data
        if(checkstatus.message==='Successful'){
          seterrormessage('New Currency Add')
          setchangevalue('change')
        }
      } catch (error) {
        console.error(error);
      }
  }

  const handledelete=async(index)=>{
   rate.splice(index,1)
    console.log(rate)
    const data={country:country,rate:JSON.stringify(rate)}
    try {
        const response = await api.post('/addnewrate',data);
        const checkstatus=response.data
        if(checkstatus.message==='Successful'){
          seterrormessage('Currency Removed')
        }
      } catch (error) {
        console.error(error);
      }



  }
  

  const handlefetch = async () => {
    const data = { country: country };
    try {
      const response = await api.post('/getnewrate', data);
      const datares = response.data || [];
  
      console.log("datares:", datares);
  
      if (datares.length > 0 && datares[0].rate) {
        // Assuming rate is a string, parse it into an object
        const parsedRate = JSON.parse(datares[0].rate);
  
        // Check if the parsedRate is an array
        if (Array.isArray(parsedRate)) {
          setrate(parsedRate);
          setratevalue(parsedRate)

        } else {
          console.error("Invalid rate structure:", datares[0].rate);
          setrate([]);
        }
      } else {
        setrate([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
    handlefetch()
  },[country,changevalue])

  const handlecountry=(item)=>{
   setcountry(item) 
   setshowview(false)
  


  }
  const handleclick=()=>{
    setshowview(true)
    setratevalue([])
   
  

  }
  const handlecancel=()=>{
    setshowview(false)
  }
 
 


  return (
    <div className='lg:mt-0 mt-16 w-full justify-center items-center flex px-5'>
      
        {showview&&<div className='w-72  h-96  absolute bg-slate-200 px-3 py-5'>
          <div className='justify-end flex'><i onClick={handlecancel} className='fa fa-2x fa-times-circle'></i></div>
          <div className='overflow-y-scroll h-72'>

        {datacountry.map((item,index)=>(
          <div key={index} onClick={()=>handlecountry(item)} className='border-b-2 border-b-fuchsia-200 cursor-pointer '>{item}</div>

        ))

        }
        </div>

      </div>}
      
      {showaddrate &&<div className='lg:w-96 w-72 absolute'>
      <div className='flex justify-end'><i onClick={()=>setshowaddrate(false)} className='fa fa-2x fa-times-circle'></i></div>
        <div className='justify-center h-72 flex bg-slate-200 items-center '>
          
          
          <div>
            <div className='text-lg text-center'>{country}</div>
            <div>
              {
                ratevalue.length>0&&
                <div className='flex w-72 overflow-x-scroll'>
                {
                  ratevalue.map((item,index)=>(
                    <div key={index} className='flex flex-col text-xs mr-2 '>
                    <div>{item.country}</div>
                    <div>{item.code}</div>
                    <div>{item.amountrate}</div>

                      </div>
                  


                  ))
                }
                </div>
              }
            </div>
          <div onClick={()=>setshowcurrencycode(true)} className='bg-fuchsia-900 rounded-lg text-white h-8 flex justify-center items-center px-3 cursor-pointer'>{codecurrency||'Select Currency'}</div>
          <input type='number' onChange={(e)=>setamountrate(e.target.value)} placeholder='Enter Rate' className="outline-0 border-b-2 h-8 w-64 border-slate-300 mt-3"/>
           <div className='mt-2'><button onClick={addRate}  className='bg-fuchsia-900 text-white px-3 border-0'>Add</button></div>


          </div>
      
        </div>

         
        </div>}
        {showcurrencycode &&<div className='absolute bg-slate-300 px-5 '>
          <div className='flex justify-center w-56'>
            <div>
            <div className='flex justify-end w-full'><i onClick={()=>setshowcurrencycode(false)} className='fa fa-times-circle fa-2x'></i></div>
          <div className=' px-5 py-5 overflow-scroll  h-52  '>
            {currencycode.map((items,index)=>(
              <div onClick={()=>handlepickCode(items.currency_code,items.country)} className='w-34 border-b-2 border-b-fuchsia-300 cursor-pointer'>
                <span>{items.currency_code}</span><span className='text-xs' >({items.country})</span>
                </div>
            )
            )}
          </div>

            </div>
           

          </div>
       


        </div>}
       
      <div className='md:w-full w-full'>
      <div className='text-red-500 text-center'>{errormessage}</div>
      <div className="bg-fuchsia-950 flex justify-center px-3 py-2 rounded-xl text-white">Set Currency Rate</div>
      <div className='w-full flex justify-center'>
      <button onClick={handleclick} className='bg-fuchsia-400 text-white text-lg py-2 px-5 mt-5 rounded-lg'>{country?country:'Select Country'}</button>
        </div>
        <div className=''>
          {
            rate.length>0 &&
            <div className='flex  gap-2 justify-evenly  overflow-x-scroll'>
              {rate.map((items,index)=>(
                        <div key={index} className='flex flex-col'>
                        <div className='text-center'>{items.country}</div>
                        <div  className='text-center'>{items.code}</div>
                        <div  className='text-center'>{items.amountrate}</div>
                        <div className='justify-center flex items-center gap-1'>
                          <div onClick={()=>handledelete(index)} className='w-6 h-6 justify-center flex items-center bg-red-400 rounded-xl  cursor-pointer'>
                            <i className='fa fa-trash text-white'></i></div>
                          
                          </div>
    
                        </div>
                

              ))}
              </div>
          }

        </div>
        <div className='flex justify-center'>
        <button onClick={handleshowRate} className='bg-fuchsia-950 mt-5 text-white py-4 px-5'>
          <i className='fa fa-plus'></i>Add Currency</button>
        </div>
     
       
       
        
    

      </div>
     
       
    </div>
  );
}

export default SetNewRate;
