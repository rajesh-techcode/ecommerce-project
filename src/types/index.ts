export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export interface UserCustomData {
  uid: string;
  email: string | null;
  name?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface CartItem extends Product {
  quantity: number;
}
