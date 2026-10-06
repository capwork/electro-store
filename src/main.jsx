import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, BatteryCharging, ChevronDown, ChevronRight, Clock3, Heart,
  Headphones, Laptop, Menu, Minus, PackageCheck, Plus, Search, ShieldCheck,
  ShoppingBag, Smartphone, Sparkles, Star, Tablet, Trash2, Truck, UserRound,
  Watch, X, Zap
} from "lucide-react";
import "./styles.css";

const IMG = {
  hero: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1800&q=85",
  phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
  laptop: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
  watch: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  camera: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
  tablet: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85",
  speaker: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
  earbuds: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85",
  console: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=900&q=85",
  keyboard: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=85",
  monitor: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85"
};

const products = [
  {id:1, name:"Nova X Pro 5G", category:"Phones", price:74999, old:79999, rating:4.9, reviews:128, badge:"Bestseller", image:IMG.phone, color:"Midnight", desc:"Flagship OLED display, pro camera system and all-day battery."},
  {id:2, name:"AeroBook Pro 14", category:"Laptops", price:119999, old:129999, rating:4.8, reviews:96, badge:"New", image:IMG.laptop, color:"Graphite", desc:"Lightweight performance laptop with a vivid high-resolution display."},
  {id:3, name:"Sonic Max ANC", category:"Audio", price:18999, old:22999, rating:4.7, reviews:214, badge:"-17%", image:IMG.headphones, color:"Black", desc:"Adaptive noise cancellation with rich spatial audio."},
  {id:4, name:"Pulse Watch Ultra", category:"Wearables", price:24999, old:28999, rating:4.8, reviews:83, badge:"Trending", image:IMG.watch, color:"Titanium", desc:"Advanced health tracking, GPS and smart notifications."},
  {id:5, name:"Vision Pro Camera", category:"Cameras", price:67999, old:74999, rating:4.9, reviews:64, badge:"Pro Pick", image:IMG.camera, color:"Black", desc:"High-detail mirrorless camera built for creators."},
  {id:6, name:"Tab Air 11", category:"Tablets", price:39999, old:44999, rating:4.6, reviews:117, badge:"Deal", image:IMG.tablet, color:"Silver", desc:"Thin 11-inch tablet for work, streaming and creative tasks."},
  {id:7, name:"Echo Mini 360", category:"Audio", price:6999, old:8999, rating:4.5, reviews:302, badge:"Hot Deal", image:IMG.speaker, color:"Stone", desc:"Compact 360° wireless speaker with room-filling sound."},
  {id:8, name:"AirBeat Pro Buds", category:"Audio", price:7999, old:9999, rating:4.6, reviews:189, badge:"Popular", image:IMG.earbuds, color:"White", desc:"True wireless earbuds with ANC and low-latency mode."},
  {id:9, name:"GameBox X", category:"Gaming", price:49999, old:54999, rating:4.8, reviews:141, badge:"Gaming", image:IMG.console, color:"Black", desc:"Next-gen gaming console with immersive 4K entertainment."},
  {id:10, name:"Mech Pro Keyboard", category:"Accessories", price:5499, old:6999, rating:4.7, reviews:77, badge:"Editor's Pick", image:IMG.keyboard, color:"Dark Grey", desc:"Mechanical RGB keyboard with tactile switches and aluminum deck."},
  {id:11, name:"UltraView 27 4K", category:"Monitors", price:32999, old:37999, rating:4.8, reviews:91, badge:"4K", image:IMG.monitor, color:"Black", desc:"27-inch 4K IPS display with crisp color and smooth motion."},
  {id:12, name:"Nova Lite 5G", category:"Phones", price:24999, old:27999, rating:4.5, reviews:152, badge:"Value", image:IMG.phone, color:"Blue", desc:"Fast 5G performance, bright display and dependable battery life."}
];

const categories = [
  ["Phones", Smartphone], ["Laptops", Laptop], ["Audio", Headphones],
  ["Wearables", Watch], ["Tablets", Tablet], ["Cameras", Sparkles],
  ["Gaming", Zap], ["Accessories", BatteryCharging]
];

const money = n => `₹${n.toLocaleString("en-IN")}`;

