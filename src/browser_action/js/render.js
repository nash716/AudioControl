import $ from 'jquery';

let Render = { };

let toCamelCase = (str) => {
	return str.replace(/-([a-z])/g, ($0, $1) => {
		return $1.toUpperCase();
	});
};

let icons = {
	muted: $('<span>').addClass('fontello').text('A'),
	audible: $('<span>').addClass('fontello').text('B')
};

let makeTab = (tab) => {
	let el = $('<div>');

	el.addClass('tab').addClass('animate');

	if (tab.mutedInfo.muted) {
		el.addClass('tab-muted');
		el.append(icons.muted.clone());
		el.append($('<div>').addClass('tooltip').text(chrome.i18n.getMessage('doUnmute')));
	} else if (tab.audible) {
		el.addClass('tab-audible');
		el.append(icons.audible.clone());
		el.append($('<div>').addClass('tooltip').text(chrome.i18n.getMessage('doMute')));
	}

	if (tab.highlighted) {
		el.addClass('active');
	}

	el.attr('data-tabId', tab.id);
	el.append($('<span>').addClass('title').text(tab.title));
	el.append($('<span>').addClass('url').text(tab.url));

	return el;
}

Render.init = () => {
	$('body').css('width', '360px').css('height', '450px');

	$('.i18n').each(function() {
		$(this).text(chrome.i18n.getMessage(toCamelCase($(this).attr('id'))));
	});
};

Render.dryRun = (tabs) => {
	for (let i = 0; i < tabs.length; i++) {
		$('.tab[data-tabId=' + tabs[i].id + ']').addClass('hover');
	}
}

Render.mouseOut = () => {
	$('.hover').removeClass('hover');
};

Render.tab = (tabs) => {
	let wrapper = $('.tabs');

	wrapper.children().remove();

	if (tabs.length == 0) {
		wrapper.append($('<div>').addClass('no-audible-tabs').text(chrome.i18n.getMessage('noAudibleTabs')));
	} else {
		for (let i = 0; i < tabs.length; i++) {
			wrapper.append(makeTab(tabs[i]));
		}
	}
};

Render.stateChange = (tab) => {
	$('.tab[data-tabId=' + tab.id + ']').before(makeTab(tab)).remove();
};

export default Render;
