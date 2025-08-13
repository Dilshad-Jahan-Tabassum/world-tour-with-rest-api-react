import { useEffect, useState } from "react";
import Country from "../Country/Country";
import './Countries.css';
import { addToLocalStorage, getStoredCart, deleteFromLocalStorage } from "../../utilities/localstorage";

const Countries = () => {
     const [countries, setCountries] =useState([]);
     const [visitedCountries, setVisitedCountries] =useState([]);
    //  const [visitedFlags, setVisitedFlags] = useState([]); 
    //const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region,population,languages,maps,cca3,cca2,area')
        .then(res => res.json())
        .then(data=>setCountries(data))
    },[]);

    //load cart from local storage eta k handleExistVisitedCountry er moddhe use korbo sekanei check krbo as ekane repeated country add hcche
    // useEffect(() => {
    //     // console.log('loading cart from local storage',countries.length);
    //     if(countries.length > 0){
    //         const storedCart = getStoredCart();
    //         // console.log(storedCart, countries);

    //         const savedCart = [];
    //         for(const cca2 of storedCart){
    //             // console.log(cca2);
    //             const country = countries.find(country => country.cca2 === cca2);
    //             if(country){
    //                 savedCart.push(country);
    //             }
    //         }
    //         setCart(savedCart);
           
    //     }
    // },[countries]);

    //eta kei handleExistVisitedCountry function er moddhe handleVisitedCountry er kaj ta hye jacche
    // const handleVisitedCountry = country =>{
    //     const newVisitedCountry = [...visitedCountries, country];
    //     setVisitedCountries(newVisitedCountry);
    // }  

    //handle visited a country and also check if the country is already visited
    const handleExistVisitedCountry = country => {
         const isExist = visitedCountries.find(existCountry => existCountry.cca2 === country.cca2);
        // console.log(isExist);
         if(!isExist){
            setVisitedCountries([...visitedCountries,country]);

            //add to local storage
            const storedCart = getStoredCart();
            if(!storedCart.includes(country.cca2)){
                addToLocalStorage(country.cca2);
            }
        }
        else{
            alert('You have already visited this country');
        }   
    }
    
    //remove item from an array in a state
    // use filter to select all the elements except the one i want to remove
    //when delete button is clicked, remove the country from visitedCountries state

    const handleDelete = cca2 =>{
        const remainingVisitedCountries = visitedCountries.filter(country => country.cca2 != cca2);
        setVisitedCountries(remainingVisitedCountries);
        //remove from local storage
         deleteFromLocalStorage(cca2);
    }

    // const handleVisitedFlags = flag =>{
    //     const newVisitedFlags = [...visitedFlags, flag];
    //     setVisitedFlags(newVisitedFlags);
    // }

    // const handleAddToCart = country =>{
    //     // console.log('Country added to cart', country);
    //     const newCart = [...cart, country];
    //     setCart(newCart);
    //     addToLocalStorage(country.cca2);
    // }
    

   
    return (
        <div>
            {/* <h3>cart length: {cart.length}</h3> */}
            <h2>Countries:{countries.length}</h2>
            <h5>Visited Countries: {visitedCountries.length}</h5>
            
            <div className="cart-container">
                        {
                            visitedCountries.map(country => <div className="flag-container" key={country.cca3}>
                                <span className="country-name">{country.name.common}</span>
                                <img  src={country.flags.png}/>
                                <button onClick={() => handleDelete(country.cca2)} className="btn">Delete</button>
                            </div>)
                        }  
            </div>
            {/* displayed countries */}
            <div className="country-container">
                {
                countries.map(country => <Country 
                    key={country.cca3} 
                    // handleVisitedCountry = {handleVisitedCountry}
                    handleExistVisitedCountry={handleExistVisitedCountry}
                    // handleVisitedFlags={handleVisitedFlags}
                    // handleAddToCart={handleAddToCart}
                    country={country}></Country>)
            }
            </div>
        </div>
    );
};

export default Countries;