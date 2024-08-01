import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number; // Add stock property
  imageUrl: string;
  category: {
    name: string;
  };
}

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stock, setStock] = useState<number>(1); // Initialize stock state

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          const data = await response.json();
          setProduct(data);
          setStock(data.stock); // Set initial stock
        } catch (error: any) {
          console.error('Failed to fetch product:', error);
          setError(error.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleIncrement = () => {
    setStock(stock + 1);
  };

  const handleDecrement = () => {
    if (stock > 1) {
      setStock(stock - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setStock(value);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      <div className="flex items-center mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDecrement}>
          -
        </button>
        <input
          type="number"
          value={stock}
          onChange={handleChange}
          className="w-16 text-center border border-gray-300 text-black rounded px-2 py-1 no-arrows"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded ml-2" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button className="bg-indigo-500 text-white px-4 py-2 rounded mt-4" onClick={() => router.back()}>
        Back to Products
      </button>
      <style jsx>{`
        /* Hide arrows in input number */
        .no-arrows::-webkit-outer-spin-button,
        .no-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-arrows {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
