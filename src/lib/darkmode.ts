export function initDarkMode() {
	// localStorageにテーマ設定がない場合は、OSの設定に従う
	if (!localStorage.theme) {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (prefersDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	} else {
		// localStorageに設定がある場合は、その設定を適用
		if (localStorage.theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}
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
	// OSの設定に従ってテーマを設定
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	if (prefersDark) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
}

// OSのカラーモード変更を監視
export function watchSystemMode() {
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		// localStorageに設定がない場合のみ、OSの変更に従う
		if (!localStorage.theme) {
			if (e.matches) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			updateButton();
		}
	});
}
