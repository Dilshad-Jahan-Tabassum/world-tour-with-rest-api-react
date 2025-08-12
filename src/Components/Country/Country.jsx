import { useState } from 'react';
import './Country.css';

const Country = ({country, handleVisitedCountry, handleAddToCart}) => {
    const {name,flags,population,area,cca3} = country;

    const [visited, setVisited] = useState(false);
    
    const handleVisited = () =>{
    setVisited(!visited);  // Toggle the visited state
 }
  
    

 return (
        <div className={`country ${visited ? 'visited' : 'non-visited'}`}>
            <h3 style={{color: visited ? "yellow" : ""}}>Name: {name?.common}</h3>
            <img src={flags.png} alt="" />
            <p>Population: {population}</p>
            <p>Area: {area}</p>
            <p>Code: {cca3}</p>
            <button onClick={() => {handleVisitedCountry(country); handleAddToCart(country)}}>Mark Visited</button>
            <br />
            
            <br />
            <button onClick={handleVisited}>{visited ? 'Visited' : 'Going'}</button>
            {visited ? ' I have visited this country' : ' I want to visit this country'}
        </div>
    );
};

export default Country;