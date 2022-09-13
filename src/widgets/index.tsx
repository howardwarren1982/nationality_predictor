import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerWidget('selected_text_nationality', WidgetLocation.SelectedTextMenu, {
    dimensions: {
      height: 'auto',
      width: '100%',
    },
    widgetTabIcon: 'https://icon-library.com/images/search-icon-free/search-icon-free-4.jpg',
    widgetTabTitle: 'Nationality',
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
