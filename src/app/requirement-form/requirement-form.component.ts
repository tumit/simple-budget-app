import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Requirement, RequirementType } from '../requirement';
import { RequirementService } from '../requirement.service';
import { thMobile } from '../th-mobile.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-requirement-form',
  templateUrl: './requirement-form.component.html',
  styleUrls: ['./requirement-form.component.css'],
})
export class RequirementFormComponent implements OnInit {
  title = new FormControl('', Validators.required);
  contactMobileNo = new FormControl('', [Validators.required, thMobile]);
  requirementTypeId = new FormControl<number>(null!); // add requirementTypeId for new formGroup
  tags = new FormControl<string[]>([]);

  inputTag = new FormControl();

  editId: number | null = null;

  // define requirementTypeOptions to Observable of RequirementType[]
  // for show example of how to use 'async' pipe (or use normal subscribe)
  requirementTypeOptions?: Observable<RequirementType[]>;

  // add requirementTypeId for new JSON submit
  fg = new FormGroup({
    title: this.title,
    contactMobileNo: this.contactMobileNo,
    requirementTypeId: this.requirementTypeId,
    tags: this.tags,
  });

  // isSubmitted
  isSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requirementService: RequirementService
  ) {}

  ngOnInit(): void {
    this.editId = Number(this.route.snapshot.paramMap.get('id'));

    // if found id then is edit action
    if (this.editId) {
      this.requirementService.getRequirement(this.editId).subscribe((v) => {
        // de-constructor extract all/some fields
        const { title, contactMobileNo, tags } = v;

        // patch title & contactMobileNo
        this.fg.patchValue({
          title,
          contactMobileNo,
          requirementTypeId: v.requirementType?.id,
          tags
        });
      });
    }

    this.requirementTypeOptions = this.requirementService.getRequirementTypes();
  }

  onSubmit(): void {
    if (this.editId) {
      const editRequirement = this.fg.value as Requirement;
      this.requirementService
        .editRequirement(this.editId, editRequirement)
        .subscribe(() => {
          this.isSubmitted = true;
          this.router.navigate(['/requirement-list']);
        });
    } else {
      // prepare data for API
      const newRequirement = this.fg.value as Requirement;
      this.requirementService.addRequirement(newRequirement).subscribe(() => {
        this.isSubmitted = true;
        this.router.navigate(['/requirement-list']);
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/requirement-list']);
  }

  confirmLeaveForm(): boolean {
    if (!this.isSubmitted && this.fg.touched) {
      return confirm('Leave form ?');
    }

    return true;
  }

  addTag(): void {
    if (this.inputTag.value) {

      const newTags = this.tags.value
        ? [...this.tags.value, this.inputTag.value]
        : [this.inputTag.value];

      this.tags.setValue(newTags);
      this.inputTag.setValue('');
    }
  }

  removeTag(tag: string): void {
    this.tags.setValue(this.tags.value!.filter((v) => v !== tag));
  }
}
