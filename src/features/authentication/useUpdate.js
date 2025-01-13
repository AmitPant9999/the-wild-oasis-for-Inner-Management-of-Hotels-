import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdate() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn:updateCurrentUser,
    onSuccess: (user) => {
      toast.success("user account successfully updated");
     queryClient.setQueryData(["user"],user); 
    
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser,isLoading  };
}
