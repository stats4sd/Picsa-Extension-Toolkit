import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetToolPage } from './budget-tool.page';

describe('BudgetToolPage', () => {
  let component: BudgetToolPage;
  let fixture: ComponentFixture<BudgetToolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetToolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetToolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
