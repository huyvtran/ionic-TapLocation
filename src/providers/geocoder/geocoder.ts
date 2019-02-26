
import { Injectable } from '@angular/core';
import {NativeGeocoderResultModel} from './geocoder'
import { NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
/*
  Generated class for the GeocoderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeocoderProvider {
  
  constructor( private _GEOCODE  : NativeGeocoder) {
    console.log('Hello GeocoderProvider Provider');
  }
reverseGeocode(lat : number, lng : number) : Promise<any>
{
   return new Promise((resolve, reject) =>
   {
      this._GEOCODE.reverseGeocode(lat, lng)
      .then((result: NativeGeocoderReverseResult[]) => {
      //  alert(JSON.stringify(result));
        let str : string   = result[0].subThoroughfare+" "+result[0].thoroughfare+" "+result[0].subLocality+" "+result[0].locality+" "+result[0].postalCode;
         resolve(str);
        console.log()
      })
      .catch((error: any) =>
      {
         reject(error);
      });
   });
}

}
export interface NativeGeocoderResultModel {
  subAdministrativeArea: string,
  postalCode: number,
  locality: string, // Tembisa
  subLocality: string, //Umthambeka
  subThoroughfare: string,
  countryCode: string,
  countryName: string,
  administrativeArea: string, //Gauteng
  thoroughfare: string //Brian Street
}
