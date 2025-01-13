import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login as loginApi} from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const navigate=useNavigate();
    const queryClient=useQueryClient();
    const {mutate:login,isLoading}=useMutation({
        mutationFn:({email,password})=>loginApi({email,password}),

        onSuccess:(user)=>{
            queryClient.setQueryData(['user'], user.user);
            navigate("/dashboard",{replace:true});
            
        },
        onError:(error)=>toast.error("wrong email and password"),
        
    });
    return {login,isLoading};
}