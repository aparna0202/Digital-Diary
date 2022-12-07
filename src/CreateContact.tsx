import { useState } from "react";

export type User = {
  firstName: string;
  lastName: string;
  contact: string;
};
type Props = {
  updateContacts: React.Dispatch<React.SetStateAction<User[]>>;
  currentContact: User;
  contacts: User[];
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateContact = ({
  contacts,
  updateContacts,
  closeModal,
  currentContact,
}: Props) => {
  const [contact, setContact] = useState<User>(
    currentContact
      ? {
          firstName: currentContact.firstName,
          lastName: currentContact.lastName,
          contact: currentContact.contact,
        }
      : {
          firstName: "",
          lastName: "",
          contact: "",
        }
  );

  const [error, setError] = useState<boolean>(false);

  let pattern = new RegExp("^[0-9]{10}$");

  const resetModal = () => {
    setContact({ firstName: "", lastName: "", contact: "" });
  };

  const saveContacts = () => {
    if (
      currentContact.firstName !== "" &&
      currentContact.contact !== ""
    ) {
      (currentContact.firstName = contact.firstName),
        (currentContact.lastName = contact.lastName),
        (currentContact.contact = contact.contact);
      closeModal(false);
      console.log('running');
    } 
    else if (contact.firstName && pattern.test(contact.contact)) {
      updateContacts([...contacts, contact]);
      closeModal(false);
      console.log('running again');
    }

    if (!pattern.test(contact.contact)) {
      setError(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-red-300 h-[500px] w-[500px] border rounded-lg shadow-xl">
      <input
        type="text"
        placeholder="First Name"
        className="h-9 w-[300px] p-4"
        value={contact.firstName}
        onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="h-9 w-[300px] p-4"
        value={contact.lastName}
        onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact Number"
        className="h-9 w-[300px] p-4"
        style={{ border: error ? "3px solid red" : "" }}
        value={contact.contact}
        onChange={(e) => setContact({ ...contact, contact: e.target.value })}
      />
      <div className="flex justify-between w-[300px]">
        <button className="bg-white w-[90px] h-7" onClick={saveContacts}>
          Save
        </button>
        <button className="bg-white w-[90px] h-7" onClick={resetModal}>
          Cancel
        </button>
        <button
          className="bg-white w-[90px] h-7"
          onClick={() => closeModal(false)}
        >
          Close
        </button>
      </div>
      {error ? <div className="text-red">Invalid Contact Number!</div> : null}
    </div>
  );
};

export default CreateContact;