function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "low") list.sort((a,b) => a.price-b.price);
    if (sort === "high") list.sort((a,b) => b.price-a.price);
    if (sort === "rating") list.sort((a,b) => b.rating-a.rating);
    return list;
  }, [category, query, sort]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(x => x.id === product.id);
      return found ? prev.map(x => x.id === product.id ? {...x, qty:x.qty+1} : x) : [...prev, {...product, qty:1}];
    });
    setCartOpen(true);
  }
  function updateQty(id, delta) {
    setCart(prev => prev.map(x => x.id === id ? {...x, qty:x.qty+delta} : x).filter(x => x.qty > 0));
  }
  function toggleWish(id) {
    setWish(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id]);
  }
  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
    setMobileOpen(false);
  }

  return (
    <div className="app">
      <div className="topbar">
        <span><Truck size={14}/> Free shipping on orders over ₹999</span>
        <span className="topbar-right"><ShieldCheck size={14}/> Secure payments &nbsp; • &nbsp; 7-day easy returns</span>
      </div>

      <header className="header">
        <button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}><Menu/></button>
        <div className="logo" onClick={()=>scrollTo("home")}>
          <span className="logo-mark"><Zap size={19} fill="currentColor"/></span>
          <span>electro<span>store</span></span>
        </div>

        <nav className={mobileOpen ? "nav mobile-active" : "nav"}>
          <button onClick={()=>scrollTo("home")}>Home</button>
          <button onClick={()=>scrollTo("products")}>Shop</button>
          <button onClick={()=>scrollTo("categories")}>Categories</button>
          <button onClick={()=>scrollTo("deals")}>Deals</button>
        </nav>

        <div className="header-actions">
          <div className="search">
            <Search size={18}/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search electronics..." />
          </div>
          <button className="icon-btn"><UserRound size={20}/></button>
          <button className="icon-btn bag-btn" onClick={()=>setCartOpen(true)}><ShoppingBag size={20}/>{cartCount>0 && <b>{cartCount}</b>}</button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-bg" style={{backgroundImage:`url(${IMG.hero})`}} />
          <div className="hero-overlay"/>
          <div className="hero-content">
            <div className="eyebrow"><span/> NEW SEASON • SMARTER LIVING</div>
            <h1>Technology that<br/><em>moves you.</em></h1>
            <p>Discover premium electronics designed for the way you live, work, create and play.</p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={()=>scrollTo("products")}>Shop latest tech <ArrowRight size={17}/></button>
              <button className="ghost-btn" onClick={()=>scrollTo("categories")}>Explore categories</button>
            </div>
            <div className="hero-proof">
              <div><strong>12k+</strong><span>Products</span></div>
              <div><strong>4.9/5</strong><span>Customer rating</span></div>
              <div><strong>24h</strong><span>Fast dispatch</span></div>
            </div>
          </div>
        </section>

        <section className="trust-row">
          <div><Truck/><div><b>Fast delivery</b><span>Across India</span></div></div>
          <div><ShieldCheck/><div><b>Genuine products</b><span>100% authentic</span></div></div>
          <div><PackageCheck/><div><b>Easy returns</b><span>7-day return window</span></div></div>
          <div><Headphones/><div><b>Expert support</b><span>Here when you need us</span></div></div>
        </section>

        <section className="section" id="categories">
          <div className="section-head">
            <div><span className="section-kicker">SHOP BY CATEGORY</span><h2>Find your next <em>favorite.</em></h2></div>
            <button className="text-btn" onClick={()=>{setCategory("All");scrollTo("products")}}>View all <ArrowRight size={16}/></button>
          </div>
          <div className="category-grid">
            {categories.map(([name, Icon]) => (
              <button className="category-card" key={name} onClick={()=>{setCategory(name);scrollTo("products")}}>
                <span className="category-icon"><Icon size={27}/></span>
                <strong>{name}</strong><small>Explore collection</small><ChevronRight size={17}/>
              </button>
            ))}
          </div>
        </section>

        <section className="section products-section" id="products">
          <div className="section-head product-head">
            <div><span className="section-kicker">CURATED FOR YOU</span><h2>Top picks <em>this week.</em></h2></div>
            <div className="controls">
              <select value={sort} onChange={e=>setSort(e.target.value)}>
                <option value="featured">Sort: Featured</option>
                <option value="low">Price: Low to high</option>
                <option value="high">Price: High to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            {["All", ...categories.map(x=>x[0])].map(x=><button className={category===x?"active":""} onClick={()=>setCategory(x)} key={x}>{x}</button>)}
          </div>
          {filtered.length ? <div className="product-grid">
            {filtered.map(p=><ProductCard key={p.id} p={p} wish={wish} toggleWish={toggleWish} addToCart={addToCart} open={setSelected}/>)}
          </div> : <div className="empty-products"><Search size={28}/><h3>No products found</h3><p>Try another search or category.</p><button onClick={()=>{setQuery("");setCategory("All")}}>Clear filters</button></div>}
        </section>

        <section className="deal-banner" id="deals">
          <div className="deal-copy">
            <span className="section-kicker">LIMITED TIME</span>
            <h2>Upgrade your setup.<br/><em>Save up to 35%.</em></h2>
            <p>Selected headphones, monitors, accessories and smart devices are on special pricing this week.</p>
            <button className="primary-btn" onClick={()=>{setCategory("Audio");scrollTo("products")}}>Shop the deals <ArrowRight size={17}/></button>
          </div>
          <div className="deal-art">
            <div className="deal-circle"/><img src={IMG.headphones} alt="Premium wireless headphones"/>
            <div className="deal-tag"><Zap size={14} fill="currentColor"/> UP TO 35% OFF</div>
          </div>
        </section>

        <section className="section editorial">
          <div className="editorial-image"><img src={IMG.hero} alt="Modern electronics collection"/></div>
          <div className="editorial-copy">
            <span className="section-kicker">THE ELECTRO STANDARD</span>
            <h2>Good tech should feel <em>effortless.</em></h2>
            <p>We curate devices that balance thoughtful design, reliable performance and everyday usability. From the first unboxing to years of use, every pick is made to earn a place in your setup.</p>
            <div className="editorial-points">
              <div><Sparkles/><span><b>Curated quality</b> — only products worth your attention.</span></div>
              <div><BatteryCharging/><span><b>Built for daily life</b> — practical features, no clutter.</span></div>
              <div><ShieldCheck/><span><b>Shop with confidence</b> — genuine products and support.</span></div>
            </div>
          </div>
        </section>

        <section className="newsletter">
          <div><span className="section-kicker">STAY IN THE LOOP</span><h2>Tech worth knowing.</h2><p>New drops, sharp deals and useful tech stories — straight to your inbox.</p></div>
          <form onSubmit={e=>e.preventDefault()}><input type="email" placeholder="Your email address"/><button className="primary-btn">Subscribe <ArrowRight size={17}/></button></form>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div className="footer-brand"><div className="logo"><span className="logo-mark"><Zap size={19} fill="currentColor"/></span><span>electro<span>store</span></span></div><p>Better technology for everyday life.</p></div>
          <div><h4>Shop</h4><button onClick={()=>{setCategory("Phones");scrollTo("products")}}>Phones</button><button onClick={()=>{setCategory("Laptops");scrollTo("products")}}>Laptops</button><button onClick={()=>{setCategory("Audio");scrollTo("products")}}>Audio</button><button onClick={()=>{setCategory("Wearables");scrollTo("products")}}>Wearables</button></div>
          <div><h4>Help</h4><button>Shipping & delivery</button><button>Returns</button><button>Warranty</button><button>Contact us</button></div>
          <div><h4>Company</h4><button>About Electro</button><button>Careers</button><button>Journal</button><button>Store locator</button></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Electro Store. All rights reserved.</span><span>Made for people who love great tech.</span></div>
      </footer>

      {cartOpen && <div className="drawer-backdrop" onClick={()=>setCartOpen(false)}>
        <aside className="cart-drawer" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><span className="section-kicker">YOUR BAG</span><h3>{cartCount} item{cartCount!==1?"s":""}</h3></div><button onClick={()=>setCartOpen(false)}><X/></button></div>
          {cart.length ? <>
            <div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-info"><b>{item.name}</b><span>{money(item.price)}</span><div className="qty"><button onClick={()=>updateQty(item.id,-1)}><Minus size={13}/></button><strong>{item.qty}</strong><button onClick={()=>updateQty(item.id,1)}><Plus size={13}/></button><button className="remove" onClick={()=>setCart(c=>c.filter(x=>x.id!==item.id))}><Trash2 size={14}/></button></div></div></div>)}</div>
            <div className="cart-footer"><div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><small>Shipping calculated at checkout.</small><button className="primary-btn checkout">Checkout <ArrowRight size={17}/></button></div>
          </> : <div className="empty-cart"><ShoppingBag size={42}/><h3>Your bag is empty</h3><p>Add something you love and it will show up here.</p><button className="primary-btn" onClick={()=>setCartOpen(false)}>Continue shopping</button></div>}
        </aside>
      </div>}

      {selected && <div className="modal-backdrop" onClick={()=>setSelected(null)}>
        <div className="product-modal" onClick={e=>e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setSelected(null)}><X/></button>
          <div className="modal-image"><img src={selected.image} alt={selected.name}/><span>{selected.badge}</span></div>
          <div className="modal-info"><span className="section-kicker">{selected.category}</span><h2>{selected.name}</h2><div className="rating"><Star size={15} fill="currentColor"/><b>{selected.rating}</b><span>({selected.reviews} reviews)</span></div><p>{selected.desc}</p><div className="price-large">{money(selected.price)} <del>{money(selected.old)}</del></div><div className="modal-meta"><span>✓ In stock</span><span>✓ Free delivery</span><span>✓ 7-day returns</span></div><button className="primary-btn modal-cart" onClick={()=>{addToCart(selected);setSelected(null)}}>Add to bag <ShoppingBag size={17}/></button></div>
        </div>
      </div>}
    </div>
  );
}

function ProductCard({p,wish,toggleWish,addToCart,open}) {
  return <article className="product-card">
    <div className="product-image" onClick={()=>open(p)}><img src={p.image} alt={p.name}/><span className="badge">{p.badge}</span><button className={wish.includes(p.id)?"wish active":"wish"} onClick={e=>{e.stopPropagation();toggleWish(p.id)}}><Heart size={17} fill={wish.includes(p.id)?"currentColor":"none"}/></button><button className="quick-view" onClick={e=>{e.stopPropagation();open(p)}}>Quick view</button></div>
    <div className="product-copy"><span className="product-cat">{p.category}</span><h3>{p.name}</h3><div className="rating"><Star size={14} fill="currentColor"/><b>{p.rating}</b><span>({p.reviews})</span></div><div className="product-bottom"><div><strong>{money(p.price)}</strong><del>{money(p.old)}</del></div><button className="add-btn" onClick={()=>addToCart(p)}><Plus size={18}/></button></div></div>
  </article>
}

createRoot(document.getElementById("root")).render(<App />);
