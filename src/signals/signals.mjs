import debug from 'debug'

const log = debug('shinkansen-signals/signals')

log('`shinkansen` is awake')

export const ALPHA = 'alpha'
export const OMEGA = 'omega'

export const EMBARK = 'embark'
export const DEBARK = 'debark'

export const CONFIRM = 'confirm'

export const INDEX = 'INDEX'

/**
 *
 *  In practice, `ALPHA_STAGE` and `OMEGA_STAGE` would not be used where routes
 *  are constructed dynamically, while `EMBARK_STAGE` and `DEBARK_STAGE` expect
 *  to be configured
 *
 *    ALPHA_STAGE = 'alpha-stage'
 *    OMEGA_STAGE = 'omega-stage'
 *
 *    ALPHA_PATTERN = '/:alpha'
 *    OMEGA_PATTERN = '/:alpha/:omega'
 *
 *    ALPHA_ROUTE = '/alpha-stage'
 *    OMEGA_ROUTE = '/alpha-stage/omega-stage'
 *
 *    EMBARK_STAGE = 'embark-stage'
 *    DEBARK_STAGE = 'debark-stage'
 *
 *    EMBARK_PATTERN = '/:embark'
 *    DEBARK_PATTERN = '/:debark'
 *
 *    EMBARK_ROUTE = '/embark-stage'
 *    DEBARK_ROUTE = '/debark-stage'
 */

export const ALPHA_STAGE = 'alpha-stage'
export const OMEGA_STAGE = 'omega-stage'

export const EMBARK_STAGE = 'embark-stage'
export const DEBARK_STAGE = 'debark-stage'

export const CONFIRM_STAGE = 'confirm-stage'

export const ALPHA_PATTERN = '/:alpha'
export const OMEGA_PATTERN = '/:alpha/:omega'

export const EMBARK_PATTERN = '/:embark'
export const DEBARK_PATTERN = '/:debark'

export const CONFIRM_PATTERN = '/:confirm'

export const ENTER_ALPHA = 'ENTER_ALPHA'
export const LEAVE_ALPHA = 'LEAVE_ALPHA'

export const CHANGE_ALPHA = 'CHANGE_ALPHA'
export const REMAIN_ALPHA = 'REMAIN_ALPHA'

export const ENTER_OMEGA = 'ENTER_OMEGA'
export const LEAVE_OMEGA = 'LEAVE_OMEGA'

export const CHANGE_OMEGA = 'CHANGE_OMEGA'
export const REMAIN_OMEGA = 'REMAIN_OMEGA'

export const ENTER_ALPHA_ENTER_OMEGA = 'ENTER_ALPHA_ENTER_OMEGA'
export const LEAVE_ALPHA_LEAVE_OMEGA = 'LEAVE_ALPHA_LEAVE_OMEGA'

export const CHANGE_ALPHA_ENTER_OMEGA = 'CHANGE_ALPHA_ENTER_OMEGA'
export const CHANGE_ALPHA_LEAVE_OMEGA = 'CHANGE_ALPHA_LEAVE_OMEGA'

export const REMAIN_ALPHA_ENTER_OMEGA = 'REMAIN_ALPHA_ENTER_OMEGA'
export const REMAIN_ALPHA_LEAVE_OMEGA = 'REMAIN_ALPHA_LEAVE_OMEGA'

export const CHANGE_ALPHA_CHANGE_OMEGA = 'CHANGE_ALPHA_CHANGE_OMEGA'
export const CHANGE_ALPHA_REMAIN_OMEGA = 'CHANGE_ALPHA_REMAIN_OMEGA'

export const REMAIN_ALPHA_CHANGE_OMEGA = 'REMAIN_ALPHA_CHANGE_OMEGA'
export const REMAIN_ALPHA_REMAIN_OMEGA = 'REMAIN_ALPHA_REMAIN_OMEGA'

export const EXCEPTION = 'EXCEPTION'

export const FAILURE = 0
export const SUCCESS = 1
export const IN_PROGRESS = 3
export const UNKNOWN = 4
export const COMPLETE = 5

export default {
  ALPHA,
  OMEGA,

  EMBARK,
  DEBARK,

  CONFIRM,

  INDEX,

  ALPHA_STAGE,
  OMEGA_STAGE,

  EMBARK_STAGE,
  DEBARK_STAGE,

  CONFIRM_STAGE,

  ALPHA_PATTERN,
  OMEGA_PATTERN,

  EMBARK_PATTERN,
  DEBARK_PATTERN,

  CONFIRM_PATTERN,

  ENTER_ALPHA,
  LEAVE_ALPHA,

  CHANGE_ALPHA,
  REMAIN_ALPHA,

  ENTER_OMEGA,
  LEAVE_OMEGA,

  CHANGE_OMEGA,
  REMAIN_OMEGA,

  ENTER_ALPHA_ENTER_OMEGA,
  LEAVE_ALPHA_LEAVE_OMEGA,

  CHANGE_ALPHA_ENTER_OMEGA,
  CHANGE_ALPHA_LEAVE_OMEGA,

  REMAIN_ALPHA_ENTER_OMEGA,
  REMAIN_ALPHA_LEAVE_OMEGA,

  CHANGE_ALPHA_CHANGE_OMEGA,
  CHANGE_ALPHA_REMAIN_OMEGA,

  REMAIN_ALPHA_CHANGE_OMEGA,
  REMAIN_ALPHA_REMAIN_OMEGA,

  EXCEPTION,

  FAILURE,
  SUCCESS,
  IN_PROGRESS,
  UNKNOWN,
  COMPLETE
}
