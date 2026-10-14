import { useSelector } from "react-redux";
import { selectContacts, selectFilter } from "../../redux/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  if (visibleContacts.length === 0) {
    return <p className={css.empty}>No contacts found.</p>;
  }

  return (
    <ul className={css.list}>
      {visibleContacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
}