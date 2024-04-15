import React from 'react';

const PicturesAnimate = () => {
  return (
    <>
      <div className='pt-64'>
        <div className='relative w-full h-64 grid place-items-center overflow-hidden'>
          {/* Grid container to center and manage layout */}
          <div className='w-48 h-48 relative'>
            {/* Blue Image */}
            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(-3deg)' }}>
              <img src="https://images.pexels.com/photos/20484222/pexels-photo-20484222/free-photo-of-eyes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Blue Visual" className="w-full h-full object-cover" />
            </div>
            {/* Red Image */}
            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(3deg)' }}>
              <img src="https://images.pexels.com/photos/20881051/pexels-photo-20881051/free-photo-of-under-the-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Red Visual" className="w-full h-full object-cover" />
            </div>
            {/* Yellow Image */}
            <div className='absolute inset-0 grid place-items-center' style={{ transform: 'rotate(20deg)' }}>
              <img src="https://images.pexels.com/photos/20881562/pexels-photo-20881562/free-photo-of-mua-v-t-ch-y-d-ng.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Yellow Visual" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PicturesAnimate;
