import React, { useState, useEffect } from "react";
import Loader from './../../../components/Loader/Loader'
import { withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";
import {
    CWidgetDropdown,
    CRow,
    CCol,
    CWidgetBrand
} from '@coreui/react'
import ChartLineSimple from '../../../views/charts/ChartLineSimple'
import CIcon from '@coreui/icons-react';
const StatCards = (props) => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [allBikes, setAllBikes] = useState([]);
    const [countBikes, setCountBIkes] = useState([]);
    const [countinArray, setcountinArray] = useState("");

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
            getBikeCount()
            getAllBikeCount()
            setLoading(false);
        }
        props.firebase.store.collection("user_details").get().then(fetchUsers);
        return () => {
            props.firebase.users().off();
        };
    }, [props.firebase]);

    const getBikeCount = () => {
        setLoading(true);
        function fetchUsers(snapshot) {
            var bikeList = [];
            snapshot.docs.forEach((doc, i) => {
                bikeList.push({
                    id: i,
                    uuid: doc.id,
                    ...doc.data(),
                });
            });
            setBikes(bikeList);
            
            setLoading(false);
        }
        props.firebase.store.collection("bikeRide").get().then(fetchUsers);
        return () => {
            props.firebase.bikeRide().off();
        };
    }

    const getAllBikeCount = () => {
        setLoading(true);
        function fetchUsers(snapshot) {
            var bikeAllList = [];
            snapshot.docs.forEach((doc, i) => {
                bikeAllList.push({
                    id: i,
                    uuid: doc.id,
                    ...doc.data(),
                });
            });
            setAllBikes(bikeAllList)
            
            setLoading(false);
        }
        props.firebase.store.collection("docks").get().then(fetchUsers);
        return () => {
            props.firebase.bikeRide().off();
        };
    }

    return (
        <>
            <CRow>
                <CCol md="3">
                    {loading ? <Loader /> : (
                        <CWidgetDropdown
                            className="stat-card-text"
                            color="gradient-info"
                            header="Total Users"
                            text={`${users.length}`}
                            footerSlot={
                                <ChartLineSimple
                                    pointed
                                    className="mt-3 mx-3"
                                    style={{ height: '60px' }}
                                    dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                                    pointHoverBackgroundColor="info"
                                    options={{ elements: { line: { tension: 0.00001 } } }}
                                    label="Members"
                                    labels="months"
                                />
                            }
                        >
                        </CWidgetDropdown>
                    )}
                </CCol>

                <CCol md="3">
                    {loading ? <Loader /> : (
                        <CWidgetDropdown
                            className="stat-card-text"
                            color="gradient-warning"
                            header="Total Bikes"
                            text="50"
                            footerSlot={
                                <ChartLineSimple
                                    className="mt-3"
                                    style={{ height: '60px' }}
                                    backgroundColor="rgba(255,255,255,.2)"
                                    dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                                    options={{ elements: { line: { borderWidth: 2.5 } } }}
                                    pointHoverBackgroundColor="warning"
                                    label="Members"
                                    labels="months"
                                />
                            }
                        >
                        </CWidgetDropdown>
                    )}
                </CCol>
                <CCol md="3">
                    {loading ? <Loader /> : (
                        <CWidgetDropdown
                            className="stat-card-text"
                            color="gradient-primary"
                            header="Total Using Bikes"
                            text={`${bikes.length}`}
                            footerSlot={
                                <ChartLineSimple
                                    pointed
                                    className="c-chart-wrapper mt-3 mx-3"
                                    style={{ height: '60px' }}
                                    dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                                    pointHoverBackgroundColor="primary"
                                    label="Members"
                                    labels="months"
                                />
                            }
                        >
                        </CWidgetDropdown>
                    )
                    }
                </CCol>
                <CCol md="3">
                    {loading ? <Loader /> : (
                        <CWidgetBrand
                            rightHeader="6"
                            rightFooter="Locked Bikes"
                            leftHeader="4"
                            leftFooter="Unlocked Bikes"
                            color="gradient-danger"
                        >
                            <CIcon
                                name="cilLockLocked"
                                height="50"
                                className="my-3"
                            />
                            <ChartLineSimple
                                className="position-absolute w-100 h-100"
                                backgroundColor="rgba(255,255,255,.1)"
                                dataPoints={[35, 23, 56, 22, 97, 23, 64]}
                                label="Followers"
                                labels="months"
                            />
                        </CWidgetBrand>
                    )}
                </CCol>
            </CRow>
        </>
    )
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(withFirebase(StatCards));
