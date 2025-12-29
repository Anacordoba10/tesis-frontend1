import { useState, useMemo } from "react";
import type { Product, CartItem, PaymentMethod, Client } from "@/types/sales";
import { MOCK_PRODUCTS } from "@/data/products"; // <--- Importación desde tu carpeta global

export const usePOS = () => {
    // --- ESTADOS ---
    const [cart, setCart] = useState<CartItem[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [rate, setRate] = useState<number>(65.50);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("efectivo_usd");
    const [fiscalControl, setFiscalControl] = useState<string>("");

    // --- ACCIONES ---
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
            isForeignCurrency
        };
    }, [cart, paymentMethod, rate]);

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