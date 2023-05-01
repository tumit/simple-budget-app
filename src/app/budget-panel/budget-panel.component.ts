import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'wts-budget-panel',
  templateUrl: './budget-panel.component.html',
  styleUrls: ['./budget-panel.component.css'],
})
export class BudgetPanelComponent implements OnInit {
  // $ at the end of variable name is just convention to
  // know it is Observable
  budgetState$!: Observable<Budget>;

  baseUsedBudget = new FormControl(0, { nonNullable: true });

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    // get Observable of budgetState
    this.budgetState$ = this.budgetService.getBudgetState();

    // on value change
    this.baseUsedBudget.valueChanges.subscribe((v) =>
      this.budgetService.setBaseUsedBudgetPercent(v)
    );
  }
}
