import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Budget } from './budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetState = new BehaviorSubject<Budget>({ total: 1000000, used: 0, balance: 0 })

  constructor() { }

  getBudgetState(): Observable<Budget> {
    return this.budgetState.asObservable();
  }

  add(amount: number): void {
    const currentBudget = {
      ...this.budgetState.value,
      used: this.budgetState.value.used + amount,
      balance: this.budgetState.value.total - amount,
    }
    this.budgetState.next(currentBudget)
  }

  remove(amount: number): void {
    const currentBudget = {
      ...this.budgetState.value,
      used: this.budgetState.value.used - amount,
      balance: this.budgetState.value.total + amount,
    }
    this.budgetState.next(currentBudget)
  }

}
