import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
//import { Observable } from 'rxjs';

// Guardとして機能させるためにはCanActivateを用いる
// 補足：JwtAuthGuard では継承した AuthGuard側でCanActivateが実装されている

@Injectable()
export class RolesGuard implements CanActivate {
  // reflector：デコレータでセットしたメタデータを取得するためのもの
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // デコレータでセットされたメタデータを取得
    const requiredStatues = this.reflector.get<string[]>(
      'statuses', // 取得したいメタデータのキー
      ctx.getHandler(), // ハンドラのメタデータを取得
    );

    // デコレータに何も指定されてないときは（制約はないので）実行を許可(true)
    if (!requiredStatues) {
      return true;
    }

    // リクエストのユーザ情報を取得
    const { user } = ctx.switchToHttp().getRequest();
    // ユーザのステータス（役割）がメタデータから取得したいずれかに一致するならば実行を許可（true）
    return requiredStatues.some((status) => user.status.includes(status));
  }
}

// これを使用するためにはauth.moduleに登録する必要がある。
