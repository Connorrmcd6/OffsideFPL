import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FplDeatilsInputDialogComponent } from './fpl-deatils-input-dialog.component';

describe('FplDeatilsInputDialogComponent', () => {
  let component: FplDeatilsInputDialogComponent;
  let fixture: ComponentFixture<FplDeatilsInputDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FplDeatilsInputDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FplDeatilsInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
