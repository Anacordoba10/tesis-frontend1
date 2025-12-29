import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const navigate = useNavigate(); // 1. Inicializamos el hook de navegación
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue sola
        setLoading(true);

        // SIMULACIÓN DE LOGIN (Aquí luego conectaremos con Supabase)
        console.log("Conectando con servidor...");

        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard"); // 2. ¡Navegación mágica hacia el sistema!
        }, 1000); // Esperamos 1 segundo para que se sienta "real"
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Ascensomar ERP</CardTitle>
                    <CardDescription>
                        Ingresa tus credenciales para acceder.
                    </CardDescription>
                </CardHeader>

                {/* Envolvemos en un form para que funcione la tecla ENTER */}
                <form onSubmit={handleLogin}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo Electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@ascensomar.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Ingresando..." : "Ingresar"}
                        </Button>
                    </CardFooter>
                </form>

            </Card>
        </div>
    );
}