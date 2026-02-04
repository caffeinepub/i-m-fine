import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    name: string;
    message: string;
    timestamp: bigint;
}
export type Time = bigint;
export interface JournalEntry {
    id: bigint;
    title: string;
    content: string;
    timestamp: Time;
}
export interface UserProfile {
    planExpirationTimestamp?: Time;
    planStartTimestamp?: Time;
    dateOfBirth?: string;
    city?: string;
    newsletterOptIn: boolean;
    name: string;
    isActive: boolean;
    email?: string;
    state?: string;
    phone?: string;
    selectedPlan: PlanOption;
}
export interface MoodEntry {
    mood: Mood;
    timestamp: Time;
}
export enum Mood {
    sad = "sad",
    happy = "happy",
    neutral = "neutral"
}
export enum PlanOption {
    premierYearly = "premierYearly",
    premierMonthly = "premierMonthly",
    basicSixMonth = "basicSixMonth",
    premierSixMonth = "premierSixMonth",
    free = "free",
    basicYearly = "basicYearly",
    basicMonthly = "basicMonthly"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addJournalEntry(title: string, content: string): Promise<bigint>;
    addMood(mood: Mood): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkAndHandleExpirations(): Promise<void>;
    deleteJournalEntry(id: bigint): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getJournalEntries(): Promise<Array<JournalEntry>>;
    getMoodHistory(): Promise<Array<MoodEntry>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordPayment(plan: PlanOption): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    selectPlan(plan: PlanOption): Promise<void>;
    submitTestimonial(name: string, message: string): Promise<void>;
    toggleNewsletterOptIn(optIn: boolean): Promise<void>;
    updateJournalEntry(id: bigint, title: string, content: string): Promise<boolean>;
}
