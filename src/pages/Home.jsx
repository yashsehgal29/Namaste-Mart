import React, { useContext } from "react";
import Layout from "../components/layout/Layout";
import Section1 from "../components/section1/Section1";
import Category from "../components/category/Category";
import ProductCard from "../components/ProductCard/ProductCard";
import HomePageProduct from "../components/Homepageproductcard/HomePageProduct";
import MyContext from "../context/MyContext";
const Home = () => {

  return(
    <Layout>
     <Section1/>
     <Category/>
     <div className="my-8 text-3xl font-extrabold text-center">
      <h1>Bestseller products</h1>
     </div>
 
     <HomePageProduct/>
    </Layout>
  );
};

export default Home;
 