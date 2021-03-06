import React, { useState } from 'react';
import Apca from '../../utilities/apca';


const InputLocationAirpot = ({ setLocation, input }) => {

    const [airports, setAirports] = useState([]);

    const handleUserInputLocation = (e) => {
        const inputArr = e.target.value.split(',');
        setLocation(inputArr[1]);
    }

    const handleLocalInput = async (e) => {
        if (e.target.value.length > 1) {
            const userInput = e.target.value;
            Apca.request(userInput);
        }

        Apca.onSuccess = (data) => {
            setAirports(data.airports)
        };

        Apca.onError = (data) => {
        };
    }

    return (
        <>
            <input placeholder="Airport" className="flight-input" list={input} onKeyPress={handleLocalInput} onSelect={handleUserInputLocation} />
            <datalist id={input}>
                {airports.map(airport => <option key={airport.iata} value={[airport.name, airport.iata]} iata={airport.iata} />)}
            </datalist>
        </>
    )
}

export default InputLocationAirpot;