var cluster = require('cluster');
var config = require('./config');
var child_process = require('child_process');


// 同步处理


//有权限的话可以不用加sudo
console.info('安装工程依赖包....');
child_process.execSync('sudo npm install', {
	stdio: 'inherit'
});

console.info('安装静态工程依赖包....');
child_process.execSync('sudo npm install', {
	stdio: 'inherit',
	cwd: './static',
});

if (config.isOnline) {
	console.info('压缩并发布线上环境静态....');
	child_process.execSync('gulp dist', {
		stdio: 'inherit',
		cwd: './static',
	});
} else {
	console.info('压缩并发布测试环境静态....');
	child_process.execSync('gulp', {
		stdio: 'inherit',
		cwd: './static',
	});
}

console.info('启动中....');
child_process.execSync('node app.js', {
	stdio: 'inherit',
	cwd: './',
});

//建议用pm2守护
// console.info('启动中....');
// child_process.execSync('pm2 start app.js', {
// 	stdio: 'inherit',
// 	cwd: './',
// });