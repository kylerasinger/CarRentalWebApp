import Link from 'next/link';

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl bg-gray-800 text-[#f3f1f1] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-4xl font-bold text-center py-8'>Customer</h2>
              <p className='text-center text-2xl font-bold'>Looking to rent a car?</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Safety</p>
                  <p className='py-2 border-b mx-8'>Speed</p>
                  <p className='py-2 border-b mx-8'>Comfort</p>
              </div>
              <div className="text-center"> {/* Added text-center class */}
                <Link href="/customer/customerView">
                  <button className='bg-black text-[#515cfc] w-[200px] rounded-md font-medium my-6 px-6 py-3'>Access Page</button>
                </Link>
              </div>
          </div>
          <div className='w-full shadow-xl bg-gray-800 text-[#f3f1f1] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-4xl font-bold text-center py-8'>CS Agent</h2>
              <p className='text-center text-2xl font-bold'>CSA reserved page</p>
              <div className='text-center font-medium'>
                <p className='py-2 border-b mx-8 mt-8'>Information</p>
                <p className='py-2 border-b mx-8'>Operation</p>
                <p className='py-2 border-b mx-8'>Help</p>
              </div>
              <div className="text-center"> {/* Added text-center class */}
                <Link href="/csr/csrView">
                  <button className='bg-black text-[#515cfc] w-[200px] rounded-md font-medium my-6 px-6 py-3'>Access Page</button>
                </Link>
              </div>
          </div>
          <div className='w-full shadow-xl bg-gray-800 text-[#f3f1f1] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-4xl font-bold text-center py-8'>Administrator</h2>
              <p className='text-center text-2xl font-bold'>Admin Reserved Page</p>
              <div className='text-center font-medium'>
                <p className='py-2 border-b mx-8 mt-8'>Information</p>
                <p className='py-2 border-b mx-8'>Operation</p>
                <p className='py-2 border-b mx-8'>Application</p>
              </div>
              <div className="text-center"> {/* Added text-center class */}
                <Link href="/admin/adminView">
                  <button className='bg-black text-[#515cfc] w-[200px] rounded-md font-medium my-6 px-6 py-3'>Access Page</button>
                </Link>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Cards;
