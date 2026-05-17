import logo from "../assets/model.png";
import { Card } from "flowbite-react";

export default function Home() {
  return (
    <Card className="h-screen flex items-center text-white py-20" style={{background:"transparent", border:"none"}}>
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Kamus Inggris
          </h1>
          <p className="text-lg md:text-xl mb-8">
            know the use of the word with us
          </p>
        </div>
          
        <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="max-w-full h-auto"
            style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.5))" }}
          />
        </div>
      </div>
    </Card>
  );
}
