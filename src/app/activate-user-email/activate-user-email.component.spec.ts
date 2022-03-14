import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserEmailComponent } from './activate-user-email.component';

describe('ActivateUserEmailComponent', () => {
  let component: ActivateUserEmailComponent;
  let fixture: ComponentFixture<ActivateUserEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUserEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateUserEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
