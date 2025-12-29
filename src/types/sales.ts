export type PaymentMethod = 'efectivo_usd' | 'zelle' | 'pago_movil' | 'transferencia_bs' | 'punto_venta';

export interface Product {
    id: string;
    sku: string;
    name: string;
    priceUSD: number;
    stock: number;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
    totalUSD: number; // priceUSD * quantity
}

export interface Client {
    id: string;
    name: string;
    rif: string;
    address: string;
}

export interface SaleSummary {
    subtotalUSD: number;
    igtfAmount: number;
    totalUSD: number;
    totalBs: number;
    rate: number;
    isForeignCurrency: boolean;
}