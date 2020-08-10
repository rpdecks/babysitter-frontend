import React from 'react'
import { API_ROOT } from '../services/apiRoot'
import { withRouter } from 'react-router-dom'
import Review from './Review'
import { connect } from 'react-redux'
import { Accordion, Button, Card, Form } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
    font-family: 'Roboto', sans-serif;
    .header-text {
        font-size: x-large;
        text-align: left;
        color: #757575;
        margin-top: 1rem; 
        margin-left: 1rem; 
    } 
    .btn {
        // background: #757575;
    }
    .btn-link {
        color: #00BCD4;
    }
    .menu {
        margin-left: 2rem;
        margin-top: 2rem;
    }
    .card {
        height: 10%;
    }
    .card-header {
        text-align: left;
        background: white;
        height: 10%;
        border: 0;
    }
    .card-body {
        color: #212121;
    }
    .form-label {
        color: #212121;
    }
`

class Reviews extends React.Component {
    state = {
        title: '',
        content: '',
        rating: '',
        userId: '',
    }   

    mapUsersToReview = () => {
        if (this.props.userType === 'employer') {
            if (this.props.caregivers) {
                return this.props.caregivers.map(c => <option value={c.id}>{c.first_name} {c.last_name[0]}.</option>)
            }
        } else if (this.props.employers) {
            return this.props.employers.map(e => <option value={e.id}>{e.first_name} {e.last_name[0]}.</option>)
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.review) {
            this.editReview()
        } else {
            this.createReview(e)
            e.target.reset();
        }
    }

    createReview = () => {

        const auth_token = localStorage.getItem('auth_token');
        if (!auth_token) {
        return;
        }

        let reviewObj
        if (this.props.userType === 'employer') {
            reviewObj =  {
                employer_review: {
                    employer_id: this.props.userData.id,
                    caregiver_id: this.state.userId,
                    content: this.state.content,
                    title: this.state.title,
                    rating: this.state.rating,
                }
            }
        } else {
            reviewObj =  {
                caregiver_review: {
                    caregiver_id: this.props.userData.id,
                    employer_id: this.state.userId,
                    content: this.state.content,
                    title: this.state.title,
                    rating: this.state.rating,
                }
            }
        }

        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(reviewObj)
        }

        fetch (`${API_ROOT}/${this.props.userType}_reviews`, fetchObj)
        .then(res => res.json())
        .then(review => {
            if (review.id) {
                console.log(review)
                alert('Review saved!')
                this.props.createReview(review)
            } else alert(review.msg);
        })
        .catch(error => console.log(error))
    }

    handleDelete = (id) => {
        let result = window.confirm('Are you sure you want to delete this review?')
        if (result) {
            const auth_token = localStorage.getItem('auth_token');
            if (!auth_token) {
            return;
            }
    
            const fetchObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Token': auth_token
                },
            }
    
            fetch(`${API_ROOT}/${this.props.userType}_reviews/${id}`, fetchObj)
            .then(res => res.json())
            .then(review => {
                if (review.deleted) {
                    this.props.deleteReview(id)
                    this.props.history.push('/reviews')
                } else {
                    alert(review.msg);
                }
            })
            .catch((errors) => console.log(errors))
        }
    }
    
    renderReviews(reviews) {
        
        return reviews.map((review, index) => {
            return <Review key={index} review={review} handleDelete={this.handleDelete}/>
        })
    }

    render(){
        return (
            <Styles>
                <div className='header-text'>Which would you like to do?</div>
                <div className='menu'>
                <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Write a review
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="reviewedUser">
                                        <Form.Label>Who would you like to review?</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            name='userId'
                                            custom
                                            defaultValue={this.state.userId}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option>Choose...</option>
                                            {this.mapUsersToReview()}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="reviewRating">
                                        <Form.Label>Rate:</Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            custom
                                            name='rating'
                                            defaultValue={this.state.rating}
                                            onChange={e => this.handleChange(e)}
                                        >
                                            <option>Choose...</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="reviewTitle">
                                        <Form.Label>Title:</Form.Label>
                                        <Form.Control 
                                            name="title"
                                            type="text" 
                                            defaultValue={this.state.title}
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="review-content">
                                        <Form.Label>Review</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows="5"
                                            name="content"
                                            defaultValue={this.state.content}
                                            onChange={e => this.handleChange(e)}
                                        />
                                    </Form.Group>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        <Button type="submit" style={{ background: '#00BCD4', border: '0' }}>
                                            Submit
                                        </Button>
                                    </Accordion.Toggle>
                                    <Accordion.Toggle as={Button} eventKey="0" style={{ background: '#0097A7', border: '0' }}>
                                        Cancel
                                    </Accordion.Toggle>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                See reviews you wrote
                            </Accordion.Toggle>
                        </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {this.renderReviews(this.props.authoredReviews)}
                                </Card.Body>
                            </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                See reviews about you
                            </Accordion.Toggle>
                        </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    {this.renderReviews(this.props.reviewsAboutMe)}
                                </Card.Body>
                            </Accordion.Collapse>
                    </Card>
                </Accordion>
                </div>
            </Styles>
        )
    }
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType,
        userData: state.userReducer.userData,
        employers: state.userReducer.employers,
        caregivers: state.userReducer.caregivers,
        authoredReviews: state.reviewsReducer.authoredReviews,
        reviewsAboutMe: state.reviewsReducer.reviewsAboutMe,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createReview: (review) => dispatch({ type: 'ADD_REVIEW', newReview: review}),
        deleteReview: (review) => dispatch({ type: 'DELETE_REVIEW', deletedReview: review}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reviews))