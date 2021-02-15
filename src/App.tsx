import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { fetchData, Job, Caregiver, Employer } from "./actions/actions";
import Welcome from "./components/Welcome";
import LoginForm from "./components/LoginForm";
import CaregiverSignup from "./components/CaregiverSignup";
import EmployerSignup from "./components/EmployerSignup";
import Appbar from "./components/Appbar";
import DashNav from "./components/DashNav";
import styled from "styled-components";
import NewJobForm from "./components/NewJobForm";
import Jobs from "./components/Jobs";
import JobShow from "./components/JobShow";
import UserIndex from "./components/UserIndex";
import UserShow from "./components/UserShow";
import Reviews from "./components/Reviews";
import FilterContainer from "./containers/FilterContainer";
import CalendarView from "./components/CalendarView";
import { StoreState } from "./store";

const Styles = styled.div`
  overflow-x: hidden;

  .sidebar-column {
    border: rgb(0, 0, 0, 0.2) solid 1px;
    height: 93.5vh;
    background: #ffc107;
  }
  .center-column {
    border: rgb(0, 0, 0, 0.2) solid 1px;
    height: 93.5vh;
    background: #f7f7f7;
    overflow-y: auto;
  }
  .right-column {
    border: rgb(0, 0, 0, 0.2) solid 1px;
    height: 93.5vh;
    background: #ffc107;
  }
`;

interface AppProps {
  init?: any;
  isLoggedIn: boolean;
  loading: boolean;
  signingUp: boolean;
  calendarView: boolean;
  userType: string;
  setLoginStatus: any;
  setUserType: any;
  fetchData: Function;
  userJobs: Job[];
  availableJobs: Job[];
  caregivers: Caregiver[];
  employers: Employer[];
}

class _App extends React.Component<AppProps> {
  componentDidMount() {
    const auth_token = localStorage.getItem("auth_token");
    const userType = localStorage.getItem("userType");
    if (auth_token && userType) {
      this.props.setLoginStatus(true);
      this.props.setUserType(userType);
      this.props.fetchData(userType);
    } else {
      this.props.setLoginStatus(false);
    }
  }

  selectFirstPage = () => {
    if (!this.props.isLoggedIn && !this.props.userType) {
      return <Welcome />;
    } else if (!this.props.isLoggedIn && this.props.userType) {
      return <LoginForm />;
    } else return <Jobs />;
  };

  renderLoading() {
    return <div>Loading...</div>;
  }

