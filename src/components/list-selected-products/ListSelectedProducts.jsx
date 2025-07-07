'use client';
import React from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import './list.css';
import ListSelectedProductsResponsive from './ListSelectedProductsResponsive';

const ListSelectedProducts = () => {
  const windowSize = useWindowSize();

  // Solo mostrar en mobile si es necesario
  // Por ahora lo ocultamos ya que las categorías están en el navbar
  return null;
};

export default ListSelectedProducts;
