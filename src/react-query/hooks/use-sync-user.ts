import { useQuery } from "@tanstack/react-query";
import { syncUserAction } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useSyncUser = () => {
  const router = useRouter();
  const { data, isError } = useQuery({
    queryKey: ["user-welcome-page"],
    queryFn: async () => await syncUserAction(),
    refetchInterval(query) {
      if (query.state.data?.isSynced) return false;
      else return 1000;
    },
  });
  useEffect(() => {
    if (data?.isSynced) router.push("/");
  }, [data, router]);
  return { isError };
};
