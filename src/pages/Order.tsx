import RichTable from "@/components/RichTable";
import { useDialog } from "@/context/DialogContext";

import { FC } from "react";
import { toast } from "sonner";
import { useOrders } from "../hooks/useOrder";
import CenteredLoader from "@/ui/loader";

const Product: FC = () => {
  const { openDeleteDialog } = useDialog();

  const mapping = [
    { label: "Delivery", field: "delivery" },
    { label: "Payment Status", field: "paymentStatus" },
    { label: "Payment Method", field: "paymentMethod" },
    { label: "Status", field: "status" },
    { label: "Amount", field: "totalAmount" },
  ];
  //
  const { orders: initialData, isLoading } = useOrders();
  if (isLoading)
    return (
      <CenteredLoader
        blurIntensity="low"
        fadeIn={true}
        type="dots"
        color="green"
      />
    );

  const handleDelete = () => {
    toast.success("Employee deleted successfully!");
  };

  const handleEdit = (id: number) => {
    console.log(`Edit item with id: ${id}`);
  };

  return (
    <div className="flex flex-col gap-10">
      <RichTable
        initialData={initialData}
        mapping={mapping}
        onDelete={() => openDeleteDialog(handleDelete)}
        label="Employee List"
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Product;
