import { db } from "./db";
import { 
  dealRequests, vehicleRequests, contactMessages, users,
  type User,
  type DealRequest, type CreateDealRequest, type UpdateDealRequest,
  type VehicleRequest, type CreateVehicleRequest, type UpdateVehicleRequest,
  type ContactMessage, type CreateContactMessage, type UpdateContactMessage 
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  
  // Deal Requests
  getDealRequests(): Promise<DealRequest[]>;
  getDealRequest(id: number): Promise<DealRequest | undefined>;
  createDealRequest(request: CreateDealRequest): Promise<DealRequest>;
  updateDealRequest(id: number, updates: UpdateDealRequest): Promise<DealRequest | undefined>;
  
  // Vehicle Requests
  getVehicleRequests(): Promise<VehicleRequest[]>;
  getVehicleRequest(id: number): Promise<VehicleRequest | undefined>;
  createVehicleRequest(request: CreateVehicleRequest): Promise<VehicleRequest>;
  updateVehicleRequest(id: number, updates: UpdateVehicleRequest): Promise<VehicleRequest | undefined>;

  // Contact Messages
  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: CreateContactMessage): Promise<ContactMessage>;
  updateContactMessage(id: number, updates: UpdateContactMessage): Promise<ContactMessage | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  // Deal Requests
  async getDealRequests(): Promise<DealRequest[]> {
    return await db.select().from(dealRequests).orderBy(desc(dealRequests.createdAt));
  }

  async getDealRequest(id: number): Promise<DealRequest | undefined> {
    const [request] = await db.select().from(dealRequests).where(eq(dealRequests.id, id));
    return request;
  }

  async createDealRequest(request: CreateDealRequest): Promise<DealRequest> {
    const [deal] = await db.insert(dealRequests).values(request).returning();
    return deal;
  }

  async updateDealRequest(id: number, updates: UpdateDealRequest): Promise<DealRequest | undefined> {
    const [updated] = await db.update(dealRequests)
      .set(updates)
      .where(eq(dealRequests.id, id))
      .returning();
    return updated;
  }

  // Vehicle Requests
  async getVehicleRequests(): Promise<VehicleRequest[]> {
    return await db.select().from(vehicleRequests).orderBy(desc(vehicleRequests.createdAt));
  }

  async getVehicleRequest(id: number): Promise<VehicleRequest | undefined> {
    const [request] = await db.select().from(vehicleRequests).where(eq(vehicleRequests.id, id));
    return request;
  }

  async createVehicleRequest(request: CreateVehicleRequest): Promise<VehicleRequest> {
    const [vehicleRequest] = await db.insert(vehicleRequests).values(request).returning();
    return vehicleRequest;
  }

  async updateVehicleRequest(id: number, updates: UpdateVehicleRequest): Promise<VehicleRequest | undefined> {
    const [updated] = await db.update(vehicleRequests)
      .set(updates)
      .where(eq(vehicleRequests.id, id))
      .returning();
    return updated;
  }

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: CreateContactMessage): Promise<ContactMessage> {
    const [msg] = await db.insert(contactMessages).values(message).returning();
    return msg;
  }

  async updateContactMessage(id: number, updates: UpdateContactMessage): Promise<ContactMessage | undefined> {
    const [updated] = await db.update(contactMessages)
      .set(updates)
      .where(eq(contactMessages.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