  render() {
    return (
      <BrowserRouter>
        <Appbar />
        <Styles>
          <Switch>
            <>
              <Row>
                <Col xs={2} className="sidebar-column">
                  <Route
                    exact
                    path="/jobs"
                    render={({ match }) => (
                      <FilterContainer path={match.path} />
                    )}
                  />
                  <Route
                    exact
                    path="/past-jobs"
                    render={({ match }) => (
                      <FilterContainer path={match.path} />
                    )}
                  />
                  <Route
                    exact
                    path="/pending-jobs"
                    render={({ match }) => (
                      <FilterContainer path={match.path} />
                    )}
                  />
                  <Route
                    path="/browse"
                    render={({ match }) => (
                      <FilterContainer path={match.path} />
                    )}
                  />
                </Col>
                <Col xs={8} className="center-column">
                  {this.props.isLoggedIn && this.props.userType ? (
                    <>
                      <DashNav />
                    </>
                  ) : (
                    <React.Fragment />
                  )}
                  <Route exact path="/">
                    {this.selectFirstPage()}
                  </Route>
                  <Route exact path="/login">
                    {this.selectFirstPage()}
                  </Route>
                  <Route exact path="/signup">
                    {this.props.signingUp &&
                    this.props.userType &&
                    this.props.userType === "caregiver" ? (
                      <CaregiverSignup />
                    ) : (
                      <EmployerSignup />
                    )}
                  </Route>
                  {this.props.loading ? (
                    <Route render={this.renderLoading} />
                  ) : (
                    <>
                      <Route exact path="/newjob">
                        <NewJobForm />
                      </Route>
                      <Route
                        exact
                        path="/jobs/:id/edit"
                        render={({ match }) => {
                          const jobId = parseInt(match.params.id);
                          const jobAry = this.props.userJobs.concat(
                            this.props.availableJobs
                          );
                          const job = jobAry.find((j: Job) => j.id === jobId);
                          if (job) return <NewJobForm job={job} />;
                          else return null;
                        }}
                      />
                      <Route exact path="/account">
                        {this.props.userType === "employer" ? (
                          <EmployerSignup />
                        ) : (
                          <CaregiverSignup />
                        )}
                      </Route>
                      <Route exact path="/jobs">
                        {this.props.isLoggedIn && this.props.calendarView ? (
                          <CalendarView />
                        ) : this.props.isLoggedIn ? (
                          <Jobs />
                        ) : (
                          <Welcome />
                        )}
                      </Route>
                      <Route exact path="/past-jobs">
                        {this.props.isLoggedIn && this.props.calendarView ? (
                          <CalendarView />
                        ) : this.props.isLoggedIn ? (
                          <Jobs />
                        ) : (
                          <Welcome />
                        )}
                      </Route>
                      <Route exact path="/pending-jobs">
                        {this.props.isLoggedIn && this.props.calendarView ? (
                          <CalendarView />
                        ) : this.props.isLoggedIn ? (
                          <Jobs />
                        ) : (
                          <Welcome />
                        )}
                      </Route>
                      <Route
                        exact
                        path="/jobs/:id"
                        render={({ match }) => {
                          const jobId = parseInt(match.params.id);
                          const jobAry = this.props.userJobs.concat(
                            this.props.availableJobs
                          );
                          const job = jobAry.find((j: Job) => j.id === jobId);
                          if (job) return <JobShow job={job} />;
                          else return null;
                        }}
                      />
                      <Route
                        exact
                        path="/caregivers/:id"
                        render={({ match }) => {
                          const userId = parseInt(match.params.id);
                          const user = this.props.caregivers.find(
                            (c: Caregiver) => c.id === userId
                          );
                          if (user) return <UserShow user={user} />;
                          else return null;
                        }}
                      />
                      <Route
                        exact
                        path="/employers/:id"
                        render={({ match }) => {
                          const userId = parseInt(match.params.id);
                          const user = this.props.employers.find(
                            (c: Caregiver) => c.id === userId
                          );
                          if (user) return <UserShow user={user} />;
                          else return null;
                        }}
                      />
                      <Route exact path="/browse">
                        <UserIndex />
                      </Route>
                      <Route exact path="/reviews">
                        <Reviews />
                      </Route>
                    </>
                  )}
                </Col>
                <Col xs={2} className="right-column"></Col>
              </Row>
            </>
          </Switch>
        </Styles>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (
  state: StoreState
): {
  userType: string;
  isLoggedIn: boolean;
  signingUp: boolean;
  calendarView: boolean;
  userJobs: Job[];
  availableJobs: Job[];
  caregivers: Caregiver[];
  employers: Employer[];
  loading: boolean;
} => {
  return {
    userType: state.users.userType,
    isLoggedIn: state.users.isLoggedIn,
    signingUp: state.users.signingUp,
    calendarView: state.users.calendarView,
    userJobs: state.jobs.userJobs,
    availableJobs: state.jobs.availableJobs,
    caregivers: state.users.caregivers,
    employers: state.users.employers,
    loading: state.ui.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // fetchData: (userType: string) => dispatch(fetchData(userType)),
    fetchData: (userType: string) => fetchData(userType),
    setUserType: (userType: string) =>
      dispatch({ type: "SET_USER_TYPE", userType: userType }),
    setLoginStatus: (status: boolean) =>
      dispatch({ type: "SET_LOGIN_STATUS", isLoggedIn: status }),
  };
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
