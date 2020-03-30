import React from "react";
import { API } from "../../config";
import DefaultImage from "../../images/avatar.jpg";
import styled from "@emotion/styled";

const ShowImage = ({ item, url }) => {
  const photoUrl = item._id ? `${API}/${url}/photo/${item._id}` : DefaultImage;
  return (
    <>
      <Image
        src={photoUrl}
        alt={item.item}
        onError={i => (i.target.src = `${DefaultImage}`)}
      />
    </>
  );
};

export default ShowImage;

const Image = styled("img")`
  height: auto;
  width: 100%;
  display: block;
`;
