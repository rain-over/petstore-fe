import React from 'react';
import PetCard from './PetCard';

type Pet = {
  id: number;
  category: string;
  name: string;
  photoUrls: string;
};

type Pets = {
  pets: Pet[];
};

const PetList: React.FC<Pets> = ({ pets }) => {
  return (
    <div className="petstore-pets">
      <div className="pet-card-list">
        {pets.map((pet: Pet, id) => (
          <PetCard pet={pet} key={id} />
        ))}
      </div>
    </div>
  );
};

export default PetList;
