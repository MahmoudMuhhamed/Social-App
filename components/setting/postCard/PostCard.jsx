import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@heroui/react";
import { LuThumbsUp } from "react-icons/lu";
import { LuMessageCircle } from "react-icons/lu";
import { LuShare2 } from "react-icons/lu";
import { LuRepeat2 } from "react-icons/lu";
import { LuEarth } from "react-icons/lu";
import { Link } from "react-router-dom";
import SinglePost from './../../singlePost/SinglePost';
import Comment from './comment/Comment';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CreateComment from "../../createComment/createComment";





export default function PostCard( {post, isPostDtails = false}  ) {
    const {body, image, topComment, createdAt, user, sharesCount, likesCount, commentsCount, privacy, id} = post;
    const {photo, name, username} = user;
    const myTopcomment =  topComment;


  function getPostComments(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`,
      { headers: {Authorization: `Bearer ${localStorage.getItem('userToken')}`},
    });
  }
  const {data, isLoading, isError, error} = useQuery ({
    queryKey: ['getPostComments'],
    queryFn: getPostComments,
    enabled: isPostDtails,
  });
  // console.log(data?.data.data);

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}day`;
}

  if ( !body && !image ) return;

  return <>
      <div className='xl:max-w-172 mx-auto w-full gap-4 bg-white shadow-md my-3 xl:my-0 rounded-2xl'>
        {/* <h1>No posts yet. Be the first one to publish.</h1> */}
    <Card className="w-full p-2">
      <CardHeader className="flex border-b-0 gap-3 pb-0">
        <Image
        className="rounded-4xl m-0"
          height={40}
          radius="sm"
          src={photo}
          width={40}
        />
        <div className="flex flex-col ">
          <p className="text-md">{name}</p>
          <p className="">
            <span className="text-xs">@{username}</span> . 
            <span className="text-xs text-gray-600 me-1.5 "> {timeAgo(createdAt)}</span> . 
            <span className="ms-2 text-xs"><LuEarth className="inline me-1"/>{ privacy }</span>
            </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-3">
        {body && <p> {body} </p>}
        </div>
        <div className="overflow-hidden">
        {image && <img src={image} alt={body} className="h-125 w-full object-cover"/>}
        </div>
      </CardBody>
      <div className="flex justify-between w-full px-3 mb-1">
        <div>
          <p className="text-gray-600 hover:text-blue-700 hover:underline flex text-sm items-center gap-1 ">
            <span class="flex items-center justify-center me-1 bg-blue-600 text-fg-brand-strong text-xs font-medium h-5 w-5 rounded-full">
            <LuThumbsUp className="w-3 h-3 text-white"/>
            </span>
            <span>{likesCount}</span> likes</p>
        </div>
        <div className="flex gap-3 items-center">
          <p className="text-sm pb-0.5 text-gray-600 flex items-center gap-1"><LuRepeat2 /><span>{sharesCount}</span> shares</p>
          <p className="text-sm pb-0.5 text-gray-600"><span>{commentsCount}</span> comments</p>
          <div className="font-bold text-xs hover:bg-blue-50 cursor-pointer rounded px-2 py-1 ms-2 text-blue-600">
            <Link to={`/SinglePost/${id}`}>View details</Link></div>
        </div>
      </div>
      <Divider></Divider>
      <CardFooter className="p-0">
        <div className="flex justify-around items-center p-1 w-full">
            <button className="flex items-center justify-center p-2 gap-2 hover:bg-gray-100 rounded-lg w-full 
            cursor-pointer text-gray-600 text-sm font-semibold"><LuThumbsUp className="inline text-lg"/>Like</button>
            <button className="flex items-center justify-center p-2 gap-2 hover:bg-gray-100 rounded-lg w-full
            cursor-pointer text-gray-600 text-sm font-semibold"><LuMessageCircle className="inline text-lg"/>Comment</button>
            <button className="flex items-center justify-center p-2 gap-2 hover:bg-gray-100 rounded-lg w-full
            cursor-pointer text-gray-600 text-sm font-semibold"><LuShare2 className="inline text-lg"/>Share</button>
        </div>
      </CardFooter>

      {isPostDtails === false && myTopcomment && (
        <Comment comment={myTopcomment} />
      )}
      {isPostDtails && data?.data.data.comments.map((currentComment) => <Comment comment={currentComment} />)}

      <div>
      <CreateComment postId = {id} queryKey={isPostDtails ? ['getPostComments'] : ["getAllPosts"]}/>

      </div>

    </Card>


      </div>

  </>
}
