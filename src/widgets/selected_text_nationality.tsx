import { usePlugin, renderWidget, useTracker, SelectionType } from '@remnote/plugin-sdk';
import React from 'react';

export function useDebounce<T>(value: T, msDelay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, msDelay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, msDelay]);
  return debouncedValue;
}

function SelectedTextNationality() {
  const plugin = usePlugin();

  const [nameData, setNameData] = React.useState<string>();

  const searchTerm = useDebounce(
    useTracker(async (reactivePlugin) => {
      const sel = await reactivePlugin.editor.getSelection();
      if (sel?.type == SelectionType.Text) {
        return await plugin.richText.toString(sel.richText);
      } else {
        return undefined;
      }
    }),
    1000
  );

  React.useEffect(() => {
    const getAndSetData = async () => {
      if (!searchTerm) {
        return;
      }
      try {
        const url = 'https://api.nationalize.io?name=';
        const response = await fetch(url + searchTerm, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        const json = await response.json();
        setNameData(Array.isArray(json?.country) ? json?.country : undefined);
      } catch (e) {
        console.log('Error getting info: ', e);
      }
    };

    getAndSetData();
  }, [searchTerm]);

  return <pre>{JSON.stringify(nameData, null, 2)}</pre>;
}

renderWidget(SelectedTextNationality);
