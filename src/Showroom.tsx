import './Showroom.css'
import ProductTSX from './Product';
import { useState, useEffect } from 'react';

function Showroom({ search, setReact }: { search: string, setReact: React.Dispatch<any> }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
    useEffect(() => {
        fetch('http://localhost:3001/api/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => { setProducts(data); setProductsFiltered(data) })
    }, [])
    useEffect(() => {
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        setProductsFiltered(filteredProducts)
    }, [search])

    return <>
        <div className="Showroom">
            <div className="Showroom-container">
                {productsFiltered!.map((product, i) => <ProductTSX product={product} key={i} setReact={setReact} />)}
            </div>
        </div>
    </>
}

export default Showroom;