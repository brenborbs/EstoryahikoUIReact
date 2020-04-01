import React, { useState, useEffect } from "react";
import Card from "../components/Posts/Card"; // ok
import { getCategories, getFilteredPosts } from "../actions/CategoryActions"; // ok
import Checkbox from "../components/Posts/Checkbox"; // ok
import ProfileCard from "../components/ProfileCard/main";
import ProfileFollowing from "../components/Profile/ProfileFollowing";
import { isAuthenticated } from "../actions/AuthActions";
// import Spinner from "../helpers/Spinner";
import styled from "@emotion/styled";

const Report = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [] }
  });

  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  // const [values, setValues] = useState({ loading: false });

  // const { loading } = values;

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    // setValues({ loading: true });
    getFilteredPosts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
        // setValues({ loading: false });
      }
    });
  };

  const loadMore = () => {
    // setValues({ loading: true });
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredPosts(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
        // setValues({ loading: false });
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && <BtnLoadmore onClick={loadMore}>Load more</BtnLoadmore>
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters); // eslint-disable-next-line
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("REPORT", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  // const showLoading = () => loading && <div id="loader"></div>;

  return (
    <div className="posts-wrapper">
      <Container>
        <div className="posts-row">
          <div className="column">
            {isAuthenticated() ? (
              <>
                <ProfileCard />
                <ProfileFollowing />
              </>
            ) : (
              <RightColumnWrapper>
                <H6>Hoy! Bag-o ra ka?</H6>
                <div className="unauth-body">
                  <P>Apil diri</P>
                  <P>Basaha ang policy bai</P>
                </div>
              </RightColumnWrapper>
            )}
          </div>

          <div className="column">
            <div className="row p-3 my-3 shadow-sm bg-white">
              {filteredResults.map((post, i) => (
                <PostCardContainer key={i}>
                  <Card post={post} />
                </PostCardContainer>
              ))}
            </div>
            <BtnWrapper>{loadMoreButton()}</BtnWrapper>
          </div>
          <div className="column">
            <div className="checkbox">
              <h2>Topics</h2>
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Report;

const Container = styled("div")``;
const PostCardContainer = styled("div")`
  box-shadow: var(--shadow-xs);
  background-color: white;
  border-radius: 5px;
  margin-bottom: 2rem;
`;
const RightColumnWrapper = styled("div")`
  padding: 20px;
  box-shadow: var(--shadow-xs);
  border-radius: 5px;
  background-color: white;
  letter-spacing: 0.5px;
`;

const H6 = styled("h6")`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1.2;
  color: var(--grey-text);
`;
const P = styled("p")`
  margin-top: 5px;
  margin-bottom: 5px;
  color: var(--grey-one);
`;
const BtnWrapper = styled("div")`
  text-align: center;
`;
const BtnLoadmore = styled("button")`
  padding: 8px;
  color: white;
  font-size: 12px;
  background-color: #ff4081;
  border-color: transparent;
  border-radius: 999px;
`;
