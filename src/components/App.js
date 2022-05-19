import { useState, useEffect } from 'react';

import './app.component.stules.css';
import Form from './Form';
import ContactItem from './ContactsItem';
import Filter from './Filter';

export default function App() {
  const [contacts, addContact] = useState(
    JSON.parse(localStorage.getItem('localContact')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, newFilter] = useState('');

  const formSubmitHandler = data => {
    const isNameExist = contacts.some(contact => {
      return contact.name.toLocaleLowerCase() === data.name.toLocaleLowerCase();
    });
    if (!isNameExist) {
      addContact(prevState => [...contacts, data]);
    } else {
      alert(`${data.name} is already in contacts`);
    }
  };

  const visibleContactCards = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = e => {
    newFilter(prevState => e.target.value);
    visibleContactCards();
  };

  const deleteContact = id => {
    addContact(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('localContact', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <section className="block">
      <h2>Name</h2>
      <Form onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter onChangeFilter={changeFilter} filter={filter} />
      <ContactItem
        contacts={visibleContactCards()}
        deleteContact={deleteContact}
      />
    </section>
  );
}
