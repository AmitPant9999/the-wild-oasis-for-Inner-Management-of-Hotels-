import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner"
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import {useCabins} from "../cabins/useCabins"
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const{bookings,isLoading:isLoading1}=useRecentBookings();
  const {stays,confirmedStays,isLoading:isLoading2,numdays}=useRecentStays();
  const {cabins,isLoading:isLoading3}=useCabins();
  if(isLoading1||isLoading2||isLoading3) return <Spinner/>
  console.log(bookings);
  return (
   <StyledDashboardLayout>
    <Stats  cabinCount={cabins.length} bookings={bookings} confirmedStays={confirmedStays} numDays={numdays}/>
    <TodayActivity/>
    <DurationChart confirmedStays={confirmedStays}/>

    <SalesChart bookings={bookings} numDays={numdays}/>

   </StyledDashboardLayout>
  )
}

export default DashboardLayout
