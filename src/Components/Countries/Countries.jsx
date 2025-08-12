import { useEffect, useState } from "react";
import Country from "../Country/Country";
import './Countries.css';
import { addToLocalStorage, getStoredCart } from "../../utilities/localstorage";

const Countries = () => {
     const [countries, setCountries] =useState([]);
     const [visitedCountries, setVisitedCountries] =useState([]);
    //  const [visitedFlags, setVisitedFlags] = useState([]);
     
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,languages,maps,cca3,cca2,area')
        .then(res => res.json())
        .then(data=>setCountries(data))
    },[]);

    //load cart from local storage
    useEffect(() => {
        // console.log('loading cart from local storage',countries.length);
        if(countries.length){
            const storedCart = getStoredCart();
            // console.log(storedCart, countries);

            const savedCart = [];
            for(const cca2 of storedCart){
                // console.log(cca2);
                const country = countries.find(country => country.cca2 === cca2);
                if(country){
                    savedCart.push(country);
                }
            }
        }
    },[countries]);


    const handleVisitedCountry = country =>{
        const newVisitedCountry = [...visitedCountries, country];
        setVisitedCountries(newVisitedCountry);
    }
    const handleDelete = cca3 =>{
        const remainingVisitedCountries = visitedCountries.filter(country =>country.cca3 !== cca3);
        setVisitedCountries(remainingVisitedCountries);
        // console.log('Delete button clicked');
    }

    // const handleVisitedFlags = flag =>{
    //     const newVisitedFlags = [...visitedFlags, flag];
    //     setVisitedFlags(newVisitedFlags);
    // }

    const handleAddToCart = country =>{
        // console.log('Country added to cart', country);
        const newCart = [...cart, country];
        setCart(newCart);
        addToLocalStorage(country.cca2);
    }
    

    //remove item from an array in a state
    // use filter to select all the elements except the one i want to remove

    return (
        <div>
            <h2>Countries:{countries.length}</h2>
            <h5>Visited Countries: {visitedCountries.length}</h5>
            
            <div className="cart-container">
                        {
                            visitedCountries.map(country => <div className="flag-container" key={country.cca3}>
                                <span className="country-name">{country.name.common}</span>
                                <img  src={country.flags.png}/>
                                <button onClick={() => handleDelete(country.cca3)} className="btn">Delete</button>
                            </div>)
                        }  
            </div>
            {/* displayed countries */}
            <div className="country-container">
                {
                countries.map(country => <Country 
                    key={country.cca3} 
                    handleVisitedCountry = {handleVisitedCountry}
                    // handleVisitedFlags={handleVisitedFlags}
                    handleAddToCart={handleAddToCart}
                    country={country}></Country>)
            }
            </div>
        </div>
    );
};

export default Countries;