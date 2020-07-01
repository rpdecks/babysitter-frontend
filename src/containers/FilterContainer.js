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
                    onChange={() => props.filterByCompleted(null)}
                />
            </Form>
            
            <h3>Buttons:</h3>
            <div className="buttons">
                <Button variant="primary" size="sm" onClick={() => props.switchView(!props.view)}>
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
        view: state.userReducer.calendarView,
        filteredJobs: state.jobReducer.filteredJobs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchView: (view) => dispatch({ type: "SWITCH_VIEW", calendarView: view}),
        filterByCompleted: (filter) => dispatch({ type: "FILTER_BY_COMPLETED", completionFilter: filter}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)