"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "./_components/type-badge";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const TRANSACTION_CATEGORY_LABELS = {
  HOUSING: "Moradia",
  TRANSPORTATION: "Transporte",
  FOOD: "Comida",
  ENTERTAINMENT: "Entretenimento",
  HEALTH: "Saúde",
  UTILITY: "Utilidades",
  SALARY: "Salário",
  EDUCATION: "Educação",
  OTHER: "Outros",
};

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: "Transferência Bancária",
  BANK_SLIP: "Boleto Bancário",
  CASH: "Dinheiro",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  OTHER: "Outros",
  PIX: "Pix",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },

  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },

  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },

  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
  },

  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
      }).format(Number(transaction.amount)),
  },

  {
    accessorKey: "actions",
    header: "",
    cell: () => (
      <div className="space-x-1 text-muted-foreground">
        <Button variant="ghost" size="icon">
          <PencilIcon />
        </Button>
        <Button variant="ghost" size="icon">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
