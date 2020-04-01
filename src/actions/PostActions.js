import { API } from "../config";
import queryString from "query-string";

export const create = (userId, token, post) => {
  return fetch(`${API}/post/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: post
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// for admin list
export const lists = () => {
  return fetch(`${API}/posts`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// with pagination
export const list = page => {
  return fetch(`${API}/posts/?page=${page}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const singlePost = postId => {
  return fetch(`${API}/post/${postId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listByUser = (userId, token) => {
  return fetch(`${API}/posts/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const remove = (postId, token) => {
  return fetch(`${API}/post/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const update = (postId, token, post) => {
  console.log(postId, token, post);
  return fetch(`${API}/post/${postId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: post
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const like = (userId, token, postId) => {
  return fetch(`${API}/post/like`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const unlike = (userId, token, postId) => {
  return fetch(`${API}/post/unlike`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const comment = (userId, token, postId, comment) => {
  return fetch(`${API}/post/comment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, comment })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const uncomment = (userId, token, postId, comment) => {
  return fetch(`${API}/post/uncomment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, comment })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const listRelated = postId => {
  return fetch(`${API}/posts/related/${postId}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

// export const searches = params => {
//   const query = queryString.stringify(params);
//   console.log("query", query);
//   return fetch(`${API}/posts/search?${query}`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };
export const searches = params => {
  console.log("search params", params);
  let query = queryString.stringify(params); // value on search input at front-end
  console.log("query params", query);
  return fetch(`${API}/posts/search?${query}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
