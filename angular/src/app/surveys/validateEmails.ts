import { ValidatorFn, AbstractControl } from '@angular/forms';

const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function validateEmails(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const invalidEmails = !control.value ? [] : control.value
      .split(',')
      .map(email => email.trim())
      .filter(email => !regex.test(email));
    
    if(!invalidEmails[invalidEmails.length-1]){
      invalidEmails.pop();
    }
  
    if(invalidEmails.length) {
      return {'invalidEmails': `These emails are invalid: ${invalidEmails}`}
    }
  
    return null;
  }
}