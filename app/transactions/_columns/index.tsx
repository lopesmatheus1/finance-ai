"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "./_components/type-badge";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { TRANSACTION_CATEGORY_LABELS, TRANSACTION_PAYMENT_METHOD_LABELS } from "@/app/_constants/transactions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



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
