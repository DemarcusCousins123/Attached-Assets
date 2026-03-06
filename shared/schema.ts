import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const dealRequests = pgTable("deal_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  mileage: integer("mileage").notNull(),
  price: integer("price").notNull(),
  location: text("location").notNull(),
  url: text("url"),
  score: integer("score"),
  estimatedValueMin: integer("estimated_value_min"),
  estimatedValueMax: integer("estimated_value_max"),
  recommendation: text("recommendation"),
  status: text("status").default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehicleRequests = pgTable("vehicle_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  budgetRange: text("budget_range").notNull(),
  preferredMakeModel: text("preferred_make_model").notNull(),
  vehicleType: text("vehicle_type").notNull(),
  maxMileage: integer("max_mileage").notNull(),
  yearRange: text("year_range").notNull(),
  location: text("location").notNull(),
  notes: text("notes"),
  status: text("status").default('pending'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").default('new'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDealRequestSchema = createInsertSchema(dealRequests).omit({ 
  id: true, createdAt: true, score: true, estimatedValueMin: true, estimatedValueMax: true, recommendation: true, status: true 
});
export const insertVehicleRequestSchema = createInsertSchema(vehicleRequests).omit({ 
  id: true, createdAt: true, status: true 
});
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ 
  id: true, createdAt: true, status: true 
});

export type User = typeof users.$inferSelect;
export type DealRequest = typeof dealRequests.$inferSelect;
export type VehicleRequest = typeof vehicleRequests.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type CreateDealRequest = z.infer<typeof insertDealRequestSchema>;
export type UpdateDealRequest = Partial<typeof dealRequests.$inferSelect>;

export type CreateVehicleRequest = z.infer<typeof insertVehicleRequestSchema>;
export type UpdateVehicleRequest = Partial<typeof vehicleRequests.$inferSelect>;

export type CreateContactMessage = z.infer<typeof insertContactMessageSchema>;
export type UpdateContactMessage = Partial<typeof contactMessages.$inferSelect>;
