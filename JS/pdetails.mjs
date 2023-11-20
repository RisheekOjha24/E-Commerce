// Define the products
var prodList = {
  flowers: {
    p1: {
      name: "Rose",
      oprice: 1699,
      nprice: 399,
      description: "A beautiful and fragrant flower.",
      mainImg: "../images/pots/pA1.png",
      smallImg1: "../images/pots/pA1.png",
      smallImg2: "../images/pots/pa2.png",
      smallImg3: "../images/pots/pa3.png"
    },
    p2: {
      name: "Lily",
      oprice: 859,
      nprice: 486,
      description: "Elegant and symbolic flower.",
      mainImg: "../images/plants/A1.png",
      smallImg1: "../images/plants/A1.png",
      smallImg2: "../images/plants/a2.png",
      smallImg3: "../images/plants/a3.png"
    }
    // Add more flower products as needed
  },
  plants: {
    // Add plant products here
  },
  seeds: {
    // Add seed products here
  }
  // Add more categories as needed
};
console.log(prodList.flowers.p1.name);

console.log(prodList.flowers['p1'].name);
export default prodList;
