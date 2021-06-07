import React, { useEffect, useState } from 'react'
import { withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
} from 'react-google-maps'
import Loader from './../../../components/Loader/Loader'
import MapStyles from './MapStyles'

const Map = (props) => {

    const [loading, setLoading] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        function fetchUsers(snapshot) {
            var usersList = [];
            snapshot.docs.forEach((doc, i) => {
                usersList.push({
                    id: i,
                    uuid: doc.id,
                    ...doc.data(),
                });
            });
            setUsers(usersList);
            setLoading(false);
        }
        props.firebase.store.collection("bikeRide").get().then(fetchUsers);
        return () => {
            props.firebase.users().off();
        };
    }, [props.firebase]);

    return (
        <GoogleMap
            defaultCenter={{ lat: 6.8213, lng: 80.0416 }}
            defaultZoom={18}
            defaultOptions={{ styles: MapStyles }}
        >
            {
                loading ? <Loader />
                    :
                    (
                        users.map(place => (
                            <Marker
                                key={place.id}
                                position={{
                                    lat: place.lat,
                                    lng: place.long
                                }}
                                onClick={() => {
                                    setSelectedPlace(place)
                                }}
                                icon={{
                                    url: '/bike-cord.png',
                                    scaledSize: new window.google.maps.Size(50, 50)
                                }}
                            />
                        ))
                    )
            }
            {
                selectedPlace && (
                    <InfoWindow
                        position={{
                            lat: selectedPlace.lat,
                            lng: selectedPlace.long
                        }}
                        onCloseClick={() => {
                            setSelectedPlace(null)
                        }}
                    >
                        <div>
                            <h4 style={{ textAlign: "center" }}>{selectedPlace.name}</h4>
                            <p>
                                Bike Number: <b>{selectedPlace.bikeNumber}</b><br />
                                Travelled Distance: {selectedPlace.distance}<br />
                                Live Location: {selectedPlace.live}<br />
                            </p>
                        </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>

    )
}

const condition = (authUser) => !!authUser;
const WrappedMap = withScriptjs(withGoogleMap(Map))
export default withAuthorization(condition)(withFirebase(WrappedMap));