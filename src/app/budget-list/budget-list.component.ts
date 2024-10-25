import { Component, inject, OnInit } from '@angular/core';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css',
})
export class BudgetListComponent implements OnInit {

  budgets: Budget[] = [];
  private budgetService = inject(BudgetService);

  ngOnInit(): void {
    this.budgetService
      .getBudgets()
      .subscribe((budgets) => (this.budgets = budgets));
  }

  viewBudget(arg0: string | undefined) {
    this.budgetService.setBudgetDetail(arg0);
  }
}
