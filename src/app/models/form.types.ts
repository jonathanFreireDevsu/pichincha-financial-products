
export type FormIDType = 'id' | 'name' | 'description' | 'logo' | 'date_release' | 'date_revision'

export type StringLenghtValidationsType = {
    [key in FormIDType]: any;
};