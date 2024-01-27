import { ColumnDef } from "@tanstack/react-table";

// This object is used to define the shape of our PR data.
const PR = {
  id: String,
  name: String,
  reservations: String,
  totalReservations: String,
  moneyOwed: String,
};

const columns = [
  {
    accessorKey: "name",
    header: "PR Name",
  },
  {
    accessorKey: "totalReservations",
    header: "People Brought",
  },
  {
    accessorKey: "moneyOwed",
    header: () => <div className="text-right">Money Owed</div>,
    cell: ({ row }) => {
      const moneyOwed = parseFloat(row.getValue("moneyOwed"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(moneyOwed);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

export { PR, columns };
