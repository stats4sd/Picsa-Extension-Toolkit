import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ClimateToolPage } from "../../budget-tool/pages/climate-tool/climate-tool.page.page";

describe("ClimateToolPage", () => {
  let component: ClimateToolPage;
  let fixture: ComponentFixture<ClimateToolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClimateToolPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateToolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
