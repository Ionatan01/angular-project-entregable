import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  standalone: true
})
export class PaginationComponent {
  @Input()
  currentPage!: number;
  @Input() totalPages!: number;

  constructor(private router: Router) { }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.router.navigate(['/artworks/page',this.currentPage - 1]);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.router.navigate(['/artworks/page', this.currentPage + 1]);
    }
  }

  inputChanged(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;

    if (!Number.isNaN(inputValue)) {
      const num = +inputValue; 
      if (num >= 1 && num <= this.totalPages) {
        this.router.navigate(['/artworks/page',num]);
      }
    }
  }
}
