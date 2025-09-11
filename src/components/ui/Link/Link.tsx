import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

/**
 * Enhanced Link component that extends React Router's Link
 * Use this component for all internal navigation links
 */
export const Link = forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => {
    // Any additional props processing can happen here
    return <RouterLink ref={ref} {...props} />;
  }
);

Link.displayName = 'Link';
