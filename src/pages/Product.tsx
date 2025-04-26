import RichTable from "@/components/RichTable";
import { useDialog } from "@/context/DialogContext";

import { FC, useState } from "react";
import {
  useProducts,
  useAddProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../hooks/useProduct";
import CenteredLoader from "@/ui/loader";
import { FuncDialog } from "@/components/FuncDialog";
import MenuItemForm, { MenuItemFormValues } from "@/components/MenuItemForm";

const Product: FC = () => {
  const { openDeleteDialog } = useDialog();
  const { addProduct, isPending } = useAddProduct();
  const { updateProduct, isPending: isEditing } = useUpdateProduct();
  const { deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const mapping = [
    { label: "Name", field: "name" },
    { label: "Category", field: "category" },
    { label: "Preparation Time", field: "preparationTime" },
    { label: "Price", field: "price" },
    { label: "Stock", field: "stock" },
  ];
  //
  const { products: initialData, isLoading } = useProducts();
  if (isLoading || isPending || isDeleting || isEditing)
    return <CenteredLoader />;

  const handleDelete = (id: string) => {
    openDeleteDialog({
      title: "Delete Product",
      description: "Are you sure you want to delete this product?",
      onConfirm: () => deleteProduct(id),
    });
  };

  const handleEdit = (id: string, updatedProduct: MenuItemFormValues) => {
    setIsFormOpen(true);
    updateProduct(
      { id, updatedProduct },
      {
        onSuccess: () => setIsFormOpen(false),
      },
    );
  };

  const handleAdd = (data: MenuItemFormValues) => {
    addProduct(data, {
      onSuccess: () => setIsFormOpen(false),
    });
  };

  return (
    <div className="flex flex-col gap-10">
      {isFormOpen ? (
        <FuncDialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <MenuItemForm
            onCancel={() => setIsFormOpen(false)}
            onSubmit={handleAdd}
          />
        </FuncDialog>
      ) : null}
      <RichTable
        initialData={initialData}
        mapping={mapping}
        onDelete={() => openDeleteDialog(handleDelete)}
        label="Employee List"
        onOpen={() => setIsFormOpen(true)}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Product;
