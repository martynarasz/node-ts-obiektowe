import {Car} from "./metody_prywatne/car";
import {Lightsource} from "./klasa_do_testow/lightsource";


describe('Lightsource tests', function () {

    it('Lightsource jest w pełni naładowany po stworzeniu', () => {
        let ls = new Lightsource(10, 200);
        expect(ls.get_battery_level()).toEqual(200);
    });

    it('Lightsource jest wyłaczony po stworzeniu', () => {
        let ls = new Lightsource(10, 200);
        expect(ls.get_intensity()).toEqual(0);
    });

    it('Lightsource ma max intensity po stworzeniu i uruchomieniu', () => {
        let ls = new Lightsource(10, 200);
        ls.turn_on();
        expect(ls.get_intensity()).toEqual(10);
    });

    it('Lightsource ma 0 intensity po stworzeniu, uruchomieniu i wyłączeniu', () => {
        let ls = new Lightsource(10, 200);
        ls.turn_on();
        ls.turn_off();
        expect(ls.get_intensity()).toEqual(0);
    });

    it('Lightsource nie świeci jeśli nie ma baterii', () => {
        let ls = new Lightsource(10, 0);
        ls.turn_on();
        expect(ls.get_intensity()).toEqual(0);
    });


});
