import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";
import { PDFDownloadLink } from '@react-pdf/renderer'; // <--- IMPORTANTE
import { InvoicePDF } from './InvoicePDF';             // <--- IMPORTAR EL PDF LOCAL

import type { SaleSummary, Client } from "@/types/sales";

interface SaleSuccessModalProps {
    open: boolean;
    onClose: () => void;
    data: {
        totals: SaleSummary;
        client: Client | null;
        fiscalControl: string;
        paymentMethod: string;
        cart: any[]; // <--- AGREGAR ESTO PARA PODER IMPRIMIR LOS ITEMS
    } | null;
    formatUSD: (val: number) => string;
    formatBs: (val: number) => string;
}

export function SaleSuccessModal({ open, onClose, data, formatUSD, formatBs }: SaleSuccessModalProps) {
    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <DialogTitle className="text-xl text-center">¡Venta Exitosa!</DialogTitle>
                    <DialogDescription className="text-center">
                        Transacción registrada correctamente.
                    </DialogDescription>
                </DialogHeader>

                {/* Resumen en pantalla (Ticket simple) */}
                <div className="bg-gray-50 p-4 rounded-md border border-dashed border-gray-300 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Control Fiscal:</span>
                        <span className="font-bold">{data.fiscalControl || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Cliente:</span>
                        <span className="font-medium truncate max-w-[150px]">{data.client?.name || "Genérico"}</span>
                    </div>
                    <div className="border-t my-2"></div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Pagado:</span>
                        <span className="text-green-700">{formatUSD(data.totals.totalUSD)}</span>
                    </div>
                    <div className="text-right text-xs text-gray-500">{formatBs(data.totals.totalUSD)}</div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">

                    {/* BOTÓN DE DESCARGA PDF */}
                    <PDFDownloadLink
                        document={<InvoicePDF data={data} />}
                        fileName={`Nota-${data.fiscalControl || 'sin-control'}.pdf`}
                        className="w-full sm:w-auto"
                    >
                        {({ loading }) => (
                            <Button variant="outline" className="w-full" disabled={loading}>
                                <FileText className="mr-2 h-4 w-4" />
                                {loading ? 'Generando...' : 'Descargar PDF'}
                            </Button>
                        )}
                    </PDFDownloadLink>

                    <Button className="w-full sm:w-1/2 bg-black hover:bg-gray-800" onClick={onClose}>
                        Nueva Venta <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}