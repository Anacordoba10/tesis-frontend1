import { useState } from "react";
import { usePOS } from "@/hooks/usePOS"; // <--- Usamos tu hook global
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Trash2, FileText, User, CreditCard, RefreshCw, DollarSign, Smartphone, UserPlus, X } from "lucide-react";

export default function SalesPage() {
    // 1. INVOCAMOS NUESTRO SUPER HOOK
    const {
        cart,
        rate,
        setRate,
        paymentMethod,
        setPaymentMethod,
        totals,
        formatBs,
        formatUSD,
        addToCart,
        removeFromCart,
        updateQuantity,
        client,
        setClient,
        productsCatalog // Catálogo completo para buscar
    } = usePOS();

    // 2. ESTADOS LOCALES DE LA VISTA (Solo UI)
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    // Filtramos productos según lo que escribas
    const filteredProducts = productsCatalog.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">

            {/* HEADER */}
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ventas (POS)</h1>
                    <p className="text-muted-foreground">Sistema de Caja - Puerto Libre</p>
                </div>
            </div>

            <Tabs defaultValue="new" className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <TabsList>
                        <TabsTrigger value="new">Nueva Venta</TabsTrigger>
                        <TabsTrigger value="history">Historial</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="new" className="flex-1 flex gap-6 data-[state=inactive]:hidden">

                    {/* --- IZQUIERDA: BUSCADOR Y CARRITO --- */}
                    <div className="flex-[2] flex flex-col gap-4">

                        {/* BUSCADOR FUNCIONAL */}
                        <Card className="relative z-20 overflow-visible">
                            <CardContent className="p-4 flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        placeholder="Buscar por Nombre o SKU..."
                                        className="pl-9"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setIsSearching(e.target.value.length > 0);
                                        }}
                                    />

                                    {/* RESULTADOS DE BÚSQUEDA (FLOTANTE) */}
                                    {isSearching && (
                                        <div className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                            {filteredProducts.length === 0 ? (
                                                <div className="p-3 text-sm text-gray-500">No se encontraron productos.</div>
                                            ) : (
                                                filteredProducts.map(product => (
                                                    <div
                                                        key={product.id}
                                                        className="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer border-b last:border-0"
                                                        onClick={() => {
                                                            addToCart(product);
                                                            setSearchTerm(""); // Limpiar búsqueda al agregar
                                                            setIsSearching(false);
                                                        }}
                                                    >
                                                        <div>
                                                            <p className="font-medium text-sm">{product.name}</p>
                                                            <p className="text-xs text-gray-500">SKU: {product.sku} | Stock: {product.stock}</p>
                                                        </div>
                                                        <div className="font-bold text-sm text-green-600">
                                                            {formatUSD(product.priceUSD)}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* TABLA DEL CARRITO (CONECTADA AL HOOK) */}
                        <Card className="flex-1 overflow-hidden flex flex-col z-10">
                            <CardHeader className="py-4 border-b">
                                <CardTitle className="text-sm">Items en la Orden ({cart.length})</CardTitle>
                            </CardHeader>
                            <div className="flex-1 overflow-auto p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50%]">Producto</TableHead>
                                            <TableHead className="text-center">Cant.</TableHead>
                                            <TableHead className="text-right">Precio</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cart.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                                    El carrito está vacío. <br /> Busca un producto arriba para comenzar.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {cart.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <span className="font-medium block">{item.name}</span>
                                                    <span className="text-xs text-muted-foreground">SKU: {item.sku}</span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Input
                                                        type="number"
                                                        className="w-16 h-8 text-center mx-auto"
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-right">{formatUSD(item.priceUSD)}</TableCell>
                                                <TableCell className="text-right font-bold">{formatUSD(item.totalUSD)}</TableCell>
                                                <TableCell>
                                                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeFromCart(item.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </Card>
                    </div>

                    {/* --- DERECHA: TOTALES Y PAGO --- */}
                    <div className="flex-1 flex flex-col gap-4 min-w-[350px]">

                        {/* TASA DE CAMBIO */}
                        <Card className="border-green-200 bg-green-50/50">
                            <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-green-800">
                                    <RefreshCw className="h-4 w-4" />
                                    <span className="text-sm font-bold">Tasa Monitor (Bs):</span>
                                </div>
                                <Input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                    className="w-24 h-8 text-right font-bold bg-white border-green-300"
                                />
                            </CardContent>
                        </Card>

                        {/* CLIENTE */}
                        <Card>
                            <CardHeader className="pb-3 pt-4 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <User className="h-4 w-4" /> Cliente
                                </CardTitle>
                                {!client && (
                                    <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600">
                                        <UserPlus className="mr-1 h-3 w-3" /> Nuevo
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="pb-4">
                                {!client ? (
                                    <div className="flex gap-2">
                                        <Input placeholder="Buscar Cédula/RIF..." className="h-9" />
                                        <Button size="sm" variant="secondary" onClick={() => setClient({ id: "1", name: "Cliente Genérico", rif: "V-12345678", address: "Local" })}>
                                            Buscar
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="relative rounded-md border bg-blue-50/30 p-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-bold text-sm">{client.name}</p>
                                                <p className="text-xs text-muted-foreground font-mono">{client.rif}</p>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1" onClick={() => setClient(null)}>
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* FORMA DE PAGO */}
                        <Card>
                            <CardHeader className="pb-3 pt-4"><CardTitle className="text-sm font-medium">Forma de Pago</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 gap-2 pb-4">
                                <Button variant={paymentMethod === "efectivo_usd" ? "default" : "outline"} onClick={() => setPaymentMethod("efectivo_usd")} className="justify-start text-xs"><DollarSign className="mr-2 h-3 w-3" /> Efectivo ($)</Button>
                                <Button variant={paymentMethod === "zelle" ? "default" : "outline"} onClick={() => setPaymentMethod("zelle")} className="justify-start text-xs"><span className="font-bold mr-2 text-sm">Z</span> Zelle</Button>
                                <Button variant={paymentMethod === "pago_movil" ? "default" : "outline"} onClick={() => setPaymentMethod("pago_movil")} className="justify-start text-xs"><Smartphone className="mr-2 h-3 w-3" /> Pago Móvil</Button>
                                <Button variant={paymentMethod === "transferencia_bs" ? "default" : "outline"} onClick={() => setPaymentMethod("transferencia_bs")} className="justify-start text-xs"><RefreshCw className="mr-2 h-3 w-3" /> Transf. Bs</Button>
                            </CardContent>
                        </Card>

                        {/* CONTROL FISCAL */}
                        <Card className="border-blue-200 bg-blue-50/50">
                            <CardHeader className="pb-2 pt-3"><CardTitle className="text-xs font-medium flex items-center gap-2 text-blue-800"><FileText className="h-3 w-3" /> Control (Talonario)</CardTitle></CardHeader>
                            <CardContent className="pb-3"><Input placeholder="Ej: 00-003451" className="bg-white border-blue-200 h-8 text-sm" /></CardContent>
                        </Card>

                        {/* TOTALES CALCULADOS */}
                        <Card className="flex-1 flex flex-col justify-end bg-slate-900 text-white border-slate-900 shadow-xl">
                            <CardContent className="pt-4 space-y-3 pb-4">
                                <div className="flex justify-between text-sm items-end">
                                    <span className="text-slate-400">Subtotal</span>
                                    <div className="text-right">
                                        <div className="text-slate-200">{formatUSD(totals.subtotalUSD)}</div>
                                        <div className="text-[10px] text-slate-500">{formatBs(totals.subtotalUSD)}</div>
                                    </div>
                                </div>

                                <div className={`flex justify-between text-sm items-end ${totals.isForeignCurrency ? 'text-yellow-400 font-bold' : 'text-slate-600'}`}>
                                    <span>IGTF (3%) {!totals.isForeignCurrency && <span className="ml-1 text-[10px] font-normal text-slate-500">(No aplica)</span>}</span>
                                    <div className="text-right">
                                        <div>{formatUSD(totals.igtfAmount)}</div>
                                        <div className="text-[10px] opacity-70">{formatBs(totals.igtfAmount)}</div>
                                    </div>
                                </div>

                                <div className="h-[1px] bg-slate-700 my-1"></div>

                                <div className="flex justify-between items-end">
                                    <span className="text-lg font-bold">Total</span>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-400">{formatUSD(totals.totalUSD)}</div>
                                        <div className="text-xs font-medium text-slate-400">{formatBs(totals.totalUSD)}</div>
                                    </div>
                                </div>

                                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 mt-2" disabled={cart.length === 0}>
                                    <CreditCard className="mr-2 h-4 w-4" /> Procesar Venta
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="history"><div className="p-4 text-center">Historial...</div></TabsContent>
            </Tabs>
        </div>
    );
}