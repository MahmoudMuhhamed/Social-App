import React from 'react';
import { CardHeader, image } from '@heroui/react';
import { CardFooter } from '@heroui/react';
import { Image } from '@heroui/react';




export default function Comment({comment}) {


function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}day`;
}

  return (
    <CardFooter>
    <CardHeader className="rounded-2xl flex flex-col items-start  gap-3 p-4">
        {/* <h1 className="block text-xs text-gray-500 p-0 font-bold">Top Comment</h1> */}
        <div className="flex w-full">
        <Image
        className="rounded-4xl m-0"
          height={32}
          radius="sm"
          src={comment?.commentCreator.photo}
          width={35}
        />
        <div className="flex flex-col ms-2 bg-gray-100 w-full p-2 rounded-xl">
          <p className="text-xs font-bold">{comment?.commentCreator.name}</p>
          <p className="text-[11px] mb-2 text-gray-500">@{comment?.commentCreator.username} . {timeAgo(comment?.createdAt)}</p>
          <p className="text-sm">{comment?.content} {comment?.image && <img src={comment?.image} alt='picture' className='max-w-50 rounded-lg object-cover mt-1.5'/>}</p>
          <div className=''>
          <span className="text-gray-600 px-1 rounded-4xl text-[11px]">{timeAgo(comment?.createdAt)}</span>
          <span className="text-gray-600 px-1 cursor-pointer hover:underline rounded-4xl text-[11px]">Like (0)</span>
          <span className="text-gray-800 px-1 cursor-pointer hover:underline rounded-4xl text-[11px]">Reply</span>
        </div>
        </div>
        </div>
        
      </CardHeader>

    </CardFooter>

  )
}
