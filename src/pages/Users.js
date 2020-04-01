import React, { Component } from "react";
import { list } from "../actions/UserActions";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class FindPeople extends Component {
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

  showLoading = loading => loading && <div id="loader"></div>;

  render() {
    const { users, loading } = this.state;
    return (
      <section id="find-people">
        {this.showLoading(loading)}
        <div className="findpeople-container">
          {users.map((user, i) => (
            <div className="profile-card-users js-profile-card" key={i}>
              <div className="profile-card__img">
                <img
                  src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                  onError={i => (i.target.src = `${DefaultProfile}`)}
                  alt={user.name}
                />
              </div>

              <div className="profile-card__cnt js-profile-cnt">
                <div className="profile-card__name">
                  {" "}
                  <Link to={`/user/${user._id}`}>{user.name} </Link>
                </div>
                <div className="profile-card__txt">{user.about}</div>
                <div className="profile-card__txt">{user.email}</div>
                <div className="profile-card-loc">
                  <span className="profile-card-loc__icon"></span>

                  <span className="profile-card-loc__txt">
                    <i className="fa fa-calendar"></i>{" "}
                    {`${new Date(user.created).toDateString()}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default FindPeople;
