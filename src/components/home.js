import { useEffect, useState } from 'react';
import './font-awesome/css/font-awesome.css';
import logo from './image/logo.png'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Countrydata from "/node_modules/flag-icons/country.json"
import Footer from './footer';
import Head from './head';
import api from './services/api';
const Home = () => {
    const [isLoading, setisLoading] = useState(true)
    const [showothers,setshowothers]=useState(false)
    const [showotherstwo,setshowotherstwo]=useState(false)
    //code declaration
    const [country,setcountry]=useState('')
    //country declaration
    const [countrygan,setcountrygan]=useState('')
    const [countrytwo,setcountrytwo]=useState('')
    const [countrydetails,setcountrydetails]=useState([])
    const [send,setsend]=useState(0)
    const [get, setget]=useState(0)
    const [data, setData]=useState([])
    const [thrate,settherate]=useState('')
    const countrycode=['us','ng','cm','gb','eu']
    const [CountryRatedetail,setCountryRatedetail]=useState([])
    const handlefetch=async()=>{
        try {
            const response = await api.get('/getallrate');
            setData(response.data);
            
          } catch (error) {
            console.error(error);
          }
    }
    useEffect(()=>{
        handlefetch()
        

    },[])
    
    useEffect(() => {
        setTimeout(() => {
            setisLoading(false)
          
            

        }, 3000)

    }, [])
 
   

    
    const handleshowcountry=()=>{
        setshowothers(!showothers)
        setshowotherstwo(false)

    }
  
    
    const handlepick=(country)=>{
        setcountrygan(country)
        const ratedetail=data.filter((items)=>(
            items.country===country

        ))
        setCountryRatedetail(JSON.parse(ratedetail[0].rate))
        setshowothers(!showothers)
    }
    const handleshowcountrytwo=()=>{
        setshowotherstwo(!showotherstwo)
        setshowothers(false)
      
    }
    const handlepicktwo=(country)=>{
        
        setcountrytwo(country)
        setshowotherstwo(!showotherstwo)
       
       
    }
    useEffect(()=>{
        if(countrytwo){
            const getpickrate=CountryRatedetail.filter((items)=>{
                return(
                    items.country===countrytwo
                )
            })
            const getrate=JSON.parse(getpickrate[0].amountrate)
            const getconversion=parseFloat((1/getrate)*send).toFixed(2)
            setget(getconversion)
            console.log(getconversion)

            
            

        }
      
        
    },[countrytwo,send,countrygan])
    

    return (
        <div className="">
            <div className="flex justify-center bg-fuchsia-900 h-screen w-screen">

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <img src={logo} className="object-contain w-12" />

                    </div>) :
                    (
                        //the body
                        <div className="flex justify-center px-4">
                            <div>
                                <Head/>
                                <div className='flex justify-center mt-8 h-96  '>
                                    <div className='lg:w-96 w-80 h-auto  bg-white rounded-2xl'>
                                        <div className='text-center h-16 text-3xl py-3 rounded-2xl font-bold  text-fuchsia-950 bg-fuchsia-300'>Exchange Rate</div>
                                        <div className='flex justify-center'>
                                           <div>
                                             <div className='text-xl text-center font-bold  px-3 mt-3'>Send money to your loved ones</div>
                                            <div className='text-center px-3 text-sm mt-3'> We make sure more of your money goes to those you love, not to high service fees.</div>
                                        </div>
                                        </div>
                                        <div className='mt-8 px-3 '>
                                        <div className=' lg:w-full h-16 w-72 border-2 border-fuchsia-200 rounded-2xl'>
                                            <div className='text-sm absolute px-2 py-1'>You send:</div>
                                            <div className='flex justify-center'>
                                                <input type='number' placeholder='Enter Amount' value={send} onChange={(e)=>setsend(e.target.value)} className='h-12 w-full rounded-2xl  px-2 mt-2 outline-0 placeholder:text-xs'/>
                                            <div className={country?'h-auto w-16 bg-fuchsia-500 rounded-2xl px-2':'h-auto w-64 bg-fuchsia-500 rounded-2xl px-2'}>
                                                
                                               
                                                <div onClick={handleshowcountry} className='text-white text-xs mt-5 text-center'>{countrygan?countrygan:<span>Sender Country</span>}<span className='fa fa-arrow-down'></span></div>
                                   
                                            </div>
                                            </div>
                                           
                                       </div>
                                       {showothers && data.length>0 &&
                                       <div className=' lg:w-80 w-72 bg-white z-50 h-40 py-5 px-5 border-2 border-slate-200 rounded-2xl absolute overflow-y-scroll'>{
                                                    data.map((items,index)=>{
                                                        const getcode=items.country
                                                        const code=Countrydata.filter((items)=>{
                                                            return(
                                                                items.name===getcode
                                                            )
                                                            
                                                        })
                                                        return(
                                                            <div key={index} onClick={()=>handlepick(items.country) } className='text-black uppercase text-sm mt-5'><span className={'fi fi-'+code[0].code}></span>&nbsp;{items.country.toUpperCase()}</div>

                                                        )
                                                    }
                                                    ) 
                                                    }</div>
                                                } 
                                       </div>

                                       <div className='mt-8 px-3 '>
                                        <div className='lg:w-full h-16 w-72 border-2 border-fuchsia-200 rounded-2xl'>
                                            <div className='text-sm absolute px-2 py-1'>They get:</div>
                                            <div className='flex justify-center'>
                                                <input readOnly value={get} onChange={(e)=>setget(e.target.value)} className='h-12 w-full rounded-2xl  px-2 mt-2 outline-0 placeholder:text-xs'/>
                                            <div className={'h-auto w-64 bg-fuchsia-500 rounded-2xl px-2'}>
                                                <div onClick={handleshowcountrytwo} className='text-white text-xs mt-5 text-center'>{countrytwo?countrytwo:<span>Receiver Country</span>}<span className='fa fa-arrow-down'></span></div>
                                              
                                            </div>
                                            </div>
                                            
                                           
                                       </div>
                                       {showotherstwo && data.length>0 &&
                                                <div className='lg:w-80 w-72 bg-white z-50 h-40 py-5 px-5 border-2 border-slate-200 rounded-2xl absolute overflow-y-scroll'>{
                                                    CountryRatedetail.map((items,index)=>{
                                                        const getcode=items.country
                                                      
                                                       
                                                        return(
                                                            
                                                            <div key={index} onClick={()=>handlepicktwo(items.country) } className='text-black uppercase text-sm mt-5'>{items.country.toUpperCase()}</div>

                                                        )
                                                    }
                                                    ) 
                                                    }</div>
                                                }
                                       </div>

                                    </div>

                                </div>
                                <div className='h-2 bg-fuchsia-200 mt-20'></div>
                                <div className=''><Footer/></div>
                            </div>
                        </div>
                    )
                }



            </div>
           
        </div>

    )
}
export default Home