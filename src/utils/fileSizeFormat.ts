import { config } from '@/index';

export default function (size: number): string {
  const i = Math.floor(Math.log(size) / Math.log(1024));

  const units = [
    config.i18n.global.t('sui.units.b'),
    config.i18n.global.t('sui.units.kb'),
    config.i18n.global.t('sui.units.mb'),
    config.i18n.global.t('sui.units.gb'),
    config.i18n.global.t('sui.units.tb'),
  ];

  return +(size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + units[i];
}
