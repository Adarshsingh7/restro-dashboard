import { useQuery } from "@tanstack/react-query";

const useOrders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://oyster-app-s59tr.ondigitalocean.app/api/v1/orders",
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

  return { orders, isLoading, isError };
};

export { useOrders };
