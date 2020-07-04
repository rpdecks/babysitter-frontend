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

    function whatToRender() {
        if (props.path === '/browse') {
            return <>
            <p>Filters:</p>
            <hr />
            <Form className="job_requirements">
                <Form.Check 
                    name='non-smoking'
                    type={'checkbox'}
                    id={'non-smoking'}
                    label={'Non-smoking'}
                    checked={props.nonSmokingFilter}
                    onChange={() => props.filterByNonSmoking(!props.nonSmokingFilter)}
                />
                <Form.Check
                    name='first_aid_cert'
                    type={'checkbox'}
                    id={'first_aid_cert'}
                    label={'First-aid certified'}
                    onChange={() => props.filterByFirstAidCert(!props.firstAidCertFilter)}
                />
                <Form.Check
                    name='has_pets'
                    type={'checkbox'}
                    id={'has_pets'}
                    label={'Has pets'}
                    onChange={() => props.filterByPets(!props.petsFilter)}
                />
            </Form>
            </>
        } else if (props.path === '/jobs') {
            return <>
            <p>Job status:</p>
            <hr />
            <Form className="completionButtons">
                <Form.Check
                    name='completionFilter'
                    type={'radio'}
                    id={'completed-radio'}
                    label={'complete'}
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
            <p>Job filters:</p>
            <hr />
            <Form className="job_requirements">
                <Form.Check
                    name='non-smoking'
                    type={'checkbox'}
                    id={'non-smoking'}
                    label={'Non-smoking'}
                    checked={props.nonSmokingFilter}
                    onChange={() => props.filterByNonSmoking(!props.nonSmokingFilter)}
                />
                <Form.Check
                    name='first_aid_cert'
                    type={'checkbox'}
                    id={'first_aid_cert'}
                    label={'First-aid certified'}
                    onChange={() => props.filterByFirstAidCert(!props.firstAidCertFilter)}
                />
                <Form.Check
                    name='has_pets'
                    type={'checkbox'}
                    id={'has_pets'}
                    label={'Has pets'}
                    onChange={() => props.filterByPets(!props.petsFilter)}
                />
            </Form>
            <hr />
            <div className="buttons">
                <Button variant="primary" size="sm" onClick={() => props.switchView(!props.calendarView)}>
                    Calendar view
                </Button>{' '}
            </div>
            </>
        }
    }
    return (
        <Styles>
            {whatToRender()}
        </Styles>
    )
}

const mapStateToProps = (state, props) => {
    return {
        jobs: state.userReducer.user,
        calendarView: state.userReducer.calendarView,
        filteredJobs: state.jobReducer.filteredJobs,
        completionFilter: state.jobReducer.completionFilter,
        nonSmokingFilter: state.jobReducer.nonSmokingFilter,
        firstAidCertFilter: state.jobReducer.firstAidCertFilter,
        petsFilter: state.jobReducer.petsFilter,
        path: props.path,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchView: (view) => dispatch({ type: "SWITCH_VIEW", calendarView: view}),
        filterByCompleted: (filter) => dispatch({ type: "FILTER_BY_COMPLETED", completionFilter: filter}),
        filterByNonSmoking: (filter) => dispatch({ type: "FILTER_BY_NON_SMOKING", nonSmokingFilter: filter}),
        filterByFirstAidCert: (filter) => dispatch({ type: "FILTER_BY_FIRST_AID", firstAidCertFilter: filter}),
        filterByPets: (filter) => dispatch({ type: "FILTER_BY_PETS", petsFilter: filter}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)