import RichTable from "@/components/RichTable";
import { useDialog } from "@/context/DialogContext";

import { FC, useState } from "react";
import { useDeleteOrder, useOrders } from "@/features/order/useOrder";
import CenteredLoader from "@/ui/CenteredLoader";
import { FuncDialog } from "@/components/FuncDialog";
import { Order } from "@/types/orderType";
import { formatDateTime } from "@/utils/formatDateTime";
import OrderItemForm from "@/components/OrderItemForm";
import ErrorPage from "./ErrorPage";

const Product: FC = () => {
  const { openDeleteDialog } = useDialog();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const mapping = [
    { label: "Date", field: "createdAt" },
    { label: "Recipient Name", field: "recipientName" },
    { label: "Status", field: "status" },
    { label: "Payment Status", field: "paymentStatus" },
    { label: "Payment Method", field: "paymentMethod" },
    { label: "Amount", field: "totalAmount" },
  ];
  const { orders: initialData, isLoading } = useOrders();
  const { deleteOrder } = useDeleteOrder();

  if (isLoading)
    return (
      <CenteredLoader
        blurIntensity="low"
        fadeIn={true}
        type="dots"
        color="green"
      />
    );

  if (!initialData) return <ErrorPage />;

  const newOrders = initialData
    .filter((el: Order) => el.status === "new")
    .map((el: Order) => ({
      ...el,
      createdAt: el.createdAt ? formatDateTime(el.createdAt) : null,
    }));

  const pendingOrders = initialData
    .filter((el: Order) => el.status === "preparing")
    .map((el: Order) => ({
      ...el,
      createdAt: el.createdAt ? formatDateTime(el.createdAt) : null,
    }));

  const completedOrders = initialData
    .filter(
      (el: Order) => el.status === "completed" || el.status === "cancelled",
    )
    .map((el: Order) => ({
      ...el,
      createdAt: el.createdAt ? formatDateTime(el.createdAt) : null,
    }));

  const handleDelete = (id: string) => {
    deleteOrder({ id });
  };

  const handleEdit = (id: string) => {
    setIsFormOpen(true);
    setSelectedOrder(null);
    const order = initialData.find((o: Order) => o._id === id);
    if (order) setSelectedOrder(order);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="flex flex-col gap-10">
      {isFormOpen ? (
        <FuncDialog
          open={isFormOpen}
          onCloseForm={handleCloseForm}
          onOpenForm={() => setIsFormOpen(true)}
        >
          {selectedOrder && <OrderItemForm initialData={selectedOrder} />}
        </FuncDialog>
      ) : null}
      <RichTable
        initialData={newOrders}
        mapping={mapping}
        onDelete={(id) => openDeleteDialog(() => handleDelete(id))}
        label="New Orders List"
        onEdit={handleEdit}
      />
      <RichTable
        initialData={pendingOrders}
        mapping={mapping}
        onDelete={(id) => openDeleteDialog(() => handleDelete(id))}
        label="Pending Orders List"
        onEdit={handleEdit}
      />
      <RichTable
        initialData={completedOrders}
        mapping={mapping}
        onDelete={(id) => openDeleteDialog(() => handleDelete(id))}
        label="Completed & Cancelled Orders List"
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Product;
