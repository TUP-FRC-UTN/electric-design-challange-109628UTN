import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BudgetListComponent } from './budget-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BudgetListComponent', () => {
  let component: BudgetListComponent;
  let fixture: ComponentFixture<BudgetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BudgetListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
