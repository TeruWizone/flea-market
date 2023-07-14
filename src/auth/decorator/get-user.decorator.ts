import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// カスタムデコレータ
//
// コールバックではデコレータとして呼び出される引数が入るが、使わないときは"_"
// ExecutionContext: 
//     ハンドラに渡されたリクエスト取得、実行中のハンドラが属するコントローラクラスの型を取得など
//     実行中の一連の処理に関する情報取得に使う
export const GetUser = createParamDecorator( (_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();  // リクエスト情報取得(http,RPC,WebSocket等のコンテキストがある。今はhttp)
  return request.user;
});
