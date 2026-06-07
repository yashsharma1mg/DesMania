import { checkoutAssets } from '../assets/checkout';

export const money = (value: number) => `\u20B9${value}`;

export interface Patient {
  id: string;
  name: string;
  meta: string;
  avatar: string;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  person: string;
  phone: string;
}

export interface TestItem {
  id: string;
  name: string;
  fasting: string;
  reportTime: string;
  preparations: Preparation[];
  price: number;
  mrp: number;
  discount: string;
  patients: number;
}

export interface Preparation {
  id: string;
  icon: 'timer' | 'prescription' | 'tick';
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  asset: string;
}

export const tests: TestItem[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count',
    fasting: 'Fasting not required',
    reportTime: 'Get report within 12 hrs',
    preparations: [{ id: 'none', icon: 'tick', text: 'No special preparation required' }],
    price: 299,
    mrp: 399,
    discount: '25% off',
    patients: 1,
  },
  {
    id: 'thyroid',
    name: 'Thyroid Profile Total',
    fasting: 'Fasting required for 8 hrs',
    reportTime: 'Get report within 24 hrs',
    preparations: [
      { id: 'fasting', icon: 'timer', text: 'Overnight fasting required for 8-12 hrs before sample collection' },
      { id: 'medicine', icon: 'prescription', text: 'Share current thyroid medication details with the phlebotomist' },
    ],
    price: 376,
    mrp: 499,
    discount: '24% off',
    patients: 1,
  },
];

export const patients: Patient[] = [
  { id: 'saumya', name: 'Saumya Sharma', meta: 'Female, 26', avatar: checkoutAssets.avatarFemale },
  { id: 'ravi', name: 'Ravi Sharma', meta: 'Male, 52', avatar: checkoutAssets.avatarMale },
  { id: 'anita', name: 'Anita Sharma', meta: 'Female, 49', avatar: checkoutAssets.avatarFemale },
];

export const addresses: Address[] = [
  {
    id: 'home',
    label: 'Home',
    address: 'Rail Vihar, Sector 15 Part 2, Gurugram, Haryana 122001',
    person: 'Saumya Sharma',
    phone: '+91 98765 43210',
  },
  {
    id: 'office',
    label: 'Office',
    address: 'Tower B, Cyber City, DLF Phase 2, Gurugram, Haryana 122002',
    person: 'Saumya Sharma',
    phone: '+91 98765 43210',
  },
];

export const services: Service[] = [
  {
    id: 'hard-copy',
    title: 'Hard copy',
    description: 'Get printed copy of the report at your doorstep',
    price: 100,
    asset: checkoutAssets.vasPrinter,
  },
  {
    id: 'premium',
    title: 'Premium collection',
    description: 'Top rated fleet of phlebotomists, trained for a superior experience',
    price: 100,
    oldPrice: 400,
    discount: '18% off',
    asset: checkoutAssets.vasPremium,
  },
];

export const days = [
  { id: 'today', label: 'Today', sublabel: '7 slots', disabled: false },
  { id: 'tomorrow', label: 'Tomorrow', sublabel: '9 slots', disabled: false },
  { id: 'fri', label: 'Fri, 31', sublabel: '5 slots', disabled: false },
  { id: 'sat', label: 'Sat, 1', sublabel: 'Full', disabled: true },
];

export const slots = [
  { id: 'morning-7', period: 'morning', time: '7:00 - 8:00 AM', surcharge: 0 },
  { id: 'morning-8', period: 'morning', time: '8:00 - 9:00 AM', surcharge: 0 },
  { id: 'afternoon-12', period: 'afternoon', time: '12:00 - 1:00 PM', surcharge: 50 },
  { id: 'evening-6', period: 'evening', time: '6:00 - 7:00 PM', surcharge: 0 },
];

export const billLines = [
  { label: 'Tests total', value: 898 },
  { label: 'Discount', value: -223 },
  { label: 'Coupon savings', value: -50 },
  { label: 'Premium slot charge', value: 50 },
  { label: 'Hard copy service', value: 100 },
];
