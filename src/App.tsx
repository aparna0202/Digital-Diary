import CreateContact from "./CreateContact";
import { useState } from "react";
import { User } from "./CreateContact";
import {
  FaUserPlus,
  FaSearch,
  FaRegWindowClose,
  FaRegEdit,
} from "react-icons/fa";
import SearchBar from "./SearchBar";
function App() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [createClicked, setCreateClicked] = useState<boolean>(false);
  const [currentContact, setCurrentContact] = useState<User>({
    firstName: "",
    lastName: "",
    contact: "",
  });
  const [searchInput, setSearchInput] = useState<string>("");

  const editData = (item: User) => {
    setCreateClicked(true);
    setCurrentContact(item);
  };
  const deleteContact = (index: number) => {
    setContacts(contacts.filter((item, idx) => idx !== index));
  };

  //
  return (
    <div className=" h-screen flex flex-col items-center gap-5">
      <h1 className="bg-slate-800 w-full h-[70px] text-white text-3xl lg:text-4xl font-heading pt-3  pl-10">
        My Contacts
      </h1>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <div className="flex h-10 lg:h-12 items-center justify-center gap-3 w-[200px] lg:w-[400px] bg-slate-800 cursor-pointer border rounded-full text-white hover:bg-white hover:border-slate-800 hover:text-slate-800 hover:transition-all ease-in-out  ">
        <FaUserPlus className="text-sm lg:text-lg" />
        <h3 className="text-sm lg:text-xl " onClick={() => setCreateClicked(true)}>
          Create New Contact
        </h3>
      </div>
      {createClicked ? (
        <div className="backdrop-blur-sm fixed h-full w-full flex items-center justify-center px-10 ">
          <CreateContact
            contacts={contacts}
            updateContacts={setContacts}
            closeModal={setCreateClicked}
            currentContact={currentContact}
          />
        </div>
      ) : null}

      <div className="flex gap-3 flex-col mt-8">
        {contacts
          .filter((item, idx) =>
            searchInput.length > 0 ? item.firstName.match(searchInput) : item
          )
          .sort(function (a, b) {
            const contactA = a.firstName.toUpperCase();
            const contactB = b.firstName.toUpperCase();

            if (contactA < contactB) {
              return -1;
            }
            if (contactA > contactB) {
              return 1;
            }

            return 0;
          })
          .map((item, index) => (
            <div className="text-slate-800 border border-slate-800 w-[300px] h-10 text-center pt-1 flex justify-between p-2">
              <div className="pl-3 text-slate-800 text-xl">{item.firstName + " " + item.lastName}</div>
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
