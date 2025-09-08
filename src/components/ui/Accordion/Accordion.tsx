import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface AccordionItemProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: string) => void;
  className?: string;
}

export type { AccordionItemProps };

interface AccordionProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  className?: string;
}

interface AccordionComponent extends React.FC<AccordionProps> {
  Item: React.FC<Omit<AccordionItemProps, 'isOpen' | 'onToggle'>>;
}

interface AccordionContextType {
  openItems: Set<string>;
  allowMultiple: boolean;
  onToggle: (id: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

const useAccordionContext = () => {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
};

// Chevron down icon component
const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  children,
  isOpen,
  onToggle,
  className
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>('0px');

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
    }
  }, [isOpen]);

  return (
    <div 
      className={clsx(
        'border border-default rounded-lg overflow-hidden',
        'transition-all duration-200',
        className
      )}
    >
      {/* Accordion Header Button */}
      <button
        className={clsx(
          'w-full px-6 py-4 text-left',
          'flex items-center justify-between',
          'bg-surface hover:bg-surface-raised',
          'text-primary font-medium',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-color focus:ring-offset-2',
          'group'
        )}
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <span className="text-lg font-semibold pr-4">
          {title}
        </span>
        
        {/* Chevron Icon */}
        <ChevronDownIcon
          className={clsx(
            'w-5 h-5 text-secondary transition-transform duration-200',
            'group-hover:text-secondary-color',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {/* Accordion Content */}
      <div
        ref={contentRef}
        id={`accordion-content-${id}`}
        role="region"
        aria-labelledby={`accordion-header-${id}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height }}
      >
        <div 
          className={clsx(
            'px-6 py-4',
            'bg-background-primary',
            'text-secondary leading-relaxed',
            'border-t border-default'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Individual AccordionItem that uses context
export const AccordionContextItem: React.FC<Omit<AccordionItemProps, 'isOpen' | 'onToggle'>> = ({
  id,
  title,
  children,
  className
}) => {
  const { openItems, onToggle } = useAccordionContext();
  const isOpen = openItems.has(id);

    return (
    <AccordionItem
      id={id}
      title={title}
      isOpen={isOpen}
      onToggle={onToggle}
      {...(className && { className })}
    >
      {children}
    </AccordionItem>
  );
};

export const Accordion: AccordionComponent = ({
  children,
  allowMultiple = false,
  defaultOpenItems = [],
  className
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpenItems));

  const handleToggle = (id: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (newOpenItems.has(id)) {
        // Close the item
        newOpenItems.delete(id);
      } else {
        // Open the item
        if (!allowMultiple) {
          // If not allowing multiple, close all others
          newOpenItems.clear();
        }
        newOpenItems.add(id);
      }
      
      return newOpenItems;
    });
  };

  const contextValue: AccordionContextType = {
    openItems,
    allowMultiple,
    onToggle: handleToggle,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div 
        className={clsx(
          'space-y-4',
          className
        )}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Export compound component pattern
Accordion.Item = AccordionContextItem;
