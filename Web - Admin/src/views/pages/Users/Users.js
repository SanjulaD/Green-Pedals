import React, { useState, useEffect } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Loader from './../../../components/Loader/Loader'
import { AuthUserContext, withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";
import { Container } from "react-bootstrap";
const Users = (props) => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const options = {
        afterDeleteRow: onAfterDeleteRow,
        afterInsertRow: onAfterInsertRow,
    };
    
    const selectRowProp = {
        mode: "checkbox",
        clickToSelect: true,
        bgColor: "rgb(238, 193, 213)"
    };

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
        props.firebase.store.collection("user_details").get().then(fetchUsers);
        return () => {
            props.firebase.users().off();
        };
    }, [props.firebase]);

    function onAfterDeleteRow(event) {
        event.map((e) => {
            props.firebase.store.collection("user_details").doc(users[e].uuid).delete();
        });
        setTimeout(() => {
            props.firebase.store
                .collection("users")
                .get()
                .then((snapshot) => {
                    var usersList = [];
                    snapshot.docs.forEach((doc, i) => {
                        usersList.push({
                            id: i,
                            uuid: doc.id,
                            ...doc.data(),
                        });
                    });
                    setUsers(usersList);
                });
        }, 1000);
    }

    function onAfterInsertRow(event) {
        const user = {
            name: event.name,
            email: event.email,
            id: event.id,
            phone: event.phone,
        };
        props.firebase.store
            .collection("users")
            .add(user)
            .then((ref) => {
                user.uuid = ref.id;
                user.id = users.length;
                var newUsers = users.slice();
                newUsers.push(user);
                setUsers(newUsers);
            });
    }

    return (
        <AuthUserContext.Consumer>
            {(authUser) => (
                <Container className="p-2">
                    <h1 style={{ marginBottom: "40px" }}>Green Pedals - All Users</h1>
                    {loading && <Loader />}
                    <BootstrapTable
                        data={users}
                        insertRow={true}
                        deleteRow={true}
                        selectRow={selectRowProp}
                        options={options}
                        striped
                        hover
                        search
                    >
                        <TableHeaderColumn dataField="id" isKey={true} dataSort>NSBM ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort>Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                        <TableHeaderColumn dataField="phone">Phone Number</TableHeaderColumn>
                    </BootstrapTable>
                </Container>
            )
            }
        </AuthUserContext.Consumer>
    );
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(withFirebase(Users));