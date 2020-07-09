import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Accordion, Button, Card, Col, Image, Modal, Row, Tabs, Tab } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { MdSmokeFree, MdSmokingRooms, MdPets } from "react-icons/md"
import { GiHealthNormal } from "react-icons/gi"
import StarRatings from 'react-star-ratings'
import { IconContext } from "react-icons"
import Review from './Review'

const Styles = styled.div `
    font-family: 'Roboto', sans-serif;

    .img {
        height: 40vh;
        width: 15vw;
        object-fit: cover;
        margin-left: 10px;
        margin-top: 10px;
    }
    .award-column {
        overflow-y: scroll;
        height: 40vh;
    }
    .message-btn {
        background-color: #00BCD4;
        height: 100%;
        border: none;
        font-size: small;
        margin-left: 0.7rem;
        margin-top: 5px;
    }
    .back-btn {
        background-color: #757575;
        width: 30%;
        height: 100%;
        border: none;
        font-size: small;
        margin-left: 5px;
        margin-top: 5px;
    }
    .name {
        font-size: x-large;
        margin-top: 1.5rem;
        margin-left: 1rem;
        text-align: left;
        color: #212121;
    }
    .fav-icon {
        margin-top: 1rem;
        margin-left: 0.5rem;
        color: #0097A7;
    }
    .stars {
        margin-top: 10px;
        margin-left: 0.9rem;
    }
    .user-info {
        margin-top: 1.2rem;
        margin-left: 0.3rem;
        margin-bottom: 1.3rem;
        font-size: small;
        color: #212121;
    }
    .user-icons {
        margin-left: 1rem;
    }
    .nav-link {
        color: #00BCD4;
    }
    .nav-link:active {
        color: #757575;
    }
    .btn-link {
        color: #00BCD4;
    }
    .btn-link:active {
        color: #757575;
    }
`

