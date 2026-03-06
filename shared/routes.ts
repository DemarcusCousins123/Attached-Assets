import { z } from 'zod';
import { 
  dealRequests, vehicleRequests, contactMessages, 
  insertDealRequestSchema, insertVehicleRequestSchema, insertContactMessageSchema 
} from './schema';

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  dealRequests: {
    list: {
      method: 'GET' as const,
      path: '/api/deal-requests' as const,
      responses: { 200: z.array(z.custom<typeof dealRequests.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/deal-requests' as const,
      input: insertDealRequestSchema.extend({
        year: z.coerce.number(),
        mileage: z.coerce.number(),
        price: z.coerce.number(),
      }),
      responses: { 201: z.custom<typeof dealRequests.$inferSelect>(), 400: errorSchemas.validation }
    },
    get: {
      method: 'GET' as const,
      path: '/api/deal-requests/:id' as const,
      responses: { 200: z.custom<typeof dealRequests.$inferSelect>(), 404: errorSchemas.notFound }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/deal-requests/:id' as const,
      input: z.custom<Partial<typeof dealRequests.$inferSelect>>(),
      responses: { 200: z.custom<typeof dealRequests.$inferSelect>(), 404: errorSchemas.notFound }
    }
  },
  vehicleRequests: {
    list: {
      method: 'GET' as const,
      path: '/api/vehicle-requests' as const,
      responses: { 200: z.array(z.custom<typeof vehicleRequests.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/vehicle-requests' as const,
      input: insertVehicleRequestSchema.extend({
        maxMileage: z.coerce.number(),
      }),
      responses: { 201: z.custom<typeof vehicleRequests.$inferSelect>(), 400: errorSchemas.validation }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/vehicle-requests/:id' as const,
      input: z.custom<Partial<typeof vehicleRequests.$inferSelect>>(),
      responses: { 200: z.custom<typeof vehicleRequests.$inferSelect>(), 404: errorSchemas.notFound }
    }
  },
  contactMessages: {
    list: {
      method: 'GET' as const,
      path: '/api/contact-messages' as const,
      responses: { 200: z.array(z.custom<typeof contactMessages.$inferSelect>()) }
    },
    create: {
      method: 'POST' as const,
      path: '/api/contact-messages' as const,
      input: insertContactMessageSchema,
      responses: { 201: z.custom<typeof contactMessages.$inferSelect>(), 400: errorSchemas.validation }
    },
    update: {
      method: 'PUT' as const,
      path: '/api/contact-messages/:id' as const,
      input: z.custom<Partial<typeof contactMessages.$inferSelect>>(),
      responses: { 200: z.custom<typeof contactMessages.$inferSelect>(), 404: errorSchemas.notFound }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
