const {
	default: makeWASocket,
	BufferJSON,
	useMultiFileAuthState,
	useSingleFileAuthState,
	DisconnectReason,
  fetchLatestBaileysVersion,
  jidNormalizedUser,
	delay
} = require("@adiwajshing/baileys");
const axios = require("axios");
const fs = require('fs');
const chalk = require("chalk");
async function logdata(){
const { version, isLatest } = await fetchLatestBaileysVersion(); // WA Web version checking
const l = console.log
l('WA Bot Starting...');
l(`📟 Currently using Web WA: ${version.join(".")}v, 📋 Latest: ${isLatest}`)}
logdata()
async function startMultiDeviceQrGen() {

	const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys')

	const sock = makeWASocket({
		printQRInTerminal: true,
		browser: ['Astro-MD', 'Web', 'v2'],
		auth: state
	});

	await sock.ev.on('creds.update', saveCreds);

	sock.ev.on('connection.update', async (update) => {

		let _a, _b;
		let connection = update.connection, lastDisconnect = update.lastDisconnect;

		if (connection == 'connecting') {
			console.log(`${chalk.redBright.bold('⛓️')}${chalk.whiteBright.bold(' Connecting to WhatsApp Web...')}`);
		};

		if (connection == 'open') {

			console.log(`${chalk.redBright.bold('📡')}${chalk.whiteBright.bold(' Successfully connected to WhatsApp Web')}`);
			await delay(600);
      const botNumberJid = jidNormalizedUser(sock.user.id);
                    const { upload } = require('./functions/mega')
                    const stream = fs.createReadStream('./auth_info_baileys/creds.json');
                    const sessionURL = await upload(stream, `${botNumberJid}.json`);
                  const sessiond = sessionURL.replace('https://mega.nz/file/','')
                  const fsession = 'ASTRO='+sessiond
                    console.log('Your\'e Session-ID ===> ' +fsession)
                    await sock.sendMessage(botNumberJid, { text: fsession });
                    fs.unlinkSync('./auth_info_baileys/creds.json')
                     process.exit(0);
                    await delay(100);

		}
		if (connection == 'close') {
			if (((_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut) {
				startMultiDeviceQrGen()
			} else {
				console.log(chalk.Red("❌ Couldn't connect to whatsapp!"));
				await delay(600);
				process.exit(0);
			};

		};

	});

};

startMultiDeviceQrGen()