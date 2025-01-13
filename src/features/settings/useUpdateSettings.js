import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
   const queryClient=useQueryClient();
   const {isLoading:isUpdating,mutate:update}=useMutation({
       mutationFn:updateSetting,
       onSuccess: () => {
        toast.success("setting updated");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isUpdating,update};


}

export default useUpdateSettings
