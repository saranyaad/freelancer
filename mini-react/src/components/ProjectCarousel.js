import React, { useState, useRef, useEffect } from "react";

// Simple swipeable carousel for freelance-related project showcases
export default function ProjectCarousel() {
  const slides = [
    {
      id: 1,
      title: "Branding & Packaging",
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      caption: "Logo, packaging and brand identity for a lifestyle product",
    },
    {
      id: 2,
      title: "Portfolio Website",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      caption: "Responsive portfolio website showcasing projects and case studies",
    },
    {
      id: 3,
      title: "Mobile App UI",
      img: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed76?auto=format&fit=crop&w=1200&q=80",
      caption: "High-fidelity mobile UI screens for iOS and Android apps",
    },
  ];

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [isPlaying]);

  const goPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((i) => (i + 1) % slides.length);

  const handleTouchStart = (e) => {
    setIsPlaying(false);
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const handleTouchMove = (e) => {
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const handleTouchEnd = () => {
    if (Math.abs(deltaX.current) > 50) {
      if (deltaX.current > 0) goPrev();
      else goNext();
    }
    deltaX.current = 0;
    setTimeout(() => setIsPlaying(true), 2000);
  };

  return (
    <div className="project-carousel" ref={sliderRef}>
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((s) => (
          <div className="carousel-slide" key={s.id}>
            <div className="carousel-image" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="carousel-caption">
              <h3>{s.title}</h3>
              <p>{s.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-arrow left" onClick={goPrev} aria-label="Previous">‹</button>
      <button className="carousel-arrow right" onClick={goNext} aria-label="Next">›</button>

      <div className="carousel-dots">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
