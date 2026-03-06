import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useDealRequests() {
  return useQuery({
    queryKey: [api.dealRequests.list.path],
    queryFn: async () => {
      const res = await fetch(api.dealRequests.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch deal requests");
      return api.dealRequests.list.responses[200].parse(await res.json());
    },
  });
}

export function useDealRequest(id: number) {
  return useQuery({
    queryKey: [api.dealRequests.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.dealRequests.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch deal request");
      return api.dealRequests.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateDealRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.dealRequests.create.input>) => {
      const validated = api.dealRequests.create.input.parse(data);
      const res = await fetch(api.dealRequests.create.path, {
        method: api.dealRequests.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create deal request");
      }
      return api.dealRequests.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dealRequests.list.path] });
    },
  });
}

export function useUpdateDealRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<z.infer<typeof api.dealRequests.create.input> & { status: string, score: number, recommendation: string }>) => {
      const url = buildUrl(api.dealRequests.update.path, { id });
      const res = await fetch(url, {
        method: api.dealRequests.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update deal request");
      return api.dealRequests.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dealRequests.list.path] });
    },
  });
}
