import React from 'react';

const CarInfo = ({ car, onClick }) => {
  const { id, name, href, imageSrc, imageAlt, price } = car;

  return (
    <a key={id} href={href} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" onClick = {onClick}>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-5 text-xl text-gray-900 italic">{name}</h3>
      <p className="mt-2 text-xl font-medium text-gray-900 italic">{price}</p>
    </a>
  );
};

export default CarInfo;
