import { useState } from "react"
import logo from './image/logo.png'
import qrco from './image/qrcode.png';
import applogo from './image/app store.png';
import androidlogo from './image/google.png';
import api from "./services/api";
const Head=()=>{
    const [menubar, setmenubar] = useState(false)
    const [displayqr, setdisplayqr] = useState(false)
    const [displayqrmobile, setdisplaygrmobile] = useState(false)
    const handledisplay = () => {
        setmenubar(!menubar)

    }
    const handleqrcode = () => {
        setdisplayqr(!displayqr)

    }
    const handleqrmobile = () => {
        setdisplaygrmobile(!displayqrmobile)

    }
    return(
    <div className='bg-white w-screen justify-between flex h-24 px-4 py-4' >
                                    <div className='flex w-screen'>
                                        <img src={logo} className='object-contain h-16' />
                                        <div className='mt-3 text-fuchsia-900 font-bold'>Fayah</div>
                                    </div>
                                    <div className='lg:block hidden'>
                                        <div className='flex justify-between  text-fuchsia-900 py-5'>
                                            <div className='w-36'>
                                                Who We Are
                                            </div>
                                            <div className='w-36'>
                                                How it Works
                                            </div>
                                            <div className='w-36'>
                                                Get Help
                                            </div>
                                            <div>
                                                <button onClick={handleqrcode} className='w-36 bg-fuchsia-900 px-3 rounded-2xl text-white'>Download App</button>
                                                {displayqr && <div className='absolute right-0 top-12'>
                                                    <img src={qrco} className='w-36 h-auto mt-4 ' />
                                                    <div className='text-white'><span className='text-sm'>Scan to Download</span></div>
                                                </div>}
                                            </div>

                                        </div>
                                    </div>
                                    <div className='lg:hidden block'>
                                        <div className="flex justify-end">
                                            <div>
                                                <div className='flex justify-end'>
                                                    <i onClick={handledisplay} className='fa fa-2x fa-bars text-fuchsia-900 cursor-pointer'></i>
                                                </div>
                                                {menubar && <div className='absolute h-auto left-0 top-24 w-screen text-2xl py-5 text-fuchsia-900 flex justify-center bg-white'>
                                                    <div className=''>
                                                        <div>Who Are We</div>
                                                        <div>How its Works</div>
                                                        <div>Get Help</div>
                                                        <div>
                                                            <img className="w-36 h-auto" src={androidlogo} />
                                                            <img className='w-36 h-auto' src={applogo} /></div>
                                                    </div>

                                                </div>}

                                            </div>


                                        </div>

                                    </div>

                                </div>
    )
}
export default Head