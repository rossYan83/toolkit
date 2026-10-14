import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import css from "./Contact.module.css";

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  return (
    <li className={css.item}>
      <span className={css.text}>
        {name}: {number}
      </span>
      <button
        className={css.button}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
}

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};