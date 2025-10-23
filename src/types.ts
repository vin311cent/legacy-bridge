export interface BookRecord {
    ISBN: string;
    Title: string;
    Author: string;
    PublishedYear: number; 
    Copies: number;        
    sourceFile?: string;   
}