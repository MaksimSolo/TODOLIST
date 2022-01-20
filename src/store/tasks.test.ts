import {
    addSalary,
    AddSalaryActionType,
    cutSalary,
    CutSalaryActionType,
    divSalary, DivSalaryActionType,
    multSalary, MultSalaryActionType,
    salaryReducer
} from "./tasks";

test('addSalary', () => {
    //1-data
    const salary: number = 2100
    const bonus: number = 250
    //2 - code
    const result = addSalary(salary, bonus)

    //3 - expected result
    expect(result).toBe(2350)
})

test('cutSalary', () => {
    //1-data
    const salary: number = 2100
    const minus: number = 250
    //2 - code
    const result = cutSalary(salary, minus)

    //3 - expected result
    expect(result).toBe(1850)
})

test('multSalary', () => {
    //1-data
    const salary: number = 2100
    const coeffs: number = 1.1
    //2 - code
    const result = multSalary(salary, coeffs)

    //3 - expected result
    expect(result).toBe(2310)
})

test('divSalary', () => {
    //1-data
    const salary: number = 2100
    const coeffs: number = 0.8
    //2 - code
    const result = divSalary(salary, coeffs)

    //3 - expected result
    expect(result).toBe(1680)
})

/////////////////////

test('case addsalary - salaryReducer', () => {

    const salary: number = 2100
    const action: AddSalaryActionType = {
        type: 'ADD_SALARY',
        bonus: 250
    }
    expect(salaryReducer(salary, action)).toBe(2350)
})

test('case cutSalary - salaryReducer', () => {

    const salary: number = 2100
    const action: CutSalaryActionType = {
        type: 'CUT_SALARY',
        minus: 250
    }
    expect(salaryReducer(salary, action)).toBe(1850)
})

test('case multSalary - salaryReducer', () => {

    const salary: number = 2100
    const action: MultSalaryActionType = {
        type: 'MULT_SALARY',
        coeffs: 1.1
    }
    expect(salaryReducer(salary, action)).toBe(2310)
})

test('case divSalary - salaryReducer', () => {

    const salary: number = 2100
    const action: DivSalaryActionType = {
        type: 'DIV_SALARY',
        coeffs: 0.8
    }
    expect(salaryReducer(salary, action)).toBe(1680)
})