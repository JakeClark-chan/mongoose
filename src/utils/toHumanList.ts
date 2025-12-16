import { config } from '@/index';

export default function (list: string[], conjunction?: string): string {
  let sentence = '';

  conjunction = conjunction ? conjunction : config.i18n.global.t('sui.and');

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    sentence += item;

    if (i < list.length - 2) {
      sentence += ', ';
    } else if (i == list.length - 2) {
      sentence += ' ' + conjunction + ' ';
    }
  }

  return sentence;
}
