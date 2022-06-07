/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismFramework, Option } from '@framework/live2dcubismframework';

import * as LAppDefine from './lappdefine';
import { LAppLive2DManager } from './lapplive2dmanager';
import { LAppPal } from './lapppal';
import { LAppTextureManager } from './lapptexturemanager';
import { LAppView } from './lappview';

// Import the functions you need from the SDKs you need
/*import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  getDoc
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBPuCHLBYNPwKewtXFwyGENY9t8I6AEjhI',
  authDomain: 'moe-new-project.firebaseapp.com',
  projectId: 'moe-new-project',
  storageBucket: 'moe-new-project.appspot.com',
  messagingSenderId: '810076068524',
  appId: '1:810076068524:web:60eb94eea03ef128199d09',
  measurementId: 'G-NDTNK4M0QD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);*/

export let canvas: HTMLCanvasElement = null;
export let s_instance: LAppDelegate = null;
export let gl: WebGLRenderingContext = null;
export let frameBuffer: WebGLFramebuffer = null;

/**
 * アプリケーションクラス。
 * Cubism SDKの管理を行う。
 */
export class LAppDelegate {
  /**
   * クラスのインスタンス（シングルトン）を返す。
   * インスタンスが生成されていない場合は内部でインスタンスを生成する。
   * 單利模式
   *
   * @return クラスのインスタンス
   */
  public static getInstance(): LAppDelegate {
    if (s_instance == null) {
      s_instance = new LAppDelegate();
    }

    return s_instance;
  }

  /**
   * クラスのインスタンス（シングルトン）を解放する。
   * 釋放class
   */
  public static releaseInstance(): void {
    if (s_instance != null) {
      s_instance.release();
    }

    s_instance = null;
  }

  /**
   * APPに必要な物を初期化する。
   * 初始化app
   */
  public initialize(): boolean {
    // キャンバスの作成
    //生成canvas
    canvas = document.createElement('canvas');
    canvas.id = 'live2D';
    //定義canvas大小
    if (LAppDefine.CanvasSize === 'auto') {
      this._resizeCanvas();
    } else {
      canvas.width = LAppDefine.CanvasSize.width;
      canvas.height = LAppDefine.CanvasSize.height;
    }

    // glコンテキストを初期化 初始化webgl
    // @ts-ignore
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    //初始化webgl失敗所做的邏輯
    if (!gl) {
      alert('Cannot initialize WebGL. This browser does not support.');
      gl = null;

      document.body.innerHTML = 'This browser does not support the <code>&lt;canvas&gt;</code> element.';
      // renderDom.innerHTML = 'This browser does not support the <code>&lt;canvas&gt;</code> element.';

      // gl初期化失敗
      return false;
    }

    //append canvas
    // キャンバスを DOM に追加
    document.body.appendChild(canvas);
    // if(Array.isArray(renderDom)){
    //   renderDom.forEach((v) => {
    //     v.appendChild(canvas);
    //     console.log(v)
    //   });
    // }else{
    //   renderDom.appendChild(canvas);
    // }
    // renderDom.appendChild(canvas);


    //frameBuffer為null的話 就從gl取得資料
    if (!frameBuffer) {
      frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    }

    // 透過設定
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const supportTouch: boolean = 'ontouchend' in canvas;

    if (supportTouch) {
      // タッチ関連コールバック関数登録
      //註冊觸摸callback函數
      canvas.ontouchstart = onTouchBegan;
      canvas.ontouchmove = onTouchMoved;
      canvas.ontouchend = onTouchEnded;
      canvas.ontouchcancel = onTouchCancel;
    } else {
      // マウス関連コールバック関数登録
      //註冊鼠標callback函數
      canvas.onmousedown = onClickBegan;
      canvas.onmousemove = onMouseMoved;
      window.onmousemove = onMouseMoved;
      canvas.onmouseup = onClickEnded;
    }

    // AppViewの初期化
    // appview初始化
    this._view.initialize();

    // Cubism SDKの初期化
    // cubism sdk初始化
    this.initializeCubism();

    return true;
  }

  /**
   * Resize canvas and re-initialize view.
   * 縮放canvas和從初始化view
   */
  public onResize(): void {
    if(canvas){
      this._resizeCanvas();
      this._view.initialize();
      this._view.initializeSprite();
    }
  }

  /**
   * 解放する。
   * 釋放cubism
   */
  public release(): void {
    this._textureManager.release();
    this._textureManager = null;

    this._view.release();
    this._view = null;

    // リソースを解放 釋放instance
    LAppLive2DManager.releaseInstance();

    // Cubism SDKの解放 sdk釋放
    CubismFramework.dispose();
  }

