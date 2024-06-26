import {exec} from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
export class PngCompress {
    mPngRootPath: string = "D:/Tools/nginx-1.25.4/html/tt2/assets/app_lobby";
    mExeToolsPath: string = "";
    // 存储找到的 PNG 文件路径
    mPngFiles: string[] = [];

    getPngFiles(dir: string): string[] {
        let pngFiles: string[] = [];
    
        // 读取目录中的所有文件和子目录
        const files = fs.readdirSync(dir);
    
        files.forEach(file => {
            const filePath = path.join(dir, file);
    
            // 获取文件状态
            const stat = fs.statSync(filePath);
    
            if (stat.isDirectory()) {
                // 如果是目录，递归查找
                pngFiles = pngFiles.concat(this.getPngFiles(filePath));
            } else if (stat.isFile() && path.extname(file).toLowerCase() === '.png') {
                // 如果是PNG文件，添加到结果列表中
                pngFiles.push(filePath);
            }
        });
    
        return pngFiles;
    }
    

    start() {
        let pngFiles = this.getPngFiles(this.mPngRootPath);
        pngFiles.forEach(file=>{
            
            let cmd = `pngquant\\pngquant.exe --quality=20-60 --skip-if-larger --ext=.png --force ${file}`;
            console.log(cmd);
            exec(cmd);
        })

    }

}