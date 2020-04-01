import React from "react";
// import { Link } from "react-router-dom";
import moment from "moment";
import renderHTML from "react-render-html";
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
      <a href={`/post/${post._id}`}>
        <CardBody>
          <h4>{post.title}</h4>
          <Body>{renderHTML(post.body.substring(0, 120))}</Body>
        </CardBody>
      </a>
      <Footer>
        <p>{moment(post.created).format("MMMM D YYYY")}</p>
        <p>
          <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{" "}
          {post.likes.length}
        </p>
        <span>
          <i className="fa fa-comment-o" aria-hidden="true"></i>{" "}
          {Object.keys(post.comments).length}
        </span>
      </Footer>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled("div")`
  border: 1px solid #dadde1;
`;
const CardBody = styled("div")`
  font-size: 12px;
  padding: 8px;
  background-color: var(--grey-light);
  color: var(--mainBlack);
`;
const Body = styled("div")`
  margin-bottom: 10px;
`;
const Footer = styled("div")`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 8px;
  color: var(--grey-text);
`;
const Image = styled("img")`
  width: 100%;
  display: block;
  height: 200px;
  border-top-radius: 5px;
`;
