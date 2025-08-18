import { type ProjectTemplate } from "@/types/configurator";

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "plecak-mama-classic",
    name: "Plecak dla Mamy - Klasyczny",
    description: "Elegancki plecak z klasycznymi kolorami, idealny na co dzień",
    productKey: "plecak-mama",
    materialKey: "ekoskora",
    liningKey: "czerwona",
    hardwareKey: "zloty",
    embroideryText: "MAMA",
    extras: ["raczki-czarna-skora"],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "popular"
  },
  {
    id: "plecak-dziecko-trendy",
    name: "Plecak dla Dziecka - Trendy",
    description: "Kolorowy plecak z personalizowanym haftem dla najmłodszych",
    productKey: "plecak-dziecko",
    materialKey: "ekoskora",
    liningKey: "niebieska",
    hardwareKey: "srebrny",
    embroideryText: "ANNA",
    extras: ["raczki-brazowa-skora"],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "trending"
  },
  {
    id: "worek-special",
    name: "Worek - Specjalny",
    description: "Praktyczny worek bez okuć, idealny na zakupy",
    productKey: "worek",
    materialKey: "ekoskora",
    liningKey: "czerwona",
    hardwareKey: "zloty", // Nie używane dla worka
    embroideryText: "ZAKUPY",
    extras: [],
    thumbnail: "/models/worek.jpg",
    category: "classic"
  },
  {
    id: "torbacz-duza-elegant",
    name: "Duża Torba Torbacz - Elegancka",
    description: "Duża torba w eleganckich kolorach, idealna na weekend",
    productKey: "torbacz-duza",
    materialKey: "ekoskora",
    liningKey: "czerwona",
    hardwareKey: "zloty",
    embroideryText: "WEEKEND",
    extras: ["raczki-czarna-skora"],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "popular"
  },
  {
    id: "torbacz-mala-practical",
    name: "Mała Torba Torbacz - Praktyczna",
    description: "Kompaktowa torba na co dzień z eleganckimi detalami",
    productKey: "torbacz-mala",
    materialKey: "ekoskora",
    liningKey: "zielona",
    hardwareKey: "srebrny",
    embroideryText: "CODZIENNIE",
    extras: ["raczki-brazowa-skora"],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "trending"
  },
  {
    id: "kosmetyczka-organizer",
    name: "Kosmetyczka - Organizer",
    description: "Praktyczna kosmetyczka z organizacją wewnętrzną",
    productKey: "kosmetyczka",
    materialKey: "ekoskora",
    liningKey: "rozowa",
    hardwareKey: "srebrny",
    embroideryText: "BEAUTY",
    extras: ["kosmetyczka-rozmiar-L"],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "trending"
  },
  {
    id: "torba-laptop-professional",
    name: "Torba na Laptopa - Profesjonalna",
    description: "Profesjonalna torba do pracy z eleganckimi detalami",
    productKey: "torba-laptop",
    materialKey: "ekoskora",
    liningKey: "szara",
    hardwareKey: "zloty",
    embroideryText: "BIZNES",
    extras: ["raczki-czarna-skora"],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "popular"
  },
  {
    id: "etui-laptop-compact",
    name: "Etui na Laptopa - Kompaktowe",
    description: "Kompaktowe etui chroniące laptopa w podróży",
    productKey: "etui-laptop",
    materialKey: "ekoskora",
    liningKey: "niebieska",
    hardwareKey: "srebrny",
    embroideryText: "PODRÓŻ",
    extras: [],
    thumbnail: "/models/plecak-west-l.jpg",
    category: "classic"
  }
];

export function getTemplatesByCategory(category: ProjectTemplate['category']) {
  return PROJECT_TEMPLATES.filter(template => template.category === category);
}

export function getTemplateById(id: string) {
  return PROJECT_TEMPLATES.find(template => template.id === id);
}

export function getPopularTemplates(limit: number = 3) {
  return PROJECT_TEMPLATES
    .filter(template => template.category === 'popular')
    .slice(0, limit);
}

export function getTemplatesByProduct(productKey: string) {
  return PROJECT_TEMPLATES.filter(template => template.productKey === productKey);
}
