// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { Navigation, Pagination } from 'swiper/modules';
// import { useState, useEffect } from 'react';

// interface Blog {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

// const BlogCarousel: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch('/blog.json'); 
//         const data: Blog[] = await response.json();
//         console.log(data);
//         setBlogs(data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="w-[90%] mx-auto my-10">
//       <h2 className="text-3xl font-bold text-center mb-6">Our Blogs</h2>
//       <Swiper
//         modules={[Navigation, Pagination]} // Make sure the modules are passed here
//         spaceBetween={20}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 3 },
//         }}
//         className="pb-10"
//       >
//         {blogs.map((blog) => (
//           <SwiperSlide key={blog.id}>
//             <div className="bg-white shadow-md rounded-lg overflow-hidden">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
//                 <p className="text-gray-600">{blog.description}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default BlogCarousel;
