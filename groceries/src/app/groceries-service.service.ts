import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';

/*
  Generated class for the GroceriesServiceProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable({
	providedIn: 'root'
})

export class GroceriesServiceService {
  items: any = [];
  
  dataChanged$ : Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    console.log('Hello GroceriesService');
    
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/groceries').pipe( map(this.extractData), catchError(this.handleError)
    );
  }

  private extractData(res: Response){
    let body = res;
    return (body || {}) as object[];
  }

  private handleError(error: Response | any){
    let errMsg : string;
    if(error instanceof Response){
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
 
  removeItem(id,index){
     
    console.log(index);
    this.http.delete(this.baseURL+'/api/delete/'+id,index).subscribe(res => {
       
      this.items = res; 
      this.dataChangeSubject.next(true);
    });
  }
 
  addItem(item){
    this.http.post(this.baseURL+'/api/groceries/', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }
  
  editItem(id, index){
     
    this.http.put(this.baseURL+'/api/edit/'+id,index).subscribe(res => {
       
      this.items[index] = res;
      this.dataChangeSubject.next(true);
    });
  }

}