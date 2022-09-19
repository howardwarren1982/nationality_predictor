import { usePlugin, renderWidget, useTracker, SelectionType } from '@remnote/plugin-sdk';
import React from 'react';
import NationalityData from '../components/NationalityData';

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
      } catch (e: any) {
        console.log('Error getting info: ', e);
        setNameData(e.message);
      }
    };

    getAndSetData();
  }, [searchTerm]);

  return (
    <div className="flex">
      {nameData?.map((data) => {
        return (
          <NationalityData
            flag={data['country_id']}
            country={data['country_id']}
            percent={data['probability']}
          />
        );
      })}
    </div>
  );
}

renderWidget(SelectedTextNationality);
