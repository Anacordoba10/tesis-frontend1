import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Importamos el componente Input
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    ShieldCheck,
    LogOut,
    Search // Icono de lupa
} from "lucide-react";

export default function DashboardLayout() {
    const navigate = useNavigate();

    // Estilos para los links del menú
    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${isActive ? "bg-gray-200 text-black font-medium" : "text-gray-500 hover:text-black hover:bg-gray-100"
        }`;

    return (
        <div className="flex h-screen w-full bg-gray-50">
            {/* SIDEBAR (Menú Lateral) */}
            <aside className="hidden w-64 flex-col border-r bg-white p-6 md:flex">
                <div className="mb-8 flex items-center gap-2 px-2">
                    <div className="h-8 w-8 rounded-lg bg-black"></div>
                    <span className="text-lg font-bold tracking-tight">Ascensomar ERP</span>
                </div>

                <nav className="flex flex-1 flex-col gap-2">
                    <NavLink to="/dashboard" className={getLinkClass}>
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </NavLink>
                    <NavLink to="/inventory" className={getLinkClass}>
                        <Package className="h-4 w-4" />
                        Inventario
                    </NavLink>
                    <NavLink to="/sales" className={getLinkClass}>
                        <ShoppingCart className="h-4 w-4" />
                        Ventas
                    </NavLink>
                    <NavLink to="/admin" className={getLinkClass}>
                        <ShieldCheck className="h-4 w-4" />
                        Admin
                    </NavLink>
                </nav>

                <div className="mt-auto">
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate('/login')}>
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* AREA PRINCIPAL */}
            <main className="flex-1 flex flex-col overflow-hidden">

                {/* HEADER: Ahora con Buscador */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6">

                    {/* BUSCADOR GLOBAL */}
                    <div className="relative w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Buscar productos, facturas, clientes..."
                            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-gray-400"
                        />
                    </div>

                    {/* PERFIL DE USUARIO */}
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col items-end hidden sm:flex">
                            <span className="text-sm font-medium">Admin User</span>
                            <span className="text-xs text-gray-500">Administrador</span>
                        </div>
                        <div className="h-9 w-9 rounded-full bg-gray-800 border-2 border-white shadow-sm"></div>
                    </div>
                </header>

                {/* CONTENIDO DE LAS PÁGINAS */}
                <div className="flex-1 overflow-auto bg-gray-50 p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}