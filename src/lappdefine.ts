/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '@framework/live2dcubismframework';

/**
 * Sample Appで使用する定数
 * Sample App使用常數
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 画面
export const ViewScale = 2.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相対パス
//模型
export const ResourcesPath = 'https://changken.github.io/CubismResourcesRepo/';

// モデルの後ろにある背景の画像ファイル
//背景圖片
export const BackImageName = 'back_class_normal.png';

// 歯車
//齒輪
export const GearImageName = 'icon_gear.png';

// 終了ボタン
export const PowerImageName = 'CloseNormal.png';

// モデル定義---------------------------------------------
// モデルを配置したディレクトリ名の配列
// ディレクトリ名とmodel3.jsonの名前を一致させておくこと
// 模型定義 -----------------------------------------
// 放置模型的目錄名稱陣列
// 要匹配目錄名稱和model3.json的名字
// export const ModelDir: string[] = ['Haru', 'Hiyori', 'Mark', 'Natori', 'Rice'];
export const ModelDir: string[] = ['rice_pro_t03', 'mark_movie_pro_t02', 'hiyori_movie_pro_t02', 'natori_pro_t06', 'miara_pro_t03',
 'miku_sample_t04', 'haru_greeter_t03', 'mark_free_t04', 'hiyori_pro_t10', 'ni-j', 
 'Gantzert_Felixander', 'tororo', 'haruto', 'tsumiki', 'unitychan', 
 'chitose', 'Epsilon', 'Haru_normal', 'wanko_touch', 'izumi_illust', 
 'sizuku', 'hibiki', 'simple', 'nietzsche', 'nipsilon',
 'nito', 'nico', 'hijiki', 'koharu', 'Haru', 
 'Hiyori', 'Mark', 'Natori', 'Rice', 'kya ru', 'congyu'];

export const ModelDirSize: number = ModelDir.length;

//展示模式
export const displayMode = true;

// 外部定義ファイル（json）と合わせる
export const MotionGroupAll = 'All';
export const MotionGroupIdle = 'Idle'; // アイドリング idle
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき 輕拍身體時會執行的動作

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// モーションの優先度定数
export const PriorityAll = 1;
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// デバッグ用ログの表示オプション
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
// Framework日誌輸出的級別設置
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export const RenderTargetWidth = 500;
export const RenderTargetHeight = 600;
