import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from './../loader/Loader';
import { useQuery } from '@tanstack/react-query';
import PostCard from './../setting/postCard/PostCard';



export default function SinglePost() {
    const {id} = useParams();

    function getSinglePost (){
        return axios.get (`https://route-posts.routemisr.com/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
        });
    }


    const {data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getSinglePost,
    });
    // console.log(data?.data.data.post);  
    if (isLoading) {
        return <Loader />;
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }
    return <>
    <div className='mt-5'>
    <PostCard post={data?.data.data.post} isPostDtails/>
    </div>
    </>
    }