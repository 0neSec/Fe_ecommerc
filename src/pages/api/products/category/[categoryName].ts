import type { NextApiRequest, NextApiResponse } from 'next';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: {
    _id: string;
    name: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryName } = req.query;

  if (typeof categoryName !== 'string') {
    res.status(400).json({ message: 'Invalid category name' });
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/product/category/${categoryName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products: Product[] = await response.json();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: error });
  }
}
