import React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardActionArea,
  CardMedia,
  CardContent,
  Button
} from "@material-ui/core";

class GitHubUserCard extends React.Component {
  render() {
    return (
      <Card>
        <CardActionArea>
          <CardMedia
            style={{ height: 320 }}
            image={this.props.user.avatar_url}
            title={this.props.user.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.user.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.props.fetchFollowers(this.props.user.login)}
          >
            Show Followers
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.props.fetchProjects(this.props.user.login)}
          >
            Show Projects
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default GitHubUserCard;
