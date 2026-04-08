import { collection, getDocs, doc, getDoc, addDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from './config';
import { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as Product);
  });
  return products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (!id) return null;
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
};

export const addProduct = async (productData: Omit<Product, 'id'>) => {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return docRef.id;
};

export const deleteProduct = async (productId: string) => {
  try {
    const pRef = doc(db, 'products', productId);
    await deleteDoc(pRef);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
