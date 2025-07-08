import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import FeatureModal from './FeatureModal'  

const CallToAction = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm text-center max-w-xl'>
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.
      </p>

      <div className='flex items-center font-medium gap-6 mt-4'>
        <button
          className='px-10 py-3 rounded-md text-white bg-blue-600' 
        >
          Get started
        </button>

        <button
          className='flex items-center gap-2'
          onClick={() => setShowModal(true)}
        >
          Learn more
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>

      {/* Show Modal Conditionally */}
      {showModal && <FeatureModal onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default CallToAction
