import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// （補足）Guardが適用されたリクエストハンドラはjwt認証を通過していない場合は実行されない
// JwtAuthGuardはjwtのAuthGuardであることを明示的に示すために定義したクラスであり、必須ではない。
// 中身が空なので、実体は親であるAuthGuard('jwt')の別名のようなもの
// items.controller.tsの@UseGuardsの中身のJwtAuthGuardをAuthGuard('jwt')に書き換えても問題ない。