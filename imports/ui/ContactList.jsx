import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactList = () => {
  const contacts = useTracker(() => {
    return ContactsCollection.find({}, { sort: { createdAt: -1 } }).fetch();
  })

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

  return (
    <div>
      <div className="mt-10">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Contact List
        </h3>
        <ul role="list" className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
          {contacts.map((person, personIdx) => (
            <li key={personIdx} className="py-4 flex items-center justify-between space-x-3">
              <div className="min-w-0 flex-1 flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{person.email}</p>
                </div>
                <div>
                  <a href="#" onClick={(event) => removeContact(event, person._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}