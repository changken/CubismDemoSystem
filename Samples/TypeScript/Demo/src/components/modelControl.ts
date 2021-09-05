import {LAppLive2DManager} from '../lapplive2dmanager';
import { LAppDelegate } from '../lappdelegate';

export const modelControl = (no: number, positionX:number, scale:number):void => {
    const manager = LAppLive2DManager.getInstance();
    const delegate = LAppDelegate.getInstance();

    delegate.runModel(positionX, scale);
    manager.changeScene(no);
}