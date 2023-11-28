import {useEffect, useState} from 'react'
import datacountry from './countries.json'
import Countrydata from "/node_modules/flag-icons/country.json"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import currencycode from './jsonfile/currency.json'
import api from '../services/api';

const PaymentConfig=()=>{
    const[showview,setshowview]=useState(false)
    const[country,setcountry]=useState('')
    const[mobileacct,setmobileacct]=useState('');
    const[channel,setchannel]=useState('')
    const[mobileacctname,setmobileacctname]=useState('')
    const[dataset,setdataset]=useState([])
    const [errormessage,seterrormessage]=useState('')
    const [datadisplay,setdatadisplay]=useState([])
    const fetchdata=async()=>{
      const data={country:country}
      try {
        const response = await api.post('/getpaymentmethod',data);
        const checkstatus=response.data
        if(checkstatus.length>0){
          setdataset(JSON.parse(checkstatus[0].methodanddetails))
          setcountry(checkstatus[0].country)
       
        }
        else{
          setdataset([])
        }
      } catch (error) {
        console.error(error);
      }

    }
    useEffect(()=>{
      fetchdata()

    },[country])
    const handledelete=async(index)=>{
      dataset.splice(index,1)
       const data={country:country,methodanddetails:JSON.stringify(dataset)}
       try {
           const response = await api.post('/addpaymentmethod',data);
           const checkstatus=response.data
           if(checkstatus.message==='Successful'){
             seterrormessage('Payement Method Removed')
           }
         } catch (error) {
           console.error(error);
         }
   
   
   
     }
    const handlecountry=(item)=>{
        setcountry(item) 
        setshowview(false)
        setmobileacct('')
        setmobileacctname('')
        setchannel('')

     
       }
       const handlecancel=()=>{
        setshowview(false)
      }
      const handleview=()=>{
        setshowview(true)
      }
      const handleadd=()=>{
        if(!country){
          seterrormessage('Select Country')
          return
        }
        if(!channel){
          seterrormessage('Select Channel')
          return

        }
        if(!mobileacctname){
          seterrormessage('Enter Moblie/Account name')
          return

        }
        if(!mobileacct){
          seterrormessage('Enter Moblie/Account No')
          return

        }
        const data={channel:channel,mobileacctname:mobileacctname,mobileacct:mobileacct}
        const newarray=[...dataset,data]
        setdataset(newarray)
        seterrormessage('')
        

      }
      const handlesubmit=async()=>{
        const data={country:country,methodanddetails:JSON.stringify(dataset)}
        try {
          const response = await api.post('/addpaymentmethod',data);
          const checkstatus=response.data
          if(checkstatus.message==='Successful'){
            seterrormessage('Add Successful')
            setdataset([])
            setcountry('')
            setmobileacct('')
            setmobileacctname('')
            setchannel('')
          }
        } catch (error) {
          console.error(error);
        }
  
        
      }
      const handlealldata=async()=>{
        try {
          const response = await api.get('/getallpaymentmethod');
          const checkstatus=response.data
          console.log(checkstatus)
          if(checkstatus.length>0){
            setdatadisplay(checkstatus)

           
          }
        } catch (error) {
          console.error(error);
        }
  
        
      }
      useEffect(()=>{
        handlealldata()

      },[])
     
    
    return(
        <div className="w-full h-screen flex justify-center item-center mt-10">
                 {showview&&<div className='w-72  h-96  absolute bg-slate-200 px-3 py-5'>
          <div className='justify-end flex'><i onClick={handlecancel} className='fa fa-2x fa-times-circle'></i></div>
          <div className='overflow-x-scroll h-72'>

        {datacountry.map((item,index)=>(
          <div key={index} onClick={()=>handlecountry(item)} className='border-b-2 border-b-fuchsia-200 cursor-pointer '>{item}</div>

        ))

        }
        </div>

      </div>}
      <div>
      <div className="bg-fuchsia-900 h-8 text-white px-5 rounded-lg text-center">Payment Method Configuration</div>
      <div className='text-red-500 text-center'>{errormessage}</div>
            <div className="flex justify-center"><button onClick={handleview} className="h-8 bg-fuchsia-600 rounded text-white px-5 mt-5">{country?country:'SELECT COUNTRY'}</button></div>
            <div className="mt-5">
              <div className='flex justify-center'>
                {dataset.length>0 &&
                 <div className='flex gap-5 flex-row overflow-x-scroll w-72 md:w-96'> {dataset.map((item,index)=>(
                  <div>
                    <div><span onClick={()=>handledelete(index)} className='fa fa-trash text-fuchsia-500 cursor-pointer'></span></div>
                    <div>Channel:{item.channel}</div>
                    <div>Provider/Bank Name:{item.mobileacctname}</div>
                    <div>Mobile No/Account No:{item.mobileacct}</div>
                    
                  </div>

                  

                 ))
                  }
                  <div className="flex justify-center"><button onClick={handlesubmit} className="h-8 bg-fuchsia-600 rounded text-white px-5 mt-5">SUBMIT</button></div>

                 </div>
                }
                </div>
               
              <div className='text-center'>Add Method</div>
              <div className='flex justify-center'>
                <select onChange={(e)=>setchannel(e.target.value)} className='w-72 h-8 border-2 outline-0'>
                <option value=''>Choose Payment Channel</option>
                  <option value='Bank'>Bank</option>
                  <option value='Mobile Money'>Mobile Money</option>
                  </select>

              </div>
            
            </div>
            <div className='flex justify-center mt-5'>
              <div>
            <div>Enter Provider/Bank Name</div>
            <input value={mobileacctname} onChange={(e)=>setmobileacctname(e.target.value)} className="w-72 h-8 outline-0 border-2"/>

              </div>
            
            </div>
            <div className='flex justify-center mt-5'>
              <div>
            <div>Enter Mobile No/Account No</div>
            <input value={mobileacct} type='number' onChange={(e)=>setmobileacct(e.target.value)} className="w-72 h-8 outline-0 border-2"/>

              </div>
            
            </div>
            <div className="flex justify-center"><button onClick={handleadd} className="h-8 bg-fuchsia-600 rounded text-white px-5 mt-5"><span className='fa fa-plus'></span>Add Another Method</button></div>

            <div className="bg-fuchsia-900 h-8 text-white px-5 rounded-lg mt-5 text-center">Payment Method</div>
            <div className='flex justify-center '>
              {datadisplay.length>0 &&
              <div className='flex justify-center flex-wrap gap-5 '>
                {
                  datadisplay.map((items,index)=>{
                    const country=items.country
                    const details=JSON.parse(items.methodanddetails)
                    const code=Countrydata.filter((items)=>{
                      return(
                          items.name===country
                      )
                      
                  })
                    console.log(code[0])
                    return(
                      <div key={index} className='w-52 h-52 shadow-lg shadow-black text-center mt-10 rounded-2xl'>
                        <div className='-mt-5'><span className={`fi fi-${code[0].code}  text-4xl rounded-2xl`}></span></div>
                        <div>{country}</div>
                        <div>
                          {details.map((itemdetail,index)=>(
                            <div className='' key={index}>
                              <div>{itemdetail.channel}</div>
                              <div>{itemdetail.mobileacctname}</div>
                              <div>{itemdetail.mobileacct}</div>
                            </div>
                          ))

                          }
                        </div>
                        </div>

                    )
                  }

                  )
                }
                </div>
                }
            </div>

            
        </div>
            
            </div>

    )
}
export default PaymentConfig