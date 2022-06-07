/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';
import { LAppLive2DManager } from './lapplive2dmanager';
import { modelControl } from './components/modelControl';

/**
 * changken
 */
const renderCubismModel = () => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize() == false) {
    return;
  }

  LAppDelegate.getInstance().run();
}

/**
 * ブラウザロード後の処理
 */
window.onload = (): void => {
  renderCubismModel();

  //初始化當前hash的角色
  // if(LAppDefine.displayMode && location.hash){
  //   const no = parseInt(location.hash.split("#/")[1]);
  //   modelControl(no, 0.5, -0.1, 1.1);
  // }
};
declare global{
  interface Window{
    changeScene:unknown;
    runModel:unknown;
    modelControl: unknown;
  }
}

// export some function
(window as any).modelControl = (no: number, positionX:number, positionY:number, scale:number) => {
  modelControl(no, positionX, positionY, scale);
}

(window as any).changeScene = (index:number) => {
  LAppLive2DManager.getInstance().changeScene(index);
}

(window as any).runModel = (positionX:number, positionY:number, scale:number)=>{
  LAppDelegate.getInstance().runModel(positionX, positionY, scale);
}

(window as any).startSelectedMotion = (no:number) => {
  LAppLive2DManager.getInstance().startSelectedMotion(no);
}

/**
 * 終了時の処理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * Process when changing screen size.
 */
// window.onresize = () => {
//   if (LAppDefine.CanvasSize === 'auto') {
//     LAppDelegate.getInstance().onResize();
//   }
// };


