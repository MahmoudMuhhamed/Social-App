import { useMutation, useQuery, useQueryClient, useIsFetching } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form';
import { LuSendHorizontal } from "react-icons/lu";
import { LuLoaderCircle } from "react-icons/lu";
import { useEffect } from 'react';
import { useUser } from '../UserContext/UserContext';





export default function CreateComment({postId, queryKey}) {


  const query = useQueryClient();
  query.invalidateQueries({queryKey: queryKey});


    const form = useForm({
        defaultValues: {
            body: "",
            image: "",
        },
    });

    const {register, handleSubmit, reset} = form;

    const createdComment = {
        content: "",
        image: "",
    };





    const formData = new FormData()
    

    function commentCreation(){
          return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            },
        },
        );
    }

    const {isPending, mutate} = useMutation({
      mutationFn : commentCreation,
      onSuccess: () => { 
        query.invalidateQueries({queryKey: queryKey});
        reset();
      },
      onError: () => {},
      onSettled: () => {},
    })


      const { userData, isLoading, isError, error, data } = useUser();





    function handleCreateComment(values) {

      if (!values.body && !values.image[0]) return;

      if (values.body) {
          formData.append('content', values.body);
      }

      if (values.image[0]) {
          formData.append('image', values.image[0])
      }

      mutate();

    }










  return <>


<div>


<form onSubmit={handleSubmit(handleCreateComment)}>

<div className="flex items-start gap-3 p-2">

        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
          <img src={userData?.photo} alt="" className='rounded-full'/>
        </div>
      {/* Input Box */}
      <div className="flex-1 border border-blue-100 rounded-2xl bg-white px-4 pt-3 pb-2">
        <input
          type="text"
          {...register("body")}
          placeholder={`Comment as ${userData?.name}`}          
          className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
        />

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          {/* Icons */}
          <div className="flex items-center gap-3">
            {/* Image icon */}
            
              <label htmlFor="inp-file" className='text-gray-400 hover:text-blue-500 transition-colors'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              </label>
              <input id='inp-file' type="file" hidden 
              {...register("image")}
              />
            
            {/* Emoji icon */}
            <button className="text-gray-400 hover:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {/* Send button */}
          <button
            disabled={isPending}
            type='submit'
            className="w-9 h-9 rounded-full disabled:bg-blue-400 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-colors">
              {isPending ? (<LuLoaderCircle className='animate-spin text-white'/>) : (<LuSendHorizontal className="w-4 h-4 text-white"/>)}
          </button>
        </div>
      </div>
    </div>






</form>




</div>









  </>
}
