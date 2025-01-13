import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
    const queryClient=useQueryClient();
    const {isLoading,mutate:removeBooking} = useMutation({
      mutationFn:(id)=>deleteBooking(id),
      onSuccess:()=>{
        toast.success('booking sucessfully deleted');
        queryClient.invalidateQueries({active:true});
    },

      onError:err=>toast.error(err.message),
  
    })
    return {isLoading,removeBooking};
    

}

export default useDeleteBooking