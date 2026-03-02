import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Testimonial {
    name: string;
    message: string;
    timestamp: bigint;
}
export interface Goal {
    id: bigint;
    title: string;
    isCompleted: boolean;
    goalType: GoalType;
    userId: Principal;
    currentProgress: bigint;
    description: string;
    trophyId?: bigint;
    category: GoalCategory;
    targetValue: bigint;
    completionTimestamp?: bigint;
}
export interface Trophy {
    id: bigint;
    title: string;
    dateEarned?: bigint;
    discountCode?: string;
    userId: Principal;
    description: string;
    imageIdentifier: string;
    discountPercentage?: bigint;
}
export interface Event {
    id: bigint;
    startTime: bigint;
    title: string;
    endTime: bigint;
    description: string;
    location: string;
}
export interface CourseFolder {
    files: Array<CourseFile>;
    folderName: string;
}
export interface MoodEntry {
    mood: Mood;
    timestamp: bigint;
}
export interface ProductSuggestion {
    id: bigint;
    suggestion: string;
    author: Principal;
    timestamp: bigint;
}
export interface CourseFile {
    blob: ExternalBlob;
    fileName: string;
}
export interface JournalEntry {
    id: bigint;
    title: string;
    content: string;
    timestamp: bigint;
}
export interface MeetingLink {
    id: bigint;
    url: string;
    title: string;
    timestamp: bigint;
}
export interface PdfFile {
    id: bigint;
    blob: ExternalBlob;
    name: string;
}
export interface UserProfile {
    couponCode?: string;
    planExpirationTimestamp?: bigint;
    planStartTimestamp?: bigint;
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
export enum GoalCategory {
    breathingTool = "breathingTool",
    moodLog = "moodLog",
    none = "none",
    therapySession = "therapySession",
    groundingTool = "groundingTool",
    groupClass = "groupClass",
    reframingTool = "reframingTool",
    journaling = "journaling"
}
export enum GoalType {
    streak = "streak",
    milestone = "milestone"
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
    addCourseFolder(token: string, folderName: string, files: Array<CourseFile>): Promise<void>;
    addJournalEntry(title: string, content: string): Promise<bigint>;
    addMeetingLink(token: string, title: string, url: string): Promise<void>;
    addMood(mood: Mood): Promise<void>;
    addOrUpdatePromoCode(_token: string, _code: string, _discountPercentage: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    authenticatePlaybookUser(_username: string, _password: string): Promise<boolean>;
    changePlaybookPassword(_token: string, _newPassword: string): Promise<void>;
    checkAndHandleCallerExpiration(): Promise<void>;
    checkAndHandleSystemExpirations(): Promise<void>;
    createEvent(token: string, title: string, description: string, startTime: bigint, endTime: bigint, location: string): Promise<void>;
    createGoal(title: string, description: string, goalType: GoalType, category: GoalCategory, targetValue: bigint, trophyId: bigint | null): Promise<bigint>;
    createTrophyTemplate(title: string, description: string, imageIdentifier: string, discountPercentage: bigint | null): Promise<bigint>;
    deleteEvent(token: string, id: bigint): Promise<boolean>;
    deleteJournalEntry(id: bigint): Promise<boolean>;
    deleteMeetingLink(token: string, id: bigint): Promise<boolean>;
    editEvent(token: string, id: bigint, title: string, description: string, startTime: bigint, endTime: bigint, location: string): Promise<boolean>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCouponCode(): Promise<string | null>;
    getCourseFolder(token: string, folderName: string): Promise<CourseFolder | null>;
    getEvents(): Promise<Array<Event>>;
    getJournalEntries(): Promise<Array<JournalEntry>>;
    getMeetingLinks(): Promise<Array<MeetingLink>>;
    getMoodHistory(): Promise<Array<MoodEntry>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    getUserGoals(user: Principal): Promise<Array<Goal>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserTrophies(user: Principal): Promise<Array<Trophy>>;
    isCallerAdmin(): Promise<boolean>;
    keepTokenActive(token: string): Promise<void>;
    listCourseFolders(): Promise<Array<CourseFolder>>;
    listPdfFiles(): Promise<Array<PdfFile>>;
    listProductSuggestions(): Promise<Array<ProductSuggestion>>;
    logoutPlaybookUser(token: string): Promise<void>;
    recordGroupClassAttendance(): Promise<void>;
    recordPayment(plan: PlanOption): Promise<void>;
    recordTherapySession(): Promise<void>;
    recordToolUsage(toolCategory: GoalCategory): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCouponCode(code: string): Promise<void>;
    savePdfFile(token: string, name: string, blob: ExternalBlob): Promise<void>;
    selectPlan(plan: PlanOption): Promise<void>;
    submitProductSuggestion(suggestion: string): Promise<void>;
    submitTestimonial(name: string, message: string): Promise<void>;
    toggleNewsletterOptIn(optIn: boolean): Promise<void>;
    updateGoalProgress(goalId: bigint, progress: bigint): Promise<void>;
    updateJournalEntry(id: bigint, title: string, content: string): Promise<boolean>;
    validatePlaybookToken(token: string): Promise<boolean>;
}
