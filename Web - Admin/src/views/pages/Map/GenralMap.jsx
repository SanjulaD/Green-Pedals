import React from 'react'
import WrappedMap from './Map'
import { withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";
const GenralMap = () => {
    return (
        <div style={{ width: '100%', height: '80vh' }}>
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '200px' }} />}
                mapElement={<div style={{ height: '80vh' }} />}
            />
        </div>
    )
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(withFirebase(GenralMap));