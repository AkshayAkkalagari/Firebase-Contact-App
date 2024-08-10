import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
        {isOpen && (
            <div className=' grid place-items-center absolute top-0 h-screen z-40 backdrop-blur w-screen'>
                <div className='relative m-auto min-h-[200px] z-50 min-w-[80%] bg-white px-4 py-2'>
                    <div className='flex justify-end'>
                        <AiOutlineClose onClick={onClose} className="text-2xl self-end" />
                    </div>
                    {children}
                </div>
            </div>
        )}
    </>,
    document.getElementById("modal-root")
  )
}

export default Modal
