// Roleベースの認可を行うカスタムデコレータ（Roleデコレータ）を作成
//
// requestから取得するというようなことはしないので普通の関数で実装。
// 許可したい値をパラメータで受け取れるようにする。ここではstatusesとして文字列配列とした。
//
// SetMetadataを使うことでデコレータに渡された値をKey-Value形式のデータとして登録することができる。
// そのメタデータをGuardの中で取得して認可処理を行う。
//
// Roleデコレータの役割は認可が必要なRoleを受け取りメタデータに登録するというもの

import { SetMetadata } from "@nestjs/common";

export const Role = (...statuses: string[]) => SetMetadata('statuses', statuses);

