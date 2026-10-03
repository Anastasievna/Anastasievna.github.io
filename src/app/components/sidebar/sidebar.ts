import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  selectedTypes: string[] = [];
  selectedLevels: string[] = [];
  @Output() filtersTypes = new EventEmitter<string[]>();
  @Output() filtersLevels = new EventEmitter<string[]>();

  types = [
    'Whole Chilies',
    'Ground Spices',
    'Scorching Sauces',
    'Sadistic Blends',
    'Infernal Extracts',
  ];

  levels = ['Warming Up', 'Serious Heat', 'Ring of Fire', 'Legal Weapon'];

  changeType(type: string) {
    if (this.selectedTypes.includes(type))
      this.selectedTypes = this.selectedTypes.filter((item) => item !== type);
    else this.selectedTypes.push(type);
    this.filtersTypes.emit(this.selectedTypes);
  }

  changeLevel(level: string) {
    if (this.selectedLevels.includes(level))
      this.selectedLevels = this.selectedLevels.filter((item) => item !== level);
    else this.selectedLevels.push(level);
    this.filtersLevels.emit(this.selectedLevels);
  }
}
