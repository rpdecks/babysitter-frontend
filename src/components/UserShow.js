import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BsHeart, BsHeartFill } from "react-icons/bs"
import StarRatings from 'react-star-ratings'

const Styles = styled.div `
  .img {
    height: 30vh;
  }
  .name-row {
    background: #89cff0;
  }
`

function UserShow(props) {

    function favoriteUser() {
        const auth_token = localStorage.getItem('auth_token')
        if (!auth_token) {
        return
        }

        let favoriteObj = {}
        if (props.userType === 'employer') {
            favoriteObj = {
                caregiver_favorite: {
                    employer_id: props.userData.id,
                    caregiver_id: props.user.id
                }
            }
        } else if (props.userType === 'caregiver') {
            favoriteObj = {
                employer_favorite: {
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

        fetch(`http://localhost:3000/api/v1/${props.userType}s`, fetchObj)
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

    return (
        <Styles>
            <Row className="name-row">
                <Col xs={8}>
                    <Row >
                    <Image 
                        className='img' 
                        src={props.user.image} 
                        rounded
                        alt={'babysitter'} 
                    />  
                    <Col>
                        <h5>{props.user.first_name} {props.user.last_name[0]}.</h5>
                        <StarRatings
                            name='rating'
                            rating={props.user.rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            starDimension="30px"
                            starSpacing="2px"
                        />
                        <p>{props.user.ratings} out of 5 stars</p>
                        </Col>
                        <Col>
                            {props.userData.employer_favorites.includes(props.user.id) ? 
                                <BsHeartFill onClick={favoriteUser()}/> : <BsHeart onClick={favoriteUser()}/>
                            }
                        </Col>
                    </Row>
                </Col>  
            </Row>
            <Row>
                <Button variant="danger" onClick={() => props.history.push('/browse')} >
                    Back
                </Button>
            </Row>
        </Styles>
    )   
}

const mapStateToProps = (state, props) => {
    return {
        user: props.user,
        userData: state.userReducer.userData,
        userType: state.userReducer.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        favoriteUser: (favorite) => dispatch({ type: 'FAVORITE_USER', favorite: favorite}),
        unFavoriteUser: (id) => dispatch({ type: 'UNFAVORITE_USER', favoriteInstanceId: id})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow))