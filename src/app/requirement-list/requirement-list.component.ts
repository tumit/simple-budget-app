import { Component } from '@angular/core';
import { Requirement } from '../requirement';

@Component({
  selector: 'app-requirement-list',
  templateUrl: './requirement-list.component.html',
  styleUrls: ['./requirement-list.component.css']
})
export class RequirementListComponent {
  requirements: Requirement[] = [
    { id: 2000, title: 'USB wire', contactMobileNo: '0891234567' },
    { id: 2001, title: 'USB A', contactMobileNo: '0991234567' },
    { id: 2002, title: 'USB C', contactMobileNo: '0881234567' }
  ]
}
