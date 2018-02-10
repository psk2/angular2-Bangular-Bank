import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBloodBankComponent } from './create-blood-bank.component';

describe('CreateBloodBankComponent', () => {
  let component: CreateBloodBankComponent;
  let fixture: ComponentFixture<CreateBloodBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBloodBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBloodBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
