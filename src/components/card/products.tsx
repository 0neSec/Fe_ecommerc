import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        console.error('Failed to fetch products:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
  };

  const viewDetails = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img src={product.imageUrl} alt={product.name} className="w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-2">Stock: {product.stock}</p> {/* Display stock */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => viewDetails(product._id)}
                  className="text-indigo-500 hover:underline"
                >
                  View Details
                </button>
                <button
                  onClick={() => openModal(product)}
                  className="text-green-500 hover:underline"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg w-full max-w-lg text-black">
            <button onClick={closeModal} className="absolute top-2 right-2 text-black text-2xl">
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
            <div className="w-full mb-4 overflow-hidden">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full object-cover" />
            </div>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <p className="text-lg font-semibold">${selectedProduct.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">Stock: {selectedProduct.stock}</p> {/* Display stock in modal */}
            <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={closeModal}>
              Confirm Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
