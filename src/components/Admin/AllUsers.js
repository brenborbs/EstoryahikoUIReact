import React, { Component } from "react";
import { list } from "../../actions/UserActions";
import { Link } from "react-router-dom";

export default class extends Component {
  state = {
    users: [],
    loading: false
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data, loading: false });
      }
    });
  };

  showAllUsers = users => {
    return users.map((user, i) => {
      return (
        <tr key={i}>
          <td className="td-details">
            <Link to={`/user/${user._id}`}>{user.name}</Link>
          </td>
          <td className="td-details">{user.email}</td>
          <td className="td-details">
            {new Date(user.created).toDateString()}
          </td>
        </tr>
      );
    });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="overflow-auto">
        <table className="table-wrapper" cellSpacing="0">
          <thead>
            <tr>
              <th className="th-title">Name</th>
              <th className="th-title">Email</th>
              <th className="th-title">Joined</th>
            </tr>
          </thead>
          <tbody className="lh-copy">{this.showAllUsers(users)}</tbody>
        </table>
      </div>
    );
  }
}
