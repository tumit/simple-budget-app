import { Component } from '@angular/core';
import { Requirement } from '../requirement';
import { RequirementService } from '../requirement.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-requirement-approval',
  templateUrl: './requirement-approval.component.html',
  styleUrls: ['./requirement-approval.component.css'],
})
export class RequirementApprovalComponent {
  requirements: Requirement[] = [];

  budgetState$!: Observable<Budget>;

  constructor(
    private requirementService: RequirementService,
    private budgetService: BudgetService
  ) {}

  ngOnInit(): void {
    this.requirementService.getRequirements().subscribe((rs) => {
      this.requirements = rs;
      this.updateUsedBudget(this.requirements);
    });

    // get Observable of budgetState
    this.budgetState$ = this.budgetService.getBudgetState();
  }

  onApprove(id: number): void {
    this.requirementService.approveRequirement(id).subscribe(() => {
      this.requirements = this.requirements.map((v) =>
        v.id === id ? { ...v, status: 'A' } : { ...v }
      );

      // updateUsedBudget after approve by requirements
      this.updateUsedBudget(this.requirements);
    });
  }

  onReject(id: number): void {
    this.requirementService.rejectRequirement(id).subscribe(() => {
      this.requirements = this.requirements.map((v) =>
        v.id === id ? { ...v, status: 'R' } : { ...v }
      );

      // updateUsedBudget after reject by requirements
      this.updateUsedBudget(this.requirements);
    });
  }

  updateUsedBudget(requirements: Requirement[]): void {
    // use reduce function for sum budget
    const sumBudget = requirements
      .filter((r) => r.status === 'A')
      .map((r) => (r.budget ? r.budget : 0))
      .reduce((p, c) => p + c, 0);
    this.budgetService.setUsed(sumBudget);
  }
}
