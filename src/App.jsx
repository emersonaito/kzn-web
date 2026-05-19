import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, Minus, Plus, Ruler, ShieldCheck, Shirt, ShoppingBag, Trash2, X, Dumbbell, Eye } from "lucide-react";

const WHATSAPP_NUMBER = "56993913029";
const DROP_STATUS = "LIMITED DROP / STOCK CONTROLADO";

const products = [
  {
    id: "oversize-tee",
    name: "KZN Oversize Tee",
    category: "DROP 001",
    price: 17990,
    priceLabel: "$17.990 CLP + envío",
    description: "Polera negra corte oversize, logo minimalista al frente y detalle inferior DROP 001. Prenda base de la colección.",
    fit: "Oversize fit",
    color: "Black",
    fabric: "280GSM",
    image: "/images/oversize-tee.png",
    stockLabel: "Low stock",
    details: ["Corte oversize", "Logo frontal minimal", "Detalle DROP 001", "Algodón pesado"],
    sizes: [
      { size: "S", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "M", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "L", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "XL", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
    ],
  },
  {
    id: "sleeveless",
    name: "KZN Sleeveless",
    category: "DROP 001",
    price: 17990,
    priceLabel: "$17.990 CLP + envío",
    description: "Polera sin mangas de calce amplio, estética japonesa en espalda y presencia visual orientada a gym/streetwear.",
    fit: "Oversize sleeveless fit",
    color: "Black",
    fabric: "240GSM",
    image: "/images/sleeveless.png",
    stockLabel: "Limited units",
    details: ["Sin mangas", "Diseño posterior", "Fit amplio", "Gym/streetwear"],
    sizes: [
      { size: "S", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "M", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "L", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "XL", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
    ],
  },
  {
    id: "boxy-tee",
    name: "KZN Boxy Tee",
    category: "DROP 001",
    price: 17990,
    priceLabel: "$17.990 CLP + envío",
    description: "Polera boxy fit negra con logo frontal KZN y diseño trasero japonés. Silueta amplia, corta y estructurada.",
    fit: "Boxy oversized fit",
    color: "Black",
    fabric: "280GSM",
    image: "/images/boxy-tee.png",
    stockLabel: "Limited units",
    details: ["Boxy fit", "Diseño trasero", "Silueta estructurada", "DROP 001"],
    sizes: [
      { size: "S", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "M", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "L", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
      { size: "XL", chest: "-- cm", length: "-- cm", shoulder: "-- cm" },
    ],
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
}

function Button({ children, className = "", ...props }) {
  return <button className={`inline-flex items-center justify-center transition disabled:opacity-40 ${className}`} {...props}>{children}</button>;
}

function ProductImage({ product, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 p-8 text-center ${className}`}>
        <Shirt className="mb-5 h-20 w-20 text-white/50" />
        <p className="text-xs font-black uppercase tracking-[0.25em] text-white">{product.name}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-neutral-500">Imagen no encontrada</p>
      </div>
    );
  }
  return <img src={product.image} alt={product.name} onError={() => setFailed(true)} className={`h-full w-full object-cover ${className}`} />;
}

function ProductCard({ product, onAdd, onView }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]?.size || "M");
  return (
    <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
      <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 text-white shadow-xl">
        <button onClick={() => onView(product)} className="relative block aspect-[4/5] w-full overflow-hidden bg-neutral-950 text-left">
          <ProductImage product={product} className="transition duration-700 group-hover:scale-105" />
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] backdrop-blur">{product.category}</div>
          <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-black">{product.stockLabel}</div>
          <div className="absolute inset-x-4 bottom-4 flex translate-y-4 items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-black opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalle <Eye className="h-4 w-4" />
          </div>
        </button>
        <div className="p-6">
          <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">
            <span>{product.color}</span><span>{product.fabric}</span>
          </div>
          <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">{product.name}</h3>
          <p className="mt-3 min-h-[96px] text-sm leading-6 text-neutral-400">{product.description}</p>
          <div className="mt-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-500">Selecciona talla</p>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map((row) => (
                <button key={`${product.id}-${row.size}`} onClick={() => setSelectedSize(row.size)} className={`h-10 rounded-xl border text-xs font-black transition ${selectedSize === row.size ? "border-white bg-white text-black" : "border-white/15 bg-transparent text-white hover:border-white/50"}`}>
                  {row.size}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{product.fit}</p>
            <p className="mt-1 text-lg font-black">{product.priceLabel}</p>
          </div>
          <Button onClick={() => onAdd(product, selectedSize)} className="mt-5 h-12 w-full rounded-full bg-white text-xs font-black uppercase tracking-[0.18em] text-black hover:bg-neutral-200">
            Agregar al carrito <ShoppingBag className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductModal({ product, open, onClose, onAdd }) {
  const [selectedSize, setSelectedSize] = useState("M");
  if (!product) return null;
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[70] bg-black/75 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, y: 35, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 35, scale: 0.98 }} className="fixed inset-x-4 top-20 z-[75] mx-auto max-h-[82vh] max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-neutral-950 text-white shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/5] bg-neutral-900 md:aspect-auto"><ProductImage product={product} /></div>
              <div className="p-6 md:p-8">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">{product.category}</p>
                    <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] md:text-5xl">{product.name}</h2>
                  </div>
                  <button onClick={onClose} className="rounded-full border border-white/10 p-2 transition hover:bg-white hover:text-black"><X className="h-5 w-5" /></button>
                </div>
                <p className="text-sm leading-7 text-neutral-400">{product.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {product.details.map((detail) => <div key={detail} className="rounded-2xl border border-white/10 bg-neutral-900 p-4 text-xs font-bold uppercase tracking-[0.16em] text-neutral-300">{detail}</div>)}
                </div>
                <div className="mt-7">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.25em] text-neutral-500">Talla</p>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((row) => <button key={`${product.id}-modal-${row.size}`} onClick={() => setSelectedSize(row.size)} className={`h-11 rounded-xl border text-xs font-black transition ${selectedSize === row.size ? "border-white bg-white text-black" : "border-white/15 text-white hover:border-white/50"}`}>{row.size}</button>)}
                  </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{product.fit} / {product.fabric}</p>
                  <p className="mt-2 text-2xl font-black">{product.priceLabel}</p>
                </div>
                <Button onClick={() => { onAdd(product, selectedSize); onClose(); }} className="mt-6 h-12 w-full rounded-full bg-white text-xs font-black uppercase tracking-[0.18em] text-black hover:bg-neutral-200">
                  Agregar al carrito <ShoppingBag className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CartDrawer({ open, onClose, cart, setCart }) {
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const updateQuantity = (cartId, amount) => {
    setCart((current) => current.map((item) => (item.cartId === cartId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item)));
  };

  const removeItem = (cartId) => setCart((current) => current.filter((item) => item.cartId !== cartId));

  const checkout = () => {
    if (!cart.length) return;
    const orderText = cart.map((item) => `- ${item.name} / Talla ${item.size} / Cantidad ${item.quantity}`).join("\\n");
    const message = `Hola KZN, quiero comprar:\\n${orderText}\\n\\nSubtotal: ${formatPrice(subtotal)} + envío.\\nQuedo atento para coordinar pago y despacho.`;
    window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="fixed right-0 top-0 z-[90] flex h-screen w-full max-w-md flex-col border-l border-white/10 bg-neutral-950 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div><p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Drop 001</p><h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.04em]">Carrito</h2></div>
              <button onClick={onClose} className="rounded-full border border-white/10 p-2 transition hover:bg-white hover:text-black"><X className="h-5 w-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-neutral-500"><ShoppingBag className="mb-5 h-14 w-14" /><p className="text-sm uppercase tracking-[0.2em]">Tu carrito está vacío</p></div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartId} className="rounded-2xl border border-white/10 bg-neutral-900 p-4">
                      <div className="flex gap-4">
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-950"><ProductImage product={item} /></div>
                        <div className="min-w-0 flex-1"><h3 className="truncate text-sm font-black uppercase">{item.name}</h3><p className="mt-1 text-xs uppercase tracking-[0.15em] text-neutral-500">Talla {item.size}</p><p className="mt-2 text-sm font-bold">{formatPrice(item.price)}</p></div>
                        <button onClick={() => removeItem(item.cartId)} className="h-9 rounded-full p-2 text-neutral-500 transition hover:bg-white hover:text-black"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-white/10">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="p-2 hover:text-neutral-300"><Minus className="h-4 w-4" /></button>
                          <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="p-2 hover:text-neutral-300"><Plus className="h-4 w-4" /></button>
                        </div>
                        <p className="text-sm font-black">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-white/10 p-5">
              <div className="mb-4 flex items-center justify-between text-sm"><span className="uppercase tracking-[0.2em] text-neutral-500">Subtotal</span><span className="text-xl font-black">{formatPrice(subtotal)}</span></div>
              <p className="mb-4 text-xs leading-5 text-neutral-500">El envío se coordina por WhatsApp según comuna o región.</p>
              <Button onClick={checkout} disabled={!cart.length} className="h-12 w-full rounded-full bg-white text-xs font-black uppercase tracking-[0.2em] text-black hover:bg-neutral-200 disabled:opacity-40">
                Finalizar por WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const addToCart = (product, size) => {
    const cartId = `${product.id}-${size}`;
    setCart((current) => {
      const existing = current.find((item) => item.cartId === cartId);
      if (existing) return current.map((item) => item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, size, quantity: 1, cartId }];
    });
    setCartOpen(true);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-100 selection:text-neutral-950">
      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950 text-white">
            <motion.div initial={{ letterSpacing: "0.8em", opacity: 0 }} animate={{ letterSpacing: "0.35em", opacity: 1 }} className="text-4xl font-black">KZN</motion.div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-neutral-500">Built through discipline</p>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-neutral-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="text-xl font-black tracking-[0.35em]">KZN</a>
          <div className="hidden items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 md:flex">
            <a href="#drop" className="transition hover:text-white">Drop</a>
            <a href="#about" className="transition hover:text-white">Filosofía</a>
            <a href="#sizes" className="transition hover:text-white">Tallas</a>
            <a href="#contact" className="transition hover:text-white">Contacto</a>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative rounded-full border border-white/10 p-3 transition hover:bg-white hover:text-black">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-black">{cartCount}</span>}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full border border-white/10 p-3 md:hidden"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-white/10 md:hidden">
              <div className="flex flex-col gap-4 px-5 py-5 text-xs font-black uppercase tracking-[0.22em] text-neutral-400">
                <a onClick={() => setMobileMenuOpen(false)} href="#drop">Drop</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#about">Filosofía</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#sizes">Tallas</a>
                <a onClick={() => setMobileMenuOpen(false)} href="#contact">Contacto</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24 md:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.9))]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.45em] text-neutral-400">KAIZEN / DROP 001</p>
            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-8xl lg:text-9xl">Built through discipline.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-neutral-300 md:text-lg">Prendas minimalistas, fit amplio y estética streetwear/gymwear. Una primera cápsula construida desde disciplina, progreso e identidad.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#drop" className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-xs font-black uppercase tracking-[0.22em] text-black hover:bg-neutral-200">Ver Drop <ArrowRight className="ml-2 h-4 w-4" /></a>
              <a href="#about" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 text-xs font-black uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black">Nuestra visión</a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
            <div className="aspect-[4/5] rounded-[2rem] border border-white/10 bg-gradient-to-br from-neutral-800 to-black p-4 shadow-2xl md:p-5">
              <div className="flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30">
                <div className="flex justify-between p-5 text-xs uppercase tracking-[0.25em] text-neutral-400"><span>Drop 001</span><span>Street / Gym</span></div>
                <div className="flex-1 px-5"><ProductImage product={products[2]} className="rounded-[1.5rem]" /></div>
                <div className="p-5"><h2 className="text-3xl font-black uppercase tracking-[-0.05em] md:text-4xl">3 prendas. 1 filosofía.</h2><p className="mt-3 text-sm leading-6 text-neutral-400">Oversize Tee / Sleeveless / Boxy Tee.</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white py-4 text-black">
        <div className="mx-auto mb-4 max-w-7xl px-5 text-center text-[10px] font-black uppercase tracking-[0.35em] text-neutral-500 md:px-8">{DROP_STATUS}</div>
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-3 px-5 text-xs font-black uppercase tracking-[0.25em] md:px-8">
          <span>Minimal Streetwear</span><span>Boxy Fit</span><span>Oversize</span><span>Discipline</span><span>Drop 001</span>
        </div>
      </section>

      <section id="drop" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">Colección inicial</p><h2 className="text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Drop 001</h2></div>
          <p className="max-w-md text-sm leading-6 text-neutral-400">Tres prendas iniciales, mismo lenguaje: negro, fit amplio, detalles mínimos y estética KAIZEN.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} onView={openProduct} />)}</div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900">
          <div className="grid md:grid-cols-3">
            {products.map((product) => (
              <button key={`${product.id}-lookbook`} onClick={() => openProduct(product)} className="group relative aspect-[4/5] overflow-hidden border-white/10 md:border-r last:border-r-0">
                <ProductImage product={product} className="transition duration-700 group-hover:scale-105 group-hover:opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left"><p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400">Lookbook preview</p><h3 className="mt-2 text-xl font-black uppercase tracking-[-0.04em] text-white">{product.name}</h3></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-neutral-900 px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">Filosofía</p><h2 className="text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Kaizen is constant.</h2></div>
          <div className="space-y-6 text-lg leading-8 text-neutral-300"><p>KZN representa el proceso de mejora continua: entrenar, construir, repetir y elevar el estándar.</p><p className="text-neutral-500">La estética es simple: prendas limpias, fit estructurado y presencia visual sobria. Menos ruido. Más intención.</p></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 md:grid-cols-3 md:px-8">
        {[
          { icon: Dumbbell, title: "Movement culture", text: "Diseñado para conectar entrenamiento, estilo y vida diaria." },
          { icon: Ruler, title: "Oversize / Boxy", text: "Calce amplio, hombro caído y estructura visual streetwear." },
          { icon: ShieldCheck, title: "Limited drop", text: "Producción controlada para validar demanda sin perder identidad." },
        ].map((item) => <div key={item.title} className="rounded-[2rem] border border-white/10 bg-neutral-900 p-7 text-white"><item.icon className="mb-8 h-8 w-8 text-white/70" /><h3 className="text-xl font-black uppercase tracking-[-0.03em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-neutral-400">{item.text}</p></div>)}
      </section>

      <section id="sizes" className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">Guía de tallas</p><h2 className="text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Fit guide</h2></div>
          <p className="max-w-md text-sm leading-6 text-neutral-400">Cada diseño tiene su propia tabla. Completar con medidas reales antes de publicar.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <div key={`${product.name}-sizes`} className="overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-900 text-white">
              <div className="border-b border-white/10 p-6"><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-500">{product.category}</p><h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em]">{product.name}</h3><p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">{product.fit} / {product.fabric}</p></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white text-black"><tr className="uppercase tracking-[0.16em]"><th className="p-4">Talla</th><th className="p-4">Pecho</th><th className="p-4">Largo</th><th className="p-4">Hombro</th></tr></thead>
                  <tbody>{product.sizes.map((row) => <tr key={`${product.name}-${row.size}`} className="border-t border-white/10 text-neutral-300"><td className="p-4 font-black text-white">{row.size}</td><td className="p-4">{row.chest}</td><td className="p-4">{row.length}</td><td className="p-4">{row.shoulder}</td></tr>)}</tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-black md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_1fr] md:items-center">
          <div><p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-neutral-500">Checkout inicial</p><h2 className="text-4xl font-black uppercase tracking-[-0.05em] md:text-6xl">Compra directa.</h2></div>
          <div className="space-y-4 text-sm leading-6 text-neutral-700"><p>Agrega tus prendas al carrito, selecciona talla y finaliza por WhatsApp. Coordinamos pago y envío directo para mantener el primer drop simple, controlado y profesional.</p><Button onClick={() => setCartOpen(true)} className="mt-4 h-12 rounded-full bg-black px-8 text-xs font-black uppercase tracking-[0.22em] text-white hover:bg-neutral-800">Abrir carrito <ShoppingBag className="ml-2 h-4 w-4" /></Button></div>
        </div>
      </section>

      <footer id="contact" className="px-5 py-14 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div><h2 className="text-3xl font-black tracking-[0.25em]">KZN</h2><p className="mt-4 max-w-sm text-sm leading-6 text-neutral-500">KAIZEN / DROP 001 / SANTIAGO, CHILE. Minimal streetwear construido desde disciplina, progreso e identidad.</p></div>
          <div><h3 className="text-xs font-black uppercase tracking-[0.25em]">Compra</h3><div className="mt-4 space-y-3 text-sm text-neutral-500"><p>Carrito por WhatsApp</p><p>Pagos coordinados</p><p>Stock limitado</p></div></div>
          <div><h3 className="text-xs font-black uppercase tracking-[0.25em]">Soporte</h3><div className="mt-4 space-y-3 text-sm text-neutral-500"><p>Envíos a Chile</p><p>Cambios y devoluciones</p><p>Contacto directo</p></div></div>
          <div><h3 className="text-xs font-black uppercase tracking-[0.25em]">Síguenos</h3><div className="mt-4 space-y-3 text-sm text-neutral-500"><p>Instagram</p><p>TikTok</p><p>Drop updates</p></div></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-neutral-600 md:flex-row"><p>© 2026 KZN. All rights reserved.</p><p>Built through discipline.</p></div>
      </footer>

      <ProductModal product={selectedProduct} open={productModalOpen} onClose={() => setProductModalOpen(false)} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} setCart={setCart} />
    </main>
  );
}
