import React, { Component } from "react";
import Slider from "react-slick";
import "./style.css";

export default class SimpleSlider extends Component {

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div> 
        <h2>Gift Recommendation</h2>
        <Slider {...settings}>
          <div>
            <h3>
            <img src="" alt="hello">
            </img>
            </h3>
          </div>
          <div>
            <h3>
            <img src="" alt="hello">
            </img>
            </h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    );
  }
}