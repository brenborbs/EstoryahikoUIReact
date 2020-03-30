import React, { Component } from "react";
import { lists } from "../../actions/PostActions";
import { Link } from "react-router-dom";

export default class AllPosts extends Component {
  state = {
    posts: [],
    loading: false
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    lists().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data, loading: false });
      }
    });
  };

  showAllPosts = posts => {
    return posts.map((post, i) => {
      return (
        <tr key={i}>
          <td className="td-details">
            <Link to={`/post/${post._id}`}>{post.title}</Link>
          </td>
          <td className="td-details">
            <Link to={`/user/${post.postedBy._id}`}>{post.postedBy.name}</Link>
          </td>
          <td className="td-details">
            {new Date(post.created).toDateString()}
          </td>
        </tr>
      );
    });
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="overflow-auto">
        <table className="table-wrapper" cellSpacing="0">
          <thead>
            <tr>
              <th className="th-title">Title</th>
              <th className="th-title">Author</th>
              <th className="th-title">Date</th>
            </tr>
          </thead>
          <tbody className="lh-copy">{this.showAllPosts(posts)}</tbody>
        </table>
      </div>
    );
  }
}
