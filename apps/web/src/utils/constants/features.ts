import type { ColumnDef } from "@tanstack/react-table";
import type { FeatureDto } from "@experiment/shared";
import type { FormModel } from "@/utils/forms/types";

export const featureFormModel: FormModel = {
  id: "feature-edit",
  title: "Edit feature",
  steps: [
    {
      id: "main",
      fields: [
        {
          name: "key",
          label: "Key",
          type: "text",
          required: true,
        },
        {
          name: "isEnabled",
          label: "Enabled by default",
          type: "checkbox",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
        },
      ],
    },
  ],
};

export const featureColumns: ColumnDef<FeatureDto>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Key",
    accessorKey: "key",
  },
  {
    header: "Enabled",
    accessorKey: "isEnabled",
    cell: ({ getValue }) => (getValue<boolean>() ? "On" : "Off"),
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
  },
];
