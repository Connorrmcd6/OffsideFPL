import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallPwaAlertComponent } from './install-pwa-alert.component';

describe('InstallPwaAlertComponent', () => {
  let component: InstallPwaAlertComponent;
  let fixture: ComponentFixture<InstallPwaAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallPwaAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallPwaAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
