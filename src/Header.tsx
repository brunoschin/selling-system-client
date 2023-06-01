import './Header.css'

function Header({ search, setSearch, cartLen, setCartState }: { search: string, setSearch: (search: string) => void, cartLen: number, setCartState: React.Dispatch<boolean> }) {
    return (
        <header className='Header'>
            <h1>Schin CoffeShop</h1>
            <div className='Search'>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" />
                <button><img src="./magnifier.png" alt="Search" /></button>
            </div>
            <div className='User-space'>
                <button className='Cart-button' onClick={() => setCartState(cartLen > 0 ? true : false)}>
                    <img src="./shopping-cart.png" alt="Shopping cart" />
                    <span className='Cart-counter'>{cartLen || 0}</span>
                </button>
                <button className='User-button'>
                    <img src="./user.png" alt="User" />
                </button>
            </div>
        </header>
    )
}

export default Header;