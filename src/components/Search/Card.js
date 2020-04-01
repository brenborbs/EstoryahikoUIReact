import React from "react";
import { Link } from "react-router-dom";
// import renderHTML from "react-render-html";
import moment from "moment";
import styled from "@emotion/styled";
import DefaultImage from "../../images/milind-kaduskar-87655-unsplash.jpg";

const Card = ({ post }) => {
  return (
    <CardWrapper>
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
          <Body>{post.body}</Body>
        </CardBody>
      </Link>
      <Footer>
        <p>{moment(post.created).format("MMMM D YYYY")}</p>
        <span>
          <i className="fa fa-comment-o" aria-hidden="true"></i>{" "}
          {Object.keys(post.comments).length}
        </span>
        <p>
          <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{" "}
          {post.likes.length}
        </p>
      </Footer>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled("div")`
  width: 100%;
  min-height: 300px;
  margin: auto;
  box-shadow: var(--shadow-xs);
  background: #fff;
  margin-top: 1rem;
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
