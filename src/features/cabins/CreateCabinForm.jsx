import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { hashQueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {
  const {register,handleSubmit,reset,getValues,formState}=useForm();
  const {errors}=formState;
  const queryClient=useQueryClient();
  const {isLoading,mutate}=useMutation({
    mutationFn:(newCabin)=>createCabin(newCabin),
    onSuccess:()=>{toast.success("new query created")
      
    
      queryClient.invalidateQueries({hashQueryKey:["cabins"]})
    
    reset();
    onModal
  
  
  },
    onError:(err)=>toast.error(err.message),

  })
  function onSubmit(data){
    mutate({...data,image:data.image[0]});
  };
  function onError(errors){
    console.log(errors)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" disabled={isLoading} id="name" {...register('name',{
          required:'this field is required',
        })} />
      </FormRow>

      <FormRow label='maximum capacity'  error={errors?.maxCapacity?.message}>
        
        <Input type="number" id="maxCapacity" disabled={isLoading} {...register("maxCapacity",{
          required:'this field is required',
          min:{
            value:1,
            message:'capacity should be at least 1',
          }
})} />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
       
        <Input type="number" id="regularPrice" disabled={isLoading}{...register("regularPrice",{
          required:'this field is required',
})} />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
       
        <Input type="number" id="discount" disabled={isLoading} defaultValue={0} {...register("discount",{
          required:'this field is required',
          validate:(value)=>value>=getValues().regularPrice||'discount should be less than regular price'
})}/>
      </FormRow>

      <FormRow label='Description for Cabin' error={errors?.description?.message}>
        
        <Textarea type="number" id="description" disabled={isLoading}defaultValue="" {...register("description",{
          required:'this field is required',
})} />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
     
        <FileInput disabled={isLoading} id="image" accept="image/*"  {...register('image',{
          required:'this field is required',
})} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
