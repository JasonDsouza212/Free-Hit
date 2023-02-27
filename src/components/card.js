import React, { useState, useEffect } from "react";
import { products } from "../DB/product";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CustomModal from "./custommodal";

function Card() {
  const [category, setCategory] = useState("all");
  const [modalState,setModalState] = useState(false);

  const buttons = [
          <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => filterProduct("all")}
              title="All"
            ></button>
          </div>,
          <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => filterProduct("remote")}
              title="Remote Jobs"
            ></button>
          </div>,
          <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => filterProduct("resume")}
              title="Resume Builder"
            ></button>
          </div>,
          <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => filterProduct("tweet")}
              title="Tweet to Image"
            ></button>
          </div>,
          <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => filterProduct("code")}
              title="Code to Image"
            ></button>
          </div>,
          <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => filterProduct("tools")}
              title="Useful Tools"
            ></button>
          </div>
  ]

  function filterProduct(value) {
    setCategory(value);
  }

  useEffect(() => {
    setCategory("all");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {modalState && <CustomModal buttons={buttons} modalState={modalState} setModalState={setModalState} filterProduct={filterProduct}/>}
        <div className="filter-section">
        <div class="button-wrapper">
            <button
              rel="noopener noreferrer"
              class="background-button"
              onClick={() => setModalState(true)}
              title="Filters"
            ></button>
          </div>
        </div>
        <div id="products">
          <div class="container">
            {products.data.map((product, index) => {
              if (category === "all" || category === product.category) {
                return (
                  <div key={index}>
                    <div class="card">
                      <div class="box">
                        <div class="content">
                          <LazyLoadImage
                            className="card-image"
                            src={product.image}
                            alt={product.productName}
                            effect={'blur'}
                          />
                          <h3>{product.productName.toUpperCase()}</h3>
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button>Website</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Card;
