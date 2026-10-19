/* AETHER Product Catalog */
const PRODUCTS = [
  {
    id: 1,
    name: "Aether Buds Pro",
    category: "Audio",
    price: 249,
    oldPrice: 299,
    emoji: "🎧",
    badge: "sale",
    desc: "Premium wireless earbuds with adaptive noise cancellation and 40-hour battery life.",
    features: ["ANC", "Spatial Audio", "IPX5", "Wireless Charging"]
  },
  {
    id: 2,
    name: "Aether Watch X",
    category: "Wearables",
    price: 399,
    oldPrice: null,
    emoji: "⌚",
    badge: "new",
    desc: "Advanced smartwatch with ECG, blood oxygen monitoring, and 7-day battery.",
    features: ["ECG", "SpO2", "GPS", "Always-On Display"]
  },
  {
    id: 3,
    name: "Aether Key Mech",
    category: "Accessories",
    price: 179,
    oldPrice: 219,
    emoji: "⌨️",
    badge: "sale",
    desc: "Hot-swappable mechanical keyboard with RGB and aluminum frame.",
    features: ["Hot-swap", "RGB", "Aluminum", "Wireless"]
  },
  {
    id: 4,
    name: "Aether Drone Mini",
    category: "Drones",
    price: 549,
    oldPrice: null,
    emoji: "🛸",
    badge: "hot",
    desc: "Compact 4K drone with obstacle avoidance and 32-minute flight time.",
    features: ["4K Camera", "Obstacle Avoidance", "Foldable", "Follow Me"]
  },
  {
    id: 5,
    name: "Aether Shield 20K",
    category: "Power",
    price: 89,
    oldPrice: 109,
    emoji: "🔋",
    badge: "sale",
    desc: "20000mAh power bank with 65W PD fast charging and dual USB-C ports.",
    features: ["65W PD", "20000mAh", "Dual USB-C", "Laptop Charge"]
  },
  {
    id: 6,
    name: "Aether Vision VR",
    category: "VR",
    price: 699,
    oldPrice: null,
    emoji: "🥽",
    badge: "new",
    desc: "Standalone VR headset with 4K per eye and advanced hand tracking.",
    features: ["4K/eye", "Hand Tracking", "Wireless", "120Hz"]
  },
  {
    id: 7,
    name: "Aether Beam Pro",
    category: "Display",
    price: 329,
    oldPrice: 379,
    emoji: "📽️",
    badge: "sale",
    desc: "Portable laser projector with 1080p and built-in Android TV.",
    features: ["1080p", "Laser", "Android TV", "2.5hr Battery"]
  },
  {
    id: 8,
    name: "Aether Link Hub",
    category: "Accessories",
    price: 79,
    oldPrice: null,
    emoji: "🔌",
    badge: null,
    desc: "9-in-1 USB-C hub with HDMI 4K, Ethernet, SD card, and 100W passthrough.",
    features: ["9-in-1", "4K HDMI", "100W PD", "Ethernet"]
  },
  {
    id: 9,
    name: "Aether Sound Bar",
    category: "Audio",
    price: 299,
    oldPrice: null,
    emoji: "🔊",
    badge: "new",
    desc: "Immersive 3.1.2 channel soundbar with Dolby Atmos and wireless subwoofer.",
    features: ["Dolby Atmos", "Wireless Sub", "HDMI eARC", "Bluetooth"]
  },
  {
    id: 10,
    name: "Aether Cam 4K",
    category: "Cameras",
    price: 449,
    oldPrice: 499,
    emoji: "📷",
    badge: "sale",
    desc: "Action camera with 4K60, hyper-smooth stabilization, and waterproof case.",
    features: ["4K60", "Stabilization", "Waterproof", "Voice Control"]
  },
  {
    id: 11,
    name: "Aether Pad Ultra",
    category: "Tablets",
    price: 899,
    oldPrice: null,
    emoji: "📱",
    badge: "hot",
    desc: "12.9-inch OLED tablet with M-series chip and Apple Pencil support.",
    features: ["OLED", "M-chip", "Pencil Support", "5G"]
  },
  {
    id: 12,
    name: "Aether Mouse Pro",
    category: "Accessories",
    price: 99,
    oldPrice: null,
    emoji: "🖱️",
    badge: null,
    desc: "Ergonomic wireless mouse with 8K DPI sensor and customizable buttons.",
    features: ["8K DPI", "Wireless", "Ergonomic", "RGB"]
  }
];
