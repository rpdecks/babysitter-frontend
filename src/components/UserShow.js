import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Image, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
// import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { MdSmokeFree, MdSmokingRooms, MdPets } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import StarRatings from 'react-star-ratings'
import { IconContext } from "react-icons";

const Styles = styled.div `
  .img {
    height: 40vh;
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
            if (result.length > 0) return <BsHeartFill onClick={() => favoriteUser()} />
            else return <BsHeart onClick={() => favoriteUser()} />
        } else if ( props.userType === 'caregiver' ) {
            result = props.userFavorites.filter(f => f.employer_id === props.user.id)
            if (result.length> 0) return <BsHeartFill onClick={() => favoriteUser()} />
            else return <BsHeart onClick={() => favoriteUser()} />
        }
    }

    return (
        <Styles>
            <Row>
                <Col xs={8}>
                    <Row >
                    <Image 
                        className='img' 
                        src={props.user.image} 
                        rounded
                        alt={'babysitter'} 
                    />  
                    <Col>
                        <Row>
                            <h3>{props.user.first_name} {props.user.last_name[0]}.</h3>
                            {props.userFavorites && renderFavoriteHearts()}
                        </Row>
                        <StarRatings
                            name='rating'
                            rating={props.user.rating}
                            starRatedColor="red"
                            numberOfStars={5}
                            starDimension="30px"
                            starSpacing="2px"
                        />
                        <p>{props.user.rating} out of 5 stars</p><br />
                        
                        <b>Age:</b> ~ {props.user.age} years old<br />
                        <b>Gender:</b> {props.user.gender}<br />
                        <b>Has pets?</b> {props.user.has_pets.toString()}<br />
                        <b>Experience:</b> {props.user.job_count} completed jobs<br />
                        <b>Pay rate</b> ${props.user.pay_rate} / hour
                        <br /><br />
                        <Row>
                            {props.user.non_smoking ? 
                                <IconContext.Provider value={{size: "50px", color: "#A9A9A9"}}>
                                    <div>
                                        <MdSmokeFree />
                                    </div>
                                </IconContext.Provider> 
                                : 
                                <IconContext.Provider value={{size: "50px", color: "#A9A9A9"}}>
                                    <div>
                                        <MdSmokingRooms />
                                    </div>
                                </IconContext.Provider>
                            }
                            {props.user.first_aid_cert ? 
                                <IconContext.Provider value={{size: "50px", color: "#A9A9A9"}}>
                                    <div>
                                        <GiHealthNormal />
                                    </div>
                                </IconContext.Provider>
                                :
                                null}
                            {props.user.has_pets ? 
                                <IconContext.Provider value={{size: "50px", color: "#A9A9A9"}}>
                                    <div>
                                        <MdPets />
                                    </div>
                                </IconContext.Provider>
                                :
                                null}
                        </Row>
                    </Col>
                    </Row>
                </Col>  
            </Row>
            <Row>
                <h3>A little about me:</h3>
                <p>{props.user.bio}</p>
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
        userType: state.userReducer.userType,
        userFavorites: state.favoritesReducer.userFavorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        favoriteUser: (favorite) => dispatch({ type: 'FAVORITE_USER', favorite: favorite}),
        unFavoriteUser: (id) => dispatch({ type: 'UNFAVORITE_USER', favoriteInstanceId: id})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow))