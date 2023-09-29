import React, { useState, useEffect } from "react";
import img1 from "../assets/car.jpg";
import img2 from "../assets/pharma1.jpg";
import img3 from "../assets/pharma2.jpg";

const ImageTransition = () => {
  const [images, setImages] = useState([img1, img2, img3]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Définissez un intervalle pour changer d'image toutes les 3 secondes
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-9">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="img-fluid rounded"
            style={{ height: 500, width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTransition;
