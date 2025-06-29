import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, Star, Plus, Minus, X, Heart, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 324,
      description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 156,
      description: "Advanced fitness tracking with heart rate monitoring and GPS capabilities.",
      category: "Wearables"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 89,
      description: "Comfortable organic cotton t-shirt, sustainably made and super soft.",
      category: "Clothing"
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      price: 549.99,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 67,
      description: "High-performance camera lens for professional photography.",
      category: "Photography"
    },
    {
      id: 5,
      name: "Ergonomic Office Chair",
      price: 399.99,
      originalPrice: 499.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 234,
      description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
      category: "Furniture"
    },
    {
      id: 6,
      name: "Smart Home Speaker",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 445,
      description: "Voice-controlled smart speaker with premium audio and home automation.",
      category: "Smart Home"
    },
    {
      id: 7,
      name: "Wireless Gaming Mouse",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 189,
      description: "High-precision wireless gaming mouse with customizable RGB lighting.",
      category: "Electronics"
    },
    {
      id: 8,
      name: "Minimalist Desk Lamp",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 112,
      description: "Modern LED desk lamp with adjustable brightness and USB charging port.",
      category: "Furniture"
    },
    {
      id: 9,
      name: "Bluetooth Earbuds",
      price: 129.99,
      originalPrice: 159.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 278,
      description: "True wireless earbuds with active noise cancellation and long battery life.",
      category: "Electronics"
    },
    {
      id: 10,
      name: "Casual Denim Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 156,
      description: "Classic denim jacket with modern fit and premium quality denim.",
      category: "Clothing"
    },
    {
      id: 11,
      name: "Yoga Mat Premium",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 201,
      description: "Non-slip premium yoga mat with extra cushioning and eco-friendly materials.",
      category: "Fitness"
    },
    {
      id: 12,
      name: "Stainless Steel Water Bottle",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 334,
      description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
      category: "Lifestyle"
    },
    {
      id: 13,
      name: "Mechanical Keyboard",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 145,
      description: "Premium mechanical keyboard with cherry switches and RGB backlighting.",
      category: "Electronics"
    },
    {
      id: 14,
      name: "Leather Crossbody Bag",
      price: 119.99,
      originalPrice: 149.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 98,
      description: "Genuine leather crossbody bag with multiple compartments and adjustable strap.",
      category: "Accessories"
    },
    {
      id: 15,
      name: "Smart LED Light Bulbs",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 267,
      description: "WiFi-enabled smart LED bulbs with color changing and voice control features.",
      category: "Smart Home"
    },
    {
      id: 16,
      name: "Running Sneakers",
      price: 139.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264bdf9b?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 412,
      description: "Lightweight running sneakers with advanced cushioning and breathable mesh.",
      category: "Footwear"
    },
    {
      id: 17,
      name: "Portable Phone Charger",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 189,
      description: "10,000mAh portable charger with fast charging and multiple USB ports.",
      category: "Electronics"
    },
    {
      id: 18,
      name: "Coffee Maker",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1509048191080-d2effbada968?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 156,
      description: "Programmable coffee maker with thermal carafe and auto-shutoff feature.",
      category: "Kitchen"
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [wishlist, setWishlist] = useState<number[]>([]);
  
  const { toast } = useToast();

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map(product => product.category)))];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast({
      title: "Added to cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    // Save cart to localStorage for checkout page
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-indigo-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="relative">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  ShopEase
                </h1>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-indigo-500 transition-colors" />
                <Input
                  type="text"
                  placeholder="Search amazing products..."
                  className="pl-12 h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-2xl bg-gray-50/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md focus:shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsCartOpen(true)}
                className="relative h-12 px-6 rounded-2xl border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 group"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="ml-2 font-medium">Cart</span>
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 py-4 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-6 py-2 transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                      : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
              Welcome to <span className="text-cyan-300">ShopEase</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Discover extraordinary products with our seamless shopping experience. Quality, style, and convenience all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="h-14 px-8 text-lg bg-white text-indigo-600 hover:bg-gray-100 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Shop Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-lg border-2 border-white text-white hover:bg-white hover:text-indigo-600 rounded-2xl font-semibold transition-all duration-300"
              >
                Explore Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedCategory === "All" ? "Featured Products" : `${selectedCategory} Products`}
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {selectedCategory === "All" 
              ? "Handpicked items that combine quality, innovation, and style"
              : `Discover amazing ${selectedCategory.toLowerCase()} products`
            }
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden rounded-3xl">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {product.originalPrice && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg">
                      SALE
                    </Badge>
                  )}
                  
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {product.category}
                  </Badge>
                  
                  <div className="absolute bottom-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-xl mb-3 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2 font-medium">
                      ({product.reviews})
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}
      </section>

      {/* Enhanced Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Shopping Cart</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsCartOpen(false)}
                  className="h-10 w-10 rounded-full hover:bg-gray-100 transition-colors duration-300"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 mt-12">
                    <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Your cart is empty</p>
                    <p className="text-sm">Add some amazing products!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-indigo-600 font-bold">${item.price}</p>
                          <div className="flex items-center space-x-3 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-full p-0 hover:bg-red-50 hover:border-red-300 transition-colors duration-300"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-full p-0 hover:bg-green-50 hover:border-green-300 transition-colors duration-300"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t border-gray-200 p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-3xl font-bold text-indigo-600">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Proceed to Checkout 🚀
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
