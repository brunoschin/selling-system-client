import './Header.css'

function Header({ search, setSearch, cartLen }: { search: string, setSearch: (search: string) => void, cartLen: number }) {
    return (
        <header className='Header'>
            <h1 onClick={() => document.location.pathname = '/'}>Schin CoffeShop</h1>
            <div className='Search'>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar" />
                <button><img src="./magnifier.png" alt="Search" /></button>
            </div>
            <div className='User-space'>
                <button className='Cart-button' onClick={() => {
                    if (document.location.pathname === '/cart')
                        document.location.pathname = '/';
                    else
                        document.location.pathname = '/cart';
                }}>
                    <img src="./shopping-cart.png" alt="Shopping cart" />
                    <span className='Cart-counter'>{cartLen || 0}</span>
                </button>
                <button className='Cart-button' onClick={() => {
                    if (document.location.pathname === '/history')
                        document.location.pathname = '/';
                    else
                        document.location.pathname = '/history';
                }}>
                    <img src="./history.png" alt="History" />
                </button>
            </div>
        </header >
    )
}

export default Header;