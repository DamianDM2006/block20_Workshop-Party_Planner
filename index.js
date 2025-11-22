// === CONSTANTS ====
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2510-FTB-CT-WEB-PT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === STATE ====
let allParties = [];
let selectedParties;

const getAllParties = async () => {
  try {
    const response = await fetch(API);
    const responseData = await response.json();
    allParties = responseData.data;
    render();
  } catch (err) {
    console.error(err);
  }
};

const getIndivParty = async (id) => {
  try {
    const response = await fetch(API + "/" + id);
    const responseData = await response.json();
    selectedParties = responseData.data;
    render();
  } catch (err) {
    console.error(err);
  }
};

const partyList = (party) => {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;
  $li.addEventListener("click", () => getIndivParty(party.id));
  return $li;
};

const ListofParties = () => {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");
  const $parties = allParties.map(partyList);
  $ul.replaceChildren(...$parties);
  return $ul;
};

const displayDetails = () => {
  if (!selectedParties) {
    const $p = document.createElement("p");
    $p.textContent = "Please, choose a FUNction to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $party.classList.add("party");
  $party.innerHTML = `
      <h3>${selectedParties.name}</h3>
      <h4>Date and Time of the Event:</h4>
        <p>${selectedParties.date}
          <small> (We are expecting a considerable turnout from our U.S. Navy and Coast Guard community) </small>
        </p>
        <p>${selectedParties.description}</p>
        <p><strong>Address:</strong>  ${selectedParties.location}</p>
        <p>Please, reference event ID: <small>== ${selectedParties.id} ==</small> when enrolling.</p>

      `;
  return $party;
};

const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Plan Your Next Social Event</h1>
  <main>
    <section>
      <h2>Upcoming FUNctions</h2>
      <ListofParties></ListofParties>
    </section>
    <section id="selected">
      <h2>Event Details</h2>
      <IndivPartyDetails></IndivPartyDetails>
    </section>
  </main>
  `;
  $app.querySelector("ListofParties").replaceWith(ListofParties());
  $app.querySelector("IndivPartyDetails").replaceWith(displayDetails());
};

const init = async () => {
  await getAllParties();
  render();
};
init();
