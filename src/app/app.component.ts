import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';
  trucks: MasterScheduleTruckLines[] = [];
  mockDbData: any[] = [];
  tempResult: any[] = [];
  ngOnInit() {

    this.mockDbData = [
      {
        locationId: '2N',
        mapReference: 'ABC123',
        primeMoverNumber: 'PM1',
        dayOfWeek: 0,
        spanOfDay: 'D1',
        countryId: 1,
        colorCode: '#fff',
        tripType: 'string'
      },
      {
        locationId: '2N',
        mapReference: 'ABC456',
        primeMoverNumber: 'PM1',
        dayOfWeek: 0,
        spanOfDay: 'D2',
        countryId: 2,
        colorCode: '#fff',
        tripType: 'string'
      },
      {
        locationId: '2N',
        mapReference: 'ABC789',
        primeMoverNumber: 'PM1',
        dayOfWeek: 1,
        spanOfDay: 'N',
        countryId: 2,
        colorCode: '#fff',
        tripType: 'string'
      },
      {
        locationId: '2N',
        mapReference: 'ABC123',
        primeMoverNumber: 'PM2',
        dayOfWeek: 0,
        spanOfDay: 'D1',
        countryId: 1,
        colorCode: '#fff',
        tripType: 'string'
      },
      {
        locationId: '2N',
        mapReference: 'ABC456',
        primeMoverNumber: 'PM2',
        dayOfWeek: 0,
        spanOfDay: 'D2',
        countryId: 2,
        colorCode: '#fff',
        tripType: 'string'
      },
      {
        locationId: '2N',
        mapReference: 'ABC789',
        primeMoverNumber: 'PM2',
        dayOfWeek: 1,
        spanOfDay: 'N',
        countryId: 2,
        colorCode: '#fff',
        tripType: 'string'
      }
    ];

    // const _this = this;
    this.mockDbData.forEach((v, i) => {

      let cpm = v.primeMoverNumber;

      const foundMapRef = this.trucks.find(obj => {
        return obj.primeMoverNumber === cpm;
      })

      let x: MasterScheduleTruckLines;
      if (foundMapRef === undefined) {
        x = {
          locationId: v.locationId,
          primeMoverNumber: cpm,
          activeStatus: 'just',
          mapReferences: []
        }

        this.trucks.push(x);

      }

    });

    let optArray: string[] = ['D1', 'D2', 'N'];
    let daysArray: number[] = [0, 1, 2, 3, 4, 5, 6];

    this.trucks.forEach((v, i) => {

      let mapRefs = this.mockDbData.filter(obj => {
        return obj.primeMoverNumber === v.primeMoverNumber;
      })
      // console.log(mapRefs)

      for (let d = 0; d < daysArray.length; d++) {
        for (let o = 0; o < optArray.length; o++) {
          let findbyDayAndOpt = mapRefs.find(obj => {
            return obj.dayOfWeek === d && obj.spanOfDay === optArray[o];
          })

          if (findbyDayAndOpt === undefined) {
            let x = {
              locationId: v.locationId,
              mapReference: '-',
              primeMoverNumber: v.primeMoverNumber,
              dayOfWeek: d,
              spanOfDay: optArray[o],
              countryId: 0,
              colorCode: '',
              tripType: 'NEW'
            };
            mapRefs.push(x);
            // console.log(d, optArray[o])
          } else {
            // console.log(findbyDayAndOpt);
          }
        }
      }

      v.mapReferences = mapRefs;

    })

    console.log('-- FINAL --')
    console.log(this.trucks)
    this.trucks = [...this.trucks];
  }

}

interface MapRef {
  text: string,
  value: string
}

interface MasterScheduleLine {
  locationId: string;
  mapReference: string;
  primeMoverNumber: string; //TRUCK
  spanOfDay: string;
  dayOfWeek: number;
  countryId: number;
  colorCode: string;
  tripType: string;
  deliveryDate: Date;
}

interface MasterScheduleTruckLines {
  locationId: string;
  primeMoverNumber: string;
  activeStatus: string;
  mapReferences: MasterScheduleLine[];
}
