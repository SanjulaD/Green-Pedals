import React, { useState, useEffect } from "react";
import Loader from './../../../components/Loader/Loader'
import { withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";

import {
    CCard,
    CCardBody,
    CCol,
    CDataTable,
    CCardHeader,
    CRow
} from '@coreui/react'
import { Container } from "react-bootstrap";
const Rides = (props) => {

    const [loading, setLoading] = useState(false);
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

    const fields = ['name', 'bikeNumber', 'distance', 'live']

    return (
        <Container>
            <CRow>
                <h1 style={{ marginBottom: "40px" }}>Green Pedals - All Live Users</h1>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>
                            Live Update - Active Users
                        </CCardHeader>
                        <CCardBody>
                            {loading && <Loader />}
                            <CDataTable
                                items={users}
                                fields={fields}
                                itemsPerPage={10}
                                striped
                                pagination
                                hover
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </Container>
    )
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(withFirebase(Rides));
