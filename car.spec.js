const Car = require("./car");
const car = new Car();
describe('Should work correctly', () => {
    it('Should create car brand correctly', () => {
        car.brand = 'Toyota';
        expect(car.brand).toBe('Toyota');
    })
    it('brand should be more that 0 and less then 50', () => {
        expect(()=>car.brand = '').toThrow(Error);
        expect(()=>car.brand = 'ToyotaToyotaToyotaToyotaToyotaToyotaToyotaToyotaToyotaToyota').toThrow(Error);
    })
    it('Should create car model correctly', () => {
        car.model = 'Corolla';
        expect(car.model).toBe('Corolla');
    })
    it('brand should be more that 0 and less then 50', () => {
        expect(()=>car.model = '').toThrow(Error);
        expect(()=>car.model = 'CorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorolla').toThrow(Error);
    })
    it('brand should be more that 0 and less then 50', () => {
        expect(()=>car.model = '').toThrow(Error);
        expect(()=>car.model = 'CorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorollaCorolla').toThrow(Error);
    })
    it('yearOfManufacturing should be more 1900 and less 2021', ()=>{
        expect(()=>car.yearOfManufacturing = 1899).toThrow(Error);
        expect(()=>car.yearOfManufacturing = 2022).toThrow(Error);
        car.yearOfManufacturing = 2000;
        expect(car.yearOfManufacturing).toBe(2000);
        expect(()=>car.yearOfManufacturing = '23sda2').toThrow(Error);
    })
    it('MaxSpeed should be more then 100 and less 300', () => {
        expect(() => car.maxSpeed = 3).toThrow(Error);
        car.maxSpeed = 130;
        expect(car.maxSpeed).toBe(130);
        expect(() => car.maxSpeed = 500).toThrow(Error);
    })
    it('maxFuelVolume should be more then 5 and less 20', () => {
        expect(() => car.maxFuelVolume = 1).toThrow(Error);
        expect(car.maxFuelVolume = 6).toBe(6);
        expect(() => car.maxFuelVolume = 21).toThrow(Error);
    })
    it('Method start should work correctly', () => {
        car.start();
        expect(car.isStarted).toBe(true);
        expect(()=>car.start()).toThrow(Error);
    })
    it('Method shutDownEngine should work correctly', () => {
        const car = new Car;
        expect(() => car.shutDownEngine()).toThrow(Error('Машина ещё не заведена'));
        car.start();
        car.shutDownEngine();
        expect(car.isStarted).toBe(false);
        expect(()=>car.shutDownEngine()).toThrow(Error('Машина ещё не заведена'));
    })
    it('Method fillUpGasTank should work correctly', () => {
        const car = new Car;
        car.maxFuelVolume = 6;
        expect(()=>car.fillUpGasTank('Заливаем воду')).toThrow(Error('Неверное количество топлива для заправки'));
        const car2 = new Car();
        car2.maxFuelVolume = 6;
        car2.fillUpGasTank(3);
        expect(car2.currentFuelVolume).toBe(3);
        expect(() => car.fillUpGasTank(10)).toThrow(Error('Топливный бак переполнен'));
    })
    it('Drive should work correctly', () => {
        const car = new Car();
        expect(() =>car.drive('Сломан мотор', 3) ).toThrow(Error('Машина должна быть заведена, чтобы ехать'));
        car.start();
        car.maxSpeed = 200;
        expect(() =>car.drive('Сломан мотор', 3) ).toThrow(Error('Неверная скорость'));
        expect(() => car.drive(110, 'Назад в будущее')).toThrow(Error('Неверное количество часов'));
        car.fuelConsumption = 5;
        expect(()=>car.drive(500, 3)).toThrow(Error('Машина не может ехать так быстро'));
        expect(()=> car.drive(200, 40)).toThrow(Error('Недостаточно топлива'));
        car.maxFuelVolume = 20;
        car.fillUpGasTank(16);
        car.drive(100, 3);
        expect(car.mileage).toBe(300);
    })
})
