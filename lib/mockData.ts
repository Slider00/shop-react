export interface Product {
  id: string;
  name: string;
  category: "flores" | "extractos" | "edibles" | "accesorios" | "bienestar";
  strainType?: "Indica" | "Sativa" | "Híbrido" | "CBD";
  thc?: number;
  cbd?: number;
  effects?: string[];
  aroma?: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  description: string;
  imageGradient: string; // Gradient class or custom inline styles for gorgeous background representation
  images?: string[]; // Array of image paths for detail modals
  videoUrl?: string; // Optional video/animation path
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Gelato Mintz",
    category: "flores",
    strainType: "Indica",
    thc: 26.4,
    cbd: 0.1,
    effects: ["Relajación Profunda", "Felicidad", "Sueño"],
    aroma: ["Menta Dulce", "Cítrico", "Gasolina"],
    price: 14.99,
    rating: 4.9,
    reviewsCount: 124,
    isBestSeller: true,
    description: "Flores extremadamente densas cubiertas de resina cristalina, con notas intensas de menta cremosa y un final terroso gaseoso.",
    imageGradient: "from-emerald-600 via-teal-700 to-slate-900"
  },
  {
    id: "2",
    name: "Super Lemon Haze",
    category: "flores",
    strainType: "Sativa",
    thc: 22.8,
    cbd: 0.2,
    effects: ["Energía", "Creatividad", "Foco"],
    aroma: ["Limón Ácido", "Pino", "Pimienta"],
    price: 12.99,
    rating: 4.8,
    reviewsCount: 98,
    isNew: true,
    description: "Una leyenda sativa galardonada. Proporciona un subidón cerebral activo, energético y creativo con un marcado aroma cítrico.",
    imageGradient: "from-lime-500 via-emerald-600 to-slate-900"
  },
  {
    id: "3",
    name: "Purple Punch",
    category: "flores",
    strainType: "Indica",
    thc: 24.1,
    cbd: 0.1,
    effects: ["Relajación Corporal", "Euforia Suave", "Calma"],
    aroma: ["Uva Dulce", "Arándano", "Vainilla"],
    price: 13.50,
    rating: 4.7,
    reviewsCount: 86,
    description: "Cepa dulce y frutal, perfecta para relajarse por la noche. Sus cogollos lucen tonalidades púrpuras y tricomas brillantes.",
    imageGradient: "from-fuchsia-600 via-indigo-800 to-slate-900"
  },
  {
    id: "4",
    name: "Runtz Exotic",
    category: "flores",
    strainType: "Híbrido",
    thc: 28.2,
    cbd: 0.1,
    effects: ["Euforia", "Risa", "Relajación Corporal"],
    aroma: ["Caramelo Frutal", "Frutos del Bosque", "Crema"],
    price: 16.99,
    rating: 5.0,
    reviewsCount: 145,
    isBestSeller: true,
    description: "Cepa exótica híbrida ultrapotente con un perfil de terpenos sumamente dulce que recuerda a caramelos de frutas y helado.",
    imageGradient: "from-rose-500 via-purple-700 to-slate-900"
  },
  {
    id: "5",
    name: "Harlequin CBD",
    category: "flores",
    strainType: "CBD",
    thc: 5.2,
    cbd: 14.8,
    effects: ["Alivio de Dolor", "Claridad Mental", "Cero Psicoactividad"],
    aroma: ["Tierra Húmeda", "Madera", "Mango"],
    price: 10.99,
    rating: 4.6,
    reviewsCount: 42,
    description: "La cepa ideal para quienes buscan los beneficios terapéuticos del CBD sin el efecto psicoactivo fuerte. Perfecta para el día a día.",
    imageGradient: "from-teal-500 via-emerald-700 to-slate-900"
  },
  {
    id: "6",
    name: "Live Rosin Tangie",
    category: "extractos",
    thc: 78.5,
    cbd: 1.2,
    effects: ["Euforia Instantánea", "Creatividad", "Estimulación"],
    aroma: ["Mandarina Fresca", "Gas", "Naranja"],
    price: 59.99,
    rating: 4.9,
    reviewsCount: 56,
    isBestSeller: true,
    description: "Extracción artesanal premium sin solventes obtenida por presión y calor a partir de material fresco congelado. Sabor puro a mandarina cítrica.",
    imageGradient: "from-amber-500 via-orange-600 to-slate-950"
  },
  {
    id: "7",
    name: "Diamonds & Sauce OG",
    category: "extractos",
    thc: 85.0,
    cbd: 0.5,
    effects: ["Potencia Extrema", "Relajación Muscular", "Tranquilidad"],
    aroma: ["Madera de Pino", "Gasolina", "Limón"],
    price: 69.99,
    rating: 4.8,
    reviewsCount: 38,
    isNew: true,
    description: "Cristales puros de THCA suspendidos en una salsa rica en terpenos de la clásica cepa OG Kush. Potencia insuperable para usuarios expertos.",
    imageGradient: "from-yellow-500 via-amber-600 to-slate-950"
  },
  {
    id: "8",
    name: "Peach Dream Gummies",
    category: "edibles",
    thc: 10.0, // por gomita
    cbd: 5.0,
    effects: ["Felicidad Duradera", "Relajación Física", "Bienestar"],
    aroma: ["Durazno Dulce", "Azúcar"],
    price: 24.99,
    rating: 4.7,
    reviewsCount: 65,
    description: "Deliciosas gomitas infusionadas de acción rápida sabor a durazno. Cada paquete contiene 10 unidades de 10mg THC / 5mg CBD.",
    imageGradient: "from-orange-400 via-red-500 to-slate-900"
  },
  {
    id: "9",
    name: "Organic CBD Honey",
    category: "edibles",
    thc: 0.0,
    cbd: 250.0, // total frasco
    effects: ["Calma", "Reducción de Estrés", "Buen Dormir"],
    aroma: ["Miel Orgánica", "Flores Silvestres"],
    price: 34.99,
    rating: 4.5,
    reviewsCount: 23,
    description: "Miel de abeja 100% orgánica infusionada con extracto de cáñamo rico en CBD de espectro completo. Ideal para infusiones nocturnas.",
    imageGradient: "from-yellow-600 via-yellow-750 to-slate-900"
  },
  {
    id: "10",
    name: "Apex Vaporizer Pro",
    category: "accesorios",
    price: 149.99,
    rating: 4.9,
    reviewsCount: 112,
    isBestSeller: true,
    description: "Vaporizador de conducción de última generación para flores secas y concentrados. Pantalla OLED, control preciso de temperatura y batería de larga duración.",
    imageGradient: "from-zinc-600 via-zinc-800 to-slate-950"
  },
  {
    id: "11",
    name: "Grinder Ceramic Grip",
    category: "accesorios",
    price: 29.99,
    rating: 4.6,
    reviewsCount: 78,
    isNew: true,
    description: "Triturador de 4 piezas con recubrimiento cerámico antiadherente ultra suave. Cierre magnético de neodimio y malla de polen de acero inoxidable.",
    imageGradient: "from-stone-600 via-emerald-900 to-slate-900"
  },
  {
    id: "12",
    name: "Extracto Melena de León",
    category: "bienestar",
    effects: ["Enfoque Mental", "Neurogénesis", "Claridad"],
    aroma: ["Terroso", "Sutil Nuez"],
    price: 29.99,
    rating: 4.8,
    reviewsCount: 34,
    isNew: true,
    description: "Extracto concentrado 10:1 de hifas puras de hongo Melena de León orgánico. Potenciador cognitivo natural ideal para el enfoque diario y la salud cerebral.",
    imageGradient: "from-amber-600 via-yellow-750 to-slate-900"
  },
  {
    id: "13",
    name: "Focus Blend Adaptógenos",
    category: "bienestar",
    effects: ["Energía Natural", "Inmunidad", "Regula Estrés"],
    aroma: ["Cacao", "Tierra"],
    price: 34.99,
    rating: 4.9,
    reviewsCount: 52,
    isBestSeller: true,
    description: "Mezcla sinérgica de extractos de hongos funcionales Reishi, Cordyceps y Shiitake. Formulado para optimizar la vitalidad, mitigar la fatiga y fortalecer defensas.",
    imageGradient: "from-red-950 via-rose-900 to-black"
  }
];

