import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { IoIosSearch } from "react-icons/io";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from './config/firebase';
import ContactCard from './components/ContactCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclose from './hooks/useDisclose';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from './components/NotFoundContact';

function App() {

  const [contacts, setContacts] = useState([]);

  const {isOpen, onClose, onOpen} = useDisclose();

  useEffect(() => {
    const getContacts = async() => {
      try {
        const contactsRef = collection(db,"contacts");

        onSnapshot(contactsRef,(snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          });
          setContacts(contactLists);
          return(contactLists);
        })
        
      } catch (error) {
        console.log(error)
      }
    }
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db,"contacts");

        onSnapshot(contactsRef,(snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          });

          const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))

          setContacts(filteredContacts);
          return(filteredContacts);
        })  
  }

  return (
    <>
      <div className='max-w-[370px] mx-auto px-4'>
        <Navbar />
        <div className='flex gap-2'>
          <div className='flex relative items-center flex-grow'>
            <IoIosSearch className='ml-2 absolute text-white text-3xl'/>
            <input onChange={filterContacts} type='text' className='pl-11 text-white flex-grow h-10 border bg-transparent border-white rounded-md' />
          </div>
            <AiFillPlusCircle onClick={onOpen} className='text-5xl cursor-pointer text-white' />
        </div>
        <div className='mt-4 gap-3 flex flex-col'>
          {contacts.length <= 0 ? <NotFoundContact /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position='bottom-center'/>
    </>
  )
}

export default App
