class Car {
    #ERRORS = {
        carIsStarted: 'Машина уже заведена',
        carIsNotStarted: 'Машина ещё не заведена',
        carCantDrive: 'Машина должна быть заведена, чтобы ехать',
        errorMinMax: (min, max) => `строка от ${min} до ${max} символов включительно`,
        shouldBeNumber: 'Значение должно быть числом',
        isNotFuelNumber: 'Неверное количество топлива для заправки',
        fullFuel: 'Топливный бак переполнен',
        wrongSpeed: 'Неверная скорость',
        wrongMaxSpeed: 'Машина не может ехать так быстро',
        wrongTimeCount: 'Неверное количество часов',
        wrongFuel: 'Недостаточно топлива',
    }
    #brand; //(строка от 1 до 50 символов включительно)
    #model; // (строка от 1 до 50 символов включительно)
    #yearOfManufacturing // (число от 1900 до текущего года включительно)
    #maxSpeed; //(число от 100 до 300 км/ч)
    #maxFuelVolume;  // (число в литрах от 5 до 20)
    #fuelConsumption;  //(число в л/100км)
    #currentFuelVolume = 0; // (число в литрах, по умолчанию 0)
    #isStarted = false;  //(логический тип, по умолчанию false)
    #mileage = 0; //(число в километрах, по умолчанию 0)

    set brand(value) {  this.#brand = this.validate(String(value).split('').length).minMax(1, 50) && value }
    get brand(){ return this.#brand }
    set model(value) { this.#model = this.validate(String(value).split('').length).minMax(1, 50) && value }
    get model(){ return this.#model }
    set yearOfManufacturing(value) {
        this.#yearOfManufacturing = this
            .validate(value)
            .isNumber()
            .minMax(1900, Number(new Date().getFullYear())) && value
    }
    get yearOfManufacturing(){ return this.#yearOfManufacturing }
    set maxSpeed(value) { this.#maxSpeed = this.validate(value).minMax(100, 300) && value }
    get maxSpeed(){ return this.#maxSpeed }
    set maxFuelVolume(value) { this.#maxFuelVolume = this.validate(value).minMax(5, 20) && value }
    get maxFuelVolume(){ return this.#maxFuelVolume }
    get fuelConsumption() { return this.#fuelConsumption}
    set fuelConsumption(value) { this.#fuelConsumption = this.validate(value).isNumber() && value }
    get currentFuelVolume(){ return this.#currentFuelVolume }
    get isStarted() { return this.#isStarted }
    get mileage() { return this.#mileage }

    start(){ this.#isStarted = this.validate(this.#isStarted).toggle(true, this.#ERRORS.carIsStarted) && true;  }
    shutDownEngine(){ this.#isStarted = this.validate(this.#isStarted).toggle(false, this.#ERRORS.carIsNotStarted) && false }
    fillUpGasTank(fuelQuantity){
        if(!this.#maxFuelVolume) this.#maxFuelVolume = 5;
        this.#currentFuelVolume += this
                .validate(fuelQuantity)
                .isNumber(this.#ERRORS.isNotFuelNumber)
                .minMax(1, (this.#maxFuelVolume - this.#currentFuelVolume), this.#ERRORS.fullFuel)
            && fuelQuantity || 0;
    }
    drive(speed, hours){
        if(this.isStarted){
            const currentSpeed = this
                .validate(speed)
                .isNumber(this.#ERRORS.wrongSpeed)
                .minMax(100, this.#maxSpeed, this.#ERRORS.wrongMaxSpeed) && speed;
            const currentTime = this
                .validate(hours)
                .isNumber(this.#ERRORS.wrongTimeCount)
                .minMax(1, hours, this.#ERRORS.wrongTimeCount) && hours;
            const distance = currentSpeed * currentTime;
            const litres = this.#fuelConsumption / 100 * distance;
            this.#mileage += this.validate(litres).minMax(1, this.#currentFuelVolume, this.#ERRORS.wrongFuel) && distance;
        }else throw new Error(this.#ERRORS.carCantDrive);
    }
    validate(value) {
        return {
            minMax: (min, max, errText = null) => {
                if(value >= min && value <= max) { return this.validate(value); }
                else throw new Error(errText || this.#ERRORS.errorMinMax(min, max)) },
            toggle: (shouldBool, errText) => { if(shouldBool !== value) return this.validate(value); else throw new Error(errText)},
            isNumber: (errText = null) => {
                if(!isNaN(value)) return this.validate(value); else throw new Error(errText || this.#ERRORS.shouldBeNumber)
            },
        }
    }
}

module.exports = Car;