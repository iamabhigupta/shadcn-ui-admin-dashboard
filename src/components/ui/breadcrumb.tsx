import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  title: React.ReactNode;
  link?: string;
}

const CustomBreadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <div className="flex items-center text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight size={16} className="text-muted-foreground mx-2" />
          )}
          {item.link ? (
            <Link
              to={item.link}
              className="text-muted-foreground hover:underline underline-offset-2 rounded-sm hover:text-black transition-all"
            >
              {item.title}
            </Link>
          ) : (
            <span className="">{item.title}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomBreadcrumb;
