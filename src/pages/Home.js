import React, { Component } from "react";
import { list } from "../actions/PostActions";
// import { isAuthenticated } from "../actions/AuthActions";
import { Link } from "react-router-dom";
import renderHTML from "react-render-html";
import DefaultImage from "../images/milind-kaduskar-87655-unsplash.jpg";
import styled from "@emotion/styled";
import Search from "../components/Search";

// Bug: Cannot get comments length

export default class Home extends Component {
  state = {
    posts: [],
    page: 1,
    comments: []
  };
  // load posts function for lifecycle
  loadPosts = page => {
    list(page).then(data => {
      if (data.error) {
        // error!
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  // load posts lifecycle
  componentDidMount = () => {
    this.loadPosts(this.state.page);
  };
  loadMore = number => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = number => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = posts => {
    return (
      <>
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";
          return (
            <CardWrapper key={i}>
              <span className={post.category && post.category.name}>
                {post.category && post.category.name}
              </span>
              <Image
                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                alt={post.title}
                onError={i => (i.target.src = `${DefaultImage}`)}
              />
              <Link to={`/post/${post._id}`}>
                <CardBody>
                  <H4> {post.title}</H4>
                  <Body>{renderHTML(post.body.substring(0, 120))}</Body>
                </CardBody>
              </Link>
              <Footer>
                <p>
                  <Link to={`${posterId}`}>{posterName} </Link>
                </p>
                <p>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{" "}
                  {post.likes.length}
                </p>
              </Footer>
            </CardWrapper>
          );
        })}
      </>
    );
  };

  render() {
    const { posts, page } = this.state;

    return (
      <React.Fragment>
        <Search />
        <section id="home-posts">
          {!posts.length ? (
            <div id="loader" style={{ marginTop: "23rem" }}></div>
          ) : (
            ""
          )}
          <div className="home-posts-wrapper">{this.renderPosts(posts)}</div>
          <Pagination>
            <UlWrapper>
              {page > 1 ? (
                <>
                  <li>
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </li>
                  <li>
                    <BtnLoadless onClick={() => this.loadLess(1)}>
                      Back({this.state.page - 1})
                    </BtnLoadless>
                  </li>
                </>
              ) : (
                ""
              )}
              {posts.length ? (
                <>
                  <li>
                    <BtnLoadmore onClick={() => this.loadMore(1)}>
                      Next({page + 1})
                    </BtnLoadmore>
                  </li>
                  <li>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </li>
                </>
              ) : (
                ""
              )}
            </UlWrapper>
          </Pagination>
        </section>
      </React.Fragment>
    );
  }
}

const CardWrapper = styled("div")`
  width: 100%;
  min-height: 300px;
  margin: auto;
  box-shadow: var(--shadow-xs);
  background: #fff;
  margin-top: 3rem;
`;
const Image = styled("img")`
  width: 100%;
  display: block;
  height: 220px;
  border-top-radius: 5px;
`;
const CardBody = styled("div")`
  padding: 10px;
  background-color: var(--grey-light);
  color: var(--mainBlack);
  background-color: var(--grey-light);
`;
const H4 = styled("h4")`
  color: var(--mainBlack);
`;
const Body = styled("div")``;
const Footer = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: var(--grey-text);
`;
const Pagination = styled("div")`
  margin-top: 2rem;
  text-align: center;
`;

const BtnLoadless = styled("button")`
  margin: 0 10px 0 10px;
  padding: 6px;
  color: white;
  font-size: 12px;
  background-color: #ff4081;
  border-color: transparent;
  border-radius: 999px;
`;
const BtnLoadmore = styled("button")`
  margin: 0 10px 0 10px;
  padding: 6px;
  color: white;
  font-size: 12px;
  background-color: #ff4081;
  border-color: transparent;
  border-radius: 999px;
`;
const UlWrapper = styled("ul")`
  display: flex;
  margin: 0;
  justify-content: center;
  align-items: center;
  padding: 0;
  .fa {
    color: var(--grey-text);
  }
`;
