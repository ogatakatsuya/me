export function initDarkMode() {
	document.documentElement.classList.add("dark");
	localStorage.theme = "dark";
}

export function isDark() {
	return document.documentElement.classList.contains("dark");
}

export function updateButton() {
	const btn = document.getElementById("toggle-darkmode");
	if (!btn) return;
	btn.textContent = isDark() ? "🌞" : "🌙";
	btn.setAttribute(
		"aria-label",
		isDark() ? "ライトモードに切り替え" : "ダークモードに切り替え",
	);
}

export function setLightMode() {
	localStorage.theme = "light";
	document.documentElement.classList.remove("dark");
}

export function setDarkMode() {
	localStorage.theme = "dark";
	document.documentElement.classList.add("dark");
}

export function setSystemMode() {
	localStorage.removeItem("theme");
	initDarkMode();
}
