import React, { useRef, useEffect, useState } from 'react';

// HorizontalGallery: mouse-drag + touch swipe + snap scrolling
export default function HorizontalGallery() {
  const items = [
    {
      id: 1,
      title: 'Portfolio Website',
      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80'
    },
    {
      id: 2,
      title: 'Mobile App UI',
      img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1400&q=80'
    }
  ];

  const containerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      isDown.current = true;
      setIsDragging(true);
      startX.current = e.pageX - el.offsetLeft;
      scrollLeft.current = el.scrollLeft;
      el.classList.add('dragging');
    };
    const onMouseLeave = () => {
      isDown.current = false;
      setIsDragging(false);
      el.classList.remove('dragging');
    };
    const onMouseUp = () => {
      isDown.current = false;
      setIsDragging(false);
      el.classList.remove('dragging');
    };
    const onMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX.current) * 1; // scroll-fastness
      el.scrollLeft = scrollLeft.current - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    // touch support (native scroll handles it) - add minor feedback
    const onTouchStart = () => el.classList.add('dragging');
    const onTouchEnd = () => el.classList.remove('dragging');
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="horizontal-gallery">
      <div className="horizontal-gallery-track" ref={containerRef}>
        {items.map((it) => (
          <article className="hg-panel" key={it.id}>
            <div className="hg-image" style={{ backgroundImage: `url(${it.img})` }} />
            <div className="hg-info">
              <h3>{it.title}</h3>
              <p>Completed by top freelancers — case study and brief summary.</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
