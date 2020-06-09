import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private httpClient: HttpClient) { }

  /**
   * To get data from the database
   */
  getData = (url) => {
    return this.httpClient.get(url);
  }
  
  /**
   * To post/save data from the database
   */
  postData = (url, postObj) => {
    return this.httpClient.post(url, postObj);
  }
  
  /**
   * To put/update data from the database
   */
  updateData = (url,putObj) => {
    return this.httpClient.put(url, putObj);
  }
  
  /**
   * To delete data from the database
   */
  deleteData = (url) => {
    return this.httpClient.delete(url);
  }
}
