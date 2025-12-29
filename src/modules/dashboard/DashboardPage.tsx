import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Users, CreditCard, Activity } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">

            {/* 1. ENCABEZADO ESTÁNDAR (Igual que en Inventario) */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Vista general del rendimiento de Ascensomar C.A.</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Simulación de selector de fechas si no tienes el componente */}
                    <Button variant="outline" className="hidden sm:flex">
                        Ene 20, 2024 - Feb 09, 2024
                    </Button>
                    <Button>
                        <FileDown className="mr-2 h-4 w-4" /> Descargar Reporte
                    </Button>
                </div>
            </div>

            {/* 2. ZONA DE CONTEXTO (Pestañas de navegación interna) */}
            <Tabs defaultValue="resumen" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="resumen">Resumen General</TabsTrigger>
                    <TabsTrigger value="ventas">Ventas</TabsTrigger>
                    <TabsTrigger value="inventario">Movimientos</TabsTrigger>
                </TabsList>

                <TabsContent value="resumen" className="space-y-4">

                    {/* 3. LIENZO DE TRABAJO: KPIs (Tarjetas visuales) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                                <span className="text-muted-foreground">$</span>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$45,231.89</div>
                                <p className="text-xs text-muted-foreground">+20.1% vs mes anterior</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Ventas (Ordenes)</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+2350</div>
                                <p className="text-xs text-muted-foreground">+180.1% vs mes anterior</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                                <Activity className="h-4 w-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">12</div>
                                <p className="text-xs text-muted-foreground">Productos requieren atención</p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-muted-foreground">+201 nuevos este mes</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* 4. LIENZO DE TRABAJO: Gráficos (Simulados visualmente) */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                        {/* Gráfico Principal (Ocupa 4 columnas) */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Resumen de Ventas</CardTitle>
                                <CardDescription>Ingresos de los últimos 30 días</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                {/* Aquí irá Recharts luego. Por ahora un placeholder bonito */}
                                <div className="h-[200px] w-full flex items-end justify-between gap-2 px-4">
                                    {[40, 60, 55, 80, 45, 90, 100, 75, 60, 95, 80, 100].map((h, i) => (
                                        <div key={i} className="bg-black w-full rounded-t-md opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Lista Lateral (Ocupa 3 columnas) */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Ventas Recientes</CardTitle>
                                <CardDescription>Últimas 5 facturas procesadas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {/* Item 1 */}
                                    <div className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">OM</div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Olivia Martin</p>
                                            <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium">+$1,999.00</div>
                                    </div>
                                    {/* Item 2 */}
                                    <div className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">JL</div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Jackson Lee</p>
                                            <p className="text-xs text-muted-foreground">jackson.lee@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium">+$39.00</div>
                                    </div>
                                    {/* Item 3 */}
                                    <div className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">IN</div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                                            <p className="text-xs text-muted-foreground">isabella.nguyen@email.com</p>
                                        </div>
                                        <div className="ml-auto font-medium">+$299.00</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}