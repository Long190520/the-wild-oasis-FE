import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../../services/apiAuth";

export function useNotifications() {
  const {
    isLoading,
    data: notifications,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return { isLoading, notifications, error };
}
