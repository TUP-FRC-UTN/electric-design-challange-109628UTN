import { FormControl, ValidationErrors } from "@angular/forms";

export class DateValidator {
    static validarFecha(control: FormControl): ValidationErrors | null {
        const date = new Date(control.value);
        const today = new Date();
        if (date > today) {
            return {errorFecha: true};
        } else {
            return null;
        }
    }
}