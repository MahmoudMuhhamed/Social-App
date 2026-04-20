import { useEffect, useState } from "react";
import axios from "axios";
import { LuUsers } from 'react-icons/lu';
import { LuSearch } from 'react-icons/lu';
import { LuUserPlus } from 'react-icons/lu';



export default function SuggestedFriends() {
  const [users, setUsers] = useState([]);


  useEffect(() => {

    axios.get("https://route-posts.routemisr.com/users/suggestions?limit=5", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      }
    })
      .then((res) => {
        setUsers(res?.data.data.suggestions);
        
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

    return <>
  <div className="min-h-screen flex items-start mt-4 xl:mt-7">
  <div  className="xl:w-75 w-full bg-white rounded-2xl shadow-md p-4 xl:fixed top-18 right-25">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LuUsers className='w-5 h-5 text-blue-500'/>
            <span className="font-bold text-gray-900 text-base">Suggested Friends</span>
          </div>
          <span className="text-gray-600 bg-gray-100 px-2 rounded-4xl font-semibold text-sm">5</span>
        </div>

        {/* Search */}
        <form className="max-w-md mx-auto mb-3">   
        <div className="relative ">
            <div className="absolute inset-y-0  start-0 flex items-center ps-3 pointer-events-none">
              <LuSearch className="w-4 h-4 text-body"/>
            </div>
            <input type="search" id="search" className="rounded-xl block w-full p-2 ps-9 border border-gray-100
            text-sm bg-gray-50 focus:outline-1 focus:outline-blue-600" placeholder="Search Friends..." />
            </div>
        </form>

        {/* Friend Cards */}
        
        {users.map((user) => (
            <div key={user.id} className="flex flex-col mt-2 gap-3">

            <div  className="border border-gray-200 rounded-xl p-3">
              <div className="flex items-center justify-between">
                {/* Avatar + Info */}
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 overflow-hidden rounded-full bg-linear-to-br flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    <img className="object-cover " src={user.photo} alt="userphoto" />
                    
                  </div> 
                  <div>
                    <p className="font-semibold text-gray-900 text-sm leading-tight">{user.name}</p>
                    <p className="text-gray-500 text-xs">@{user.username}</p>
                  </div>
                </div>

                {/* Follow button */}
                <div className="flex cursor-pointer items-center gap-1 bg-blue-50 text-blue-500 text-xs font-bold px-3 py-1.5 rounded-2xl hover:bg-blue-100 ">
                  <LuUserPlus className="w-3.5 h-3.5"/>
                  Follow
                </div>
              </div>

              {/* Followers badge */}
              <div className="mt-2">
                <span className="text-[11px] text-gray-500 bg-gray-100 rounded-full px-2 py-1">{user.followersCount} followers</span>
              </div>
            </div>
        </div>
        )
          
      )}

      </div>



      <div>
      </div>
    </div>







    </>

}
// )

//     }




