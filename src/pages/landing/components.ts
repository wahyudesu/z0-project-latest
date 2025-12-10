import { features, commands } from './data';

export function getHeadHTML(): string {
	return `
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>WhatsApp Bot - Cloudflare Worker</title>
	<script src="https://cdn.tailwindcss.com"></script>
	<style>
		@keyframes float {
			0%, 100% { transform: translateY(0px); }
			50% { transform: translateY(-20px); }
		}
		.animate-float {
			animation: float 3s ease-in-out infinite;
		}
		.gradient-bg {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		}
	</style>
	`;
}

export function getHeroSection(): string {
	return `
	<!-- Hero Section -->
	<div class="gradient-bg min-h-screen flex items-center justify-center px-4">
		<div class="max-w-4xl mx-auto text-center text-white">
			<div class="animate-float mb-8">
				<svg class="w-24 h-24 mx-auto" fill="currentColor" viewBox="0 0 24 24">
					<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
				</svg>
			</div>
			<h1 class="text-5xl md:text-6xl font-bold mb-6">
				WhatsApp Bot
			</h1>
			<p class="text-xl md:text-2xl mb-8 text-gray-200">
				Cloudflare Worker Webhook siap digunakan!
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="#features" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg">
					Lihat Fitur
				</a>
				<a href="#docs" class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition duration-300">
					Dokumentasi
				</a>
			</div>
		</div>
	</div>
	`;
}

export function getFeaturesSection(): string {
	const featuresHTML = features
		.map(
			(feature) => `
		<div class="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300">
			<div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
				${feature.icon}
			</div>
			<h3 class="text-xl font-semibold mb-2 text-gray-800">${feature.title}</h3>
			<p class="text-gray-600">${feature.description}</p>
		</div>
	`
		)
		.join('');

	return `
	<!-- Features Section -->
	<div id="features" class="py-20 bg-white">
		<div class="max-w-6xl mx-auto px-4">
			<h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
				Fitur Bot
			</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				${featuresHTML}
			</div>
		</div>
	</div>
	`;
}

export function getCommandsSection(): string {
	const commandsHTML = commands
		.map(
			(cmd) => `
		<div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
			<code class="bg-purple-100 text-purple-700 px-3 py-1 rounded font-mono">${cmd.command}</code>
			<p class="text-gray-700 flex-1">${cmd.description}</p>
		</div>
	`
		)
		.join('');

	return `
	<!-- Commands Section -->
	<div id="docs" class="py-20 bg-gray-100">
		<div class="max-w-4xl mx-auto px-4">
			<h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
				Daftar Perintah
			</h2>
			<div class="bg-white rounded-xl shadow-lg p-8">
				<div class="space-y-4">
					${commandsHTML}
				</div>
			</div>
		</div>
	</div>
	`;
}

export function getFooter(): string {
	return `
	<!-- Footer -->
	<footer class="bg-gray-800 text-white py-8">
		<div class="max-w-6xl mx-auto px-4 text-center">
			<p class="text-gray-400">
				© 2024 WhatsApp Bot - Powered by Cloudflare Workers
			</p>
		</div>
	</footer>
	`;
}
