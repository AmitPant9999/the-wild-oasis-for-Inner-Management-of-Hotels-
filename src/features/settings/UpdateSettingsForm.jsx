
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import useSettings from './useSettings';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
  const {isLoading,settings:{minimunBookingLength,maxBookingLength,maxGuestPerBooking,breakFastPrice}={}}=useSettings();
  const {isUpdating,update}=useUpdateSettings();
  
  if(isLoading)<Spinner/>;
  function handleUpdate(e,field){
    const {value}=e.target;
    if(!value)return;
    update({[field]:value});
  }

  return (
    <Form>
       <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' disabled={isUpdating} defaultValue={minimunBookingLength} onBlur={(e)=>handleUpdate(e,'minimunBookingLength')}  />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights'defaultValue={maxBookingLength} onBlur={(e)=>handleUpdate(e,'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests'defaultValue={maxGuestPerBooking} onBlur={(e)=>handleUpdate(e,'maxGuestPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakFastPrice} onBlur={(e)=>handleUpdate(e,'breakFastPrice')}/>
      </FormRow>

    </Form>
  );
}

export default UpdateSettingsForm;
