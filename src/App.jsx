  import AOS from "aos";
  import "aos/dist/aos.css";
  import HomeComp from "./components/HomeComp";
  import { useEffect } from "react";  




  function App() {
    
    
    useEffect(() => {
      AOS.init();
    }, [])



    return (
      <>
       <div style={{background: "linear-gradient(135deg, #0F2027, #203A43, #2C5364)"}}>
        <div data-aos="fade-up"><HomeComp /></div> 
        </div>
      </>
    )
  }

  export default App
