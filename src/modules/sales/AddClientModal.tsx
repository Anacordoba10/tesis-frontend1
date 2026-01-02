import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Save } from "lucide-react";
import type { Client } from "@/types/sales";

interface AddClientModalProps {
    onClientCreated: (client: Client) => void;
}

export function AddClientModal({ onClientCreated }: AddClientModalProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        rif: "",
        address: "",
        phone: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulamos la creación del cliente
        const newClient: Client = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            rif: formData.rif,
            address: formData.address,
            // Si agregaste teléfono a tu type, descomenta esto:
            // phone: formData.phone 
        };

        onClientCreated(newClient);
        setOpen(false); // Cierra el modal
        setFormData({ name: "", rif: "", address: "", phone: "" }); // Limpia formulario
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                    <UserPlus className="mr-1 h-3 w-3" /> Nuevo
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Registrar Nuevo Cliente</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos fiscales para la facturación inmediata.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre / Razón Social</Label>
                        <Input
                            id="name"
                            placeholder="Ej: Inversiones El Águila C.A."
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="rif">RIF / Cédula</Label>
                            <Input
                                id="rif"
                                placeholder="J-12345678-0"
                                value={formData.rif}
                                onChange={(e) => setFormData({ ...formData, rif: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                placeholder="0414-XXXXXXX"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Dirección Fiscal</Label>
                        <Input
                            id="address"
                            placeholder="Av. Bolívar, Local 5..."
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>

                    <DialogFooter className="mt-4">
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            <Save className="mr-2 h-4 w-4" /> Guardar y Seleccionar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}