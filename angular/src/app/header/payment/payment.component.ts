import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PaymentsService } from 'src/app/payments.service';

declare var stripe: any;
declare var elements: any;
declare var M: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('cardInfo', { static: true }) cardInfo: ElementRef;
  @ViewChild('email', { static: true }) emailInput: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  isLoading: boolean = false;

  constructor(private cd: ChangeDetectorRef, private ps: PaymentsService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    this.isLoading = true;
    const { value } = this.emailInput.nativeElement;
    const { token, error } = await stripe.createToken(this.card, { name: value });

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      this.card.clear();
      this.emailInput.nativeElement.value = '';

      this.ps.handleToken(token).subscribe(res => {
        const el = document.querySelector('.modal');
        const modal = M.Modal.getInstance(el);
        modal.close();
        this.isLoading = false;
      });
    }
  }

}
