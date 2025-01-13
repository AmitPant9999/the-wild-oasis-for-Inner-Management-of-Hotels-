import { useMutation } from "@tanstack/react-query"
import {signup as signupapi} from "../../services/apiAuth"
import toast from "react-hot-toast";
function useSignup() {
    const {mutate:signup,isLoading}=useMutation({
        mutationFn:signupapi,
        onSuccess:(data)=>{
           
            toast.success("Account sucessfully created! please verify the new accountform the users email adress")
        }
    });
    return {signup,isLoading};
}

export default useSignup
