import React from 'react';


const car = [
  {
    id: 1,
    name: 'Lamborghini',
    href: '#',
    imageSrc: 'https://static.cargurus.com/images/forsale/2023/11/18/03/17/2017_lamborghini_huracan-pic-5724806565865551535-1024x768.jpeg',
    imageAlt: "Luxurious lamborghini",
    price: '$50',
 },

 {
  id: 2,
  name: 'Ford Mustang GT',
  href: '#',
  imageSrc: 'https://hips.hearstapps.com/hmg-prod/images/img-2033-jpg-64bec5598090f.jpg?crop=0.752xw:1.00xh;0.129xw,0&resize=640:*',
  imageAlt: "2024 Ford Mustang GT",
  price: '$50'
 },

{ id:3,
  name: 'Acura Integra Type S',
  href: '#',
  imageSrc: 'https://tdrpmimages.azureedge.net/photos/import/202401/2701/0558/f221fc3f-86a2-42d5-97f5-d7e117477c31.jpg-1024x786',
  imageAlt: "2023 Acura Integra Type S",
  price: '$50'
},

{id: 4,
 name: 'Cadillac CTA Sport',
 href: '#',
 imageSrc: 'https://di-uploads-pod34.dealerinspire.com/donwheatoncadillac/uploads/2021/11/FB-New-2022-Cadillac-CT4-for-Sale-Edmonton-AB.jpg',
 imageAlt: "2021 Cadillac CTA Sport",
 price: '$50'
},


{id: 5,
 name: 'Honda Accord',
 href: '#',
 imageSrc: 'https://m.otogo.ca/tmp/dealers-images/content.homenetiol.com/2000017/2207716/0x0/88e1f43299664815b99edd7d6b7206c6-640x480.webp',
 imageAlt: "2021 Honda Accord",
 price: '$50'
},

{id: 6,
name: 'Toyota Prius',
href: '#',
imageSrc: 'https://cdn02.carsforsale.com/3/410600/15299572/thumb/978059827.jpg',
imageAlt: "2013 Toyota Prius",
price: '$50'
},

{id: 7,
 name: 'Lucid Air',
 href: '#',
 imageSrc: 'https://cdn.carbuzz.com/gallery-images/1600/1027000/400/1027454.jpg',
 imageAlt: "2023 Lucid Air",
 price: '$50'
},

{id: 8,
 name: 'Porsche 718',
 imageSrc: 'https://img.sm360.ca/ir/w345h260c/images/inventory/mercedes-benz-montreal-est/porsche/718-cayman/2020/32029276/32029276_09252_i5bi2p5a.jpeg',
 imageAlt: "2021 Porsche 718",
 price: '$50'
},

{id: 9,
  name: 'Porsche 718',
  imageSrc: 'https://img.sm360.ca/ir/w345h260c/images/inventory/mercedes-benz-montreal-est/porsche/718-cayman/2020/32029276/32029276_09252_i5bi2p5a.jpeg',
  imageAlt: "2021 Porsche 718",
  price: '$50'
 }
 
]
const CarDisplay = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {car.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarDisplay;

