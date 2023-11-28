import logo from './image/logo.png';
import applogo from './image/app store.png';
import androidlogo from './image/google.png';
const Footer = () => {

    return (
        <div className="bg-hero-pattern relative bg-blend-multiply bg-fuchsia-900 lg:h-screen h-auto w-screen flex flex-wrap justify-center py-10">
            <div>
                <div className='pl-5 pt-5 flex'> <img src={logo} className='w-8 h-auto' /><span className='text-3xl text-white font-extrabold'>Fayah</span></div>
                <div className='lg:w-96 w-72 text-justify text-bold text-white border-b-2 py-5 px-5'>
                    Make secure payments with confidence, thanks to our
                    advanced security system that safeguards your financial
                    information. Conveniently top up your mobile device for
                    uninterrupted connectivity. Store and manage your funds
                    securely in a mobile wallet, providing easy access and
                    control over your finances.
                </div>
                <div className='py-5 px-5'>
                    <span className='fa  fa-phone text-white'></span>&nbsp;
                    <span className='text-white text-xl'>+03601885399</span>
                </div>
                <div className='px-5'>
                    <span className='fa  fa-envelope text-white'></span>&nbsp;
                    <span className='text-white text-xl'>support@fayah.app</span>
                </div>


            </div>
            <div className='font-bold text-white px-5 py-5'>
                <div className='text-fuchsia-200 text-xl '>Useful Links</div>
                <div>Privacy Policy</div>
                <div>Terms And Conditions</div>
                <div>Refund Policy</div>


            </div>
            <div className=' text-white px-7 mt-5'>
                <div className='text-xl rounded-2xl bg-fuchsia-400 text-white text-center px-5'>Download</div>
                <div>App’s available for download</div>
                <div className='bg-white rounded-2xl px-5 py-5'>
                    <img className="w-36 h-auto" src={androidlogo} />
                    <img className='w-36 h-auto' src={applogo} />
                    </div>


            </div>
            <div className='bg-fuchsia-950 h-24 lg:h-12 py-4 lg:mt-0 mt-5 grid-cols-2 grid text-white w-screen  lg:absolute bottom-0'>
                <div className='text-sm   lg:text-lg px-7'>Copyright © 2023 All Rights Reserved Fayah</div>
                <div className='px-7 text-right'>
                    <span className='fa  fa-facebook'></span>&nbsp;
                    <span className='fa fa-twitter'></span>&nbsp;
                    <span className='fa fa-instagram'></span>&nbsp;
                    <span className='fa fa-linkedin'></span>&nbsp;
                </div>
            </div>



        </div>
    )
}
export default Footer