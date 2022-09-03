// 文件系统最重要的肯定是目录和文件的增删改查啦，我们就先实现这几个常用的功能，有其他需求后面再迭代

var WritableStream = require('stream').Writable;
var fs = require('memfs');

fs.writeFileSync('/hello.txt', 'World!');
fs.readFileSync('/hello.txt', 'utf8');
class MemoryFileSystem {
	constructor() {
			// 存储目录和文件
			this.data = {   // 根目录
					_MEMORY_FILE_SYSTEM_DIR_FLAG: true,
					'tmp': {    // /tmp 目录
							_MEMORY_FILE_SYSTEM_DIR_FLAG: true,
							'package.txt': { foo: 'bar' } // 文件
					},
					'text.txt': 'i am file'   // 文件
			}
	}
	readFile(path) {
			// ...
			return console.log(this.data['text.txt']);
	}
	writeFile(path, content) {
		path = pathToArray(path);
    let current = this.data;
    for(let i = 0; i < path.length - 1; i++) {
        if(!isDir(current[path[i]])) throw new Error()
        current = current[path[i]];
    }
    current[path[path.length - 1]] = new Buffer.from(content);
    return;
	}

	createWriteStream(path) {
		let stream = new WritableStream();
		let bl = [ ], len = 0;
		stream._write = (chunk, encoding, callback) => {
				bl.push(chunk);
				len += chunk.length;
				this.writeFile(path, Buffer.concat(bl, len), callback);
		}
		return stream;
	}

}

function pathToArray(path) {
	path = path.split('/');
	return path;
}

const memoryFileSystem = new MemoryFileSystem();
const reader = fs.createWriteStream("/tmp/file.txt")
process.stdin.pipe(reader)
process.stdin.on('data',(input)=>{
	console.log('input is: ', input.toString())
	console.log('file is: ', fs.tmp['file.txt'])
})

console.log('ss')

memoryFileSystem.readFile();