'use client';

import { trackClick } from '@/lib/analytics';

/**
 * <a> que registra un clic sin interferir con la navegación ni la descarga.
 */
export default function TrackedLink({ event, metadata, attributeToPage = false, onClick, children, ...props }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackClick(event, { metadata, attributeToPage });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
