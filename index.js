// === CONSTANTS ====
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2510-FTB-CT-WEB-PT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// API documentation = https://fsa-crud-2aa9294fe819.herokuapp.com/api/#tag/Events

// === STATE ====
let allParties = [];
let selectedParties;

const getAllParties = async () => {
  try {
    const response = await fetch(API);
    const responseData = await response.json();
    allParties = responseData.data;
    console.log(`allParties`, allParties);
    render();
  } catch(err) {
    console.error(err);
  }
}

const getIndivParty = async (id) => {
  try {
    const response = await fetch(API + "/" + id);
    const responseData = await response.json();
    selectedParties = responseData.data;
    console.log(`selectedParties`, selectedParties);
    render ();
  } catch(err) {
    console.error(err);
  }
}

const partyList = (party) => {
  const $li = document.createElement("li");
    $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;
    $li.addEventListener("click", () => getIndivParty(party.id));
    return $li;
}


// renders list of party names
const ListofParties = () => {
  const $ul = document.createElement("ul");
    $ul.classList.add("parties");
  const $parties = allParties.map(partyList);
    $ul.replaceChildren(...$parties);
  return $ul;
}
// selected party (single party information)
    // href: to single party information

// renders ---- of selected party 
    // name
    // id
    // date
    // description
    // location

// if no selected party then
    // message: please select a party

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
}

const init = () => {
  getAllParties();
  render();
}
init();

//  ***=== EXTRA ===***
    // selected party is styled differently
    // view guests who have RSVP'ed to selected party
        // fetch from API /rsvps
        // fetch from API /guests

