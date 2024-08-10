import React from 'react'
import Modal from './Modal'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import * as Yup from "Yup";

const contactsSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is Required"),
  email:Yup.string().email("Invalid Email").required("Email is Required"),
})

const AddAndUpdateContact = ({isOpen,onClose, isUpdate, contact}) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db,"contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error)
    }
  }

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db,"contacts",id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Modal isOpen = {isOpen} onClose={onClose}>
        <Formik validationSchema={contactsSchemaValidation}
            initialValues={
              isUpdate  
                ? {
                    name:contact.name, 
                    email:contact.email,
                  }
                : {
                    name:"", 
                    email:"",
                  }
            } 
            onSubmit={(values) => {
                console.log(values);
                isUpdate ? updateContact(values,contact.id) : addContact(values);
            }}
        >
            <Form className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name'>Name</label>
                    <Field name="name" className="border h-10" />
                    <div className='text-red-600 text-xs'>
                      <ErrorMessage name='name' />
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email'>Email</label>
                    <Field type="email" name="email" className="border h-10" />
                    <div className='text-red-600 text-xs'>
                      <ErrorMessage name='email' />
                    </div>
                </div>
                <button className='bg-orange px-3 py-1.5 border self-end'>
                    {isUpdate ? "Update" : "Add"} Contact
                </button>
            </Form>
        </Formik>
      </Modal> 
    </div>
  )
}

export default AddAndUpdateContact
