import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipmentService } from 'src/app/services/equipment.service';
import { of } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewComponent } from './review.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewComponent', () => {
  let service: EquipmentService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule], 
     providers: [EquipmentService], 
  });
  service = TestBed.inject(EquipmentService);
  httpMock = TestBed.inject(HttpTestingController);
});

it('should be created', () => {
    
    let equipments = [{model: "Sparq", barcode: "93847641725", organization: "CIRS", facility: "CIRS", user: "tester"}]
    service.getAllScanner().subscribe((res) => expect(res).toEqual(equipments));
    //expect(service).toBeTruthy();
   // expect(service.getScanners).toEqual(equipments);
  });


  // get scannerList API
  it('should get scannerList', () => {
    scannerService.getScanners.and.returnValue(of(equipments));
    expect(scannerService.getScanners).toBeTruthy(equipments);
   });

   // get transducerList API 
  it('should get TransducerList', () => {
    scannerService.getScanners.and.returnValue(of(transducerList));
    expect(scannerService.getScanners).toBeTruthy(transducerList);
  }); 

});
 