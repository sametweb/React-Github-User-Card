import React from "react";
import SearchFollowersForm from "./SearchFollowersForm";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from "@material-ui/core";

class FollowersList extends React.Component {
  render() {
    return (
      <>
        {this.props.followers && (
          <>
            <SearchFollowersForm
              searchFollowers={this.props.searchFollowers}
              clearForm={this.props.clearForm}
              handleSearchInput={this.props.handleSearchInput}
              searchTerm={this.props.searchTerm}
            />
            <List>
              {this.props.followers.map(follower => {
                return (
                  <ListItem
                    key={follower.html_url}
                    button
                    onClick={() => this.props.handleUserButton(follower.login)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={follower.login} src={follower.avatar_url} />
                    </ListItemAvatar>
                    <ListItemText primary={follower.login} />
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </>
    );
  }
}

export default FollowersList;
