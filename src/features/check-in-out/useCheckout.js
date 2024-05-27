import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout() {
  const queryCLient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} succesfully checked out`);
      queryCLient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkout, isCheckingout };
}
