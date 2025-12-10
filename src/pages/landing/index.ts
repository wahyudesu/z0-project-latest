import { getHeadHTML, getHeroSection, getFeaturesSection, getCommandsSection, getFooter } from './components';

export function generateLandingPage(): string {
	return `<!DOCTYPE html>
<html lang="id">
<head>
	${getHeadHTML()}
</head>
<body class="bg-gray-50">
	${getHeroSection()}
	${getFeaturesSection()}
	${getCommandsSection()}
	${getFooter()}
</body>
</html>`;
}
