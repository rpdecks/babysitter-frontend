import React from 'react'
import { Button, CardDeck, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import UserCard from './UserCard'

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

    return (
        <>
            <CardDeck >
                <Row className="row">
                    {props.userType === 'employer' ? 
                        renderUsers(props.caregivers)
                        :
                        renderUsers(props.employers)
                    }
                </Row>
            </CardDeck>
        </>
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