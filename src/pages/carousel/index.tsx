import { useRef } from "react";
import { products } from "../../fixtures/product";

import './index.css'

export default function Carousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    const el = carouselRef.current;
    if (!el) return;

    const slideWidth = window.innerWidth;
    el.scrollTo({
      left: el.scrollLeft + slideWidth,
      behavior: "smooth"
    });
  };

  const prevSlide = () => {
    const el = carouselRef.current;
    if (!el) return;

    const slideWidth = window.innerWidth;
    el.scrollTo({
      left: el.scrollLeft - slideWidth,
      behavior: "smooth"
    });
  };

  return (
    <main>
      <button className="carousel-arrow left" onClick={prevSlide}>
        ❮
      </button>
      <section className="carousel" ref={carouselRef}>
          {products.map((item, index) => (
            <article key={index} className="carousel-item">
              <div className="carousel-content-container">
                <div className="carousel-content-main" style={{backgroundColor: `${item.color}`, color: `${item.textColor}`}}>
                  <h2 className="carousel-content-header">{item.name}</h2>
                  <p className="carousel-content-price">{item.price}</p>
                  <p className="carousel-content-description">
                    {item.description}
                  </p>
                  <button className="carousel-conten-add-to-card">
                    Add To Card
                  </button>
                </div>
                <figure className="carousel-content-photo-container">
                  <img src={item.image} alt="" className="carousel-photo" />
                  <figcaption className="carousel-photo-name">{item.name}</figcaption>
                </figure>
              </div>
            </article>
          ))}
      </section>
      <button className="carousel-arrow right" onClick={nextSlide}>
        ❯
      </button>
    </main>
  )
}