import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname', 'age', 'birthDate', 'deathDate'];
  dataSource:any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.listCustomer().subscribe((data) => {
      data.forEach((item, i) => {
        item.position = i;
      })
      this.dataSource = data;
    })
  }

}
