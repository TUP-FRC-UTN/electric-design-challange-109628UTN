import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetResolverService implements Resolve<boolean> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.http.get<any[]>('/api/budgets').pipe(
      map((budgets) => {
        const client = route.queryParams['client'];
        if (client) {
          return !budgets.some(budget => budget.client === client);
        }
        return true;
      })
    );
  }
}
