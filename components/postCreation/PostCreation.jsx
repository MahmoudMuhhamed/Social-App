import React, { useRef, useState } from 'react'
import { LuSend } from "react-icons/lu";
import { LuSmile } from "react-icons/lu";
import { LuImage } from "react-icons/lu";
import { LuLoaderCircle } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";
import { image } from '@heroui/react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../UserContext/UserContext';



export default function PostCreation() {

    const [isUploaded, setisUploaded] = useState(false);
    const textAreaRef = useRef(null);
    const imageInputRef = useRef(null);

    const query = useQueryClient()

    function prepareDate(){
        const formDate = new FormData();
        if (textAreaRef.current.value) {
            formDate.append('body', textAreaRef.current.value);
        }
        if (imageInputRef.current.files[0]) {
            formDate.append('image', imageInputRef.current.files[0]);
        }

        return formDate;
    }

    function createPost(){
        return axios.post(`https://route-posts.routemisr.com/posts`, prepareDate(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }


    const {isPending, mutate} = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            setisUploaded (false);
            console.log('created post');
            query.invalidateQueries({queryKey: ["getAllPosts"]});
            textAreaRef.current.value = "";
            imageInputRef.current.value = "";
            
        }
    })
    function handleImagePreview(e){
        const path = URL.createObjectURL(e.target.files[0]);
        setisUploaded(path);
    }

    function handleRemoveImage(){
        setisUploaded(false);
        imageInputRef.current.value = null;

    }


      const { userData, isLoading, isError, error, data } = useUser();
    





    return (
    <div>
        
        <div className="bg-gray-100 flex xl:px-4 pt-4">
            <div className="w-full bg-white rounded-2xl shadow-md p-4">
                
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-cyan-400 to-blue-500 shrink-0 overflow-hidden">
                    {isLoading ? ( <LuLoaderCircle className='animate-spin text-white w-6 h-6 mx-auto mt-3'/> ) : ( <img src={userData?.photo} alt=""/> ) }
                
                </div>
        
                <div>
                    <p className="font-bold text-gray-900">You</p>
                    <select className="mt-1 text-xs focus:outline-0 font-semibold text-gray-700 flex items-center gap-1 bg-gray-100 rounded-2xl py-1.5 px-2  w-fit">
                    <option value="Public">Public</option>
                    <option value="Followers"> Followers</option>
                    <option value="FR">Only Me</option>
                    {/* <LuEarth className='w-3.5 h-3.5 text-gray-500'/> */}
                    </select>
        </div>
        </div>
                {/* Placeholder text box */}
                <textarea
                ref={textAreaRef}
                className='w-full min-h-35 bg-gray-50 rounded-xl focus:outline-1 focus:outline-blue-600 focus:bg-white p-3 border border-gray-200' name="textArea"
                id="textArea" placeholder={`What's on your mind, ${userData?.name}`}></textarea>
                {isUploaded && <div className='relative'>
                <img src={isUploaded} alt="" className='bg-amber-200 w-full h-55 rounded-lg object-cover'/>
                    <IoCloseCircle onClick={handleRemoveImage} className='absolute top-1.5 end-1.5 text-[30px] cursor-pointer text-gray-900/70'/>
                </div>}
                <hr className="my-3 border-gray-500" />
                {/* Footer */}
                <div className="flex items-center justify-between">
                <div className="flex gap-1">
                {/* Photo/video */}

                <label htmlFor="inp-photo&video" className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-600">
                    <input 
                    ref={imageInputRef}
                    id='inp-photo&video' type="file" hidden onChange={handleImagePreview}/>
                    <LuImage className='w-5 h-5 text-green-500'/>
                    Photo/video
                </label>
                {/* Feeling/activity */}
                <div className="flex items-center gap-1.5 px-3 cursor-pointer hover:bg-gray-100 py-1.5 rounded-lg text-sm font-medium text-gray-600">
                    <LuSmile  className='w-5 h-5 text-yellow-400'/>
                Feeling/activity
                </div>
                </div>
        
                {/* Post button */}
                <button 
                disabled = {isPending}
                onClick={mutate}
                className="flex disabled:bg-blue-400 disabled:cursor-not-allowed items-center cursor-pointer gap-2 px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold">
                Post
                {isPending ? (<LuLoaderCircle className='animate-spin text-white'/>) : (<LuSend className="w-4 h-4 text-white"/>)}
                
                </button>
                </div>
            </div>
            </div>






    </div>
    )
}
