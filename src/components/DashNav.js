import React from 'react'
import { Navbar, Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const Styles = styled.div `
//
`

function DashNav(props) {

    function handleSelect(e) {
       if (e === 'jobs') {
           props.history.push('/jobs')
       } else if (e === 'browse') {
           props.history.push('/browse')
       } else if (e === 'reviews') {
           props.history.push('/reviews')
       } else if ( e === 'messages') {
           props.history.push('/messages')
       } else if ( e === 'account') {
           props.history.push('/account')
       } else if ( e === 'past-jobs') {
           props.history.push('/past-jobs')
       } else if ( e === 'pending-jobs') {
           props.history.push('/pending-jobs')
       }
    }
    if (props.isLoggedIn) {
        return (
            <Styles>
                <div className='tab-bar'>
                    <Tabs defaultActiveKey="jobs" id="uncontrolled-tab-example" onSelect={handleSelect}>
                        <Tab eventKey="jobs" title="Jobs">
                        </Tab>
                        <Tab eventKey="browse" title="Browse" onClick={() => this.props.history('/browse')}>
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews" onClick={() => this.props.history('/reviews')}>
                        </Tab>
                        <Tab eventKey="account" title="Account" onClick={() => this.props.history('/account')}>
                        </Tab>
                        <Tab eventKey="pending-jobs" title="Pending jobs" onClick={() => this.props.history('/pending-jobs')}>
                        </Tab>
                        <Tab eventKey="past-jobs" title="Past jobs" onClick={() => this.props.history('/past-jobs')}>
                        </Tab>
                        {/* <Tab eventKey="messages" title="Messages" onClick={() => this.props.history('/messages')}>
                        </Tab> */}
                    </Tabs>
                </div>
            </Styles>
        )} else return <Navbar />
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(DashNav))