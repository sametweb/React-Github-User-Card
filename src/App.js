import React from "react";
import GitHubUserCard from "./components/GitHubUserCard";
import FollowersList from "./components/FollowersList";
import ProjectsList from "./components/ProjectsList";
import { Container, Typography } from "@material-ui/core";

class App extends React.Component {
  state = {
    userToFetch: "sametweb"
  };

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.userToFetch}`)
      .then(res => res.json())
      .then(user => this.setState({ ...this.state, user: user }))
      .catch(err => console.log("Error in componentDidMount: ", err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userToFetch !== this.state.userToFetch) {
      fetch(`https://api.github.com/users/${this.state.userToFetch}`)
        .then(res => res.json())
        .then(user => this.setState({ ...this.state, user: user }))
        .then(() => this.fetchFollowers(this.state.userToFetch))
        .catch(err => console.log("Error in componentDidUpdate: ", err));
    }
  }

  fetchFollowers = userToFetch =>
    fetch(`https://api.github.com/users/${userToFetch}/followers`)
      .then(res => res.json())
      .then(followers =>
        this.setState({
          ...this.state,
          projects: undefined,
          followers: followers
        })
      )
      .catch(err => console.log("Error in fetchFollowers: ", err));

  fetchProjects = userToFetch => {
    fetch(`https://api.github.com/users/${userToFetch}/repos`)
      .then(res => res.json())
      .then(projects =>
        this.setState({
          ...this.state,
          followers: undefined,
          projects: projects
        })
      )
      .catch(err => console.log("Error in fetchProjects: ", err));
  };

  handleUserButton = userToFetch =>
    this.setState({ ...this.state, userToFetch: userToFetch });

  handleSearchInput = event =>
    this.setState({ ...this.state, searchTerm: event.target.value });

  searchFollowers = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      followers: this.state.followers.filter(follower =>
        follower.login
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
      )
    });
  };

  clearForm = event => {
    event.preventDefault();
    this.fetchFollowers(this.state.userToFetch);
    this.setState({ ...this.state, searchTerm: "" });
  };

  render() {
    const { user, followers, projects } = this.state;
    console.log(this.state);
    return user ? (
      <Container maxWidth="xs">
        <Typography component="div">
          <GitHubUserCard
            user={user}
            fetchFollowers={this.fetchFollowers}
            fetchProjects={this.fetchProjects}
          />
          <FollowersList
            followers={followers}
            searchFollowers={this.searchFollowers}
            clearForm={this.clearForm}
            handleUserButton={this.handleUserButton}
            handleSearchInput={this.handleSearchInput}
            searchTerm={this.state.searchTerm || ""}
          />
          <ProjectsList projects={projects} />
        </Typography>
      </Container>
    ) : (
      <div></div>
    );
  }
}

export default App;
