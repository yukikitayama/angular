import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'make-api';
  options: any

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{data: number[]}>('https://API_BASE_URL/test/data?intercept=100&slope=-3&count=100')
      .subscribe((response) => {
        console.log(response);
        this.options = {
          xAxis: {
              type: 'category',
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: response.data,
              type: 'line'
          }]
      };
      });
  }
}
