import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

    prepareTransducerModel(data: any) {
        return {
			"analysis_parameters": {
			  "image_quality_analysis": {
				"img": null,
				"p0": {
				  "x": "460",
				  "y": "-25"
				},
				"p1": null,
				"radius_one": "109",
				"radius_two": "395",
				"theta": "70"
			  },
			  "uniformity_analysis": {
				"img": null,
				"p0": {
				  "x": "460",
				  "y": "-25"
				},
				"p1": null,
				"radius_one": "109",
				"radius_two": "395",
				"theta": "70"
			  }
			},
			"barcode": "98962046050",
			"make": data.make != "" ? data.make : null,
			"model":  data.model != "" ? data.model : null,
			"next_study_due": {
			  "date": "2022-07-15T14:22:13.321032",
			  "type": "acceptance"
			},
			"scanner_id": data.scanner != "" ? data.scanner : null,
			"serial_number": data.serial_number != "" ? data.serial_number : null,
			"type": data.type != "" ? data.type : null,
		};
    }

    prepareScannerModel(data: any) {
        return {
            "barcode": "",
            "facility": data.facility != "" ? data.facility : null,
            "make": data.make != "" ? data.make : null,
            "model":  data.model != "" ? data.model : null,
            "room":  data.room != "" ? data.room : null,
            "serial_number": data.serial_number != "" ? data.serial_number : null,
		};
    }
}