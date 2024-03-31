import { IStringLenghtValidations } from "../types/form";

export const stringLenghtValidations: IStringLenghtValidations = {
    id: {
        min: 3,
        max: 10
    },
    name: {
        min: 5,
        max: 100
    },
    description: {
        min: 10,
        max: 200
    },
    logo: {},
    date_release: {},
    date_revision: {}
}
