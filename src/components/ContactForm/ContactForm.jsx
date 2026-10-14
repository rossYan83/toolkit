import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { selectContacts } from "../../redux/selectors";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedNumber = number.trim();
    if (!trimmedName || !trimmedNumber) return;

    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      alert(`${trimmedName} is already in contacts.`);
      return;
    }

    dispatch(addContact({ name: trimmedName, number: trimmedNumber }));
    setName("");
    setNumber("");
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+(([' \-][a-zA-Zа-яА-ЯіІїЇєЄґҐ ])?[a-zA-Zа-яА-ЯіІїЇєЄґҐ]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces."
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}