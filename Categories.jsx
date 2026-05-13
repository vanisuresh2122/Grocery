import React, { useEffect, useRef } from "react";
import { categories } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = 0.5;
    let animationFrameId;

    const scroll = () => {
      container.scrollLeft += scrollSpeed;

      
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="mt-16 w-[90%] mx-auto">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
<div
  ref={scrollRef}
  className="flex gap-6 mt-6 overflow-x-auto hide-scrollbar pb-3 whitespace-nowrap"
>

        {[...categories, ...categories].map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer min-w-[140px] h-[160px] 
             py-5 px-3 rounded-lg flex flex-col 
             justify-between items-center text-center flex-shrink-0"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-130 transition max-w-20"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
