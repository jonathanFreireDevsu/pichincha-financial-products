
export type FormID = 'id' | 'name' | 'description' | 'logo' | 'date_release' | 'date_revision'

export type IStringLenghtValidations = {
    [key in FormID]: any;
};