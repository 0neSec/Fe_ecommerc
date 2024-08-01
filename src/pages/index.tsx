// pages/index.tsx
import Head from 'next/head';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/Navbar';
import Banner from '@/components/banner/Banner';
import Products from '../components/card/products';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div >
      <Head>
        <title>Home</title> {/* Title spesifik untuk halaman ini */}
        <meta name="description" content="Discover amazing content and features with us." />
      </Head>
      <Navbar />
      <Banner
        backgroundImage="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/product-banner-ad-design-template-fb055c612bc41382f49e0658612bf9f0_screen.jpg?ts=1663348558"
        title="Explore Our Latest Updates"
        description="Discover amazing content and features with us."
      />
      <Products/>
    </div>
  );
}
