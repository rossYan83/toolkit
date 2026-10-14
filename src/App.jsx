import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm />
      <h2 className="subtitle">Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
}