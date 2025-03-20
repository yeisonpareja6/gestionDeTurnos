import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WorkAreaService } from '../services/work-area.service';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss'
})
export class WorkAreaComponent implements OnInit {

  WorkAreaService = inject(WorkAreaService);

  ngOnInit(): void {
    // debugger
    this.WorkAreaService.getWorkArea().subscribe({ next: (res) => res});
  }

}
