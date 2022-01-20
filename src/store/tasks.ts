export const addSalary = (salary: number, bonus: number) => {
    return (salary + bonus)
}
export const cutSalary = (salary: number, minus: number) => {
    return (salary - minus)
}
export const multSalary = (salary: number, coeffs: number) => {
    return (salary * coeffs)
}
export const divSalary = (salary: number, coeffs: number) => {
    return (salary * coeffs)
}

//1. в параметрах у всех есть сэлэри. (state)
//2. Название функции отражает тип действия (type of action/ action type)
//3. Доп значения для каждого типа действия.

export type AddSalaryActionType = {
    type: 'ADD_SALARY',
    bonus: number
}
export type CutSalaryActionType = {
    type: 'CUT_SALARY',
    minus: number
}
export type MultSalaryActionType = {
    type: 'MULT_SALARY',
    coeffs: number
}
export type DivSalaryActionType = {
    type: 'DIV_SALARY',
    coeffs: number
}

type ActionType = AddSalaryActionType | CutSalaryActionType | MultSalaryActionType | DivSalaryActionType

export const salaryReducer = (salary: number, action: ActionType) => {
    switch (action.type) {
        case "ADD_SALARY":
            return (salary + action.bonus)
        case "CUT_SALARY":
            return (salary - action.minus)
        case "MULT_SALARY":
        case "DIV_SALARY":
            return (salary * action.coeffs)
        default:
            return salary;
    }
}