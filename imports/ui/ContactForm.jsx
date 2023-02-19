import React, { useState } from "react";
//import { ContactsCollection } from "../api/ContactsCollection";
import { Meteor } from "meteor/meteor";

export const ContactForm = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setimageUrl] = useState("");

  const saveContact = () => {
    //ContactsCollection.insert({name, email, imageUrl});
    Meteor.call('contacts.insert', { name, email, imageUrl }, (res) => {
      if (res) {
        iziToast.error({
          position: 'center',
          title: 'Erro!',
          message: res.error
        });
      } else {
        iziToast.success({
          position: 'center',
          title: 'Save!',
          message: 'Contact inserted'
        });
        setName("");
        setEmail("");
        setimageUrl("");
      }
    })

  }

  return (
    <form className="mt-6">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
          <div className="erroName"></div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>

        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setimageUrl(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="px-2 py-3 text-right">
        <button
          type="button"
          onClick={saveContact}
          className="bg-cyan-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-600"
        >
          Save Contact
        </button>
      </div>
    </form>
  )
}