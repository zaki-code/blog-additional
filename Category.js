import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CategoryOptions from "./CategoryOptions";

const Category = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  useEffect(() => {
    const category = props.match.params.id;
    setCurrentCategory(capitalizeFirstLetter(category));

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blog/category`,
          { category },
          config
        );
        setBlogs(res.data);
      } catch (err) {}
    };

    fetchData();
  }, [props.match.params.id]);

  const capitalizeFirstLetter = (word) => {
    if (word) return word.charAt(0).toUpperCase() + word.slice(1);
    return "";
  };

  const getCategoryBlogs = () => {
    let list = [];
    let result = [];

    blogs.map((blogPost) => {
      return list.push(
        <div className="row bloger no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
            <strong className="d-inline-block mb-2 text-primary">
              {capitalizeFirstLetter(blogPost.category)}
            </strong>
            <h3 className="mb-0 head">{blogPost.title}</h3>
            <p className="mb-1 mt-1 dat text-muted">
              {blogPost.month} {blogPost.day}
            </p>

            <p className="card-text mb-2 para">{blogPost.exerpt}</p>

            <Link to={`/blog/${blogPost.slug}`} className="stretched-link">
              Read More..
            </Link>
          </div>
          <div className="col p-0 m-0 ">
            <img
              className="image"
              src={`${process.env.REACT_APP_API_URL}${blogPost.thumbnail}`}
              alt={blogPost.title}
            />
          </div>
        </div>
      );
    });

    for (let i = 0; i < list.length; i += 2) {
      result.push(
        <div key={i} className="row mb-2">
          <div className="col-md-6">{list[i]}</div>
          <div className="col-md-6">{list[i + 1] ? list[i + 1] : null}</div>
        </div>
      );
    }

    return result;
  };

  return (
    <div className="container mt-3">
      <h3 className="display-4">{currentCategory} Category</h3>
      <CategoryOptions />
      {getCategoryBlogs()}
    </div>
  );
};

export default Category;
