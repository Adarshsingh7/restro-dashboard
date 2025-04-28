import RichTable from "@/components/RichTable";
import { useDialog } from "@/context/DialogContext";

import { FC, useState } from "react";
import CenteredLoader from "@/ui/CenteredLoader";
import { FuncDialog } from "@/components/FuncDialog";
import MenuItemForm from "@/components/MenuItemForm";
import {
  useAddProduct,
  useDeleteMenuItem,
  useMenu,
  useUpdateMenuItem,
} from "@/features/menuFeatures/useMenu";
import { MenuItem } from "@/types/menuType";

const Product: FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { openDeleteDialog } = useDialog();
  const { addProduct } = useAddProduct();
  const { updateMenuItem } = useUpdateMenuItem();
  const { deleteMenuItem } = useDeleteMenuItem();

  const mapping = [
    { label: "Name", field: "name" },
    { label: "Category", field: "category" },
    { label: "Preparation Time", field: "preparationTime" },
    { label: "Price", field: "price" },
    { label: "Stock", field: "stock" },
  ];

  const { data: initialData, isLoading } = useMenu();
  if (isLoading) return <CenteredLoader />;

  const handleDelete = (id: string) => {
    openDeleteDialog(() => deleteMenuItem({ id }));
  };

  const handleEdit = (id: string) => {
    setIsFormOpen(true);
    if (!initialData) return;
    const selected =
      initialData.find((item: MenuItem) => item._id === id) || null;
    setSelectedItem(selected);
  };

  const handleAdd = (data: Partial<MenuItem>) => {
    addProduct({ data });
  };

  const handleUpdateSubmit = async (data: Partial<MenuItem>) => {
    if (!selectedItem) return;
    await updateMenuItem({ id: selectedItem._id, updatedData: data });
    setIsFormOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-10">
      {isFormOpen ? (
        <FuncDialog
          open={isFormOpen}
          onCloseForm={handleCloseForm}
          onOpenForm={handleOpenForm}
        >
          <MenuItemForm
            initialData={selectedItem}
            onCancel={() => setIsFormOpen(false)}
            onSubmit={handleUpdateSubmit}
          />
        </FuncDialog>
      ) : null}
      {initialData ? (
        <RichTable
          initialData={initialData}
          mapping={mapping}
          onDelete={(id: string) => handleDelete(id)}
          label="Employee List"
          onEdit={handleEdit}
        />
      ) : null}
    </div>
  );
};

export default Product;
