import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const updateFilters = (newType) => setFilters({type: newType}) 
  
  const fetchPets =() => {
    if (filters.type === "all") {
      fetch("http://localhost:3001/pets")
        .then(resp => resp.json())
        .then(data => setPets(data))
      }
    else fetch(`http://localhost:3001/pets?type=${filters.type}`)
      .then(resp => resp.json())
      .then(data => setPets(data))
  }

  const updateAdopted = (id) => {
    const newPetArray = pets.map((pet)=> {
      if (pet.id === id) {
        return {
          ...pet,
          isAdopted: true,
        };
      } else {
        return pet;
      }
    });
    setPets(newPetArray);
  }

  // This callback should take in an id for a pet, find the matching pet in the 
  // pets array in App, and set the isAdopted property to true.

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={updateFilters} onFindPetsClick={fetchPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={updateAdopted}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;