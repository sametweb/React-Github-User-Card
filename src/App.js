import React from "react";
import {
  Container,
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

class App extends React.Component {
  state = {};

  componentDidMount() {
    fetch("https://api.github.com/users/sametweb")
      .then(res => res.json())
      .then(user => this.setState({ ...this.state, user: user }))
      .catch(err => console.log("Error in componentDidMount: ", err));
  }

  fetchFollowers = () =>
    fetch("https://api.github.com/users/sametweb/followers")
      .then(res => res.json())
      .then(followers =>
        this.setState({ ...this.state, projects: [], followers: followers })
      )
      .catch(err => console.log("Error in fetchFollowers: ", err));

  fetchProjects = () => {
    fetch("https://api.github.com/users/sametweb/repos")
      .then(res => res.json())
      .then(projects =>
        this.setState({ ...this.state, followers: [], projects: projects })
      )
      .catch(err => console.log("Error in fetchProjects: ", err));
  };

  render() {
    console.log(this.state);

    const { user, followers, projects } = this.state;

    return user ? (
      <Container maxWidth="xs">
        <Typography component="div">
          <Card>
            <CardActionArea>
              <CardMedia
                style={{ height: 320 }}
                image={user.avatar_url}
                title={user.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.bio}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={this.fetchFollowers}
              >
                Show Followers
              </Button>
              <Button size="small" color="primary" onClick={this.fetchProjects}>
                Show Projects
              </Button>
            </CardActions>
          </Card>
          <List>
            {followers &&
              followers.map(follower => {
                return (
                  <ListItem key={follower.html_url} button>
                    <ListItemAvatar>
                      <Avatar alt={follower.login} src={follower.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText primary={follower.login} />
                  </ListItem>
                );
              })}
          </List>
          <List>
            {projects &&
              projects.map(project => {
                return (
                  <ListItem key={project.html_url} button>
                    <ListItemText primary={project.name} />
                  </ListItem>
                );
              })}
          </List>
        </Typography>
      </Container>
    ) : (
      // <div className="App">
      //   <img src={user && user.avatar_url} alt={user && user.name} />
      //   <h2>{user && user.name}</h2>
      //   <h5>
      //     <em>{user && user.bio}</em>
      //   </h5>
      // </div>
      <div></div>
    );
  }
}

export default App;
