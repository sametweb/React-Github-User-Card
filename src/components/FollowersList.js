import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

class FollowersList extends React.Component {
  render() {
    return (
      <>
        {this.props.followers && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between " }}>
              <InputBase
                fullWidth
                placeholder="Search followers"
                inputProps={{ "aria-label": "search followers" }}
                onChange={this.props.handleSearchInput}
                value={this.props.searchTerm}
              />
              <IconButton
                type="submit"
                aria-label="search"
                onClick={this.props.searchFollowers}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                type="reset"
                aria-label="cancel"
                onClick={this.props.clearForm}
              >
                <ClearIcon />
              </IconButton>
            </div>
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
