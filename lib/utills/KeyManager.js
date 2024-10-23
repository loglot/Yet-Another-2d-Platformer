export class KeyManager{
    pressedKeys = {};

    constructor(){
        for (let charCode = 97; charCode <= 122; charCode++) {
            const letter = String.fromCharCode(charCode);
            this.pressedKeys[letter] = false;
        }
        console.log(this.pressedKeys);
    }

}