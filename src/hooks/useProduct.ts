import { useQuery } from "@tanstack/react-query";

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
        console.log(data);
        return data.data.data;
      } catch (error) {
        console.error("Fetching products failed:", error);
        throw error;
      }
    },
  });

  return { products, isLoading, isError };
};

export { useProducts };
