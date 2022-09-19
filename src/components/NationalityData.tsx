import { getFlagIcon } from '../../utils/functions';
import { convertToThreeDigitPercent } from '../../utils/functions';
import { countries } from './../data/countries';

const NationalityData = ({
  flag,
  country,
  percent,
}: {
  flag: string;
  country: string;
  percent: number;
}) => {
  return (
    <div className="flex items-start justify-between p-1">
      <div className="flex items-center gap-4">
        <img src={getFlagIcon(flag)} width={50} alt="flag icon" />
        <div>
          <p className="text-sm text-gray-500">{countries[country]}</p>

          <p className="text-2xl font-medium text-gray-900">
            {convertToThreeDigitPercent(percent)}&#37;
          </p>
        </div>
      </div>
    </div>
  );
};

export default NationalityData;
