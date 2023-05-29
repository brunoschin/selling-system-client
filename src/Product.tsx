import './Product.css'

function Product(product: Product) {
    return (
        <div className="Product">
            <img src={product.image || './image-not-found.png'} alt={product.name} />
            <div className="Product-info">
                <h2>{product.name}</h2>
                <p>R$ {product.price.toFixed(2).replace('.', ',')}</p>
                <div className="Product-footer">
                    <p>ID: {product.id}</p>
                    <p>Quantidade: {product.quantity}</p>
                </div>
            </div>
            <button>Adicionar ao pedido</button>
        </div>
    )
}
export default Product;