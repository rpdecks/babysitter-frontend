import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
    margin-left: 10px;
    p {
        font-weight: bold;
        text-align: center;
    }
    .completionButtons {
        text-align: left
    }
    h3 {
        text-align: center;
    }
    .buttons {
        text-align: center;
    }
`

function FilterContainer(props) {

    return (
        <Styles>
            <h3>Filters</h3><br />
            <p>Job status:</p>
            <hr /> 
            <Form className="completionButtons">
                <Form.Check 
                    name='completionFilter'
                    type={'radio'}
                    id={'completed-radio'}
                    label={'completed'}
                    onChange={() => props.filterByCompleted('complete')}
                />
                <Form.Check
                    name='completionFilter'
                    type={'radio'}
                    id={'incomplete-radio'}
                    label={'incomplete'}
                    onChange={() => props.filterByCompleted('incomplete')}
                />
                <Form.Check
                    name='completionFilter'
                    type={'radio'}
                    id={'selectAll-radio'}
                    label={'all'}
                    defaultChecked={true}
                    onChange={() => props.filterByCompleted(null)}
                />
            </Form><br />
            <p>Job requirements:</p>
            <hr /> 
            <Form className="job_requirements">
                <Form.Check 
                    name='smoker'
                    type={'checkbox'}
                    id={'smoker'}
                    label={'smoker'}
                    onChange={() => props.filterBySmoker()}
                />
                <Form.Check
                    name='first_aid_cert'
                    type={'checkbox'}
                    id={'first_aid_cert'}
                    label={'First-aid certified'}
                    onChange={() => props.filterByFirstAidCert()}
                />
                <Form.Check
                    name='has_pets'
                    type={'checkbox'}
                    id={'has_pets'}
                    label={'Has pets'}
                    onChange={() => props.filterByPets(null)}
                />
            </Form>
            <hr />
            <div className="buttons">
                <Button variant="primary" size="sm" onClick={() => props.switchView(!props.calendarView)}>
                    Calendar view
                </Button>{' '}
                {/* <Button variant="secondary" size="sm">
                    List view
                </Button> */}
            </div>
        </Styles>
    )
}

const mapStateToProps = state => {
    return {
        jobs: state.userReducer.user,
        calendarView: state.userReducer.calendarView,
        filteredJobs: state.jobReducer.filteredJobs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchView: (view) => dispatch({ type: "SWITCH_VIEW", calendarView: view}),
        filterByCompleted: (filter) => dispatch({ type: "FILTER_BY_COMPLETED", completionFilter: filter}),
        filterBySmoker: (filter) => dispatch({ type: "FILTER_BY_SMOKER", completionFilter: filter}),
        filterByFirstAidCert: (filter) => dispatch({ type: "FILTER_BY_FIRST_AID", completionFilter: filter}),
        filterByPets: (filter) => dispatch({ type: "FILTER_BY_PETS", completionFilter: filter}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)