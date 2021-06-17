import { Readable } from 'stream'
import path from 'path'
import {
    transform,
    Loader
} from 'esbuild'
// mainly read stream from ctx.body to get complete content
export async function readBody(stream: any) {
    if (stream instanceof Readable) {
        return new Promise((resolve, reject) => {
            let res = '';
            stream.on('data', (data) => res += data);
            stream.on('end', () => resolve(res));
            stream.on('error', (e) => reject(e));
        })
    } else {
        return stream.toString();
    }
}

export async function transformWithEsbuild(code: string, filename: string, options? : { loader: Loader }) {
    const ext = path.extname(filename)
    let loader = ext.slice(1)
    if (loader === 'cjs' || loader === 'mjs') {
        loader = 'js'
    }

    const resolvedOptions = {
        loader: loader as Loader,
        ...options
    }

    const result = await transform(code, resolvedOptions)
    return {
        ...result
    }
}