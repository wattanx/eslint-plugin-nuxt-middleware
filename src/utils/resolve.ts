import fs from 'fs';
import path from 'path';

export const resolve = (middlewareDir: string, middlewareFile: string) => {
  const isJsExist = fs.existsSync(
    path.resolve(middlewareDir, middlewareFile + '.js')
  );

  const isTsExist = fs.existsSync(
    path.resolve(middlewareDir, middlewareFile + '.ts')
  );

  return isJsExist || isTsExist;
};
