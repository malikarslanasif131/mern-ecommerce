import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import "../styles/Homepage.css";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <div
                  className="card-header"
                  style={{ height: "220px", overflow: "hidden" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{
                      objectFit: "scale-down",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name.substring(0, 20)}...</h5>
                  <p className="card-text">
                    {p.description.substring(0, 50)}...
                  </p>
                  <p className="card-text text-success fs-5"> $ {p.price}</p>
                  <div className="card-text card-name-price mt-2 mx-1 pb-2">
                    <button
                      className="btn btn-info text-light"
                      style={{
                        padding: "5px",
                        margin: "5px",
                        backgroundColor: "rgb(251 33 31 / 72%)",
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark  ms-2"
                      style={{
                        padding: "5px",
                        margin: "5px",
                        backgroundColor: " #495159b0",
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
