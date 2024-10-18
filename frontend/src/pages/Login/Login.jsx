import {useState} from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import notePic from '../../assets/pic.jpg'


const Login = () => {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState(null);

    const navigate= useNavigate();

    const handleLogin = async(e)=>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address");
            return;
        }
        if(!password){
            setError("please enter the password");
            return;
        }
        setError("");

//Login API
    try {
        const response=await axiosInstance.post("/login",{
            email:email,
            password:password,
        });

//handle successful login
       
       if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
        navigate('/dashboard');
       }
    } catch (error) {
//Handle login error        
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }  else{
        setError("An unexpected error occur.Please try again");
      }
    }

    };
        
    

    
  return (
   <>
   <NavBar/>
   <div className=" flex items-center justify-center mt-20">
   <div> 
    <img src='https://static.vecteezy.com/system/resources/thumbnails/008/740/773/small/close-up-top-view-of-diverse-businesspeople-cooperate-work-together-discussing-company-financial-statistics-multiracial-colleagues-employees-collaborate-brainstorm-with-finance-document-at-meeting-free-photo.jpg' className='px-40'/>
    <p className='mx-20 font-serif font-bold'>Hey,Looking for a place to jot down your thoughts. Can I be your note?</p>
    </div>
   
       
        
    <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type='text'placeholder='Email-id'className='input-box'
            value={email} onChange={(e)=>setEmail(e.target.value)}
            />
            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)}/>

                {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit'className='btn-primary'>login</button>
            <p className='text-sm text-center mt-4 '>Not registered yet?<br/>
                <Link to="/signUp"className="font-large text-primary underline bold">Create an account</Link>
            </p>

        </form>
    </div>
   </div>
   </>
  )
}

export default Login