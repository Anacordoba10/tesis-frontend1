import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { SaleSummary, Client } from "@/types/sales";

// Estilos del PDF
const styles = StyleSheet.create({
    page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },

    // CABECERA
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    companyInfo: { alignItems: 'flex-end' },
    companyName: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },

    // CAJA DE DATOS
    infoBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, border: '1px solid #e2e8f0', borderRadius: 4, padding: 10 },
    clientSection: { width: '55%' },
    invoiceDataSection: { width: '40%', alignItems: 'flex-end' },
    label: { fontSize: 8, color: '#64748b', marginBottom: 2 },
    value: { fontSize: 10, marginBottom: 5, fontWeight: 'bold' },

    // --- NUEVA ESTRUCTURA DE TABLA (5 COLUMNAS) ---
    table: { width: '100%', marginBottom: 20 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#f1f5f9', padding: 8, borderBottom: '1px solid #e2e8f0' },
    tableRow: { flexDirection: 'row', padding: 8, borderBottom: '1px solid #e2e8f0' },

    // Anchos ajustados para que quepa todo
    colProduct: { width: '35%' }, // Descripción un poco más angosta
    colQty: { width: '10%', textAlign: 'center' },
    colPrice: { width: '15%', textAlign: 'right' }, // Precio Unit. ($)
    colTotalUSD: { width: '20%', textAlign: 'right' }, // Total ($)
    colTotalBs: { width: '20%', textAlign: 'right', fontWeight: 'bold' }, // Total (Bs) - NUEVA

    // TOTALES
    footer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
    totalsBox: { width: '45%' }, // Un poco más ancha para que quepan los textos largos
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
    grandTotal: { fontSize: 12, fontWeight: 'bold', color: '#16a34a', marginTop: 5, borderTop: '1px solid #000', paddingTop: 5 },

    // NOTA LEGAL
    legalNote: { marginTop: 40, fontSize: 8, color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' }
});

interface InvoicePDFProps {
    data: {
        totals: SaleSummary;
        client: Client | null;
        fiscalControl: string;
        paymentMethod: string;
        cart: any[];
    };
}

export const InvoicePDF = ({ data }: InvoicePDFProps) => {
    const { client, totals, fiscalControl, cart } = data;

    // Validamos que la tasa exista para evitar el "NaN"
    const rate = totals.rate || 0;

    // Formateadores
    const fmt = (num: number) => `$${num.toFixed(2)}`;
    const fmtBs = (num: number) => `Bs. ${(num * rate).toFixed(2)}`;

    return (
        <Document>
            <Page size="LETTER" style={styles.page}>

                {/* 1. ENCABEZADO EMPRESA */}
                <View style={styles.header}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ASCENSOMAR</Text>
                        <Text style={{ fontSize: 8, marginTop: 5 }}>SISTEMAS DE ELEVACIÓN</Text>
                    </View>
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>ASCENSOMAR C.A.</Text>
                        <Text>RIF: J-30999999-9</Text>
                        <Text>Av. 4 de Mayo, Porlamar</Text>
                        <Text>Nueva Esparta, Venezuela</Text>
                    </View>
                </View>

                <View style={{ borderBottom: '2px solid #000', marginBottom: 20 }}></View>

                {/* 2. DATOS DEL CLIENTE */}
                <View style={styles.infoBox}>
                    <View style={styles.clientSection}>
                        <Text style={styles.label}>CLIENTE:</Text>
                        <Text style={styles.value}>{client?.name || 'CONTADO / GENÉRICO'}</Text>
                        <Text style={styles.label}>RIF / C.I.:</Text>
                        <Text style={styles.value}>{client?.rif || 'V-00000000'}</Text>
                        <Text style={styles.label}>DIRECCIÓN:</Text>
                        <Text style={{ fontSize: 9 }}>{client?.address || '---'}</Text>
                    </View>

                    <View style={styles.invoiceDataSection}>
                        <Text style={styles.label}>CONTROL FISCAL (Nota Entrega):</Text>
                        <Text style={{ ...styles.value, color: '#dc2626' }}>{fiscalControl || 'PENDIENTE'}</Text>
                        <Text style={styles.label}>FECHA:</Text>
                        <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
                        <Text style={styles.label}>TASA DE CAMBIO:</Text>
                        <Text style={styles.value}>{rate.toFixed(2)} Bs/$</Text>
                    </View>
                </View>

                {/* 3. TABLA PRODUCTOS (ACTUALIZADA) */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colProduct}>DESCRIPCIÓN</Text>
                        <Text style={styles.colQty}>CANT.</Text>
                        <Text style={styles.colPrice}>P. UNIT ($)</Text>
                        <Text style={styles.colTotalUSD}>TOTAL ($)</Text>
                        <Text style={styles.colTotalBs}>TOTAL (Bs)</Text>
                    </View>

                    {cart.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.colProduct}>{item.name}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colPrice}>{fmt(item.priceUSD)}</Text>
                            <Text style={styles.colTotalUSD}>{fmt(item.totalUSD)}</Text>
                            {/* Aquí hacemos el cálculo por fila usando la tasa global */}
                            <Text style={styles.colTotalBs}>{fmtBs(item.totalUSD)}</Text>
                        </View>
                    ))}
                </View>

                {/* 4. TOTALES GENERALES */}
                <View style={styles.footer}>
                    <View style={styles.totalsBox}>
                        <View style={styles.totalRow}>
                            <Text>Subtotal ($):</Text>
                            <Text>{fmt(totals.subtotalUSD)}</Text>
                        </View>
                        {totals.igtfAmount > 0 && (
                            <View style={styles.totalRow}>
                                <Text>IGTF (3%):</Text>
                                <Text>{fmt(totals.igtfAmount)}</Text>
                            </View>
                        )}
                        <View style={styles.totalRow}>
                            <Text style={styles.grandTotal}>TOTAL PAGADO ($):</Text>
                            <Text style={styles.grandTotal}>{fmt(totals.totalUSD)}</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={{ fontWeight: 'bold', fontSize: 10 }}>TOTAL PAGADO (Bs):</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{fmtBs(totals.totalUSD)}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.legalNote}>
                    Documento generado por Sistema Ascensomar ERP. Referencia Tasa BCV/Monitor: {rate.toFixed(2)} Bs.
                </Text>
            </Page>
        </Document>
    );
};