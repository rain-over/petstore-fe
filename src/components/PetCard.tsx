import React from 'react';

type Pet = {
  id: number;
  category: string;
  name: string;
  photoUrls: string;
};

const baseURL = process.env.PUBLIC_URL;
const PetCard: React.FC<{ pet: Pet }> = ({ pet }, key) => {
  return (
    <div key={key} className="pet-card">
      <img
        className="pet-image"
        src={`${baseURL}/icons/${pet.category}${Math.round(
          Math.random() * (5 - 1) + 1
        )}.png`}
        alt={pet.name}
        data-category={pet.category}
        onError={({ currentTarget }) => {
          const i = Math.round(Math.random() * (5 - 1) + 1);
          currentTarget.onerror = null;
          currentTarget.src = `${baseURL}/icons/${currentTarget.dataset.category}${i}.png`;
        }}
      />
      <div className="pet-details">
        <h2>{pet.name}</h2>
      </div>
      <span className={`pet-ribbon pet-ribbon-${pet.category}`}>
        {pet.category}
      </span>
    </div>
  );
};

export default PetCard;
// <li key={id}>
//   <div className="image-box">
//     <img
//       src={`${baseURL}/icons/${pet.category}${Math.round(
//         Math.random() * (5 - 1) + 1
//       )}.png`}
//       alt={`Pet ${pet.name}`}
//       data-category={pet.category}
//       // onError={({ currentTarget }) => {
//       //   const i = Math.round(Math.random() * (5 - 1) + 1);
//       //   currentTarget.onerror = null;
//       //   currentTarget.src = `${baseURL}/icons/${currentTarget.dataset.category}${i}.png`;
//       // }}
//     />
//   </div>
//   <h3>{pet.name}</h3>
// </li>;