  /**
   * 実行処理。
   * 實作處理
   */
  public run(): void {
    // メインループ
    const loop = (): void => {

      // mouth
      // let rangeEl = document.querySelector('input[type=range]') as HTMLInputElement;

      // let rangeValue = parseInt(rangeEl.value);
      let rangeValue = 0;
      //先傳到lapp delegate的view的參數
      LAppDelegate.getInstance()._view.mouthX = 0;
      LAppDelegate.getInstance()._view.mouthY = rangeValue / 100;
      //console.log(rangeValue);

      // インスタンスの有無の確認
      //instance是否為null
      if (s_instance == null) {
        return;
      }

      // 時間更新
      LAppPal.updateTime();

      // 画面の初期化
      //畫面初始化
      gl.clearColor(0.0, 0.0, 0.0, 0.0);

      // 深度テストを有効化
      //深度測試
      gl.enable(gl.DEPTH_TEST);

      // 近くにある物体は、遠くにある物体を覆い隠す
      //近處的物體遮擋遠處的物體
      gl.depthFunc(gl.LEQUAL);

      // カラーバッファや深度バッファをクリアする
      //清除顏色和深度緩衝區
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.clearDepth(1.0);

      // 透過設定
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // 描画更新
      // 畫布更新
      this._view.render();

      // ループのために再帰呼び出し
      //遞迴調用循環
      requestAnimationFrame(loop);
    };
    loop();
  }

  /**
   * runModel
   * 
   * @author changken
   */
  public runModel(positionX:number, positionY:number, scale:number) {
    const loop = ():void=>{
      // mouth
      // let rangeEl = document.querySelector('input[type=range]') as HTMLInputElement;

      // let rangeValue = parseInt(rangeEl.value);
      let rangeValue = 0;
      //先傳到lapp delegate的view的參數
      LAppDelegate.getInstance()._view.mouthX = 0;
      LAppDelegate.getInstance()._view.mouthY = rangeValue / 100;
      //console.log(rangeValue);

      // インスタンスの有無の確認
      //instance是否為null
      if (s_instance == null) {
        return;
      }

      // 時間更新
      LAppPal.updateTime();

      // 画面の初期化
      //畫面初始化
      gl.clearColor(0.0, 0.0, 0.0, 0.0);

      // 深度テストを有効化
      //深度測試
      gl.enable(gl.DEPTH_TEST);

      // 近くにある物体は、遠くにある物体を覆い隠す
      //近處的物體遮擋遠處的物體
      gl.depthFunc(gl.LEQUAL);

      // カラーバッファや深度バッファをクリアする
      //清除顏色和深度緩衝區
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.clearDepth(1.0);

      // 透過設定
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      // 描画更新
      // 畫布更新
      this._view.renderModel(positionX, positionY, scale);
    
      // 取消recursive
      cancelAnimationFrame(0);
      //開斯! 再來個recursive
      requestAnimationFrame(loop);
    }
    loop();
  }

  /**
   * シェーダーを登録する。
   * 註冊著色器
   */
  public createShader(): WebGLProgram {
    // バーテックスシェーダーのコンパイル
    const vertexShaderId = gl.createShader(gl.VERTEX_SHADER);

    if (vertexShaderId == null) {
      LAppPal.printMessage('failed to create vertexShader');
      return null;
    }

    const vertexShader: string =
      'precision mediump float;' +
      'attribute vec3 position;' +
      'attribute vec2 uv;' +
      'varying vec2 vuv;' +
      'void main(void)' +
      '{' +
      '   gl_Position = vec4(position, 1.0);' +
      '   vuv = uv;' +
      '}';

    gl.shaderSource(vertexShaderId, vertexShader);
    gl.compileShader(vertexShaderId);

    // フラグメントシェーダのコンパイル
    const fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);

    if (fragmentShaderId == null) {
      LAppPal.printMessage('failed to create fragmentShader');
      return null;
    }

    const fragmentShader: string =
      'precision mediump float;' +
      'varying vec2 vuv;' +
      'uniform sampler2D texture;' +
      'void main(void)' +
      '{' +
      '   gl_FragColor = texture2D(texture, vuv);' +
      '}';

    gl.shaderSource(fragmentShaderId, fragmentShader);
    gl.compileShader(fragmentShaderId);

    // プログラムオブジェクトの作成
    const programId = gl.createProgram();
    gl.attachShader(programId, vertexShaderId);
    gl.attachShader(programId, fragmentShaderId);

    gl.deleteShader(vertexShaderId);
    gl.deleteShader(fragmentShaderId);

    // リンク
    gl.linkProgram(programId);

    gl.useProgram(programId);

