import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Filter, Download, MoreHorizontal } from "lucide-react";

export default function InventoryPage() {
    return (
        <div className="space-y-6">

            {/* 1. ENCABEZADO DE PÁGINA (Título y Acción Principal) */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventario</h1>
                    <p className="text-muted-foreground">Gestiona tus productos, precios y existencias.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Exportar
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                    </Button>
                </div>
            </div>

            {/* 2. TARJETAS DE KPIs (Resumen rápido) */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
                        <span className="text-muted-foreground text-xs">$</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                        <p className="text-xs text-muted-foreground">+2.5% vs mes anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Productos Activos</CardTitle>
                        <div className="h-4 w-4 rounded-full bg-green-500/20"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145</div>
                        <p className="text-xs text-muted-foreground">12 categorías distintas</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-600">Stock Crítico</CardTitle>
                        <div className="h-4 w-4 rounded-full bg-red-500/20"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">3</div>
                        <p className="text-xs text-muted-foreground">Requieren reorden inmediata</p>
                    </CardContent>
                </Card>
            </div>

            {/* 3. BARRA DE HERRAMIENTAS (Buscador y Filtros) */}
            <div className="flex items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm">
                <div className="flex flex-1 items-center gap-2">
                    <Input placeholder="Buscar por nombre, SKU o código..." className="max-w-sm" />
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Mostrando 5 de 145</span>
                </div>
            </div>

            {/* 4. TABLA DE DATOS (El corazón del sistema) */}
            <div className="rounded-md border bg-white shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">SKU</TableHead>
                            <TableHead>Producto</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead className="text-right">Precio</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Fila de Ejemplo 1 */}
                        <TableRow>
                            <TableCell className="font-medium">MOTOR-001</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">Motor 5HP Trifásico</span>
                                    <span className="text-xs text-muted-foreground">Marca: Siemens</span>
                                </div>
                            </TableCell>
                            <TableCell>Motores</TableCell>
                            <TableCell className="text-right font-medium">$450.00</TableCell>
                            <TableCell className="text-center">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-200">
                                    12
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-green-600 text-sm font-medium">Activo</span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>

                        {/* Fila de Ejemplo 2 (Stock Bajo) */}
                        <TableRow>
                            <TableCell className="font-medium">ELEC-045</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">Tarjeta Lógica Principal</span>
                                    <span className="text-xs text-muted-foreground">Controladores</span>
                                </div>
                            </TableCell>
                            <TableCell>Electrónica</TableCell>
                            <TableCell className="text-right font-medium">$1,200.00</TableCell>
                            <TableCell className="text-center">
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-red-100 text-red-800 hover:bg-red-200">
                                    1
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-yellow-600 text-sm font-medium">Bajo Stock</span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </div>
    );
}