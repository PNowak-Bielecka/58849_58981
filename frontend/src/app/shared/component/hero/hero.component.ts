import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(
    private breakepointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) { }

  searchForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  isMobile = this.breakepointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet,
  ]).pipe(
    map( result => result.matches )
  )

  private buildForm() {
    this.searchForm = this.formBuilder.group({
      from: [''],
      to: [''],
      arrival_date: [null, []],
    })
  }

  onSave() {
    if (this.searchForm.controls.arrival_date.value == null) {
      const date = Date.now();
      const today = new Date(date);
      return this.searchForm.controls.arrival_date.setValue(today);
    }

    const newDate = this.datepipe.transform(this.searchForm.controls.arrival_date.value, 'yyyy-MM-dd');
    this.searchForm.patchValue({
      arrival_date: newDate
    });

    //const date = DatePipe.prototype.transform(this.searchForm.controls.arrival_date.value);
    //console.log(date);
    //console.log(newDate);
    //console.log(this.searchForm.controls.arrival_date.value);
    this.router.navigate(['search'], { queryParams: { from: `${this.searchForm.controls.from.value}`, to: `${this.searchForm.controls.to.value}`, arrival_date: `${this.searchForm.controls.arrival_date.value}`}})
  }


}
