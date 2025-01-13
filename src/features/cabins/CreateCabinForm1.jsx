import {useEditCabin} from "./useEditCabin";
import {useCreateCabin} from "./useCreateCabin";


import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";




function CreateCabinForm({ cabinToEdit = {} ,onModalClose}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  
  
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });


  const { errors } = formState;

  const { isLoading,  createCabin } = useCreateCabin();

  const { isEditing ,editCabin } = useEditCabin();

 


  const isWorking = isEditing || isLoading;

  
  
  function onSubmit(data) {
    console.log("IMAGE",data)
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId },
    {
      onSuccess:(data)=>{
      reset();
    },
  }
    );
    else{ 
    createCabin({ ...data, image:image },
      {
        onSuccess:(data)=>{
          reset();
          onModalClose?.();
        },
      }
    )
    }

  }


  function onError(errors) {
    console.log(errors);
  }



  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onModalClose ?"modal":"regular"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>



      <FormRow label="maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "capacity should be at least 1",
            },
          })}
        />
      </FormRow>



      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
          })}
        />
      </FormRow>



      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than regular price",
          })}
        />
      </FormRow>




      <FormRow
        label="Description for Cabin"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>



      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </FormRow>



      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={()=>onModalClose?.()}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
