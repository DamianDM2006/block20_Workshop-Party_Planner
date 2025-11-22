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
    let id = 8218;
    const response = await fetch(API + "/" + id);
    const responseData = await response.json();
    selectedParties = responseData.data;
    console.log(`selectedParties`, selectedParties);
    render ();
  } catch(err) {
    console.error(err);
  }
}
getIndivParty();


// renders list of party names
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

