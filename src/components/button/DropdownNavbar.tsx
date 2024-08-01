import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
  link: string;
}

export default function DropdownNavbar() {
  const categoryRef = useRef<HTMLDivElement>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        setError('Failed to fetch categories');
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <div>
      <div className="relative" ref={categoryRef}>
        <button
          type="button"
          onClick={toggleCategory}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="category-menu"
          aria-expanded={isCategoryOpen}
          aria-haspopup="true"
        >
          Category
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {isCategoryOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="category-menu">
              {error && <div className="px-4 py-2 text-sm text-red-500">{error}</div>}
              {categories.length === 0 && !error && (
                <div className="px-4 py-2 text-sm text-gray-500">No categories available</div>
              )}
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/products/category/${category.name}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
