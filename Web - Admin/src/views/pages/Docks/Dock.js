import React, { useState, useEffect } from "react";
import Loader from './../../../components/Loader/Loader'
import { AuthUserContext, withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";
import { Table, Button, Row, Col, Container, Modal, Form } from 'react-bootstrap'
import {
    CCard,
    CCardBody,
    CCardHeader,
} from '@coreui/react'

const Dock = (props) => {

    const [loading, setLoading] = useState(false);
    const [docks, setDocks] = useState([]);

    const [dockName, setDockName] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longtitude, setLongtitude] = useState("");
    const [availableBikes, setAvailableBikes] = useState("");
    const [emptyDocks, setEmptyDocks] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            setDocks(usersList);
            setLoading(false);
        }
        props.firebase.store.collection("docks").get().then(fetchUsers);
        return () => {
            props.firebase.users().off();
        };
    }, [props.firebase]);

    function submitHandler(e) {
        e.preventDefault()
        const dock = {
            dockname: dockName,
            lat: latitude,
            long: longtitude,
            avaBikes: availableBikes,
            empBikes: emptyDocks,
        };
        props.firebase.store
            .collection("docks")
            .add(dock)
            .then((ref) => {
                dock.uuid = ref.id;
                dock.id = docks.length;
                var newDock = docks.slice();
                newDock.push(dock);
                setDocks(newDock);
            });
    }

    return (
        <AuthUserContext.Consumer>
            {(authUser) => (
                <Container fluid>
                    <Row>
                        <Col md={10}>
                            <h1 style={{ marginBottom: "40px" }}>Green Pedals - Dock Stations</h1>
                        </Col>
                        <Col md={2}>
                            <Button className='my-3 success' variant="success" onClick={handleShow}>
                                <i className='fas fa-plus'></i> ADD DOCK
                        </Button>
                        </Col>
                    </Row>

                    {/*  Model */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Dock Station</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Container>
                                <Form onSubmit={submitHandler}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId='dock'>
                                                <Form.Label>Dock Station Name</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="dock"
                                                    placeholder="Enter station name"
                                                    value={dockName}
                                                    onChange={(e) => setDockName(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='lat'>
                                                <Form.Label>Latitude</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="lat"
                                                    placeholder="Enter Latitude"
                                                    value={latitude}
                                                    onChange={(e) => setLatitude(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='long'>
                                                <Form.Label>Longtitude</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="long"
                                                    placeholder="Enter Longtitude"
                                                    value={longtitude}
                                                    onChange={(e) => setLongtitude(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='ava'>
                                                <Form.Label>Available Bikes</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="ava"
                                                    placeholder="Enter Available Bikes COunt"
                                                    value={availableBikes}
                                                    onChange={(e) => setAvailableBikes(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='docks'>
                                                <Form.Label>Empty Docks</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="docks"
                                                    placeholder="Enter Empty Docks Count"
                                                    value={emptyDocks}
                                                    onChange={(e) => setEmptyDocks(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button type="submit" variant="success">ADD</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <CCard>
                        <CCardHeader>
                            All Dock Stations
                        </CCardHeader>
                        <CCardBody>
                            {loading ? <Loader /> : (
                                <Table striped bordered hover responsive className='table-lg'>
                                    <thead>
                                        <tr style={{ fontWeight: "bold" }}>
                                            <th>Dock Name</th>
                                            <th>Latitude</th>
                                            <th>Longtitude</th>
                                            <th>No. of available bikes</th>
                                            <th>No. of empty bikes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            docks.map(docks => (
                                                <tr key={docks.id}>
                                                    <td>{docks.dockname}</td>
                                                    <td>{docks.lat}</td>
                                                    <td>{docks.long}</td>
                                                    <td>{docks.avaBikes}</td>
                                                    <td>{docks.empBikes}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            )
                            }
                        </CCardBody>
                    </CCard>
                </Container>
            )
            }
        </AuthUserContext.Consumer>
    )
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(withFirebase(Dock));
