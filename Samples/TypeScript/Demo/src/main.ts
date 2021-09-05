/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';
import { LAppLive2DManager } from './lapplive2dmanager';
import { renderMotions, selectMotion } from './components/render';

// const lAppDelegates = [];

/**
 * changken
 */
// const renderCubismModel = (renderDom) => {
//   lAppDelegates.push(new LAppDelegate());
//   // create the application instance
//   if (lAppDelegates[lAppDelegates.length - 1].initialize(renderDom) == false) {
//     return;
//   }

//   lAppDelegates[lAppDelegates.length - 1].run();
// }
const renderCubismModel = (renderDom) => {
  // create the application instance
  if (LAppDelegate.getInstance().initialize(renderDom) == false) {
    return;
  }

  LAppDelegate.getInstance().run();
}

/**
 * ブラウザロード後の処理
 */
window.onload = (): void => {
  //renderCubismModel([document.querySelector('#slide1'), document.querySelector('#slide2'), document.querySelector('#slide3')]);
  renderCubismModel(document.querySelector('#slide1'));
  //renderCubismModel(document.querySelector('#slide2'));
  //renderCubismModel(document.querySelector('#slide3'));

  // document.querySelector('navigate-left').addEventListener('click', e => {
  //   alert('left');
  // });

  // document.querySelector('navigate-right').addEventListener('click', e => {
  //   alert('right');
  // });

  document.querySelector('.reveal').addEventListener('click', e => {
    const target = e.target as HTMLTextAreaElement;

    // console.log(target.className === 'controls-arrow');

    if (target.className === 'controls-arrow') {
      // LAppLive2DManager.getInstance().changeScene();
      LAppLive2DManager.getInstance().nextScene();
    }
  });

  renderMotions();

  selectMotion(1);
};

/**
 * 終了時の処理
 */
window.onbeforeunload = (): void => LAppDelegate.releaseInstance();

/**
 * Process when changing screen size.
 */
window.onresize = () => {
  if (LAppDefine.CanvasSize === 'auto') {
    LAppDelegate.getInstance().onResize();
  }
};


