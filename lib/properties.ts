export type Property={slug:string; name:string; place:string; city:string; price:number; type:string; beds:number; baths:number; area:number; purpose:'Buy'|'Rent'|'Commercial'; image:string; gallery:string[]; featured?:boolean; description:string; amenities:string[]};
import { photo } from './photos';
export const properties:Property[]=[
{slug:'serif-residence-palm',name:'The Travertine Pavilion',place:'Emirates Hills, Dubai',city:'Dubai',price:12800000,type:'Villa',beds:5,baths:6,area:6120,purpose:'Buy',featured:true,image:'/images/hero-uae-villa.jpg',gallery:['/images/hero-uae-villa.jpg',photo('photo-1600607687939-ce8a6c25118c'),photo('photo-1600566753086-00f18fb6b3ea')],description:'A monument of contemporary UAE modernist architecture. Designed with honed travertine stone, double-height acoustic glass and private reflecting pools that capture the warmth of the Dubai sun.',amenities:['Private reflecting pool','Double-height glass gallery','Honed travertine finishes','Smart home automation','Private staff quarters','4-car subterranean gallery']},
{slug:'marina-house-32',name:'Marina House 32',place:'Dubai Marina, Dubai',city:'Dubai',price:4950000,type:'Apartment',beds:3,baths:4,area:2210,purpose:'Buy',featured:true,image:photo('photo-1654520015092-b9b4ddf2e7c7'),gallery:[photo('photo-1654520015092-b9b4ddf2e7c7'),photo('photo-1600607687920-4e2a09cf159d'),photo('photo-1600210492486-724fe5c67fb0'),photo('photo-1600566753190-17f0baa2a6c3')],description:'An elevated three-bedroom residence with tranquil marina outlooks and an interiors palette of warm oak and natural stone.',amenities:['Marina view','Resident lounge','Gymnasium','Concierge','Two parking spaces']},
{slug:'the-crescent-lofts',name:'The Crescent Lofts',place:'Al Reem Island, Abu Dhabi',city:'Abu Dhabi',price:215000,type:'Apartment',beds:2,baths:3,area:1675,purpose:'Rent',image:photo('photo-1779903726785-7cf25bed78f7'),gallery:[photo('photo-1779903726785-7cf25bed78f7'),photo('photo-1600585152915-d208bec867a1'),photo('photo-1600573472591-ee6b68d14c68'),photo('photo-1600607688969-a5bfcd646154')],description:'A composed, expansive apartment set above the water, moments from the capital’s cultural and commercial heart.',amenities:['Sea views','Pool deck','24-hour security','Children’s play area','Retail podium']},
{slug:'downtown-skyline-suite',name:'Downtown Skyline Suite',place:'Downtown Dubai, Dubai',city:'Dubai',price:3400000,type:'Apartment',beds:2,baths:2,area:1420,purpose:'Buy',image:photo('photo-1512453979798-5ea266f8880c'),gallery:[photo('photo-1512453979798-5ea266f8880c'),photo('photo-1545324418-cc1a3fa10c00'),photo('photo-1600210492486-724fe5c67fb0')],description:'An impeccably placed city residence with a front-row perspective on Downtown’s iconic skyline.',amenities:['Burj Khalifa view','Valet','Fitness studio','Private cinema','Residents’ garden']},
{slug:'saadiyat-garden-home',name:'Saadiyat Garden Home',place:'Saadiyat Island, Abu Dhabi',city:'Abu Dhabi',price:8950000,type:'Villa',beds:4,baths:5,area:4820,purpose:'Buy',image:photo('photo-1600585154526-990dced4db0d'),gallery:[photo('photo-1600585154526-990dced4db0d'),photo('photo-1600566753190-17f0baa2a6c3'),photo('photo-1600607687939-ce8a6c25118c')],description:'A serene, garden-framed villa that gives a contemporary expression to relaxed island living.',amenities:['Landscaped garden','Private pool','Maid room','Beach club access','Covered parking']},
{slug:'al-majaz-office',name:'Al Majaz Office Collection',place:'Al Majaz, Sharjah',city:'Sharjah',price:185000,type:'Office',beds:0,baths:2,area:2840,purpose:'Commercial',image:photo('photo-1497366811353-6870744d04b2'),gallery:[photo('photo-1497366811353-6870744d04b2'),photo('photo-1497366216548-37526070297c'),photo('photo-1497366754035-f200968a6e72')],description:'A considered commercial address balancing impressive lake views with flexible, efficient workspace.',amenities:['Fitted office','Lake views','Reception','High-speed lifts','Visitor parking']}
];
export const formatAED=(price:number)=>new Intl.NumberFormat('en-AE',{style:'currency',currency:'AED',maximumFractionDigits:0}).format(price);

/* ----------------------------------------------------------------
   Filter model — shared by the homepage search dock and the
   Properties page so both apply identical rules to the same dataset.
   Price and bedroom matching work on the numeric `price` and `beds`
   fields; the option labels are presentation only.
   ---------------------------------------------------------------- */

export type Purpose = Property['purpose'];
export type PurposeFilter = 'All' | Purpose;

export type PriceRange = { id: string; label: string; min: number; max: number };

export const PRICE_RANGES: PriceRange[] = [
  { id: 'Under 1m', label: 'Under AED 1m', min: 0, max: 1_000_000 },
  { id: '1m–5m', label: 'AED 1m – 5m', min: 1_000_000, max: 5_000_000 },
  { id: '5m+', label: 'AED 5m+', min: 5_000_000, max: Number.POSITIVE_INFINITY },
];

export const FILTER_OPTIONS = {
  purposes: ['Buy', 'Rent', 'Commercial'] as Purpose[],
  cities: ['Dubai', 'Abu Dhabi', 'Sharjah'],
  types: ['Villa', 'Apartment', 'Office'],
  prices: PRICE_RANGES.map((r) => r.id),
  beds: ['2+', '3+', '4+'],
};

export type PropertyFilters = {
  purpose: PurposeFilter;
  /** City name or 'All' */
  city: string;
  /** Property type or 'All' */
  type: string;
  /** PRICE_RANGES id or 'All' */
  price: string;
  /** Minimum bedrooms as "N+" or 'All' */
  beds: string;
};

export const DEFAULT_FILTERS: PropertyFilters = {
  purpose: 'All',
  city: 'All',
  type: 'All',
  price: 'All',
  beds: 'All',
};

/** Parse a "3+" style option to its numeric minimum; 'All' → 0. */
export const minBedsFrom = (beds: string) => {
  const n = Number.parseInt(beds, 10);
  return Number.isFinite(n) ? n : 0;
};

export function matchesPrice(price: number, rangeId: string) {
  if (rangeId === 'All') return true;
  const range = PRICE_RANGES.find((r) => r.id === rangeId);
  if (!range) return true;
  const upperOk = range.max === Number.POSITIVE_INFINITY ? true : price < range.max;
  return price >= range.min && upperOk;
}

export function matchesFilters(p: Property, f: PropertyFilters) {
  return (
    (f.purpose === 'All' || p.purpose === f.purpose) &&
    (f.city === 'All' || p.city === f.city) &&
    (f.type === 'All' || p.type === f.type) &&
    matchesPrice(p.price, f.price) &&
    p.beds >= minBedsFrom(f.beds)
  );
}

export const filterProperties = (list: Property[], f: PropertyFilters) => list.filter((p) => matchesFilters(p, f));

export const isDefaultFilters = (f: PropertyFilters) =>
  (Object.keys(DEFAULT_FILTERS) as (keyof PropertyFilters)[]).every((k) => f[k] === DEFAULT_FILTERS[k]);
