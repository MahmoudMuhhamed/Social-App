import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form';
import { data, useNavigate } from 'react-router-dom';
import * as zod from 'zod';
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { PiKeyBold } from "react-icons/pi";
import { da } from 'zod/locales';


const schema = zod.object({

  email: zod.email('Invalid email !!')
  .regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Invalid email !!')
  .nonempty('Email is required'),

  password: zod.string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character')
  .nonempty('Password is required'),


});





export default function Register() {

  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const form = useForm({
    defaultValues : { 
      email : "",
      password : "",
    },

    resolver: zodResolver(schema),
    mode: "onChange",

  })

  const {register, handleSubmit, setError, getValues, watch, formState} = form;




  function handleLogin(values) {
    setisLoading(true);

    axios.post('https://route-posts.routemisr.com/users/signin', values)
    
    .then((res) => {
      if (res.data.message === 'signed in successfully') {
        localStorage.setItem("userToken", res.data.data.token);
        navigate('/Home');
        setisLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setapiError(err.response.data.message);
      setisLoading(false);
    })
  }
  
  


  return <>
  <div className='bg-gray-100'>


<div className="min-h-screen flex max-w-7xl mx-auto">
      <div className="w-3xl p-16 flex flex-col justify-center">
        <div className="max-w-2xl">

          <h1 className="text-6xl font-bold text-blue-950 mb-5 mt-13">Route Posts</h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Connect with friends and the world around you on Route Posts.
          </p>


          <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm">
            <h2 className="text-blue-800 font-bold text-sm tracking-wider mb-2 uppercase">
              About Route Academy
            </h2>
            
            <h3 className="text-l font-bold text-gray-900 mb-2">
              Egypt's Leading IT Training Center Since 2012
            </h3>
            
            <p className="text-gray-600 text-sm mb-5">
              Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
                <div className="text-l font-bold text-blue-900">2012</div>
                <div className="text-[11px] font-semibold text-gray-600 uppercase tracking-wide">Founded</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
                <div className="text-l font-bold text-blue-900">40K+</div>
                <div className="text-[11px] font-semibold text-gray-600 uppercase">Graduates</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
                <div className="text-l font-bold text-blue-900">50+</div>
                <div className="text-[11px] font-semibold text-gray-600 uppercase">Partner Companies</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
                <div className="text-l font-bold text-blue-900">5</div>
                <div className="text-[11px] font-semibold text-gray-600 uppercase">Branches</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
                <div className="text-l font-bold text-blue-900">20</div>
                <div className="text-[11px] font-semibold text-gray-600 uppercase">Diplomas Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>



<div className='w-1/2 items-center flex justify-center'>



<form onSubmit={handleSubmit(handleLogin)} className="w-md border border-gray-300 rounded-2xl p-8 bg-white">

  <div className='w-full flex justify-center p-1 bg-gray-100 rounded-xl mb-6'>
    <Link className='w-1/2 bg-white rounded-lg p-2 text-sm font-bold text-blue-900 shadow-sm justify-center flex' to="/login">Login</Link>
    <Link className='w-1/2 rounded-lg p-2 text-sm font-bold text-blue-900 justify-center flex' to="/register">Register</Link>
  </div>

<div className='text-start mb-5'>
  <h1 className='text-2xl font-bold'>Log in to Route Posts</h1>
  <p className='text-gray-600 text-sm'>Log in and continue your social journey.</p>
</div>


<div className='mb-3'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <RiUser3Line className='text-gray-400 mt-1' />
    </div>
    <input
    {...register('email', )} 
    type="email"
    id="email" 
    className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
    text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body" placeholder="Email address" />
  </div>
      {formState.errors.email && formState.touchedFields.email && (
      <p className="text-sm font-semibold text-red-600" role="alert">
      {formState.errors.email?.message}
      </p>
      )}
</div>







<div className='mb-2'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <PiKeyBold className='text-gray-400 mt-1' />
    </div>
    <input
    {...register('password', )} 
    type="password"
    id="password" 
    className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
    text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body" placeholder="Password" />
  </div>
      {formState.errors.password && formState.touchedFields.password && (
      <p className="text-sm font-semibold text-red-600" role="alert">
      {formState.errors.password?.message}
      </p>
      )}
</div>

{apiError && <p className=" text-sm text-red-600 rounded-2xl rounded-base" role="alert">incorrect email or password</p>
}




<button disabled={isLoading} type="submit" className="text-white mt-4 bg-blue-900 cursor-pointer w-full
      focus:outline-none dark:hover:bg-blue-950 font-medium rounded-xl text-bold px-4 
    py-3 text-center leading-5">{isLoading ? 'Loading...' : 'Log In'}</button>


<div className='flex justify-center mt-3 text-blue-950 hover:underline text-sm font-semibold'>
  <a href="#" className='pointer-coarse'>Forgot password?</a>
</div>


</form>


</div>
</div>
  </div>
  </>
}
