import $ from 'jquery';
import { Tab } from './data';
import Render from './render';

$(() => {
	Render.init();

	Tab.getAudible(Render.tab);

	$(document).on('click', '.tab', function() {
		let tabId = parseInt($(this).attr('data-tabId'));
		let muted = $(this).hasClass('tab-muted');

		Tab.setMute(tabId, !muted, Render.stateChange);
	});

	$(document).on('click', '.button', function() {
		let id = $(this).attr('id');

		Tab.getTarget(id, (tabs) => {
			for (let i = 0; i < tabs.length; i++) {
				Tab.setMute(tabs[i].id, !tabs[i].mutedInfo.muted, Render.stateChange);
			}
		});
	});

	$(document).on('mouseover', '.button', function() {
		let id = $(this).attr('id');

		Tab.getTarget(id, Render.dryRun);
	});

	$(document).on('mouseout', '.button', Render.mouseOut);
});
