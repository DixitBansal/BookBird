// import React, { useRef } from 'react'
// import posts from '../components/data.json';
// import { Posts } from '../components/home/Posts';
// import { LoadingPosts } from '../components/LoadingPosts';
// import Cards from '../components/Cards';
// import useLazyLoad from '../components/useLazyLoad';
// import clsx from "clsx";
// const NUM_PER_PAGE = 3;
// const TOTAL_PAGES = 6;

// export default function UserPosts() {
//   const user_id=100;
//   const user_posts=posts['data'].filter((value)=>{
//     return value.id==user_id?value.id:null;
//   });
//   const triggerRef = useRef(null);
//   const onGrabData = (currentPage,user_image=user_posts) => {
//     // This would be where you'll call your API
//     return new Promise((resolve) => {
//     setTimeout(() => {
//         const data = user_image.slice(
//         ((currentPage - 1)%TOTAL_PAGES) * NUM_PER_PAGE,
//         NUM_PER_PAGE * (currentPage%TOTAL_PAGES)
//         );
//         console.log(data);
//         resolve(data);
//     }, 0);
//     });
// };
//   const { data, loading } = useLazyLoad({ triggerRef, onGrabData });
//   console.log('user_post=',user_posts);
//   return (
//     <>
//      <div className='text-center  text-xl p-4 font-bold text-white bg-blue-500'>POSTS</div>
//      <div className="m-auto w-full">
//         {user_posts.map(image => {
//             return <Cards owner={image["owner"]} imageUrl={image["imageUrl"]} key={image["id"]}/>
//         })}
//         </div>
      
//     </>
    
//   )
// }