function UserShow(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleBackButton() {
        if (props.user) {
            window.history.go(-1)
        } else {
            props.history.push('/browse')
        }
    }

    function awardJob(jobId, caregiverId) {
        const auth_token = localStorage.getItem('auth_token')
        if (!auth_token) {
            return
        }

        const jobObj = {
            job: {
                id: jobId,
                caregiver_id: caregiverId
            }
        }

        const fetchObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(jobObj)
        }

        fetch(`http://localhost:3000/api/v1/jobs/${jobId}`, fetchObj)
        .then(res => res.json())
        .then(job => {
            props.editJob(job)
            props.history.push(`/jobs/${jobId}`)
        })
        .catch(errors => console.log(errors))
    }

    function favoriteUser() {
        const auth_token = localStorage.getItem('auth_token')
        if (!auth_token) {
        return
        }

        let favoriteObj = {}
        if (props.userType === 'employer') {
            favoriteObj = {
                employer_favorite: {
                    employer_id: props.userData.id,
                    caregiver_id: props.user.id
                }
            }
        } else if (props.userType === 'caregiver') {
            favoriteObj = {
                caregiver_favorite: {
                    caregiver_id: props.userData.id,
                    employer_id: props.user.id
                }
            }
        }

        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(favoriteObj)
        }

        fetch(`http://localhost:3000/api/v1/${props.userType}_favorites`, fetchObj)
        .then(res => res.json())
        .then(favResponse => {
            if (favResponse.created) {
                console.log('favorite saved')   
                return props.favoriteUser(favResponse.favorite)
            } else {
                console.log('favorite saved')   
                return props.unFavoriteUser(favResponse.idToRemove)
            }
        })
        .catch(errors => console.log(errors))
    }

    function renderFavoriteHearts() {
        let result = null
        if (props.userType === 'employer') {
            result = props.userFavorites.filter(f => f.caregiver_id === props.user.id)
            if (result.length > 0) return <BsHeartFill onClick={() => favoriteUser()} className='fav-icon'/>
            else return <BsHeart onClick={() => favoriteUser()} className='fav-icon'/>
        } else if ( props.userType === 'caregiver' ) {
            result = props.userFavorites.filter(f => f.employer_id === props.user.id)
            if (result.length> 0) return <BsHeartFill onClick={() => favoriteUser()} className='fav-icon'/>
            else return <BsHeart onClick={() => favoriteUser()} className='fav-icon'/>
        }
    }

    function renderReviews() {

        return props.reviews.map((review, index) => {
            return <Review key={index} review={review}/>
        })
    }

    function renderJobsToAward() {
        let { myJobsUserAppliedFor, incompleteJobs } = []
        incompleteJobs = props.jobs.filter(job => job.status !== 'complete')
        if (incompleteJobs.length > 0) {
            myJobsUserAppliedFor = incompleteJobs.filter(job => {
                if (job.candidates && job.candidates.length > 0) {
                    return job.candidates.filter(c => c.id === props.user.id)
                } else return myJobsUserAppliedFor
            })
        }
        if (myJobsUserAppliedFor && myJobsUserAppliedFor.length > 0) {
            return myJobsUserAppliedFor.map((job, index) => {
                return (
                    <>
                        <Accordion>
                            <Card xs={12} key={index} >
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        <b key={index} >{job.title}</b>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body key={index} >
                                        <Link to={`/jobs/${job.id}`} key={index} >
                                            <Button variant="link" key={index} >Job details page</Button>
                                        </Link>
                                        <Button variant="link" onClick={handleShow} >Award job to this user</Button>
                                        <Modal show={show} className='award-modal' onHide={handleClose}>
                                            <Modal.Header closeButton >
                                                <Modal.Title>Award job</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure you would like to award:<br /><br />  
                                                <b>Job: </b>{job.title} - {job.start_date_YYYYMMDD}<br /> 
                                                <b>To: </b>{props.user.first_name}<br /> 
                                            </Modal.Body>
                                            <Modal.Footer >
                                                <Button variant="secondary" onClick={handleClose} >
                                                    Cancel
                                                </Button>
                                                <Button variant="primary" onClick={() => awardJob(job.id, props.user.id)} >
                                                    Award job
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </>
                )
            })
        }
    }

    return (
        <Styles>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col className="left-column" xs={3}>
                            <Row>
                            <Image 
                                className='img' 
                                src={props.user.image} 
                                rounded
                                alt={'babysitter'} 
                            />
                            </Row>
                            <Row >
                                <Button className="message-btn" >Message me!</Button>
                                <Button className="back-btn" onClick={() => handleBackButton()} >
                                    Back
                                </Button>
                            </Row>
                        </Col>
                        <Col className="middle-column">
                            <Row>
                                <div className="name">{props.user.first_name} {props.user.last_name[0]}.</div>
                                <div className="fav-icon">{props.userFavorites && renderFavoriteHearts()}</div>
                            </Row>
                            <Row>
                            <div className='stars'>
                            <StarRatings
                                name='rating'
                                rating={props.user.rating}
                                starRatedColor="#757575"
                                numberOfStars={5}
                                starDimension="30px"
                                starSpacing="2px"
                            />
                            </div>
                            </Row>
                            <div className='user-info'>
                                {props.user.rating} out of 5 stars<br />
                                Age: ~ {props.user.age} years old<br />
                                Gender: {props.user.gender}<br />
                                Experience: {props.user.job_count} completed jobs<br />
                                Pay rate ${props.user.pay_rate} / hour
                            </div>
                            <Row>
                                <div className='user-icons'>
                                {props.user.smoker ? 
                                    <IconContext.Provider value={{size: "50px", color: "#0097A7"}}>
                                            <MdSmokeFree />
                                    </IconContext.Provider> 
                                    : 
                                    <IconContext.Provider value={{size: "50px", color: "#0097A7"}}>
                                            <MdSmokingRooms />
                                    </IconContext.Provider>
                                }
                                {props.user.first_aid_cert ? 
                                    <IconContext.Provider value={{size: "50px", color: "#0097A7"}}>
                                            <GiHealthNormal />
                                    </IconContext.Provider>
                                    :
                                    null}
                                {props.user.has_pets ? 
                                    <IconContext.Provider value={{size: "50px", color: "#0097A7"}}>
                                            <MdPets />
                                    </IconContext.Provider>
                                    :
                                    null}
                                </div>
                            </Row>
                            <br />
                    </Col>
                    <Col >
                        <ul>
                            <Row><h3>Job applications:</h3></Row>
                            <Row className='award-column'>
                                <Col>{renderJobsToAward()}</Col>
                            </Row>
                        </ul>
                    </Col>
                    </Row>
                </Col>  
            </Row>
            <Tabs defaultActiveKey="bio" id="uncontrolled-tab-example">
                <Tab eventKey="bio" title="A little about me...">
                    <p>{props.user.bio}</p>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                    {renderReviews()}
                </Tab>
            </Tabs>
        </Styles>
    )   
}


const mapStateToProps = (state, props) => {
    return {
        user: props.user,
        userData: state.userReducer.userData,
        userType: state.userReducer.userType,
        userFavorites: state.favoritesReducer.userFavorites,
        reviews: state.reviewsReducer.reviewsAboutMe,
        jobs: state.jobReducer.userJobs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        favoriteUser: (favorite) => dispatch({ type: 'FAVORITE_USER', favorite: favorite}),
        unFavoriteUser: (id) => dispatch({ type: 'UNFAVORITE_USER', favoriteInstanceId: id}),
        editJob: (editedJob) => dispatch({ type: 'EDIT_JOB', editedJob: editedJob}),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow))