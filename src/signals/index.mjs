import debug from 'debug'

import signals from './signals.mjs'

const log = debug('shinkansen-signals/signals')

log('`shinkansen` is awake')

export default Object.freeze(signals)
