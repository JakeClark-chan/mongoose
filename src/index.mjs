import debug from 'debug'

const log = debug('shinkansen-signals')

log('`shinkansen` is awake')

export { default as Signals } from './signals/index.mjs'
