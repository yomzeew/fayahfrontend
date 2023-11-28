import { useEffect, useState } from "react"
import "/node_modules/flag-icons/css/flag-icons.min.css";

import Exchange from "./dashboardmenu/exchange";
import SetNewRate from "./dashboardmenu/setNewRate";
import ExchangeRate from "./dashboardmenu/displayexchange";
import PaymentConfig from "./dashboardmenu/paymentConfig"

const Dashboard=()=>{
    const [showmenu,setshowmenu]=useState(true)
    const [showrate,setshowrate]=useState(false)
    const [showexchange,setshowexchange]=useState(true)
    const [showpaymentconfig,setshowpaymentconfig]=useState(false)
   
    const handleshow=()=>{
        setshowmenu(!showmenu)
    }

    useEffect(()=>{

    })
    const handleshowrate=()=>{
      setshowexchange(false)
      setshowrate(true)
      setshowpaymentconfig(false)
    }
    const handlepaymentconfig=()=>{
      setshowexchange(false)
      setshowrate(false)
      setshowpaymentconfig(true)

    }
    return(
        <div className="h-screen flex flex-col">
      {/* Header with a fixed height of 12rem (adjust as needed) */}
      <div className="h-12 flex justify-between w-full bg-white px-5 py-4">
       <div className="text-sm">Dashboard</div>
       <div className="flex gap-3 text-sm">
       <div><span className="fa fa-user text-fuchsia-950"></span>Admin</div>
       <div><span className="fa fa-sign-out text-fuchsia-950"></span>Logout</div>

       </div>
      
      </div>

      {/* Flex container for the main content */}
      <div className="flex lg:flex-row flex-col flex-1">
        {/* Side Panel with a fixed width of 56rem (adjust as needed) */}
        <div className="lg:w-56 w-full  bg-fuchsia-950 py-5 lg:py-12">
        <div className="flex justify-end px-5 lg:hidden">
            <span onClick={handleshow} className={showmenu?'fa fa-arrow-up text-white':'fa fa-arrow-down text-white'}></span></div>
         <div className="text-white flex justify-center text-sm item-center">
           { showmenu &&<div>
                
            <div className=" mt-4 lg:mt-12 cursor-pointer border-b-2 border-fuchsia-800 ">
               <span className="fa fa-users text-fuchsia-400"></span>&nbsp;Users
            </div>
            <div className=" mt-4 lg:mt-12 cursor-pointer border-b-2 border-fuchsia-800">
            <button onClick={handlepaymentconfig}><span className="fa fa-money text-fuchsia-400"></span>&nbsp;Transactions</button>
            </div>
            <div className=" mt-4 lg:mt-12 cursor-pointer border-b-2 border-fuchsia-800">
              <button onClick={handleshowrate}> <span className="fa fa-exchange text-fuchsia-400 "></span>&nbsp;Exchange Rate</button>
            </div>
            <div className=" mt-4 lg:mt-12 cursor-pointer border-b-2 border-fuchsia-800">
               <span className="fa fa-cogs text-fuchsia-400"></span>&nbsp;Settings
            </div>

            </div>}
         
            
         </div>
        </div>

        {/* Main Content that takes up the remaining height and width */}
        {showexchange&&<ExchangeRate/>}
        {showrate&&<SetNewRate/>}
        {showpaymentconfig &&<PaymentConfig/>}

        </div>
    
    </div>
    )

}
export default Dashboard