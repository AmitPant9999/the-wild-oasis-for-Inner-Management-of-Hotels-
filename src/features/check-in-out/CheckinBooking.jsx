import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";

import useSettings from "../settings/useSettings"
import toast from "react-hot-toast";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [addBreakfast,setAddBreakfast]=useState(false);
  const {checkin,isCheckingIn}=useCheckin();
  const [confirmPaid,setConfirmaid]=useState(false);
  const {data:booking,isLoading}=useBooking();
  const moveBack = useMoveBack();
  const {settings,isLoading:isLoadingSettings}=useSettings();

  useEffect(()=>setConfirmaid(booking?.isPaid ?? false),[booking])
  






  if(isLoading || isLoadingSettings) return <Spinner/>; 
  console.log(booking);
  
  const {
    id:bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  const optionalBreakfastPrice=settings.breakFastPrice*numNights*numGuests;

  function handleCheckin() {
    if(!confirmPaid)return;
      
    if(addBreakfast){
      checkin({bookingId,breafast:{
        hasBreakfast:true,
        extrasPrice:optionalBreakfastPrice,
        totalPrice:totalPrice+optionalBreakfastPrice,

      }})


    }
    else{
    checkin({bookingId,breakfast:{}});}

  }
 

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

    <BookingDataBox booking={booking} /> 
    { !hasBreakfast && <Box>
    <Checkbox checked={addBreakfast} onChange={()=>{
      setAddBreakfast((add)=>!add)
      setConfirmaid(false);
    
    }

    }>
      want to add BreakFast for {formatCurrency(optionalBreakfastPrice)}? 
    </Checkbox>
    </Box>}
    <Box>
      <Checkbox checked={confirmPaid} onChange={()=>setConfirmaid((confirm)=>!confirm)}
        id="confirm" disabled={confirmPaid || isCheckingIn}>
        I confirm that {guests.fullname} has paid the total ammount of {!addBreakfast? formatCurrency(totalPrice):`${formatCurrency(totalPrice+optionalBreakfastPrice)} + (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
      </Checkbox>
    </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
