import PIXI from "pixi-sound";
import { SoundData, SoundLibrary } from "./sounds.library";

export default class SoundManager {
    constructor() {
        SoundManager.instance = this;
        SoundLibrary.LIST.forEach(soundData => {
            const fileName = soundData.name + "." + soundData.type;
            PIXI.add(fileName, SoundLibrary.BASE_URL + fileName)
        });
    }

    public playSound = (soundData: SoundData, callback?: Function): void => {
        PIXI.play(soundData.name + "." + soundData.type, {complete: ()=> callback})
    }

    public static instance: SoundManager;
}