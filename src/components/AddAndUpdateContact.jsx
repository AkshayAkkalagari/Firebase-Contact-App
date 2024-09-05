import React from 'react';
import Modal from './Modal';
import { useForm } from "react-hook-form";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: isUpdate
      ? {
          name: contact.name,
          email: contact.email,
        }
      : {
          name: "",
          email: "",
        },
    mode: 'onTouched'  // Validate inputs on blur or submit
  });

  const addContact = async (contactData) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contactData);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contactData, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contactData);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (values) => {
    isUpdate ? updateContact(values, contact.id) : addContact(values);
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="border h-10"
            />
            {errors.name && (
              <div className="text-red-600 text-xs">{errors.name.message}</div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="border h-10"
              type="email"
            />
            {errors.email && (
              <div className="text-red-600 text-xs">{errors.email.message}</div>
            )}
          </div>

          <button className="bg-orange px-3 py-1.5 border self-end">
            {isUpdate ? "Update" : "Add"} Contact
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
