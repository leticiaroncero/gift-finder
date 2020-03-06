import React, { Component } from "react";
import Productcard from "../components/Productcard";
import { Input, FormBtn, Filters } from "../components/SearchBar";
import API from "../utils/API"
import SimpleSlider from "../components/SimpleSlider"


class Homepage extends Component {
  state = {
    products: [],
    filteredProducts: [],
    giftSearch: "",
    giftOccasion: "Anniversary",
    minPrice: "0",
    maxPrice: "50",
    PageType: "homepage"
  };

  componentDidMount = () => {
    this.handleFilter(this.state.giftOccasion);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.products)
    // API.getProducts(this.state.giftSearch)
    //   .then(res => {
    //     // console.log(res.data)
    //     this.setState({ products: res.data.results })
    //   })
    //   .catch(err => console.log(err));
    var term = this.state.giftSearch;

    var filterProduct = this.state.products.filter(function (product) {
      return product.title.indexOf(term) !== -1
    })
    console.log(filterProduct)
    this.setState({ filteredProducts: filterProduct })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFilter = (occasion) => {
    //  this.setState({ giftOccasion: occasion });
    console.log("ocassion:", occasion)

    API.getProducts(this.state.giftSearch + " " + occasion, this.state.minPrice, this.state.maxPrice)
      .then(res => {
        this.setState({ products: res.data.results, filteredProducts: res.data.results })
      })
      .catch(err => console.log(err));
  }

  handlePrice = (value) => {
    var minPrice;
    var maxPrice;
    switch (value) {
      case "1":
      default:
        minPrice = 0;
        maxPrice = 50;
        break;
      case "2":
        minPrice = 50;
        maxPrice = 100;
        break;
      case "3":
        minPrice = 100;
        maxPrice = 250;
        break;
      case "4":
        minPrice = 250;
        break;
    }
    console.log("min price: " + minPrice + ", max price: " + maxPrice);
    //this.setState({ minPrice: minPrice });
    //this.setState({ maxPrice: maxPrice });

    API.getProducts(this.state.giftSearch + " " + this.state.giftOccasion, minPrice, maxPrice).then(res => {
      this.setState({ products: res.data.results, filteredProducts: res.data.results })
    })
      .catch(err => console.log(err));
  }

  handleBookmark = id => {
    console.log("clicked :", id)
    const savedProduct = this.state.products.filter(product => product.listing_id === parseInt(id))
    console.log(savedProduct)
    const productTobeSaved = {

      title: savedProduct[0].title,
      image: savedProduct[0].Images[0].url_170x135,
      url: savedProduct[0].url,
      price: savedProduct[0].price,
      listing_id: savedProduct[0].listing_id
    }
    API.saveProducts(productTobeSaved)
      .then(result => {
        console.log(result)
        const nosaved = this.state.products.filter(product => product.listing_id !== result.data.listing_id)
        this.setState({ books: nosaved })
      })
    //  .then(res => {
    //    this.props.history.push("/saved")
    //  })
    //  .catch(err => console.log(err));

  };


  render() {
    return (
      <div>
        <Filters
          handleFilter={this.handleFilter}
          handlePrice={this.handlePrice} />
        <form>
          <div className="searchbar-container">
            <Input
              name="giftSearch"
              value={this.state.giftSearch}
              onChange={this.handleInputChange}
              placeholder="Filter your results" />
            <FormBtn
              disabled={!(this.state.giftSearch)}
              onClick={this.handleFormSubmit}>
              Filter
            </FormBtn>
          </div>
        </form>
        <div className="row">
          {this.state.filteredProducts.map(product => {
            return (
              <Productcard
                key={product.listing_id}
                id={product.listing_id}
                title={product.title.slice(0, 25)}
                image={product.Images[0].url_170x135}
                url={product.url}
                price={product.price}
                handleBookmark={this.handleBookmark}
              />)
          })}
        </div>
        <SimpleSlider />
      </div>
    )
  }
}



export default Homepage;