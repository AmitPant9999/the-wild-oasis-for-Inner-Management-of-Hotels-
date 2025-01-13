import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {getBookingsAfterDate, getStaysAfterDate} from "../../services/apiBookings"

export function useRecentStays() {
   const [searchParams]=useSearchParams();
   const numdays=!searchParams.get('last')?7:Number(searchParams.get("last"));
   const queryDate=subDays(new Date(),numdays).toISOString();

   const {isLoading,data:stays}=useQuery({
    queryFn:()=>getStaysAfterDate(queryDate),
    queryKey:["stays",`last-${numdays}`],
   })
   const confirmedStays=stays?.filter((stay)=>stay.status==="checked-in"||stay.status==="checked-out")
   return {isLoading,stays,confirmedStays,numdays};
}


