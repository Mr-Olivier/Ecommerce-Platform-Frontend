import React from "react";
import SmartphoneX from "../assets/Smartphone X.jpg";
import WirelessHeadphones from "../assets/Wireless Headphones.jpg";
import SmartTV from "../assets/4K Smart TV.jpg";

const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: "$999",
    image: SmartphoneX,
    description: "The latest smartphone with cutting-edge features.",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: "$199",
    image: WirelessHeadphones,
    description: "Experience high-quality sound with wireless freedom.",
  },
  {
    id: 3,
    name: "4K Smart TV",
    price: "$799",
    image: SmartTV,
    description: "Stunning 4K visuals for an immersive viewing experience.",
  },
];

const ProductList: React.FC = () => {
  return (
    <section id="products" className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600">{product.price}</p>
            <button className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
