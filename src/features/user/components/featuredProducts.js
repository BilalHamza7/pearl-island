import ProductCard from "../../components/productCard"

export default function FeaturedProducts() {
    return (
        
        <div className="grid grid-cols-4 gap-7 w-full">
            <ProductCard prod={{ name: 'Natural Blue Sapphire', weight: 2.03, images: ['/gem1.jpg'] }} openModal={null} />
            <ProductCard prod={{ name: 'Heated Violet Sapphire', weight: 1.23, images: ['/gem2.jpg'] }} openModal={null} />
            <ProductCard prod={{ name: 'Heated Yellow Sapphire', weight: 3.10, images: ['/gem3.jpg'] }} openModal={null} />
            <ProductCard prod={{ name: 'Natural Pink Sapphire', weight: 1.30, images: ['/gem4.jpg'] }} openModal={null} />
        </div>
    )
};
