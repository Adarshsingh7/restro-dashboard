import { MenuItemFormValues } from "@/components/MenuItemForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://oyster-app-s59tr.ondigitalocean.app/api/v1/menus",
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data.data;
      } catch (error) {
        console.error("Fetching products failed:", error);
        throw error;
      }
    },
  });

  return { products, isLoading, isError };
};

const useAddProduct = () => {
  const querClient = useQueryClient();
  const {
    mutate: addProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (newProduct: MenuItemFormValues) => {
      try {
        const response = await fetch(
          "https://oyster-app-s59tr.ondigitalocean.app/api/v1/menus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to add product");
        }
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Adding product failed:", error);
        throw error;
      }
    },
    onSuccess: () => {
      querClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { addProduct, isPending, isError };
};

const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async ({
      id,
      updatedProduct,
    }: {
      id: string;
      updatedProduct: MenuItemFormValues;
    }) => {
      try {
        const response = await fetch(
          `https://oyster-app-s59tr.ondigitalocean.app/api/v1/menus/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        const data = await response.json();
        return data.data;
      } catch (error) {
        console.error("Updating product failed:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProduct, isPending, isError };
};

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(
          `https://oyster-app-s59tr.ondigitalocean.app/api/v1/menus/${id}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        console.error("Deleting product failed:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { deleteProduct, isPending, isError };
};

export { useProducts, useAddProduct, useUpdateProduct, useDeleteProduct };
