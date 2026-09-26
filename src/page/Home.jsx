import AppSwiper from "../components/templates/home/AppSwiper";
import LastProductSlider from "../components/templates/home/LastProductSlider";
import ShopinoFeatures from "../components/templates/home/ShopinoFeatures";
import CategorySection from "../components/templates/home/category/CategorySection";

function Home() {
  return (
    <>
      <AppSwiper></AppSwiper>
      <LastProductSlider></LastProductSlider>
      <CategorySection></CategorySection>
      <ShopinoFeatures></ShopinoFeatures>
    </>
  );
}

export default Home;
