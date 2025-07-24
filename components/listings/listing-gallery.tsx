import React, { useRef, useEffect } from "react";

interface ListingGalleryProps {
  images?: string[];
}

const defaultImages = [
  "https://placehold.co/600x400?text=Image+1",
  "https://placehold.co/600x400?text=Image+2",
  "https://placehold.co/600x400?text=Image+3",
];

const ListingGallery: React.FC<ListingGalleryProps> = ({ images }) => {
  const imgs = images && images.length > 0 ? images : defaultImages;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex flex-nowrap gap-2 overflow-x-auto mb-4"
      style={{ WebkitOverflowScrolling: "touch" }}>
      {imgs.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Property Image ${i + 1}`}
          className="rounded-lg w-48 min-w-[12rem] h-32 object-cover border"
        />
      ))}
    </div>
  );
};

export default ListingGallery;
