import React from "react";
import { IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

class SearchFollowersForm extends React.Component {
  render() {
    return (
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
    );
  }
}

export default SearchFollowersForm;
