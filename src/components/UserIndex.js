import React from 'react'
import { CardDeck, Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import styled from 'styled-components'

const Styles = styled.div ` 
    overflow-x: hidden;
    .card-deck {
        overflow-y: auto;
        white-space: nowrap;
        float: none;
    }
    .header-text {
        font-size: xx-large;
        text-align: left;
        color: #757575;
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
        const myFilters = [applyNonSmokingFilter, applyPetsFilter, applyFirstAidCertFilter, applyFavoritesFilter]
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
    function applyFavoritesFilter(user) {
        if (props.favoritesFilter === true) {
            let filtered = []
            if (props.userType === 'caregiver') {
                filtered = props.favorites.filter(fav => fav.employer_id === user.id)
                return (filtered && filtered.length > 0) 
            } else if (props.userType === 'employer') {
                filtered = props.favorites.filter(fav => fav.caregiver_id === user.id)
                return (filtered && filtered.length > 0) 
            } 
        } else return true
    }
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
            return 'Browse Caregivers'
        } else return 'Browse Employers'
    }

    return (
        <Styles>
                <div className='header-text'>{welcomeUser()}</div>
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
        favoritesFilter: state.favoritesReducer.favoritesFilter,
        favorites: state.favoritesReducer.userFavorites,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedUser: (choice) => dispatch({ type: 'SET_SELECTED_USER', selectedUser: choice}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserIndex))