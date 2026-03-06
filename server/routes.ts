import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Simple mock deal analyzer logic to generate a score and evaluation
function analyzeDeal(price: number, year: number, mileage: number) {
  // Mock logic: randomly decide if it's good based on a base score of 50
  const score = Math.floor(Math.random() * 50) + 50; 
  const estimatedMin = Math.floor(price * 0.9);
  const estimatedMax = Math.floor(price * 1.1);
  let recommendation = "Fair Price";
  
  if (score >= 85) recommendation = "Great Deal";
  else if (score < 70) recommendation = "Slightly Overpriced";
  if (score < 60) recommendation = "Overpriced";

  return { score, estimatedMin, estimatedMax, recommendation };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Deal Requests
  app.get(api.dealRequests.list.path, async (req, res) => {
    const requests = await storage.getDealRequests();
    res.json(requests);
  });

  app.post(api.dealRequests.create.path, async (req, res) => {
    try {
      const input = api.dealRequests.create.input.parse(req.body);
      
      // Perform automated analysis on submission
      const analysis = analyzeDeal(input.price, input.year, input.mileage);
      
      const newRequest = await storage.createDealRequest({
        ...input,
        ...analysis,
      } as any); // Cast as any because the types might differ slightly until db push

      res.status(201).json(newRequest);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.dealRequests.get.path, async (req, res) => {
    const request = await storage.getDealRequest(Number(req.params.id));
    if (!request) return res.status(404).json({ message: 'Not found' });
    res.json(request);
  });

  app.put(api.dealRequests.update.path, async (req, res) => {
    try {
      const input = api.dealRequests.update.input.parse(req.body);
      const updated = await storage.updateDealRequest(Number(req.params.id), input);
      if (!updated) return res.status(404).json({ message: 'Not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Validation error" });
    }
  });

  // Vehicle Requests
  app.get(api.vehicleRequests.list.path, async (req, res) => {
    const requests = await storage.getVehicleRequests();
    res.json(requests);
  });

  app.post(api.vehicleRequests.create.path, async (req, res) => {
    try {
      const input = api.vehicleRequests.create.input.parse(req.body);
      const newRequest = await storage.createVehicleRequest(input);
      res.status(201).json(newRequest);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put(api.vehicleRequests.update.path, async (req, res) => {
    try {
      const input = api.vehicleRequests.update.input.parse(req.body);
      const updated = await storage.updateVehicleRequest(Number(req.params.id), input);
      if (!updated) return res.status(404).json({ message: 'Not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Validation error" });
    }
  });

  // Contact Messages
  app.get(api.contactMessages.list.path, async (req, res) => {
    const messages = await storage.getContactMessages();
    res.json(messages);
  });

  app.post(api.contactMessages.create.path, async (req, res) => {
    try {
      const input = api.contactMessages.create.input.parse(req.body);
      const newMessage = await storage.createContactMessage(input);
      res.status(201).json(newMessage);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put(api.contactMessages.update.path, async (req, res) => {
    try {
      const input = api.contactMessages.update.input.parse(req.body);
      const updated = await storage.updateContactMessage(Number(req.params.id), input);
      if (!updated) return res.status(404).json({ message: 'Not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: "Validation error" });
    }
  });

  // Seed DB after routes are setup if needed
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingDeals = await storage.getDealRequests();
  if (existingDeals.length === 0) {
    // Add seed data
    await storage.createDealRequest({
      make: "Toyota",
      model: "Camry",
      year: 2021,
      mileage: 45000,
      price: 21000,
      location: "San Francisco, CA",
    });
    
    await storage.createVehicleRequest({
      budgetRange: "$20k - $25k",
      preferredMakeModel: "Honda RAV4 or similar",
      vehicleType: "SUV",
      maxMileage: 60000,
      yearRange: "2019 - 2022",
      location: "Los Angeles, CA",
      notes: "Looking for a reliable family SUV.",
    });

    await storage.createContactMessage({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Premium Advisory Details",
      message: "I am interested in your premium package, can you give me more details?",
    });
    
    console.log("Seeded database with initial data.");
  }
}
