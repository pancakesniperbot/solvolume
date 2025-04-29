import { 
  users, type User, type InsertUser,
  plans, type Plan, type InsertPlan,
  subscriptions, type Subscription, type InsertSubscription,
  botCampaigns, type BotCampaign, type InsertBotCampaign,
  referrals, type Referral, type InsertReferral
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Plan methods
  getPlan(id: number): Promise<Plan | undefined>;
  getAllPlans(): Promise<Plan[]>;
  createPlan(plan: InsertPlan): Promise<Plan>;
  updatePlan(id: number, updates: Partial<InsertPlan>): Promise<Plan | undefined>;
  
  // Subscription methods
  getSubscription(id: number): Promise<Subscription | undefined>;
  getUserSubscriptions(userId: number): Promise<Subscription[]>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, updates: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  
  // Bot Campaign methods
  getBotCampaign(id: number): Promise<BotCampaign | undefined>;
  getUserBotCampaigns(userId: number): Promise<BotCampaign[]>;
  createBotCampaign(campaign: InsertBotCampaign): Promise<BotCampaign>;
  updateBotCampaign(id: number, updates: Partial<InsertBotCampaign>): Promise<BotCampaign | undefined>;
  
  // Referral methods
  getReferral(id: number): Promise<Referral | undefined>;
  getUserReferrals(userId: number): Promise<Referral[]>;
  createReferral(referral: InsertReferral): Promise<Referral>;
  updateReferral(id: number, updates: Partial<InsertReferral>): Promise<Referral | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }
  
  // Plan methods
  async getPlan(id: number): Promise<Plan | undefined> {
    const [plan] = await db.select().from(plans).where(eq(plans.id, id));
    return plan;
  }
  
  async getAllPlans(): Promise<Plan[]> {
    return db.select().from(plans);
  }
  
  async createPlan(insertPlan: InsertPlan): Promise<Plan> {
    // Ensure features is an array if it exists
    const planData = {
      ...insertPlan,
      features: Array.isArray(insertPlan.features) ? insertPlan.features : []
    };
    
    const [plan] = await db
      .insert(plans)
      .values(planData)
      .returning();
    return plan;
  }
  
  async updatePlan(id: number, updates: Partial<InsertPlan>): Promise<Plan | undefined> {
    // Handle features array properly if it exists in updates
    const updateData = { ...updates };
    
    if ('features' in updateData) {
      updateData.features = Array.isArray(updateData.features) ? updateData.features : [];
    }
    
    const [updatedPlan] = await db
      .update(plans)
      .set(updateData as any) // Type cast needed due to complex update
      .where(eq(plans.id, id))
      .returning();
    return updatedPlan;
  }
  
  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
    return subscription;
  }
  
  async getUserSubscriptions(userId: number): Promise<Subscription[]> {
    return db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
  }
  
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }
  
  async updateSubscription(id: number, updates: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const [updatedSubscription] = await db
      .update(subscriptions)
      .set(updates)
      .where(eq(subscriptions.id, id))
      .returning();
    return updatedSubscription;
  }
  
  // Bot Campaign methods
  async getBotCampaign(id: number): Promise<BotCampaign | undefined> {
    const [campaign] = await db.select().from(botCampaigns).where(eq(botCampaigns.id, id));
    return campaign;
  }
  
  async getUserBotCampaigns(userId: number): Promise<BotCampaign[]> {
    return db.select().from(botCampaigns)
      .where(eq(botCampaigns.userId, userId))
      .orderBy(desc(botCampaigns.createdAt));
  }
  
  async createBotCampaign(insertCampaign: InsertBotCampaign): Promise<BotCampaign> {
    // Handle settings object properly
    const campaignData = {
      ...insertCampaign,
      settings: insertCampaign.settings || null
    };
    
    const [campaign] = await db
      .insert(botCampaigns)
      .values(campaignData as any) // Type cast needed due to complex structure
      .returning();
    return campaign;
  }
  
  async updateBotCampaign(id: number, updates: Partial<InsertBotCampaign>): Promise<BotCampaign | undefined> {
    // Handle settings object properly if it exists in updates
    const updateData = { ...updates };
    
    if ('settings' in updateData) {
      // Ensure settings is properly formatted or null
      updateData.settings = updateData.settings || null;
    }
    
    const [updatedCampaign] = await db
      .update(botCampaigns)
      .set(updateData as any) // Type cast needed due to complex structure
      .where(eq(botCampaigns.id, id))
      .returning();
    return updatedCampaign;
  }
  
  // Referral methods
  async getReferral(id: number): Promise<Referral | undefined> {
    const [referral] = await db.select().from(referrals).where(eq(referrals.id, id));
    return referral;
  }
  
  async getUserReferrals(userId: number): Promise<Referral[]> {
    return db.select().from(referrals).where(eq(referrals.referrerId, userId));
  }
  
  async createReferral(insertReferral: InsertReferral): Promise<Referral> {
    const [referral] = await db
      .insert(referrals)
      .values(insertReferral)
      .returning();
    return referral;
  }
  
  async updateReferral(id: number, updates: Partial<InsertReferral>): Promise<Referral | undefined> {
    const [updatedReferral] = await db
      .update(referrals)
      .set(updates)
      .where(eq(referrals.id, id))
      .returning();
    return updatedReferral;
  }
}

export const storage = new DatabaseStorage();
