import Banner from "../../components/Banner";
import FAQ from "../../components/FAQ";
import Feature from "../../components/Feature";

const Home = () => {
  return (
    <div className="min-h-screen space-y-20 pt-6 pb-16">
      <Banner />
      <Feature />
      <FAQ />
    </div>
  );
};

export default Home;
