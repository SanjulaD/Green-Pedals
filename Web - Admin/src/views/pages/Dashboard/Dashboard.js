import React, { lazy } from 'react'
import {
    CButton,
    CButtonGroup,
    CCard,
    CCardBody,
    CCol,
    CRow,
    CCardHeader,
} from '@coreui/react'
import { withAuthorization } from "./../../../Session";
import { withFirebase } from "./../../../Firebase";
import {
    CChartDoughnut,
} from '@coreui/react-chartjs'

import MainChartExample from '../../charts/MainChartExample.js'

const StatCards = lazy(() => import('./StatCards.js'))

const Dashboard = () => {
    return (
        <>
            <StatCards />
            <CRow>
                <CCol md="8">
                    <CCard>
                        <CCardBody>
                            <CRow>
                                <CCol sm="5">
                                    <h4 id="traffic" className="card-title mb-2">Monthly Overview</h4>
                                    <div className="small text-muted">{new Date().toLocaleString() + ''}</div>
                                </CCol>
                                <CCol sm="7" className="d-none d-md-block">
                                    <CButtonGroup className="float-right mr-3">
                                        {
                                            ['Day', 'Month', 'Year'].map(value => (
                                                <CButton
                                                    color="outline-secondary"
                                                    key={value}
                                                    className="mx-0"
                                                    active={value === 'Month'}
                                                >
                                                    {value}
                                                </CButton>
                                            ))
                                        }
                                    </CButtonGroup>
                                </CCol>
                            </CRow>
                            <MainChartExample style={{ height: '220px', marginTop: '40px' }} />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol md="4">
                    <CCard>
                        <CCardHeader>
                            Audience
                        </CCardHeader>
                        <CCardBody>
                            <CChartDoughnut
                                datasets={[
                                    {
                                        backgroundColor: [
                                            '#fdde69',
                                            '#403ec5',
                                        ],
                                        data: [40, 80]
                                    }
                                ]}
                                labels={['Total Users', 'Avearege Time Spent']}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(withFirebase(Dashboard));
