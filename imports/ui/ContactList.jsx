import React, { memo } from "react";
import { useTracker, useSubscribe, useFind } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactList = () => {
  const isLoading = useSubscribe('allContacts');
  const contacts = useFind(() => ContactsCollection.find({}, { sort: { createdAt: -1 } }))

  // const contacts = useTracker(() => {
  //   return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  // })

  const removeContact = (event, _id) => {
    event.preventDefault();
    Meteor.call('contacts.remove', { contactId: _id }, (res) => {
      if (!res) {
        iziToast.success({
          position: 'center',
          title: 'Success!',
          message: 'Contact deleted'
        });
      } else {
        iziToast.error({
          position: 'center',
          title: 'Error!',
          message: 'Contact not deleted'
        });
      }
    });
  }

  if (isLoading()) {
    return (
      <div>
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Loading...
          </h3>
        </div>
      </div>
    )
  }

  const ContactItem = memo(({ contact }) => {
    return (
      <li className="py-4 flex items-center justify-between space-x-3">
        <div className="min-w-0 flex-1 flex items-center space-x-3">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src={contact.imageUrl} alt="" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
            <p className="text-sm font-medium text-gray-500 truncate">{contact.email}</p>
          </div>
          <div>
            <a href="#" onClick={(event) => removeContact(event, contact._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
              </svg>
            </a>
          </div>
        </div>
      </li>
    )
  });

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((contact) => (
            <ContactItem key={contact._id} contact={contact} />
          ))}
        </ul>
      </div>
    </div>
  )
}