import { Component, OnInit } from '@angular/core';
import { Requirement } from '../requirement';
import { RequirementService } from '../requirement.service';
import { FormControl } from '@angular/forms';
import { mobileFormat } from '../mobile-format';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Budget } from '../budget';
import { BudgetService } from '../budget.service';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.css']
})
export class RequirementListComponent implements OnInit {

  requirements: Requirement[] = []

  isSmallTable = new FormControl(false);

  // $ at the end of variable name is just convention to
  // know it is Observable
  budgetState$!: Observable<Budget>;

  constructor(
    private router: Router,
    private requirementService: RequirementService,
    private budgetService: BudgetService) {
  }

  ngOnInit(): void {
    // this.requirements
    //   = requirementService.getRequirements();
    this.requirementService.getRequirements().subscribe(rs => {

      this.requirements = rs;

      // use reduce function for summary total budget
      const totalBudget = this.requirements.map(r => r.budget ? r.budget : 0).reduce((p, c) => p + c, 0);
      this.budgetService.add(totalBudget);
    })

    this.budgetState$ = this.budgetService.getBudgetState();

  }

  // contactMobileNoFormat(mobileNo: string): string {
  //   console.log('contactMobileNoFormat')
  //   return mobileFormat(mobileNo);
  // }

  onAdd(): void {
    this.router.navigate(['/requirement-form'])
  }

  onDelete(id: number): void {
    this.requirementService.deleteRequirement(id).subscribe(
      () => this.requirements = this.requirements.filter(v => v.id != id));
  }

  onEdit(id: number): void {
    // http://localhost:4200/requirement-form/1010
    this.router.navigate(['/requirement-form', id])
  }

}
