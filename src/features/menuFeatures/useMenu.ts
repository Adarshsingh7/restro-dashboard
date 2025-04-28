import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MenuItem } from "../../types/menuType";
import { menu } from "./menuFeatures";
import { toast } from "sonner";

const useMenu = () => {
  const { data, isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ["menuItem"],
    queryFn: menu.getAllMenu,
  });
  return { data, isLoading, error };
};

const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: ({
      id,
      updatedData,
    }: {
      id: string;
      updatedData: Partial<MenuItem>;
    }) => menu.updateMenu(id, updatedData),
    onSuccess: () => {
      toast.success("MenuItem updated successfully");
      queryClient.invalidateQueries(["menuItem"]);
      // Handle success
    },
    onError: (error: unknown) => {
      // Handle error
      console.log(error);
      toast.error("Failed to update menu");
    },
  });

  return {
    updateMenuItem: mutateAsync,
  };
};

const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: ({ id }: { id: string }) => menu.deleteMenu(id),
    onSuccess: () => {
      toast.success("MenuItem deleted successfully");
      queryClient.invalidateQueries(["menuItem"]);
      // Handle success
    },
    onError: (error: unknown) => {
      // Handle error
      console.log(error);
      toast.error("Failed to delete menu");
    },
  });

  return {
    deleteMenuItem: mutateAsync,
  };
};

const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: ({ data }: { data: Partial<MenuItem> }) =>
      menu.createMenu(data),
    onSuccess: () => {
      toast.success("Product added successfully");
      queryClient.invalidateQueries(["menuItem"]);
      // Handle success
    },
    onError: (error: unknown) => {
      // Handle error
      console.log(error);
      toast.error("Failed to add product");
    },
  });

  return {
    addProduct: mutateAsync,
  };
};

export { useUpdateMenuItem, useMenu, useDeleteMenuItem, useAddProduct };
