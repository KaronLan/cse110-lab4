import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {
    try{
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };

        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
    
    } catch (error) {
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
    
 
}

export async function deleteExpense(req: Request, res: Response, db: Database) {
    try{
        const { id } = req.params as {id: string};
        
        if( !id ){
            return res.status(400).send({ error: "Missing id field" });
        }

        await db.run('DELETE FROM expenses WHERE id=(?);', [id])
        res.status(200).send("Deleted: " + id);
    } catch(error){
        res.status(404).send({ error: "Expense not found" });
    }
    
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try{

        const rows = await db.all('SELECT * FROM expenses');
    
        res.status(200).send(rows);

        
    } catch(error){
        res.status(404).send({ error: " db not found" });
    }
}