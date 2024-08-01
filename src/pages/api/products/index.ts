import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://localhost:5000/api/product');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    res.status(200).json(data);
    console.log(data);
    
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ message: error });
  }
}
