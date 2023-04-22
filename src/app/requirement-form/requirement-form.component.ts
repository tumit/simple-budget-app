import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequirementService } from '../requirement.service';
import { Requirement } from '../requirement';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.css'],
})
export class RequirementFormComponent {

  title = new FormControl('', Validators.required)

  fg = new FormGroup({
    title: this.title,
    contactMobileNo: new FormControl(''),
  });

  constructor(private requirementService: RequirementService) {}

  onSubmit(): void {
    // prepare data for API
    const newRequirement = this.fg.value as Requirement;
    this.requirementService
      .addRequirement(newRequirement)
      .subscribe((v) => console.log('v', v));
  }
}
