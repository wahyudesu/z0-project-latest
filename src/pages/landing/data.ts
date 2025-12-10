export interface Feature {
	icon: string;
	title: string;
	description: string;
}

export interface Command {
	command: string;
	description: string;
}

export const features: Feature[] = [
	{
		icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
		</svg>`,
		title: 'Tag All',
		description: 'Mention semua anggota grup dengan mudah menggunakan perintah /tagall',
	},
	{
		icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
		</svg>`,
		title: 'AI Assistant',
		description: 'Tanya AI tentang tugas dan kuliah dengan perintah /ai',
	},
	{
		icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
		</svg>`,
		title: 'Pantun & Doa',
		description: 'Dapatkan pantun dan doa harian dengan perintah /pantun dan /doaharian',
	},
	{
		icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
		</svg>`,
		title: 'Bitcoin Price',
		description: 'Cek harga Bitcoin terkini dalam IDR dan USD dengan /bitcoin',
	},
	{
		icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
		</svg>`,
		title: 'Math Quiz',
		description: 'Latihan matematika dengan kuis interaktif menggunakan /math',
	},
	{
		icon: `<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
		</svg>`,
		title: 'Toxic Detection',
		description: 'Deteksi dan peringatkan pesan toxic secara otomatis',
	},
];

export const commands: Command[] = [
	{ command: '/tagall', description: 'Mention semua anggota grup' },
	{ command: '/ai <pertanyaan>', description: 'Tanya AI tentang tugas/kuliah' },
	{ command: '/pantun', description: 'Dapatkan pantun acak' },
	{ command: '/doaharian', description: 'Dapatkan doa harian' },
	{ command: '/bitcoin', description: 'Cek harga Bitcoin' },
	{ command: '/math', description: 'Latihan matematika' },
	{ command: '/dev', description: 'Info developer' },
	{ command: '/help', description: 'Tampilkan bantuan' },
];
