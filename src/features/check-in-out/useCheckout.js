import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast";

function useCheckout() {
    const queryClient=useQueryClient();
   const {mutate:checkout,isLoading:checkingOut}=useMutation({
    mutationFn:(bookingId)=>updateBooking(bookingId,{
        status:"checked-out",
    }),
    onSuccess:(data)=>{
        toast.success(`Booking with ${data.id} sucessfully checked out`);
        queryClient.invalidateQueries({active:true});
    },
    onError:()=>toast.error('there was a problem in checking out')
        
    })
    return {checkout,checkingOut};

}

export default useCheckout
