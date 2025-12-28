import type { Product } from "@/types/sales";

export const MOCK_PRODUCTS: Product[] = [
    { id: "1", sku: "MTR-001", name: "Motor 5HP Trifásico Siemens", priceUSD: 450.00, stock: 5, category: "Motores" },
    { id: "2", sku: "TRJ-LOG", name: "Tarjeta Lógica Maniobra", priceUSD: 1200.00, stock: 2, category: "Electrónica" },
    { id: "3", sku: "BTN-PB", name: "Botonera de Piso (Inox)", priceUSD: 85.00, stock: 20, category: "Repuestos" },
    { id: "4", sku: "CAB-ACE", name: "Cable de Acero (Metro)", priceUSD: 12.50, stock: 500, category: "Cables" },
    { id: "5", sku: "SRV-INS", name: "Servicio de Instalación", priceUSD: 150.00, stock: 999, category: "Servicios" },
    { id: "6", sku: "ACE-LUB", name: "Aceite Lubricante (Litro)", priceUSD: 15.00, stock: 30, category: "Insumos" },
];