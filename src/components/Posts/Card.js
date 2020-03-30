import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import renderHTML from "react-render-html";
import styled from "@emotion/styled";

const Card = ({ post }) => {
  return (
    <CardWrapper>
      <span className={post.category && post.category.name}>
        {post.category && post.category.name}
      </span>
      <ShowImage item={post} url="post" />
      <Link to={`/post/${post._id}`}>
        <CardBody>
          <h4>{post.title}</h4>
          <Body>{renderHTML(post.body.substring(0, 120))}</Body>
        </CardBody>
      </Link>
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
  padding: 10px;
  background-color: var(--grey-light);
  color: var(--mainBlack);
`;
const Body = styled("div")`
  margin-bottom: 10px;
`;
const Footer = styled("div")`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: var(--grey-text);
`;
