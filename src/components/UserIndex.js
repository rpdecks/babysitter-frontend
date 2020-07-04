import React from 'react'
import { CardDeck, Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import styled from 'styled-components'

const Styles = styled.div `
  .row {
    // height: 25vh;
  }
`

function UserIndex(props) {

    function renderUsers (users) {
        // this helper function select inverse userType of the one logged in
        // to view. helps render show page for users later
        function selectCardUserType () {
            if (props.userType === 'caregiver') {
                return 'employer'
            } else return 'caregiver'
        }
        return users.map( u => <UserCard 
            key={u.id} 
            userType={selectCardUserType()}
            user={u} 
            />)
    }

    function welcomeUser() {
        if (props.userType === 'employer') {
            return <h1>Browse potential <b>Caregivers</b></h1> 
        } else return <h1 className='h1'>Browse potential <b>Employers</b></h1> 
    }

    return (
        <Styles>
            {welcomeUser()}
            <CardDeck >
                <Row>
                <Col xs={3}>
                    {props.userType === 'employer' ? 
                        renderUsers(props.caregivers)
                        :
                        renderUsers(props.employers)
                    }
                </Col>
                </Row>
            </CardDeck>
        </Styles>
    )   
}

const mapStateToProps = (state) => {
    return {
        employers: state.userReducer.employers,
        caregivers: state.userReducer.caregivers,
        userType: state.userReducer.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedUser: (choice) => dispatch({ type: 'SET_SELECTED_USER', selectedUser: choice}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex))