import { LAppLive2DManager } from '../lapplive2dmanager';
import { LAppDelegate } from '../lappdelegate';

export const modelControl = (no: number, positionX:number, positionY:number, scale:number):void => {
    const manager = LAppLive2DManager.getInstanceModelControl(no);
    const delegate = LAppDelegate.getInstance();

    delegate.runModel(positionX, positionY, scale);
    manager.changeScene(no);
}