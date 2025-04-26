import RichTable from "@/components/RichTable";
import { useDialog } from "@/context/DialogContext";

import { FC, useState } from "react";
import { toast } from "sonner";
import { useOrders } from "../hooks/useOrder";
import CenteredLoader from "@/ui/loader";
import { FuncDialog } from "@/components/FuncDialog";
import MenuItemForm from "@/components/MenuItemForm";

const Product: FC = () => {
  const { openDeleteDialog } = useDialog();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const mapping = [
    { label: "Date", field: "createdAt" },
    { label: "Delivery", field: "delivery" },
    { label: "Payment Status", field: "paymentStatus" },
    { label: "Payment Method", field: "paymentMethod" },
    { label: "Status", field: "status" },
    { label: "Amount", field: "totalAmount" },
  ];
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

  // const filteredData = initialData
  //   .filter((el) => el.status === "new")
  //   .sort((a, b) => a.createdAt - b.createdAt);

  const handleDelete = () => {
    toast.success("Employee deleted successfully!");
  };

  const handleEdit = (id: number) => {
    console.log(`Edit item with id: ${id}`);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-10">
      {isFormOpen ? (
        <FuncDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <MenuItemForm
            onCancel={() => setIsFormOpen(false)}
            onSubmit={() => console.log("form submitted")}
          />
        </FuncDialog>
      ) : null}
      <RichTable
        initialData={initialData}
        mapping={mapping}
        onDelete={() => openDeleteDialog(handleDelete)}
        label="Orders List"
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Product;
