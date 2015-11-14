let Tab = { };

Tab.getAudible = (callback) => {
	chrome.tabs.query({
		audible: true
	}, callback);
};

Tab.setMute = (tabId, muted, callback) => {
	chrome.tabs.update(tabId, {
		muted: muted
	}, callback);
};

Tab.getTarget = (operation, callback) => {
	switch(operation) {
	case 'unmute-all':
		chrome.tabs.query({
			muted: true
		}, callback);
		break;
	case 'mute-all':
		chrome.tabs.query({
			audible: true,
			muted: false
		}, callback);
		break;
	case 'mute-other':
		chrome.tabs.query({
			audible: true,
			muted: false
		}, (tabs) => {
			let targets = [ ];

			for (let i = 0; i < tabs.length; i++) {
				if (!tabs[i].highlighted) {
					targets.push(tabs[i]);
				}
			}

			callback(targets);
		});
		break;
	}
};

export default {
	Tab: Tab
};
