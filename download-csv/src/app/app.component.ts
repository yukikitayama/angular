import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'download-csv';
  keys = ['a', 'b', 'c'];
  values = [1, 2, 3]

  constructor() {
    console.log('keys')
    console.log(this.keys);
    console.log('values')
    console.log(this.values);
  }

  onDownload() {
    // Make CSV metadata
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add CSV header
    csvContent += 'key,value\n';

    // Add data
    this.keys.forEach((key, index) => {
      const line = `${key},${this.values[index]}\n`;
      csvContent += line;
    })

    this.download(csvContent);
  }

  download(csvContent: string) {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    // Second argument will be the name of the file
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link);
    link.click();
  }
}