    return programId;
  }

  /**
   * View情報を取得する。
   * 取得view資訊
   */
  public getView(): LAppView {
    return this._view;
  }

  public getTextureManager(): LAppTextureManager {
    return this._textureManager;
  }

  /**
   * コンストラクタ
   * constructor
   */
  constructor() {
    this._captured = false;
    this._mouseX = 0.0;
    this._mouseY = 0.0;
    this._isEnd = false;

    this._cubismOption = new Option();
    this._view = new LAppView();
    this._textureManager = new LAppTextureManager();
  }

  /**
   * Cubism SDKの初期化
   * Cubism SDK初始化
   */
  public initializeCubism(): void {
    // setup cubism
    this._cubismOption.logFunction = LAppPal.printMessage;
    this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
    CubismFramework.startUp(this._cubismOption);

    // CubismFramework.dispose();
    // initialize cubism
    CubismFramework.initialize();

    // load model
    LAppLive2DManager.getInstance();

    LAppPal.updateTime();

    this._view.initializeSprite();
  }

  /**
   * Resize the canvas to fill the screen.
   * 為了填滿銀幕而縮放canvas
   */
  private _resizeCanvas(): void {
    // console.log(canvas);
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    canvas.width = LAppDefine.RenderTargetWidth;
    canvas.height = LAppDefine.RenderTargetHeight;
  }

  _cubismOption: Option; // Cubism SDK Option
  _view: LAppView; // View情報
  _captured: boolean; // クリックしているか //是否點擊
  _mouseX: number; // マウスX座標 //滑鼠x
  _mouseY: number; // マウスY座標 //滑鼠y
  _isEnd: boolean; // APP終了しているか //是否結束
  _textureManager: LAppTextureManager; // テクスチャマネージャー //紋理管理
}

/**
 * クリックしたときに呼ばれる。
 * 點擊時調用
 */
function onClickBegan(e: MouseEvent): void {
  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }
  LAppDelegate.getInstance()._captured = true;

  const posX: number = e.pageX;
  const posY: number = e.pageY;

  LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}

/**
 * マウスポインタが動いたら呼ばれる。
 * 當鼠標移動時調用
 */
function onMouseMoved(e: MouseEvent): void {
  // if (!LAppDelegate.getInstance()._captured) {
  //   return;
  // }

  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }

  // const rect = (e.target as Element).getBoundingClientRect();
  const rect = canvas.getBoundingClientRect();
  //const posX: number = e.clientX - rect.left;
  //const posY: number = e.clientY - rect.top;

  const posX: number = Math.max(e.clientX - rect.left, 0);
  const posY: number = Math.max(0, e.clientY - rect.top);

  LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);

  /*
  const myDoc = doc(db, 'mouse_pointer', 'iUg4MKGEBFSea0JznJwp');

  setInterval(async () =>{
    const docSnap = await getDoc(myDoc);
    console.log(docSnap.data());

    const posX = docSnap.data().x;
    const posY = docSnap.data().y;
    LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
  }, 3000);

  // onSnapshot(myDoc, doc => {
  //   console.log(doc.data());
  //   const posX = doc.data().x;
  //   const posY = doc.data().y;
  //   LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
  // });
  */
}

/**
 * クリックが終了したら呼ばれる。
 * 當點擊結束時調用
 */
function onClickEnded(e: MouseEvent): void {
  LAppDelegate.getInstance()._captured = false;
  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }

  const rect = (e.target as Element).getBoundingClientRect();
  const posX: number = e.clientX - rect.left;
  const posY: number = e.clientY - rect.top;

  LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}

/**
 * タッチしたときに呼ばれる。
 * 觸摸開始時調用
 */
function onTouchBegan(e: TouchEvent): void {
  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }

  LAppDelegate.getInstance()._captured = true;

  const posX = e.changedTouches[0].pageX;
  const posY = e.changedTouches[0].pageY;

  LAppDelegate.getInstance()._view.onTouchesBegan(posX, posY);
}

/**
 * スワイプすると呼ばれる。
 * 觸摸移動時調用
 */
function onTouchMoved(e: TouchEvent): void {
  if (!LAppDelegate.getInstance()._captured) {
    return;
  }

  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }

  const rect = (e.target as Element).getBoundingClientRect();

  const posX = e.changedTouches[0].clientX - rect.left;
  const posY = e.changedTouches[0].clientY - rect.top;

  LAppDelegate.getInstance()._view.onTouchesMoved(posX, posY);
}

/**
 * タッチが終了したら呼ばれる。
 * 觸摸結束時調用
 */
function onTouchEnded(e: TouchEvent): void {
  LAppDelegate.getInstance()._captured = false;

  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }

  const rect = (e.target as Element).getBoundingClientRect();

  const posX = e.changedTouches[0].clientX - rect.left;
  const posY = e.changedTouches[0].clientY - rect.top;

  LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}

/**
 * タッチがキャンセルされると呼ばれる。
 * 觸摸取消時調用
 */
function onTouchCancel(e: TouchEvent): void {
  LAppDelegate.getInstance()._captured = false;

  if (!LAppDelegate.getInstance()._view) {
    LAppPal.printMessage('view notfound');
    return;
  }

  const rect = (e.target as Element).getBoundingClientRect();

  const posX = e.changedTouches[0].clientX - rect.left;
  const posY = e.changedTouches[0].clientY - rect.top;

  LAppDelegate.getInstance()._view.onTouchesEnded(posX, posY);
}
