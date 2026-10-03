import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sortbar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sortbar.html',
  styleUrl: './sortbar.css',
})
export class Sortbar {
  search = '';
  selectedSort = 'New';
  @Output() filterSearch = new EventEmitter();
  @Output() sortType = new EventEmitter();
  variants = ['New', 'Price Low', 'Price High', 'Scoville Rating'];

  changeSort(variant: string) {
    this.selectedSort = variant;
    this.sortType.emit(this.selectedSort);
  }

  searchChange(search: string) {
    this.filterSearch.emit(search);
  }
}
