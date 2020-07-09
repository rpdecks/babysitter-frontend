import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
    padding-top: 6rem;
    color: #212121;
    font-size: medium;
    font-family: 'Roboto', sans-serif;

    .status-label {
        font-size: larger;
        font-weight: bold;
        text-align: center;
        color: #757575;
    }
    .filter-label {
        font-weight: bold;
        font-size: larger;
        text-align: center;
        color: #757575;
    }
    .form-check-label {
        font-size: small;
        color: #757575;
    }
    .completion-btns {
        text-align: left;
        font-size: smaller;
        margin-left: 1.8rem;
    }
    .filter-btns {
        text-align: left;
        font-size: smaller;
        margin-left: 1.8rem;
    }
    .filters-container {
        margin-top: 0;
    }   
    .button-row {
        text-align: center;
    }
    .view-btn {
        margin-top: 1rem;
        text-align: center;
        background-color: #0097A7;
        border: none;
        display: inline;
    }
`

function FilterContainer(props) {

    function whatToRender() {
        if (props.path === '/browse') {
            return <>
                <div className='filter-label'>Filters:</div>
                <hr />
                <Form >
                    <div className='filter-btns'>
                    <Form.Check 
                        name='favorites'
                        type={'checkbox'}
                        id={'favorites'}
                        label={'My favorites'}
                        checked={props.favoritesFilter}
                        onChange={() => props.filterByFavorites(!props.favoritesFilter)}
                    />
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
                    </div>
                </Form>
            </>
            } else if (props.path === '/jobs') {
                return <>
                    <div className='status-label'>Job status:</div>
                    <hr />
                    <Form>
                        <div className='completion-btns'>
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
                        </div>
                    </Form><br />
                    <div className='filter-label'>Job filters:</div>
                    <hr />
                    <Form>
                        <div className='filter-btns'>
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
                        </div>
                    </Form>
                    <div className="button-row">
                        {props.calendarView ? 
                            <Button className="view-btn" size="sm" onClick={() => props.switchView(!props.calendarView)}>
                                List view
                            </Button>
                            :
                            <Button className="view-btn" size="sm" onClick={() => props.switchView(!props.calendarView)}>
                                Calendar view
                            </Button>
                        }
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
        favoritesFilter: state.favoritesReducer.favoritesFilter,
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
        filterByFavorites: (filter) => dispatch({ type: "FILTER_BY_FAVORITES", favoritesFilter: filter}),
        filterByCompleted: (filter) => dispatch({ type: "FILTER_BY_COMPLETED", completionFilter: filter}),
        filterByNonSmoking: (filter) => dispatch({ type: "FILTER_BY_NON_SMOKING", nonSmokingFilter: filter}),
        filterByFirstAidCert: (filter) => dispatch({ type: "FILTER_BY_FIRST_AID", firstAidCertFilter: filter}),
        filterByPets: (filter) => dispatch({ type: "FILTER_BY_PETS", petsFilter: filter}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)