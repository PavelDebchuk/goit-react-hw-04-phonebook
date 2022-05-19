import { useState } from 'react';
import { nanoid } from 'nanoid';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setKey] = useState('');

  const inputValue = event => {
    const { name, value } = event.currentTarget;
    newKey();
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const newKey = id => {
    setKey(prevstate => (id = nanoid()));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = { name, number, id };
    onSubmit(data);

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          onChange={inputValue}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <input
          className="input"
          type="tel"
          name="number"
          value={number}
          onChange={inputValue}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className="button" type="submit">
        Add contact
      </button>
    </form>
  );
}
