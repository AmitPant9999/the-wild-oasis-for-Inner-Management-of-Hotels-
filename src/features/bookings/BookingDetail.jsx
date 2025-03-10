import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner"

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {isLoading:deletingBooking,removeBooking}=useDeleteBooking();
  const {checkout,checkingOut}=useCheckout();
  const navigate=useNavigate();
  const {data:booking,isLoading}=useBooking();
  

  const moveBack = useMoveBack();


  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if(isLoading) return <Spinner/>
  const {status,id:bookingId}=booking;
  function handleCheckout(){
    checkout(bookingId);
  }
  function handleDeleteBooking(){
    removeBooking(bookingId);
    navigate("/");
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

  <BookingDataBox booking={booking} /> 

      <ButtonGroup>
         {status==="unconfirmed" && <Button
          onClick={()=>navigate(`/checkin/${bookingId}`)}  
          >CheckIn
        </Button>}
         {status==="checked-in" && <Button
                onClick={()=>handleCheckout()}
                  disabled={checkingOut}
          >checkout
        </Button>}
        <Modal>

        <Modal.Open opens="delete">
                  <Button> delete</Button>
                </Modal.Open>
               
          <Modal.Window
                name="delete">
                <ConfirmDelete resourceName="bookings"
                disabled={deletingBooking}
                onConfirm={handleDeleteBooking}
                />
                </Modal.Window>

        </Modal>
          
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
