'use client';
import { useState } from 'react';
import { luces } from '../../utils/data';
import Image from 'next/image';
import clsx from 'clsx';
import './categoryList.css';

export default function CategoryList() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="category-container px-[var(--padding-generico-x)]">
      <div className="category-categories">
        <h2 className="category-title">Categorías</h2>
        {luces.map((luz, index) => (
          <div
            key={index}
            className="category-category"
            onMouseEnter={() => setHoveredCategory(luz)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <h2 className="h2-category">› {luz.title}</h2>
          </div>
        ))}
      </div>
      <div className="category-imageContainer relative">
        {luces.map((luz, index) => (
          <Image
            key={index}
            fill
            src={`/imagenes/categoria/${luz.src}`}
            alt="Category"
            className={clsx('  md:block category-image absolute ', {
              visible: hoveredCategory?.src === luz.src,
            })}
          />
        ))}
      </div>
    </div>
  );
}
