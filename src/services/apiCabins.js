import supabase, {supabaseUrl}from "./supabase";

export async function getCabins(){
    
let { data, error } = await supabase
.from('cabins').select('*')


  if(error){
    console.error(error)
    throw new Error("cabins could not be loaded")
  }
  return data;


}

export async function createEditCabin(newCabin,id=newCabin.id){
  console.log(id,'id');
  console.log("newCabin",newCabin);
  
  const hasImagePath=newCabin.image?.startsWith?.(supabaseUrl);
  const imageName=`${newCabin.image.name}`;
 const imagePath=hasImagePath?newCabin.image:`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
 console.log(newCabin.image.name);

 let query=supabase.from('cabins');
if(!id){ 
  query=query.insert([{...newCabin,image:imagePath}])
  console.log("no id");

}

if(id)query= query.update({ ...newCabin,image:imagePath })
  .eq('id', id);

const {data,error}= await query.select();
  if(error){
      console.error(error);
     
}
if(hasImagePath) return data;
const {error:storageError, } = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
  } 
  

return data;

}
export async function deleteCabin(id){
    const {data,error}=await supabase.from("cabins").delete().eq('id',id);

    if(error){
        console.error(error);
        throw new Error("cabin could not be deleted")
    }
}