import { useState } from "react"
import './customcss/custom.css'

const Regform=()=>{
    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const [confirmpass,setconfirmpass]=useState('');
    const [gender,setgender]=useState('');
    const [Occupation,setOccupation]=useState('');
    const [status,setstatus]=useState('');

    const handlefirstname=(e)=>{
       const value =e.target.value
        console.log(value)
        setfirstname(value)

    }

    return(
        <div className="w-screen h-screen flex justify-center items-center">
            
            <div>Firstname:{firstname}</div>
            <div>
                <input 
                onChange={(e)=>handlefirstname(e)}
                type="text" 
                className="w-72 h-6 border-2 border-red-900 rounded-2xl"
                />
                </div>
            <div>Lastname</div>
            <div>
                <input 
                type="text" 
                className="w-72 h-6 border-2 border-red-900 rounded-2xl"/>
                </div>
            <div>Email</div>
            <div>
                <input
                 type="email" className="w-72 h-6 border-2 border-red-900 rounded-2xl"
                 />
                 </div>
            <div>Password</div>
            <div>
                <input 
                type="password" 
                className="w-72 h-6 border-2 border-red-900 rounded-2xl"
                />
                </div>
            <div>Comfirm Password</div>
            <div>
                <input 
            type="password" 
            className="w-72 h-6 border-2 border-red-900 rounded-2xl"
            />
            </div>
            <div>Gender</div>
            <div>
                <select className="w-72 h-6 border-2 border-red-900 rounded-2xl">
                    <option value="">Choose</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option  value="Others">Others</option>
                    </select>
                </div>
            <div>Date of Birth</div>
            <div>
                <input 
                type="date" 
                className="w-72 h-6 border-2 border-red-900 rounded-2xl"
                />
                </div>
            <div>Occupation</div>
            <div>
                <input
                 type="text"
                  className="w-72 h-6 border-2 border-red-900 rounded-2xl"
                  />
                  </div>
            <div>Status</div>
            <select className="w-72 h-6 border-2 border-red-900 rounded-2xl">
                    <option value="">Choose</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option  value="Divorce">Divorce</option>
                    </select>
                    <div>
                        <button className="btn">Submit</button>
                    </div>

        </div>
    )

}
export default Regform