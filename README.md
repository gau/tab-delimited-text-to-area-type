# README

タブ区切りで作成された文字から、タブ単位で個別のエリア内文字を作成し、タイル状に並べるIllustrator用のスクリプトです。エリア内文字を使った表組みのベース作りにお使いください。

-----

### 更新履歴

* 0.1.5：内部処理の整理、セルに対して塗りや線を適用するオプションを追加
* 0.1.0：新規作成

-----

### 対応バージョン

* Illustrator CS5／CS6／CC／CC 2014／CC 2015
-----

### インストール方法

1. 右上の「Download ZIP」から圧縮ファイルをダウンロードして解凍します。
1. 以下の場所に、「タブ区切り文字をエリア内文字に変換.jsx」をコピーします。Windows版ではお使いのIllustratorのモードによって保存する場所が異なりますのでご注意ください。
	* 【Mac】/Applications/Adobe Illustrator {バージョン}/Presets/ja_JP/スクリプト/
	* 【Win32】C:\Program Files\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
	* 【Win64】C:\Program Files\Adobe\Adobe Illustrator {バージョン} (64 Bit)\Presets\ja_JP\スクリプト\　または　C:\Program Files (x86)\Adobe\Adobe Illustrator {バージョン}\Presets\ja_JP\スクリプト\
2. Illustratorを再起動します。
3. `ファイル > スクリプト > タブ区切り文字をエリア内文字に変換`と表示されていればインストール成功です。

-----

### 使い方

#### エリア内文字の作成範囲を数値で指定する場合

1. タブ区切りで入力されたテキストオブジェクトを選択します。
2. `ファイル > スクリプト > タブ区切り文字をエリア内文字に変換`を選択します。
3. ダイアログが表示されたら、エリア内文字を作成したい範囲を`幅,高さ`の形（カンマで区切る）で半角英数で入力し［OK］をクリックします。この際の単位は、現在の定規の単位が使われます。単位の指定はできませんので数値だけを入力してください。
4. 現在アクティブなアートボードの左上を基準として、指定された範囲内にエリア内文字がタイル状に作成されます。

#### あらかじめ作成範囲を指定する場合

1. ［長方形ツール］を使って、エリア内文字を作成したい範囲の長方形を作成しておきます。
2. 作成した長方形と、タブ区切りで入力されたテキストオブジェクトを両方選択します。
3. `ファイル > スクリプト > タブ区切り文字をエリア内文字に変換`を選択します。
4. 長方形の大きさに合わせ、エリア内文字がタイル状に作成されます。元の長方形は削除されます。

#### 参考デモ動画（YouTube）

[![動画を見る](http://img.youtube.com/vi/1f-_eooy6cQ/0.jpg)](https://www.youtube.com/watch?v=1f-_eooy6cQ)

-----

### カスタマイズ

スクリプトの前半にある「settings」の値を変更することで、サイズ指定ダイアログの初期値や生成座標、セルに対するスタイルを追加するかをカスタマイズできます。

| 値 | 型 | 初期値 | 内容 |
|:-----------|:------------|:------------|:------------|
| cellX | Number | 0 | アートボード左端からの距離（ピクセル単位） |
| cellY | Number | 0 | アートボード上端からの距離（ピクセル単位） |
| cellWidth | Number | 200 | エリア内文字生成範囲の幅の初期値（ドキュメントの定規の単位） |
| cellHeight | Number | 150 | エリア内文字生成範囲の高さの初期値（ドキュメントの定規の単位） |
| addCellStyle | Boolean | false | trueにすると、エリア内文字のパスに対して線、塗り、余白を設定する |

-----

### 注意

* **データが多い時は処理に時間がかかります。必ず事前にドキュメントを保存してから実行してください。**
* 必要なオブジェクトが選択されていなかったり、余分なものが選択されているときは、警告を表示して処理を中断します。
* サイズ指定のダイアログに不正な値が入力されたときは、警告を表示した上で初期値で実行しようとします。この際、実行か中止を選択できます。
* 生成されるエリア内文字の書式は、元のタブ区切り文字のものをなるべく継承しますが、複数の書式が混在する環境などでは予期しない結果になる可能性があります。
* 元となるタブ区切り文字は、エリア内文字でもポイント文字でも大丈夫です。
* グループ化などの構造が混在しているとうまく動かないことがあります。

-----

### 免責事項 ###

* このスクリプトを使って起こったいかなる現象についても制作者は責任を負えません。すべて自己責任にてお使いください。
* CS5からCC 2015で動作の確認はしましたが、OSのバージョンやその他の状況によって実行できないことがあるかもしれません。もし動かなかったらごめんなさい。

-----

### ライセンス ###

* パターンをリセット.jsx
* Copyright (c) 2015 Toshiyuki Takahashi
* Released under the MIT license
* [http://opensource.org/licenses/mit-license.php](http://opensource.org/licenses/mit-license.php)
* Created by Toshiyuki Takahashi ([Graphic Arts Unit](http://www.graphicartsunit.com/))
* [Twitter](https://twitter.com/gautt)