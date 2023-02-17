import React, { useState } from "react";
import { ContactsCollection } from "../api/ContactsCollection";

export const ContactForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageURL, setImageURL] = useState("");

    const saveContact = () => {
        ContactsCollection.insert({name, email, imageURL});
        setName("");
        setEmail("");
        setImageURL("");
    }

    return (
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input id='name' value={name} onChange={(e) => setName(e.target.value)} type="text" />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
            </div>
            <div>
                <label htmlFor="imageURL">image URL</label>
                <input id='imageURL' value={imageURL} onChange={(e) => setImageURL(e.target.value)} type="text" />
            </div>
            <div>
                <button type="button" onClick={saveContact}>Save Contact</button>
            </div>
        </form>
    )
}