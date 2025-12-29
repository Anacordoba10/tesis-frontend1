// Definimos el tipo de dato (Contrato)
export interface Product {
    id: string;
    name: string;
    stock: number;
    price: number;
}

// MODO SIMULACIÓN (Lo que usaremos ahora)
const MOCK_PRODUCTS: Product[] = [
    { id: "1", name: "Motor 5HP", stock: 10, price: 500 },
    { id: "2", name: "Tarjeta Lógica", stock: 2, price: 1200 },
];

export const getProducts = async (): Promise<Product[]> => {
    // Simulamos un retraso de internet de 1 segundo
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PRODUCTS);
        }, 1000);
    });
};

/* CUANDO TENGAS EL BACKEND LISTO:
   Solo comentas lo de arriba y descomentas esto:
   
   export const getProducts = async () => {
      const response = await fetch('https://api.ascensomar.com/products');
      return response.json();
   }
*/