import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { use, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as zod from 'zod';
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import { PiKeyBold } from "react-icons/pi";
import { LuAtSign } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";


const schema = zod.object({
  name: zod.string()
  .min(3, 'Name must be at least 2 characters.')
  .max(7, 'Max length is 7 chars')
  .nonempty('Name is required'),

  email: zod.email('Invalid email !!')
  .regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, 'Please enter a valid email address.')
  .nonempty('Email is required'),

  password: zod.string()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must include uppercase, lowercase, number, and special character.')
  .nonempty('Password is required'),

  rePassword: zod.string()
  .nonempty('Passwords do not match.'),


  dateOfBirth: zod.string().refine((value) => {
    const userDate = new Date(value);
    const currentDate = new Date();
    if (currentDate.getFullYear() - userDate.getFullYear() >= 18 ) {
      return true;
    } else {
      return false;
    }

  }, 'You must be at least 18 years old'),

  
  gender: zod.enum(['male', 'female'], 'Invalid gender'),
}).refine((data) => {
  if (data.password === data.rePassword) {
    return true;
  } else {
    return false;
  }
},{error: "Passwords do not match", path: ['rePassword'] } 
);





export default function Register() {

  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const form = useForm({
    defaultValues : { 
      name : "",
      email : "",
      password : "",
      rePassword : "",
      dateOfBirth : "",
      gender : "",
    },

    resolver: zodResolver(schema),
    mode: "onChange",

  })

  const {register, handleSubmit, setError, getValues, watch, formState} = form;




  function handleRegister(values) {
    console.log(values);
    setisLoading(true);

    axios.post('https://route-posts.routemisr.com/users/signup', values)
    .then((res) => {
      if (res.data.message === 'account created') {
        navigate('/login');
        setisLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setapiError(err.response.data.error);
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


{apiError && <p className="p-1 my-2 text-sm text-red-900 rounded-2xl rounded-base bg-red-300 " role="alert">error again</p>
}
<form onSubmit={handleSubmit(handleRegister)} className="w-md border border-gray-300 rounded-2xl p-8 bg-white">

  <div className='w-full flex justify-center p-1 bg-gray-100 rounded-xl mb-6'>
    <Link className='w-1/2 rounded-lg p-2 text-sm font-bold text-blue-900 justify-center flex' to="/login">Login</Link>
    <Link className='w-1/2 bg-white rounded-lg p-2 text-sm font-bold text-blue-900 shadow-sm justify-center flex' to="/register">Register</Link>
  </div>
  
<div className='text-start mb-5'>
  <h1 className='text-2xl font-bold'>Create a new account</h1>
  <p className='text-gray-600 text-sm'>It is quick and easy.</p>
</div>






<div className='mb-3'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <RiUser3Line className='text-gray-400 mt-1' />
    </div>
    <input
    {...register('name', )}
    type="text"
    id="name" 
    className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
    text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body" placeholder="Full name" />
  </div>
      {formState.errors.name && formState.touchedFields.name && (
      <p className="text-sm font-semibold text-red-600" role="alert">
      {formState.errors.name?.message}
      </p>
      )}
</div>



<div className='mb-3'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <LuAtSign className='text-gray-400 mt-1' />
    </div>
    <input
    type="text"
    id="name" 
    className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
    text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body" placeholder="Username (optional)" />
  </div>
</div>


<div className='mb-3'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <LuAtSign className='text-gray-400 mt-1' />
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

    <div className='mb-3'>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <FaUsers className='text-gray-400 mt-1' />
      </div>
      <select 
        name="gender"
        {...register('gender', )}
        className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
        text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body">
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
      {formState.errors.gender && formState.touchedFields.gender && (
      <p className="text-sm font-semibold text-red-600" role="alert">
      {formState.errors.gender?.message}
      </p>
        )}
    </div>








<div className='mb-3'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <LuCalendar className='text-gray-400 mt-1' />
    </div>
    <input
    {...register('dateOfBirth', )} 
    type="date"
    id="dateOfBirth" 
    className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
    text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body" />
  </div>
      {formState.errors.dateOfBirth && formState.touchedFields.dateOfBirth && (
      <p className="text-sm font-semibold text-red-600" role="alert">
      {formState.errors.dateOfBirth?.message}
      </p>
      )}
</div>


<div className='mb-3'>
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



<div className='mb-3'>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <PiKeyBold className='text-gray-400 mt-1' />
    </div>
    <input
    {...register('rePassword', )} 
    type="password"
    id="rePassword" 
    className="block w-full ps-9 pe-3 py-3 bg-gray-100 focus:bg-white border border-gray-300 
    text-heading text-sm rounded-xl  focus:outline-1 placeholder:text-body" placeholder="Confirm password" />
  </div>
      {formState.errors.rePassword && formState.touchedFields.rePassword && (
      <p className="text-sm font-semibold text-red-600" role="alert">
      {formState.errors.rePassword?.message}
      </p>
      )}
</div>



<button disabled={isLoading} type="submit" className="text-white mt-4 bg-blue-900 cursor-pointer w-full
      focus:outline-none dark:hover:bg-blue-950 font-medium rounded-xl text-bold px-4 
    py-3 text-center leading-5">{isLoading ? 'Loading...' : 'Create New Account'}</button>
</form>



</div>
</div>
  </div>
  </>
}
