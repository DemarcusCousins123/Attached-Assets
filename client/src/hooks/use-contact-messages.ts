import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useContactMessages() {
  return useQuery({
    queryKey: [api.contactMessages.list.path],
    queryFn: async () => {
      const res = await fetch(api.contactMessages.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch contact messages");
      return api.contactMessages.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateContactMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.contactMessages.create.input>) => {
      const validated = api.contactMessages.create.input.parse(data);
      const res = await fetch(api.contactMessages.create.path, {
        method: api.contactMessages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create contact message");
      }
      return api.contactMessages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.contactMessages.list.path] });
    },
  });
}

export function useUpdateContactMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Partial<z.infer<typeof api.contactMessages.create.input> & { status: string }>) => {
      const url = buildUrl(api.contactMessages.update.path, { id });
      const res = await fetch(url, {
        method: api.contactMessages.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update contact message");
      return api.contactMessages.update.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.contactMessages.list.path] });
    },
  });
}
