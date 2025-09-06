import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  return (
    <>
      {/* Spacer div to reserve space for sticky breadcrumb */}
      <div className="h-16"></div>
      
      {/* Sticky breadcrumb */}
      <div className="sticky top-16 z-40 -mt-16 bg-background-primary/95 backdrop-blur-sm border-b border-default">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                {index > 0 && (
                  <span className="text-secondary" aria-hidden="true">
                    /
                  </span>
                )}
                {item.current ? (
                  <span className="text-secondary-color font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <Link 
                    to={item.href}
                    className="text-primary nav-link hover:text-secondary-color transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-primary">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
