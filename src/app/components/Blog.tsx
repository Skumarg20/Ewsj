'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "How to Crack JEE in 6 Months",
    description: "A complete guide to prepare for JEE in just 6 months.",
    image: "https://picsum.photos/600/400?random=1"
  },
  {
    id: 2,
    title: "Effective Study Techniques for NEET",
    description: "Discover powerful techniques to boost your NEET prep.",
    image: "https://picsum.photos/600/400?random=2"
  },
  {
    id: 3,
    title: "Top 10 Mistakes Students Make",
    description: "Learn about common pitfalls and how to avoid them.",
    image: "https://picsum.photos/600/400?random=3"
  },
  {
    id: 4,
    title: "The Power of Consistent Practice",
    description: "How regular practice can improve your JEE/NEET scores.",
    image: "https://picsum.photos/600/400?random=4"
  },
  {
    id: 5,
    title: "Importance of Mock Tests",
    description: "Why mock tests are critical for exam preparation.",
    image: "https://picsum.photos/600/400?random=5"
  }
];

const BlogCarousel: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-6">Our Blogs</h2>
      <Swiper
        modules={[Navigation, Pagination]} // Make sure the modules are passed here
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogCarousel;
