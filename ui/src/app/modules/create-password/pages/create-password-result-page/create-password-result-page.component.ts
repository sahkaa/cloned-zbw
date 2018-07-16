import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-create-password-result',
  templateUrl: './create-password-result-page.component.html',
  styleUrls: ['./create-password-result-page.component.scss']
})
export class CreatePasswordResultPageComponent implements OnInit {
  public form: FormGroup;
  public result: string;

  @HostBinding('class') public class: string = 'col p-0 d-flex justify-content-center align-items-center';

  public constructor(
    private title: Title,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.title.setTitle('Versata');
    this.route.data.subscribe(data => this.result = data.result);
  }
}
