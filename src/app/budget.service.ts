import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Budget } from './budget';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  // define BehaviorSubject & init default value
  private budgetState = new BehaviorSubject<Budget>({
    total: 0,
    baseUsed: 0,
    used: 0,
    balance: 0,
  });

  readonly url = 'http://localhost:3000/budget';

  constructor(private httpClient: HttpClient) {
    // init total from API
    this.httpClient
      .get<{ total: number }>(this.url)
      .subscribe((v) =>
        this.budgetState.next({ ...this.budgetState.value, total: v.total })
      );
  }

  getBudgetState(): Observable<Budget> {
    return this.budgetState.asObservable();
  }

  setUsed(useBudget: number): void {
    // new obj with new value
    // then next value to state
    const currentBudget: Budget = {
      ...this.budgetState.value,
      used: useBudget,
      balance: this.budgetState.value.total - this.budgetState.value.baseUsed - this.budgetState.value.used,
    };
    this.budgetState.next(currentBudget);
  }


  setBaseUsedBudgetPercent(percent: number): void {
    // new obj with new value
    // then next value to state
    const currentBudget: Budget = {
      ...this.budgetState.value,
      baseUsed: (this.budgetState.value.total * percent) / 100,
      balance: this.budgetState.value.total - (this.budgetState.value.total * percent) / 100 - this.budgetState.value.used,
    };
    this.budgetState.next(currentBudget);
  }
}
