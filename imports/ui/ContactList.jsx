import React, { memo } from "react";
import { useTracker, useSubscribe, useFind } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactList = () => {
  const isLoading = useSubscribe('contacts');
  const contacts = useFind(() => ContactsCollection.find({}, { sort: { createdAt: -1 } }))

  // const contacts = useTracker(() => {
  //   return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  // })

  const archiveContact = (event, _id) => {
    event.preventDefault();
    Meteor.call('contacts.archive', { contactId: _id }, (res) => {
      if (!res) {
        iziToast.success({
          position: 'center',
          title: 'Success!',
          message: 'Contact arquived'
        });
      } else {
        iziToast.error({
          position: 'center',
          title: 'Error!',
          message: 'Contact not arquived'
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
            <a href="#" onClick={(event) => archiveContact(event, contact._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
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