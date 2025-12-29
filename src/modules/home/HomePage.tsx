import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>¡Arquitectura Lista!</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm text-gray-500">
                        Ya tienes Shadcn UI, Tailwind y la estructura de carpetas configurada correctamente.
                    </p>
                    <Button className="w-full">
                        Comenzar Tesis
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}