export interface PromoSlide {
  id: string;
  title: string;
  highlightText: string;
  subtitle: string;
  ctaText: string;
  link: string;
  gradient: string;
  badge: string;
  image: string;
}

export const mockPromos: PromoSlide[] = [
  {
    id: "promo-1",
    badge: "Oferta Exclusiva",
    title: "Cosecha Fresca de Verano",
    highlightText: "20% OFF",
    subtitle: "En todas nuestras cepas de flores exóticas. Usa el código: COSECHA20 al finalizar tu compra.",
    ctaText: "Ver Flores",
    link: "/#flores",
    gradient: "from-emerald-950 via-teal-900 to-black",
    image: "/promo_harvest.png"
  },
  {
    id: "promo-2",
    badge: "Extracciones de Elite",
    title: "Live Rosin Artesanal",
    highlightText: "Pureza Sin Solventes",
    subtitle: "Extracción 100% orgánica prensada en frío para conservar la totalidad del perfil de terpenos.",
    ctaText: "Ver Extractos",
    link: "/#extractos",
    gradient: "from-amber-950 via-orange-950 to-black",
    image: "/promo_rosin.png"
  },
  {
    id: "promo-3",
    badge: "Envío Asegurado",
    title: "Entregas en 24 Horas",
    highlightText: "Envío Gratis",
    subtitle: "En todas las compras superiores a $75. Empaque 100% discreto, hermético y sellado al vacío.",
    ctaText: "Comprar Ahora",
    link: "/#todo",
    gradient: "from-indigo-950 via-slate-900 to-black",
    image: "/promo_delivery.png"
  }
];
