import CreateContact from "./CreateContact";
import { useState } from "react";
import { User } from "./CreateContact";
import {
  FaUserPlus,
  FaSearch,
  FaRegWindowClose,
  FaRegEdit,
} from "react-icons/fa";
function App() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [createClicked, setCreateClicked] = useState<boolean>(false);
  const [currentContact, setCurrentContact] = useState<User>({
    firstName: "",
    lastName: "",
    contact: "",
  });

  const editData = (item: User) => {
    setCreateClicked(true);
    setCurrentContact(item);
  };
  const deleteContact = (index: number) => {
    setContacts(contacts.filter((item, idx) => idx !== index));
  };

  return (
    <div className="bg-slate-500 h-screen flex flex-col items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-3 h-12 w-[400px] border rounded-2xl  bg-white ">
        <FaSearch className="text-lg" />
        <input
          type="text"
          placeholder="Search Contacts"
          className="h-8 w-[350px]"
        />
      </div>
      <div className="flex h-12 items-center justify-center gap-3 w-[400px]">
        <FaUserPlus className="text-lg" />
        <h3
          className="text-xl cursor-pointer"
          onClick={() => setCreateClicked(true)}
        >
          Create New Contact
        </h3>
      </div>
      {createClicked ? (
        <div className="bg-transparent fixed h-full w-full flex items-center justify-center">
          <CreateContact
            contacts={contacts}
            updateContacts={setContacts}
            closeModal={setCreateClicked}
            currentContact={currentContact}
          />
        </div>
      ) : null}
      <div className="flex gap-3 flex-col">
        {contacts.map((item, index) => (
          <div className="text-white border rounded-lg w-[300px] h-10 text-center pt-1 flex justify-between p-2">
            <div>{item.firstName + " " + item.lastName}</div>
            <div className="flex gap-3">
              <button
                className="text-xl content-center"
                onClick={() => editData(item)}
              >
                <FaRegEdit />
              </button>
              <button
                className="text-xl content-center"
                onClick={() => deleteContact(index)}
              >
                <FaRegWindowClose />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
