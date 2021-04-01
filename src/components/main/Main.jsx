import React, { useState, useEffect } from 'react'
import Amadeus from 'amadeus'
import Attraction from './Attraction';
import './Main.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Main = () => {
    const [userLocation, setUserLocation] = useState({});
    const [attractions, setAttractions] = useState([])

    const amadeus = new Amadeus({  // set it in a separately file (utilities)
        clientId: 'rL7tGUnjiUhdOIbpYrVQQOIxIQnL7YxF',
        clientSecret: 'GE9PTGUtJIGGtE5s'
    })

    useEffect(() => {
        (async () => {
            await getUserLocation();
            let response = localStorage.getItem('attarctions');
            if (!response) {
                response = await amadeus.shopping.activities.get({
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    radius: 20,
                })
                localStorage.setItem('attarctions', JSON.stringify(response))
            } else {
                response = JSON.parse(response)
            }

            setAttractions(response.data)
            console.log(response.data)

        })();
    }, [])

    const getUserLocation = () => {
        "geolocation" in navigator ?
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }) :
            console.log('not avaialble') // have to call a function to get the location details from the user or set one by him
    }


    return (<>
        
        {Object.keys(userLocation).length !== 0 ?
            <MapContainer center={[userLocation.latitude, userLocation.longitude]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[userLocation.latitude, userLocation.longitude]}>
                    <Popup>You Are Here!</Popup>
                </Marker>
            </MapContainer>
            :
            null
        }
        <div className="attraction-container">
            {attractions.map(attraction => {
                return <Attraction key={attraction.id} attraction={attraction} />
            })}
        </div>
    </>)
}

export default Main;