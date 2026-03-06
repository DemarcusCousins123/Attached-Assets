import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useVehicleRequests() {
  return useQuery({
    queryKey: [api.vehicleRequests.list.path],
    queryFn: async () => {
      const res = await fetch(api.vehicleRequests.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch vehicle requests");
      return api.vehicleRequests.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateVehicleRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.vehicleRequests.create.input>) => {
      const validated = api.vehicleRequests.create.input.parse(data);
      const res = await fetch(api.vehicleRequests.create.path, {
        method: api.vehicleRequests.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create vehicle request");
      }
      return api.vehicleRequests.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.vehicleRequests.list.path] });
    },
  });
}

export function useUpdateVehicleRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<z.infer<typeof api.vehicleRequests.create.input> & { status: string }>) => {
      const url = buildUrl(api.vehicleRequests.update.path, { id });
      const res = await fetch(url, {
        method: api.vehicleRequests.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update vehicle request");
      return api.vehicleRequests.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.vehicleRequests.list.path] });
    },
  });
}
