import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ModuleType, Zone } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { DateValidator } from '../validations/date-validator';

@Component({
  selector: 'app-budget-form',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.css',
})
export class BudgetFormComponent implements OnInit {

  moduleTypes: ModuleType[] = [];
  zones = Object.values(Zone);
  private router = inject(Router);
  private budgetService = inject(BudgetService);
  private fb = inject(FormBuilder);

  form: FormGroup = new FormGroup({
    client: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required, DateValidator.validarFecha]),
    modules: new FormArray([]),
  });

constructor() {}

  ngOnInit(): void {
    this.budgetService.getModuleTypes().subscribe((moduleTypes) => {
      this.moduleTypes = moduleTypes;
    });
  }
  get modules() {
    return this.form.controls['modules'] as FormArray;
  }

  quitarModule(index: number) {
    this.modules.removeAt(index);
  }

  agregarModule() {
    const module = new FormGroup({
      moduleType: new FormControl('', [Validators.required]),
      zone: new FormControl('', [Validators.required]),
    });
    this.modules.push(module);
  }

  getModulePrice(index: number): number {
    const moduleTypeId = this.modules.at(index).get('moduleType')?.value;
    const moduleType = this.moduleTypes.find((moduleType) => moduleType.id === moduleTypeId);
    return moduleType ? moduleType.price : 0;
  }

  getModuleSlots(index: number): number {
    const moduleTypeId = this.modules.at(index).get('moduleType')?.value;
    const moduleType = this.moduleTypes.find((moduleType) => moduleType.id === moduleTypeId);
    return moduleType ? moduleType.slots : 0;
  }
  

  onSubmit() {
    if (this.form.valid) {
      this.budgetService
        .createBudget(this.form.value)
        .subscribe(() => this.router.navigate(['/list']));
    }
  }
}
