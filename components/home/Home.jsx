import React, { useContext, useEffect, useState } from 'react'
import Profile from './../profile/Profile';
import axios from 'axios';
import { LuNewspaper } from "react-icons/lu";
import { LuSparkles } from "react-icons/lu";
import { LuEarth } from "react-icons/lu";
import { LuBookmark } from "react-icons/lu";
import { LuSend } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuSmile } from "react-icons/lu";
import { LuImage } from "react-icons/lu";
import Footer from './../footer/Footer';
import Loader from './../loader/Loader';
import PostCard from '../setting/postCard/PostCard';
import { useQuery } from '@tanstack/react-query';
import PostCreation from '../postCreation/PostCreation';
import SuggestedFriends from './../suggestions/SuggestionsFriends';

function getAllPosts() {
  return axios.get(`https://route-posts.routemisr.com/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    },
  });
}

export default function Home() {
  const {data, isLoading, isError, error, isFetching} = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    staleTime: 1000 * 60 * 5,
    retry: 0,              
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!localStorage.getItem('userToken'),

  })
  if (isLoading) {
    return <Loader />;
  }



  return <>

  <div className='bg-gray-100'>

  <div className='min-h-screen xl:flex md:max-w-7xl pt-3 xl:pt-0  xl:items-end xl:justify-end md:mx-auto px-2 xl:px-0'>
  <div className="">

    <div className="rounded-2xl w-full xl:w-58 grid grid-cols-2 xl:grid-cols-1 xl:gap-0 gap-2 xl:fixed top-18 left-42 text-sm bg-white shadow p-3">
      <a href="#" aria-current="true" className="flex bg-gray-50 xl:bg-white items-center gap-2 mb-1 text-gray-700 font-bold rounded-xl w-full px-4 py-2 hover:bg-gray-100 border-b border-none cursor-pointer focus:text-blue-600 focus:bg-blue-100">
        <LuNewspaper className='text-lg' /> Feed
      </a>
      <a href="#" className="flex items-center gap-2 bg-gray-50 xl:bg-white text-gray-700 mb-1 font-bold rounded-xl w-full px-4 py-2 border-b border-none cursor-pointer hover:bg-gray-100 hover:text-fg-brand focus:outline-none focus:text-blue-600 focus:bg-blue-100">
        <LuSparkles className='text-lg' /> My Posts
      </a>
      <a href="#" className="flex items-center gap-2 bg-gray-50 xl:bg-white text-gray-700 mb-1 font-bold rounded-xl w-full px-4 py-2 border-b border-none cursor-pointer hover:bg-gray-100 hover:text-fg-brand focus:outline-none focus:text-blue-600 focus:bg-blue-100">
        <LuEarth className='text-lg' /> Community
      </a>
      <a href="#" className="flex items-center gap-2 bg-gray-50 xl:bg-white text-gray-700 mb-1 font-bold rounded-xl w-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-fg-brand focus:outline-none focus:text-blue-600 focus:bg-blue-100">
        <LuBookmark  className='text-lg' /> Saved
      </a>
    </div>

  </div>


  
  <div className='xl:flex xl:flex-col xl:m-auto xl:max-w-180 mt-1 xl:w-full gap-3'>
      <PostCreation />

      {data?.data.data.posts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Posts Yet</h2>
          <p className="text-gray-600 mb-4">Be the first to share something with your community!</p>
        </div>
      ) : (
        data?.data.data.posts.map((post) => (
        <PostCard key={post.id} post ={post}/>
      )) )}
  </div>


  <div>
      <SuggestedFriends />
  </div>

  </div>
  </div>
  </>
}
