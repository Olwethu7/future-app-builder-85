export interface RoomType {
  id: string;
  name: string;
  description: string;
  type: string;
  price_per_night: number;
  capacity: number;
  images: string[];
  amenities: string[];
  available: boolean;
  quantity: number;
}

export const roomTypes: RoomType[] = [
  {
    id: "single-room",
    name: "Single Room",
    description: "Cozy eco-friendly single room perfect for solo travelers seeking comfort and sustainability",
    type: "Single",
    price_per_night: 750,
    capacity: 1,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071"
    ],
    amenities: ["Wi-Fi", "Fireplace", "Eco-Friendly Toiletries", "Hiking Trails Access"],
    available: true,
    quantity: 5
  },
  {
    id: "double-room",
    name: "Double Room",
    description: "Spacious double room with stunning views, perfect for couples or friends sharing",
    type: "Double",
    price_per_night: 1200,
    capacity: 2,
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070"
    ],
    amenities: ["Wi-Fi", "Swimming Pool", "Restaurant", "Spa", "Wildlife Tours"],
    available: true,
    quantity: 8
  },
  {
    id: "family-room",
    name: "Family Room",
    description: "Generous family suite designed for comfort, featuring multiple beds and family-friendly amenities",
    type: "Family",
    price_per_night: 2400,
    capacity: 4,
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
      "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?q=80&w=2074"
    ],
    amenities: ["Wi-Fi", "Swimming Pool", "Restaurant", "Spa", "Hiking Trails", "Wildlife Tours", "Cultural Activities"],
    available: true,
    quantity: 10
  },
  {
    id: "event-hall",
    name: "Book Hall or Space for Events",
    description: "Spacious event hall perfect for weddings, conferences, and special occasions with eco-friendly facilities",
    type: "Event Space",
    price_per_night: 2000,
    capacity: 100,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f29da8c2e1?q=80&w=2096",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070"
    ],
    amenities: ["Wi-Fi", "Restaurant", "Solar Power", "Audio/Visual Equipment", "Outdoor Space", "Catering Available"],
    available: true,
    quantity: 1
  }
];
