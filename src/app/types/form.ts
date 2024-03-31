export interface IFieldValues {
    value: string;
    error: string;
    title: string;
};

export interface IForm {
    id: IFieldValues;
    name: IFieldValues;
    description: IFieldValues;
    logo: IFieldValues;
    date_release: IFieldValues;
    date_revision: IFieldValues;
};

export type FormID = 'id' | 'name' | 'description' | 'logo' | 'date_release' | 'date_revision'

export type IStringLenghtValidations = {
    [key in FormID]: any;
};