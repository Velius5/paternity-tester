import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {PeculiaritiesTestPage} from "./peculiarities-test.page";


describe('PeculiaritiesTestPage', () => {
  let component: PeculiaritiesTestPage;
  let fixture: ComponentFixture<PeculiaritiesTestPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeculiaritiesTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PeculiaritiesTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
