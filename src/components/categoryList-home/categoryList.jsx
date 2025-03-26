'use client';
import { useState } from 'react';
import { luces } from '../../utils/data';
import Image from 'next/image';
import clsx from 'clsx';
import './categoryList.css';
import { IMG_URL } from '@/utils/constants';
import Link from 'next/link';

export default function CategoryList() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="category-container px-[var(--padding-generico-x)]">
      <div className="category-categories">
        <h2 className="category-title">Categorías</h2>
        {luces.map((luz, index) => {
          console.log(luz);
          return (
            <Link key={index} href={`/productos?categoria=${luz.categoria}`}>
              <div
                key={index}
                className="category-category"
                onMouseEnter={() => setHoveredCategory(luz)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <h2 className="h2-category">› {luz.title}</h2>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="category-imageContainer relative">
        {luces.map((luz, index) => (
          <Link key={index} href={`/catalogo/${luz.src}`}>
            <Image
              key={index}
              fill
              src={`${IMG_URL}/${luz.src}`}
              alt="Category"
              className={clsx('  md:block category-image absolute ', {
                visible: hoveredCategory?.src === luz.src,
              })}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
