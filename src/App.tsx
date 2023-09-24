import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetList from './components/PetList';

type DefaultPet = {
  id: number;
  category: { name: string };
  name: string;
  photoUrls: string[];
};
type Pet = {
  id: number;
  category: string;
  name: string;
  photoUrls: string;
};

const API_URL = 'https://petstore.swagger.io/v2/pet/findByStatus';

const App: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [status, setStatus] = useState<string>('available'); // Default status

  useEffect(() => {
    // Function to fetch pets by status
    const fetchPets = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { status },
        });
        _setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, [status]);

  const sort = (sort: string) => {
    console.log(
      pets
        .slice(1, 10)
        .map((x) => x.name)
        .toString()
    );

    const sorted: Pet[] = pets.sort((a, b) => {
      return sort === 'name-a'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setPets(sorted);
  };

  const _setPets = (data: DefaultPet[]) => {
    let ndata: Pet[] = data.map((p) => {
      let categoryName = '';
      let initialC = p?.category?.name ?? '';
      let initialN = p.name ?? '';

      const petTypes = ['cat', 'dog', 'fish', 'bird', 'insect'];
      const randomIndex = Math.floor(Math.random() * petTypes.length);
      const randomPet = petTypes[randomIndex];

      if (initialC.includes('cat') || initialN.includes('cat')) {
        categoryName = 'cat';
      } else if (initialC.includes('dog') || initialN.includes('dog')) {
        categoryName = 'dog';
      } else if (initialC.includes('fish') || initialN.includes('fish')) {
        categoryName = 'fish';
      } else if (initialC.includes('bird') || initialN.includes('bird')) {
        categoryName = 'bird';
      } else {
        categoryName = randomPet;
      }

      return {
        ...p,
        name: p.name ?? 'Unnamed',
        photoUrls: p.photoUrls[0],
        category: categoryName,
      };
    });
    ndata = ndata.sort((a, b) => {
      return (
        a.category.localeCompare(b.category) || b.name.localeCompare(a.name)
      );
    });
    setPets(ndata);
  };

  return (
    <div>
      <nav className="pet-filter">
        <h1>Pet Store</h1>
        <div className="pet-status">
          <div className="pet-availability">
            <label>Filter by Status:</label>
            <select onChange={(e) => setStatus(e.target.value)}>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div className="pet-availability">
            <label>Sort by:</label>
            <select onChange={(e) => sort(e.target.value)}>
              <option value="name-a">Name (A-Z)</option>
              <option value="pending-d">Name (Z-A)</option>
              {/* <option value="category-a">Category</option> */}
            </select>
          </div>
        </div>
      </nav>
      <PetList pets={pets} />
    </div>
  );
};

export default App;
