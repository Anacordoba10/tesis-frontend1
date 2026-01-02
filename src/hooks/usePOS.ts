import { useState, useMemo, useEffect } from "react"; // <--- Agregamos useEffect
import type { Product, CartItem, PaymentMethod, Client } from "@/types/sales";
import { MOCK_PRODUCTS } from "@/data/products"; // <--- Importación desde tu carpeta global

export const usePOS = () => {
    // --- ESTADOS ---
    const [cart, setCart] = useState<CartItem[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("efectivo_usd");
    const [fiscalControl, setFiscalControl] = useState<string>("");

    // 1. ESTADO DE TASA PERSISTENTE
    // Al iniciar, intentamos leer del "disco duro" del navegador. 
    // Si no existe, usamos 65.50 por defecto.
    const [rate, setRate] = useState<number>(() => {
        const savedRate = localStorage.getItem("pos_tasa_bcv");
        return savedRate ? parseFloat(savedRate) : 65.50;
    });

    // 2. EFECTO DE GUARDADO AUTOMÁTICO
    // Cada vez que cambies la 'rate', este código se ejecuta y guarda el nuevo valor.
    useEffect(() => {
        localStorage.setItem("pos_tasa_bcv", rate.toString());
    }, [rate]);

    // --- ACCIONES (Igual que antes) ---
    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, totalUSD: (item.quantity + 1) * item.priceUSD }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, totalUSD: product.priceUSD }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) return removeFromCart(productId);
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? { ...item, quantity, totalUSD: quantity * item.priceUSD }
                    : item
            )
        );
    };

    // En src/hooks/usePOS.ts

    // ... código anterior ...

    // --- CÁLCULOS ---
    const totals = useMemo(() => {
        const subtotalUSD = cart.reduce((acc, item) => acc + item.totalUSD, 0);
        const isForeignCurrency = ["efectivo_usd", "zelle"].includes(paymentMethod);
        const igtfRate = isForeignCurrency ? 0.03 : 0;
        const igtfAmount = subtotalUSD * igtfRate;
        const totalUSD = subtotalUSD + igtfAmount;
        const totalBs = totalUSD * rate;

        return {
            subtotalUSD,
            igtfAmount,
            totalUSD,
            totalBs,
            isForeignCurrency,
            rate // <--- ¡AGREGA ESTA LÍNEA! (Esto envía la tasa al PDF)
        };
    }, [cart, paymentMethod, rate]);

    // ... resto del código ...

    const formatBs = (amount: number) =>
        new Intl.NumberFormat("es-VE", { style: "currency", currency: "VES" }).format(amount * rate);

    const formatUSD = (amount: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

    return {
        cart,
        client,
        rate,
        paymentMethod,
        fiscalControl,
        totals,
        productsCatalog: MOCK_PRODUCTS,
        addToCart,
        removeFromCart,
        updateQuantity,
        setClient,
        setRate,
        setPaymentMethod,
        setFiscalControl,
        formatBs,
        formatUSD
    };
};