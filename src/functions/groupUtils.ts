// Function to fetch group participants
export async function getGroupParticipants(baseUrl: string, session: string, chatId: string, apiKey: string) {
	const response = await fetch(`${baseUrl}/api/${session}/groups/${chatId}/participants`, {
		method: 'GET',
		headers: {
			accept: '*/*',
			'X-Api-Key': apiKey,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch participants: ${response.statusText}`);
	}

	const participantsJson = await response.json();
	if (!Array.isArray(participantsJson)) {
		throw new Error('Participants response is not an array');
	}
	// Extract and return only the 'id' values, converting format
	// Use jid (real phone number) if available, fallback to id
	const participantIds = participantsJson.map((participant: any) => {
		const phoneId = participant.jid || participant.id;
		return phoneId.replace('@s.whatsapp.net', '@c.us');
	});
	return participantIds;
}

// Function to mention all group members
export async function mentionAll(baseUrl: string, session: string, chatId: string, apiKey: string) {
	let participants = await getGroupParticipants(baseUrl, session, chatId, apiKey);

	// Filter out specific numbers globally (originally for group: 120363144655427837@g.us)
	participants = participants.filter((id: string) => {
		const phoneNumber = id.replace('@c.us', '').replace('@s.whatsapp.net', '');
		return (
			phoneNumber !== '6285655268926' &&
			phoneNumber !== '6282147200531' &&
			phoneNumber !== '6281230701259' &&
			phoneNumber !== '628885553273' &&
			phoneNumber !== '6281326966110'
		);
	});

	// Buat mention text dengan format @[nomor]
	let mentionText = participants
		.map((id: string) => {
			const phoneNumber = id.replace('@c.us', '').replace('@s.whatsapp.net', '').trim();
			return `@${phoneNumber}`;
		})
		.join(' ');

	// Hapus semua "@lid" dari text sebelum dikirim
	// "@lid" muncul karena format mention WhatsApp, tapi kita hapus sebelum kirim
	mentionText = mentionText.replace(/@lid/gi, '').trim();
	// Hapus spasi ganda yang mungkin muncul setelah menghapus @lid
	mentionText = mentionText.replace(/\s+/g, ' ');

	const response = await fetch(`${baseUrl}/api/sendText`, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'Content-Type': 'application/json',
			'X-Api-Key': apiKey,
		},

		body: JSON.stringify({
			chatId: chatId,
			reply_to: null,
			text: mentionText,
			session: session,
			mentions: participants,
		}),
	});
	const result = await response.json();
	return result;
}

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { participant_group } from '../db/schema';
import { sql } from 'drizzle-orm';

// Function to check if user is admin
export async function isAdmin(
	baseUrl: string,
	session: string,
	chatId: string,
	userId: string,
	apiKey: string,
	db?: any,
): Promise<boolean> {
	try {
		const response = await fetch(`${baseUrl}/api/${session}/groups/${chatId}/participants`, {
			method: 'GET',
			headers: {
				accept: '*/*',
				'X-Api-Key': apiKey,
			},
		});

		if (!response.ok) {
			console.error('Failed to fetch participants for admin check:', response.statusText);
			return false;
		}

		const participantsJson = await response.json();
		if (!Array.isArray(participantsJson)) {
			console.error('Participants response is not an array:', participantsJson);
			return false;
		}

		console.log('Checking admin status for userId:', userId);
		console.log('Participants list:', JSON.stringify(participantsJson, null, 2));

		// Find the user and check if they are admin
		const user = participantsJson.find((p: any) => {
			const phoneId = p.jid || p.id;
			const formattedId = phoneId.replace('@s.whatsapp.net', '@c.us');
			const normalizedUserId = userId.replace('@s.whatsapp.net', '@c.us');

			console.log(`Comparing: ${formattedId} with ${normalizedUserId}`);
			return formattedId === normalizedUserId || p.id === normalizedUserId || phoneId === normalizedUserId;
		});

		console.log('Found user:', user);

		if (!user) {
			console.log('User not found in participants list');
			return false;
		}

		// Additional debug: Check all string values for admin
		const allStringValues = Object.values(user).filter((val) => typeof val === 'string') as string[];
		const containsAdminInString = allStringValues.some(
			(val) => val.toLowerCase().includes('admin') || val.toLowerCase().includes('moderator') || val.toLowerCase().includes('owner'),
		);

		// Check group admin role specifically
		// WhatsApp API typically uses these fields for admin status
		// Focus on most common patterns
		const isAdminRole =
			// Exact matches (most common)
			user.rank === 'admin' ||
			user.rank === 'superadmin' ||
			user.rank === 'Admin' ||
			user.rank === 'SuperAdmin' ||
			user.role === 'admin' ||
			user.role === 'superadmin' ||
			user.role === 'Admin' ||
			user.role === 'SuperAdmin' ||
			user.type === 'admin' ||
			user.type === 'superadmin' ||
			user.type === 'Admin' ||
			user.type === 'SuperAdmin' ||
			// Boolean admin field
			user.admin === true ||
			user.isAdmin === true ||
			// Group specific fields
			user.role === 'group_admin' ||
			user.role === 'GroupAdmin' ||
			user.groupRole === 'admin' ||
			user.groupRole === 'Admin' ||
			user.level === 'admin' ||
			user.level === 'Admin' ||
			// Contains checks (case-insensitive)
			(user.rank && String(user.rank).toLowerCase().includes('admin')) ||
			(user.rank && String(user.rank).toLowerCase().includes('moderator')) ||
			(user.rank && String(user.rank).toLowerCase().includes('owner')) ||
			(user.role && String(user.role).toLowerCase().includes('admin')) ||
			(user.role && String(user.role).toLowerCase().includes('moderator')) ||
			(user.role && String(user.role).toLowerCase().includes('owner')) ||
			(user.type && String(user.type).toLowerCase().includes('admin')) ||
			(user.type && String(user.type).toLowerCase().includes('moderator')) ||
			(user.type && String(user.type).toLowerCase().includes('owner')) ||
			(user.groupRole && String(user.groupRole).toLowerCase().includes('admin')) ||
			(user.groupRole && String(user.groupRole).toLowerCase().includes('moderator')) ||
			(user.groupRole && String(user.groupRole).toLowerCase().includes('owner')) ||
			(user.level && String(user.level).toLowerCase().includes('admin')) ||
			(user.level && String(user.level).toLowerCase().includes('moderator')) ||
			(user.level && String(user.level).toLowerCase().includes('owner')) ||
			// Check ALL string values in the user object
			containsAdminInString;

		console.log('User role fields:', {
			rank: user.rank,
			isAdmin: user.isAdmin,
			admin: user.admin,
			role: user.role,
			type: user.type,
			groupRole: user.groupRole,
			level: user.level,
			// All fields for debugging
			allFields: Object.keys(user),
		});
		console.log('All string values:', allStringValues);
		console.log('Contains admin in string values:', containsAdminInString);
		console.log('Final admin status:', isAdminRole);

		if (isAdminRole) {
			return true;
		}

		// Fallback: Check database if available
		if (db) {
			try {
				const normalizedUserId = userId.replace('@s.whatsapp.net', '@c.us');
				const dbAdmin = await db
					.select()
					.from(participant_group)
					.where(
						sql`${participant_group.id} = ${normalizedUserId} AND ${participant_group.group_id} = ${chatId} AND (${participant_group.role} = 'admin' OR ${participant_group.role} = 'superadmin')`,
					);

				console.log('Database admin check result:', dbAdmin);
				return dbAdmin.length > 0;
			} catch (dbError) {
				console.error('Database admin check failed:', dbError);
			}
		}

		return false;
	} catch (error) {
		console.error('Error checking admin status:', error);
		return false;
	}
}

// Function to kick member (admin only)
export async function kickMember(baseUrl: string, session: string, chatId: string, participantId: string, apiKey: string): Promise<any> {
	console.log(`Attempting to kick member ${participantId} from group ${chatId}`);

	// Try different API endpoints for kicking
	const endpoints = [
		`${baseUrl}/api/${session}/groups/${chatId}/participants/${participantId}`,
		`${baseUrl}/api/${session}/groups/${chatId}/participants/remove`,
		`${baseUrl}/api/${session}/removeParticipant`,
	];

	let lastError: Error | null = null;

	for (const endpoint of endpoints) {
		try {
			console.log(`Trying endpoint: ${endpoint}`);

			let bodyData;
			let headersData: Record<string, string> = {
				accept: '*/*',
				'Content-Type': 'application/json',
				'X-Api-Key': apiKey,
			};

			if (endpoint.includes('/remove')) {
				bodyData = {
					groupId: chatId,
					participantChatId: participantId,
				};
			} else {
				// DELETE method
				delete headersData['Content-Type'];
			}

			const response = await fetch(endpoint, {
				method: endpoint.includes('/remove') ? 'POST' : 'DELETE',
				headers: headersData,
				body: endpoint.includes('/remove') ? JSON.stringify(bodyData) : undefined,
			});

			const result = await response.json();
			console.log(`Response from ${endpoint}:`, result);

			if (response.ok || (result && ((result as any).success || (result as any).addParticipant !== false))) {
				return result;
			}

			lastError = new Error(`Failed with endpoint ${endpoint}: ${JSON.stringify(result)}`);
		} catch (error) {
			console.error(`Error with endpoint ${endpoint}:`, error);
			lastError = error as Error;
		}
	}

	throw lastError || new Error('All kick member endpoints failed');
}

// Function to add member (admin only)
export async function addMember(baseUrl: string, session: string, chatId: string, participantIds: string[], apiKey: string): Promise<any> {
	console.log(`Attempting to add members ${JSON.stringify(participantIds)} to group ${chatId}`);

	// Try different API endpoints for adding members
	const endpoints = [
		`${baseUrl}/api/${session}/groups/${chatId}/participants/add`,
		`${baseUrl}/api/${session}/groups/${chatId}/participants`,
		`${baseUrl}/api/${session}/addParticipant`,
	];

	let lastError: Error | null = null;

	for (const endpoint of endpoints) {
		try {
			console.log(`Trying endpoint: ${endpoint}`);

			let bodyData;
			const headersData: Record<string, string> = {
				accept: '*/*',
				'Content-Type': 'application/json',
				'X-Api-Key': apiKey,
			};

			if (endpoint.includes('/add') || endpoint.includes('/addParticipant')) {
				if (endpoint.includes('/addParticipant')) {
					bodyData = {
						groupId: chatId,
						participantChatId: participantIds[0], // Some APIs only support one at a time
					};
				} else {
					bodyData = {
						participants: participantIds.map((id) => id.replace('@c.us', '')), // Remove @c.us for some APIs
					};
				}
			} else {
				bodyData = {
					participants: participantIds,
				};
			}

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: headersData,
				body: JSON.stringify(bodyData),
			});

			const result = await response.json();
			console.log(`Response from ${endpoint}:`, result);

			if (response.ok || (result && ((result as any).success || (result as any).addParticipant !== false))) {
				return result;
			}

			lastError = new Error(`Failed with endpoint ${endpoint}: ${JSON.stringify(result)}`);
		} catch (error) {
			console.error(`Error with endpoint ${endpoint}:`, error);
			lastError = error as Error;
		}
	}

	throw lastError || new Error('All add member endpoints failed');
}

// Function to close group (admin only)
export async function closeGroup(baseUrl: string, session: string, chatId: string, apiKey: string): Promise<any> {
	console.log(`Attempting to close group ${chatId}`);

	// Try different API endpoints for group settings
	const endpoints = [
		`${baseUrl}/api/${session}/groups/${chatId}/settings`,
		`${baseUrl}/api/${session}/groups/${chatId}`,
		`${baseUrl}/api/${session}/groupSettings`,
	];

	const settingsPayload = {
		announce: true,
		sendMessages: false,
		restrict: true,
		locked: true,
	};

	let lastError: Error | null = null;

	for (const endpoint of endpoints) {
		try {
			console.log(`Trying endpoint: ${endpoint}`);

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					accept: '*/*',
					'Content-Type': 'application/json',
					'X-Api-Key': apiKey,
				},
				body: JSON.stringify(settingsPayload),
			});

			const result = await response.json();
			console.log(`Response from ${endpoint}:`, result);

			if (response.ok || (result && (result as any).success)) {
				return result;
			}

			lastError = new Error(`Failed with endpoint ${endpoint}: ${JSON.stringify(result)}`);
		} catch (error) {
			console.error(`Error with endpoint ${endpoint}:`, error);
			lastError = error as Error;
		}
	}

	throw lastError || new Error('All close group endpoints failed');
}

// Function to open group (admin only)
export async function openGroup(baseUrl: string, session: string, chatId: string, apiKey: string): Promise<any> {
	console.log(`Attempting to open group ${chatId}`);

	// Try different API endpoints for group settings
	const endpoints = [
		`${baseUrl}/api/${session}/groups/${chatId}/settings`,
		`${baseUrl}/api/${session}/groups/${chatId}`,
		`${baseUrl}/api/${session}/groupSettings`,
	];

	const settingsPayload = {
		announce: false,
		sendMessages: true,
		restrict: false,
		locked: false,
	};

	let lastError: Error | null = null;

	for (const endpoint of endpoints) {
		try {
			console.log(`Trying endpoint: ${endpoint}`);

			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					accept: '*/*',
					'Content-Type': 'application/json',
					'X-Api-Key': apiKey,
				},
				body: JSON.stringify(settingsPayload),
			});

			const result = await response.json();
			console.log(`Response from ${endpoint}:`, result);

			if (response.ok || (result && (result as any).success)) {
				return result;
			}

			lastError = new Error(`Failed with endpoint ${endpoint}: ${JSON.stringify(result)}`);
		} catch (error) {
			console.error(`Error with endpoint ${endpoint}:`, error);
			lastError = error as Error;
		}
	}

	throw lastError || new Error('All open group endpoints failed');
}
