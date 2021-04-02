import React, { useState } from 'react';
import Apca from '../../utilities/apca'

const InputLocationAirpot = ({ setLocation, input }) => {

    const [airports, setAirports] = useState([]);

    const handleUserLocalLocation = (e) => {
        const iata = e.target.value.slice(e.target.value.indexOf(',') + 1)
        setLocation(iata)
    }

    const handleLocalInput = async (e) => {
        if (e.target.value.length > 1) {
            const userInput = e.target.value;
            Apca.request(userInput);
        }

        Apca.onSuccess = (data) => {
            console.log(data.airports)
            setAirports(data.airports)
        };

        Apca.onError = (data) => {
            console.log('onError', data.message);
        };
    }

    return (
        <>
            <input placeholder="Airport" list={input} onKeyPress={handleLocalInput} onSelect={handleUserLocalLocation} />
            <datalist id={input}>
                {airports.map(airport => <option key={airport.iata} value={[airport.name, airport.iata]} iata={airport.iata} />)}
            </datalist>
        </>
    )
}

export default InputLocationAirpot;