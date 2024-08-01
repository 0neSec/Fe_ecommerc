// components/Banner.tsx
import React from 'react';

interface BannerProps {
  backgroundImage: string;
  title: string;
  description: string;
}

const Banner: React.FC<BannerProps> = ({ backgroundImage, title, description }) => {
  return (
    <div
      className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white -z-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-4">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default Banner;
