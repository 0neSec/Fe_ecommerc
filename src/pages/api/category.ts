import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://localhost:5000/api/category'); // URL backend Express.js

    if (!response.ok) {
      const errorMessage = `Network response was not ok. Status: ${response.status} - ${response.statusText}`;
      console.error(errorMessage); // Log status dan statusText
      throw new Error(errorMessage);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching categories:', error.message); // Log pesan kesalahan
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
