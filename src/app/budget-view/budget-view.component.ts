import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget, ModuleType } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-view.component.html',
  styleUrls: ['./budget-view.component.css'],
})
export class BudgetViewComponent implements OnInit {
  private budgetService = inject(BudgetService);
  budget: Budget | undefined;
  budgetId: string | undefined;
  moduleTypes: ModuleType[] = [];

  ngOnInit(): void {
    // 1. Cargar los detalles del presupuesto
    this.budgetService.getBudgetDetail().subscribe((budgetId) => {
      this.budgetId = budgetId;

      // 2. Obtener el presupuesto
      this.budgetService.getBudget(this.budgetId!).subscribe((budget) => {
        this.budget = budget;

        // 3. Cargar los tipos de módulos
        this.budgetService.getModuleTypes().subscribe((moduleTypes) => {
          this.moduleTypes = moduleTypes;

          // 4. Mapear los moduleType del presupuesto con los detalles de moduleTypes
          this.budget!.modules = this.budget!.modules.map((module) => {
            // Convertimos ambos a string para hacer la comparación correctamente
            const fullModuleType = this.moduleTypes.find(mt => String(mt.id) === String(module.moduleType));
            return {
              ...module,
              moduleType: fullModuleType || module.moduleType
            };
          });

          console.log(this.budget);  // Verifica que los datos están correctamente cargados
        });
      });
    });
  }
}
