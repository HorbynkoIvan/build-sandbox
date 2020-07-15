export default class Calc {
    add(...args) {
        return args.reduce((prev, next) => prev + next, 0)
    }
}