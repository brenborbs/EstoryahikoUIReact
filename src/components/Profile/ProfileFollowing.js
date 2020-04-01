import React, { Component } from "react";
import { findPeople, follow } from "../../actions/UserActions";
import DefaultProfile from "../../images/avatar.jpg";
import { isAuthenticated } from "../../actions/AuthActions";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default class ProfileFollowing extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      error: "",
      open: false,
      // pagination
      page: 1
    };
  }

  loadUsers = page => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    findPeople(userId, token, page).then(data => {
      if (data.error) {
        // error!
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  };

  // load posts lifecycle
  componentDidMount = () => {
    this.loadUsers(this.state.page);
  };
  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadUsers(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadUsers(this.state.page - number);
  };

  // componentDidMount() {
  //   const userId = isAuthenticated().user._id;
  //   const token = isAuthenticated().token;

  //   findPeople(userId, token).then(data => {
  //     if (data.error) {
  //       console.log(data.error);
  //     } else {
  //       this.setState({ users: data });
  //     }
  //   });
  // }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    follow(userId, token, user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        let toFollow = this.state.users;
        toFollow.splice(i, 1);
        this.setState({
          users: toFollow,
          open: true,
          followMessage: `Following ${user.name}`
        });
      }
    });
  };
  renderUsers = users => (
    <>
      {users.map((user, i) => (
        <Media key={i}>
          <Image
            src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
            alt={user.name}
            onError={i => (i.target.src = `${DefaultProfile}`)}
          />
          <Body>
            <Inside>
              <Link to={`/user/${user._id}`}>
                <strong>{user.name}</strong>
              </Link>

              <Button onClick={() => this.clickFollow(user, i)}>Follow</Button>
            </Inside>
            <Span>{user.email}</Span>
          </Body>
        </Media>
      ))}
    </>
  );
  render() {
    const { users, open, followMessage, page } = this.state;
    return (
      <Wrapper>
        <H6>Suggestions</H6>
        {open && <div className="alert-success">{followMessage}</div>}

        {this.renderUsers(users)}
        <Pagination>
          {page > 1 ? (
            <BtnLoadless onClick={() => this.loadLess(1)}>
              Previous ({this.state.page - 1})
            </BtnLoadless>
          ) : (
            ""
          )}
          {users.length ? (
            <BtnLoadmore onClick={() => this.loadMore(1)}>
              See more ({page + 1})
            </BtnLoadmore>
          ) : (
            ""
          )}
        </Pagination>
      </Wrapper>
    );
  }
}

const Pagination = styled("div")`
  margin: 10px 0px 0px 130px;
`;

const BtnLoadless = styled("button")`
  margin-right: 1rem;
  padding: 5px;
  color: #2088af;
  font-size: 10px;
  background-color: #a7e3f6;
  border-color: #6bcfef;
  border-radius: 5px;
`;
const BtnLoadmore = styled("button")`
  margin-right: 1rem;
  padding: 5px;
  color: #2088af;
  font-size: 10px;
  background-color: #a7e3f6;
  border-color: #6bcfef;
  border-radius: 5px;
`;

const Wrapper = styled("div")`
  padding: 20px;
  margin-top: 1.5rem;
  box-shadow: var(--shadow-xs);
  border-radius: 5px;
  background-color: white;
`;
const H6 = styled("h6")`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
`;

const Media = styled("div")`
  display: flex;
  align-items: flex-start;
  margin-top: 1rem;
  margin-bottom: 5px;
`;
const Image = styled("img")`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
const Body = styled("div")`
  font-size: 80%;
  font-weight: 400;
  border-bottom: 1px solid #dee2e6;
  flex: 1 1;
  margin-left: 1rem;
`;
const Inside = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
`;
const Button = styled("button")`
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  border-radius: 999px;
  color: white;
  border-color: transparent;
  background-color: #4267b2;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  text-transform: uppercase;

  :hover {
    background-color: #6699cc;
  }
`;
const Span = styled("span")`
  font-style: italic;
`;
