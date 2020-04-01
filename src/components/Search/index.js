import React, { useState, useEffect } from "react";
import { getCategories } from "../../actions/CategoryActions";
import { searches } from "../../actions/PostActions";
import styled from "@emotion/styled";

import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false
  });

  // const [values, setValues] = useState({
  //   loading: false
  // });

  // const { loading } = values;

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    console.log(search, category);
    // setValues({ loading: true });
    if (search) {
      searches({ search: search || undefined, category: category }).then(
        response => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
            // setValues({ loading: false });
          }
        }
      );
    }
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchData();
  };

  const handleChange = name => event => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} post/s`;
    }
    if (searched && results.length < 1) {
      return `No posts found`;
    }
  };

  const searchPosts = (results = []) => {
    return (
      <>
        {results.map((post, i) => (
          <Card key={i} post={post} />
        ))}
      </>
    );
  };

  const searchForm = () => (
    <form className="search-form" onSubmit={searchSubmit}>
      <span className="search-icon">
        <i className="fa fa-search"></i>
      </span>
      <div className="searchinput-wrapper">
        <input
          onChange={handleChange("search")}
          type="search"
          placeholder="Search here..."
          className="inputsearch"
        />
      </div>
      <div className="search-select">
        <select className="selectoptions" onChange={handleChange("category")}>
          <option value="All">All</option>
          {categories.map((c, i) => (
            <option key={i} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );

  // const showLoading = () => loading && <div id="loader"></div>;

  return (
    <React.Fragment>
      <div className="search-section">
        <section id="banner">
          <div className="search-container">
            <div className="search-title">
              <span className="name">Estoryahi Ko!</span>
              <div className="titles">
                <h1>
                  Para ni sa mga estoryador, gibulagan, sogarol pero gwapo and
                  gwapa. Walay labot ang alien!
                </h1>
                <p>Ato ni bai! Mura man og commercial sa bangko sa una.</p>
                <div className="input-container">
                  <div className="input-wrapper">
                    <div>{searchForm()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <SearchMessage>
          <h2 className="">{searchMessage(searched, results)}</h2>
        </SearchMessage>
        <div className="home-posts-wrapper">{searchPosts(results)}</div>
      </div>
    </React.Fragment>
  );
};

export default Search;

const SearchMessage = styled("div")`
  text-align: center;
  padding-top: 1rem;
  color: var(--grey-one);
`;
