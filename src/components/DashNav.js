import React from 'react'
import { Navbar, Tabs, Tab } from 'react-bootstrap'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const Styles = styled.div `
  .topmenu {
      position: sticky;
      top: 0;
    }
`

function DashNav(props) {

    function handleSelect(e) {
       if (e === 'jobs') {
           props.history.push('/jobs')
       } else if (e === 'browse') {
           props.history.push('/browse')
       } else if ( e === 'messages') {
           props.history.push('/messages')
       }
    }
    if (props.isLoggedIn) {
        return (
            <Styles>
                <Tabs defaultActiveKey="jobs" id="uncontrolled-tab-example" onSelect={handleSelect}>
                    <Tab eventKey="jobs" title="Jobs">
                    </Tab>
                    <Tab eventKey="browse" title="Browse" onClick={() => this.props.history('/browse')}>
                    </Tab>
                    <Tab eventKey="messages" title="Messages" onClick={() => this.props.history('/messages')}>
                    </Tab>
                </Tabs>
            </Styles>
        )} else return <Navbar />
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

export default withRouter(connect(mapStateToProps)(DashNav))