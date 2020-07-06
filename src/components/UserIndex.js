import React from 'react'
import { CardDeck, Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import styled from 'styled-components'

const Styles = styled.div `
    .card-deck {
        // height: 40vh;
        overflow-y: auto;
        white-space: nowrap;
        float: none;
    }
    .card-img-top {
        width: 100%;
        height: 15vw;
        object-fit: cover;
    }
    .card {
        margin-bottom: 10px !important;
        margin-top: 10px !important;
    }
    .row {
    }
`  

function UserIndex(props) {

    function renderUsers (users) {
        // this helper function selects inverse userType of the one logged in
        // to view. helps render show page for users later
        function selectCardUserType () {
            if (props.userType === 'caregiver') {
                return 'employer'
            } else return 'caregiver'
        }

        // Filters
        let usersCopy = [...users]
        const myFilters = [applyNonSmokingFilter, applyPetsFilter, applyFirstAidCertFilter]
        const filteredUsers = usersCopy.filter(user => myFilters.every(f => f(user)))
        // map for render
        return filteredUsers.map( u => 
            <Col xs={3}>
                <UserCard key={u.id} 
                    user={u} 
                    userType={selectCardUserType()}
                />
              </Col>)
    }

    // Filters
    function applyNonSmokingFilter(user) {
        if (props.nonSmokingFilter === true) return (user.smoker === true)
        else return true
    }
    function applyPetsFilter(user) {
        if (props.petsFilter === true) return (user.has_pets === true)
        else return true
    }
    function applyFirstAidCertFilter(user) {
        if (props.firstAidCertFilter === true) return (user.first_aid_cert === true)
        else return true
    }
    function welcomeUser() {
        if (props.userType === 'employer') {
            return <h1>Browse potential <b>Caregivers</b></h1> 
        } else return <h1 className='h1'>Browse potential <b>Employers</b></h1> 
    }

    return (
        <Styles>
            {welcomeUser()}
                <Row>
                    <CardDeck >
                        {props.userType === 'employer' ? 
                            renderUsers(props.caregivers)
                            :
                            renderUsers(props.employers)
                        }
                    </CardDeck>
                </Row>
        </Styles>
    )   
}

const mapStateToProps = (state) => {
    return {
        employers: state.userReducer.employers,
        caregivers: state.userReducer.caregivers,
        userType: state.userReducer.userType,
        nonSmokingFilter:  state.jobReducer.nonSmokingFilter, 
        firstAidCertFilter:  state.jobReducer.firstAidCertFilter, 
        petsFilter: state.jobReducer.petsFilter,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedUser: (choice) => dispatch({ type: 'SET_SELECTED_USER', selectedUser: choice}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex))