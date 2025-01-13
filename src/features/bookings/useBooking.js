import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useParams, useSearchParams } from "react-router-dom"

function useBooking() {
    const {bookingId}=useParams();
    console.log(bookingId);
   const {isLoading,data,error}=useQuery({
    queryKey:["booking",bookingId],
    queryFn:()=>getBooking(bookingId),
   });
   return {isLoading,data,error};
}

export default useBooking;
