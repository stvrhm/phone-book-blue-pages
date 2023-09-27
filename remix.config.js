/** @type {import('@remix-run/dev').AppConfig} */
export default {
	ignoredRouteFiles: ['**/.*'],
	appDirectory: 'app',
	browserBuildDirectory: 'public/build',
	publicPath: '/build/',
	serverBuildDirectory: 'build',
	serverDependenciesToBundle: [
		/^@mui*/,
		/^@emotion\/*/,
		'@emotion/server',
		'@emotion/utils',
	],
}
