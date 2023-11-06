const { useEffect, useState } = require("react");

function Contacts() {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState();
  const [error, setError] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const contacts = await res.json();
        setContacts(contacts);
        setFilteredContacts(contacts);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchContacts();
  }, []);

  function handleSearch(e) {
    setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // filter the contacts based on the provided search text for the name
    const filteredContacts = contacts.filter((contact) => {
      // trim white spaces and convert to lowercase for case insensitive searches.
      const search = searchText.trim().toLowerCase();

      const { username, name } = contact;

      return (
        name.toLowerCase().includes(search) ||
        username.toLowerCase().includes(search)
      );
    });

    setFilteredContacts(filteredContacts);
  }

  if (isLoading) {
    return <p>Loading contacts...</p>;
  }
  if (error) {
    return <p>Error occured while loading contacts. Please try again later!</p>;
  }

  return (
    <div>
      <h1 id="contact-list">List of Contacts: {filteredContacts.length}</h1>
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor="search" className="visually-hidden">
          Search by name or username
        </label>
        <input
          id="search"
          name="search"
          placeholder="Search by name or username"
          value={searchText}
          onChange={handleSearch}
        />
        <button>Search</button>
      </form>
      <ul className="contact_wrapper" aria-labelledby="contact-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <article className="contact_card">
              <div className="contact_name">
                <h2>{contact.name}</h2>
                <small>({contact.username})</small>
              </div>
              <address>
                <a href={`mailto:${contact.email}`}>{contact.email}</a> &nbsp;
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </address>
              <section>
                <h3>Address</h3>
                <address>
                  <span>{contact.address.street}</span>
                  <span>{contact.address.suite}</span>
                  <span>{contact.address.city}</span>
                  <span>{contact.address.zipcode}</span>
                </address>
                <a href={contact.website}>{contact.website}</a>
              </section>
              <section>
                <h3>Company</h3>
                <span>{contact.name}</span>
                <em>{contact.catchPhrase}</em>
              </section>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
