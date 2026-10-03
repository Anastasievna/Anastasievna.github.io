import { Component } from '@angular/core';
import { ProductsService } from '../../services/products-service';
import { BehaviorSubject, combineLatestWith, debounceTime, map, Observable } from 'rxjs';
import { IProduct } from '../../types';
import { AsyncPipe } from '@angular/common';
import { Product } from '../../components/product/product';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Sortbar } from '../../components/sortbar/sortbar';

@Component({
  selector: 'app-home-page',
  imports: [Product, Sidebar, Sortbar, AsyncPipe],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  filterTypes$ = new BehaviorSubject<string[]>([]);
  filterLevels$ = new BehaviorSubject<string[]>([]);
  filterSearch$ = new BehaviorSubject<string>('');
  sortType$ = new BehaviorSubject<string>('');
  products$: Observable<IProduct[]> = new Observable<IProduct[]>();

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.products$ = this.productsService.getProducts().pipe(
      combineLatestWith(
        this.filterSearch$.pipe(debounceTime(300)),
        this.sortType$,
        this.filterTypes$,
        this.filterLevels$,
      ),
      map(([products, search, sort, types, levels]) =>
        products
          .filter(
            (product) =>
              (!search || product.name.toLowerCase().includes(search.toLowerCase())) &&
              (!types.length || types.includes(product.type)) &&
              (!levels.length || levels.includes(product.agonylevel)),
          )
          .sort((a: IProduct, b: IProduct) => {
            switch (sort?.toLowerCase()) {
              case 'price low':
                return a.price - b.price;
              case 'price high':
                return b.price - a.price;
              case 'scoville rating':
                return (
                  b.reviews.reduce((sum, current) => sum + current.rating, 0) /
                    (b.reviews.length ?? 1) -
                  a.reviews.reduce((sum, current) => sum + current.rating, 0) /
                    (a.reviews.length ?? 1)
                );
              default:
                return 0;
            }
          }),
      ),
    );
  }

  productTypesChange(types: string[]) {
    this.filterTypes$.next(types);
  }

  levelsChange(levels: string[]) {
    this.filterLevels$.next(levels);
  }

  searchChange(search: string) {
    this.filterSearch$.next(search);
  }

  sortTypeChange(sortType: string) {
    this.sortType$.next(sortType);
  }
}
