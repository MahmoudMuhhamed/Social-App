import React from 'react';
import axios from 'axios';
import { useQuery, useIsFetching } from '@tanstack/react-query';
import Loader from '../loader/Loader';
import { LuCamera } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuMail } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { useEffect } from 'react';
import { useUser } from '../UserContext/UserContext';
import { Helmet } from 'react-helmet';






export default function Profile() {
  

    const { userData, isLoading, isError, error, data } = useUser();


  

    if (isLoading) {
      return <Loader />;
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }

  return <>

    <Helmet>
      <title>
        {userData?.name}'s Profile | Route Posts
      </title>
    </Helmet>

<div className="min-h-screen w-full p-4">
      <div className="w-full border mx-auto max-w-7xl border-gray-200 rounded-3xl overflow-hidden shadow-lg">
        {/* Cover */}
        <div className="relative h-36 sm:h-55 flex items-start justify-end group"
        style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #3b82f6 100%)",
          }}
        >
          <img className='w-full h-full object-cover' src={userData?.cover} alt="" />
          <div className='absolute flex m-4 gap-2'>
          <button className="
          bg-opacity-70 hover:bg-opacity-90 border-opacity-10 group-hover:opacity-100
          opacity-0 hover:opacity-100 flex items-center gap-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90
          text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all">
              <LuCamera className="w-4 h-4" viewBox="0 0 24 24" />
            Add cover
          </button>
          <button className="
          bg-opacity-70 hover:bg-opacity-90 border-opacity-10 group-hover:opacity-100
          opacity-0 hover:opacity-100 flex items-center gap-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90
          text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all">
              <LuCamera className="w-4 h-4" viewBox="0 0 24 24" />
            Add cover
          </button>
          <button className="
          bg-opacity-70 hover:bg-opacity-90 border-opacity-10 group-hover:opacity-100
          opacity-0 hover:opacity-100 flex items-center gap-2 bg-gray-800 bg-opacity-70 hover:bg-opacity-90
          text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all">
              <LuCamera className="w-4 h-4" viewBox="0 0 24 24" />
            Add cover
          </button>
          </div>
        </div>
        {/* White card body */}
        <div className="bg-white px-5 sm:px-8 pb-8">
          {/* Avatar + Name row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Avatar + identity */}
            <div className="flex items-end gap-4 -mt-10 sm:-mt-9">
              {/* Avatar circle */}
              <div className="relative shrink-0 group ">
                <div className="w-20 h-20 sm:w-30 sm:h-30 rounded-full border-4 border-white shadow-md overflow-hidden bg-linear-to-br from-sky-100 to-blue-200">
                  <img src={userData?.photo} alt="" />
                </div>
                {/* Camera icon & expand icon */}
                <div className='bg-opacity-70 hover:bg-opacity-90 opacity-0 group-hover:opacity-100'>
                <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-colors">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button className="absolute bottom-0 left-0 w-7 h-7 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center shadow-md border border-gray-200 transition-colors">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                </div>
              </div>
              {/* Name & badge */}
              <div className="mb-1 sm:mb-2 mt-10">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{userData?.name}</h1>
                <p className="text-gray-500 text-sm font-medium">@{userData?.username}</p>
                <span className="inline-flex items-center gap-1 mt-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                  <LuUsers className='w-3 h-3'/>
                  Route Posts member
                </span>
              </div>
            </div>
          </div>
          {/* Stats row */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "FOLLOWERS",value: userData?.followersCount},
              { label: "FOLLOWING", value: userData?.followingCount},
              { label: "BOOKMARKS", value: userData?.bookmarksCount },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm py-4 px-2">
                <span className="text-[9px] sm:text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                  {label}
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* About + My/Saved Posts */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* About */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-3">
              <h2 className="text-sm font-bold text-gray-700">About</h2>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <LuMail className='w-4 h-4 text-gray-400 shrink-0'/>
                {userData?.email}
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <LuUsers className='w-4 h-4 text-gray-400 shrink-0'/>
                Active on Route Posts
              </div>
            </div>

            {/* My Posts + Saved Posts */}
            <div className="flex flex-col gap-3 ">
              {[
                { label: "MY POSTS", value: 0 },
                { label: "SAVED POSTS", value: userData?.bookmarksCount },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-blue-50 rounded-2xl border border-blue-100 px-5 py-4"
                >
                  <span className="text-[10px] font-bold tracking-widest text-blue-800 uppercase block mb-1">
                    {label}
                  </span>
                  <span className="text-2xl font-extrabold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='w-full border mx-auto max-w-7xl border-gray-200 bg-white rounded-xl overflow-hidden shadow-lg my-2'>

        <div className='p-3 flex items-center gap-5 border-b border-gray-200 '>
              <div className='bg-gray-100 px-1.5 py-1.5 rounded-xl flex gap-2'>
        <button className='bg-white flex items-center cursor-pointer gap-1 px-3 rounded-lg shadow text-blue-600 font-bold text-sm'><LuFileText />My Posts</button>
        <button className='p-1.5 rounded-lg flex items-center cursor-pointer gap-1 font-bold px-3  text-sm text-gray-600'><LuBookmark /> Saved</button>
              </div>


        </div>

    </div>

</div>

</>
}
