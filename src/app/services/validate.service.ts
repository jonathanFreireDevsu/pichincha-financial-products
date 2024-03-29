import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ValidateService {
    constructor() {}

    stringToDate(value: string) {
        let dateComponents = value.split('-');
        let year = parseInt(dateComponents[0], 10);
        let month = parseInt(dateComponents[1], 10) - 1;
        let day = parseInt(dateComponents[2], 10);
        return new Date(year, month, day);
    }
    stringPlusOneYear(value: string) {
        const splitedValue = value.split('-');
        const yearPlusOne = parseInt(splitedValue[0], 10) + 1;
        return `${yearPlusOne}-${splitedValue[1]}-${splitedValue[2]}`
    }
    stringToDatePlusOneYear(value: string) {
        let dateComponents = value.split('-');
        let year = parseInt(dateComponents[0], 10);
        let month = parseInt(dateComponents[1], 10) - 1;
        let day = parseInt(dateComponents[2], 10);
        const newDate =  new Date(year, month, day);
        newDate.setFullYear(year + 1);
        return newDate;
    }

    isoToYYYYMMDD(value: string) {
        if (!value) {
            return '';
          }
          const parts = value.split('T')[0].split('-');
          const year = parts[0];
          const month = parts[1];
          const day = parts[2];
          return `${year}-${month}-${day}`;
    }
    private validateRequired(value: string) {
        return !value ? 'Requerido.' : false;
    }
    
    private validateCharacters(value: string, min: number, max: number) {
        return !(value?.length >= min && value?.length <= max) ?
            `Mínimo ${min} caractéres y máximo ${max}.` : false; 
    }
    
    private validateDateGreaterEqualToday(value: string) {
        const parsedValue = this.stringToDate(value)
        const today = new Date();
        
        var year1 = parsedValue.getFullYear();
        var month1 = parsedValue.getMonth();
        var day1 = parsedValue.getDate();
        
        var year2 = today.getFullYear();
        var month2 = today.getMonth();
        var day2 = today.getDate();

        return !(
            year1 > year2 ||
            (year1 === year2 && month1 > month2) ||
            (year1 === year2 && month1 === month2 && day1 >= day2)
            ) ? 'La fecha debe ser mayor o igual a la actual.' : false;
    }

    private validateDateOneYearThanOther(dateInit: string, dateEnd: string) {
        const parsedDateInit = this.stringToDate(dateInit);
        const parseddateEnd = this.stringToDate(dateEnd);
        if (
            !(parsedDateInit.getFullYear() === parseddateEnd.getFullYear() - 1 &&
            parsedDateInit.getMonth() === parseddateEnd.getMonth() &&
            parsedDateInit.getDate() === parseddateEnd.getDate())
          ) {
            return 'Debe ser un año mayor a la fecha de liberación.';
          }
          return false;
    }

    private applyFormValidations(value: any, id: string, data: any) {
        if (id === 'id') {
            return this.validateRequired(value) || this.validateCharacters(value, 3, 10);
        }
        if (id === 'name') {
            return this.validateRequired(value) || this.validateCharacters(value, 5, 100);
        }
        if (id === 'description') {
            return this.validateRequired(value) || this.validateCharacters(value, 10, 100);
        }
        if (id === 'logo') {
            return this.validateRequired(value);
        }
        if (id === 'freeDate') {
            return this.validateRequired(value) || this.validateDateGreaterEqualToday(value);
        }
        if (id === 'revisionDate') {
            return this.validateRequired(value) || this.validateDateOneYearThanOther(data.freeDate.value, value);
        }
        throw new Error('Campo no encontrado');
    }

    validate(formData: any) {
        let resultFormData = {...formData};
        let error = false;
        Object.keys(formData).forEach((key) => {
            const errorMessage = this.applyFormValidations(formData[key].value, key, formData)
            resultFormData[key].errorMessage = errorMessage;
            if (errorMessage) {
                error = true
            }
        })
        return {error, resultFormData};
      }
};
