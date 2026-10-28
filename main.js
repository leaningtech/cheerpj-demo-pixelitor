const CJ_VERSION = 25;
const PIXELITOR_JAR = "Pixelitor-4.3.1.jar";
const WEB_JAR_URL = new URL(PIXELITOR_JAR, document.baseURI).href;
const STR_JAR_PATH = "/str/"+PIXELITOR_JAR;

async function loadJarIntoStrVfs() {
	const resp = await fetch(WEB_JAR_URL);
	if (!resp.ok)
		throw new Error(`Failed to fetch ${WEB_JAR_URL}: ${resp.status} ${resp.statusText}`);
	const buf = await resp.arrayBuffer();
	const u8 = new Uint8Array(buf);
	try {
		cheerpOSAddStringFile(STR_JAR_PATH, u8);
		console.log("Jar added to virtual file system: " + STR_JAR_PATH);
	} catch (err) {
		console.log("Could not add Jar using cherrpOSAddStringFile");
	}
}

async function initCheerpj()
{
	  try {
		await cheerpjInit({
			version: CJ_VERSION,
			enableFullescreen: true,
			preloadResources: {
				"/lt/25/lib/modules":[0,131072,1179648,6815744,6946816,8912896,9437184,10223616,11403264,11665408,11927552,12320768,23068672,23986176,24641536,29753344,30277632,30932992,31064064,31719424,31981568,32243712,33816576,33947648,42860544,42991616,43384832,43515904],
				"/lt/etc/users":[0,131072],
				"/lt/25/jre/lib/cheerpj-handlers.jar":[0,131072],
				"/lt/25/jre/lib/cheerpj-awt.jar":[0,131072],
				"/lt/25/jre/lib/cheerpj-jsobject.jar":[0,131072],
				"/lt/25/lib/tzdb.dat":[0,131072],
				"/lt/25/conf/security/java.security":[0,131072],
				"/lt/fc/fonts/fonts.conf":[0,131072],
				"/lt/fc/ttf/LiberationSans-Regular.ttf":[0,131072,262144,393216],
				"/lt/fc/ttf/LiberationSans-Bold.ttf":[0,131072,262144,393216],
				"/lt/25/lib/currency.properties":[],
				"/lt/25/conf/logging.properties":[0,131072]
			}
		});
		await loadJarIntoStrVfs();
		cheerpjCreateDisplay(-1, -1, document.getElementById('app'));
		await cheerpjRunJar(STR_JAR_PATH, '/app/cheerpj-demo-pixelitor/assets/fish.png');
	  } catch (e) {
		console.error(e);
	}
}

document.addEventListener('DOMContentLoaded', async () => {
	document.getElementById('btn-fullscreen').addEventListener('click', () => {
		const el = document.querySelector('.stage');
		(el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
	});
	document.getElementById("notePixelatorJar").innerHTML = PIXELITOR_JAR;
	document.getElementById("noteCheerpjVersion").innerHTML = CJ_VERSION;
	document.getElementById("headerCheerpjVersion").innerHTML = CJ_VERSION;
	document.getElementById("cheerpjPillHeader").addEventListener('click', () => {
		window.open("https://cheerpj.com", "_blank");
	});
	initCheerpj();
});
