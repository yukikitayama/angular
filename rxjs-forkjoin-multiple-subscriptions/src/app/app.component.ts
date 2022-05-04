import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rxjs-forkjoin-multiple-subscriptions';
  coffees = ['coffee1', 'coffee2', 'coffee3'];
  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    // Before making multiple HTTP requests, making multiple observables ready
    const coffeeToObservable = {};
    this.coffees.forEach((coffee) => {
      coffeeToObservable[coffee] = this.getObservable();
    })

    // Make multiple HTTP requests
    forkJoin(coffeeToObservable).subscribe((response) => {

      // response is object. Key is key of observable object and value is response of each observable
      // console.log(response);

      // Extract data from multiple responses object
      Object.keys(response).forEach((key) => {
        this.data.push({
          blendName: response[key]['blend_name'],
          origin: response[key]['origin']
        });
      });
    })
  }

  getObservable() {
    const url = 'https://random-data-api.com/api/coffee/random_coffee';
    return this.http.get<{
      blend_name: string,
      id: number,
      intensifier: string,
      notes: string,
      origin: string,
      uid: string,
      variety: string
    }>(url);
  }
}
