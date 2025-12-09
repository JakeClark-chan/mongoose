export const __esModule: boolean;
export default PlusBlockStartState;
declare const PlusBlockStartState_base: any;
/**
 * Start of {@code (A|B|...)+} loop. Technically a decision state, but
 * we don't use for code generation; somebody might need it, so I'm defining
 * it for completeness. In reality, the {@link PlusLoopbackState} node is the
 * real decision-making note for {@code A+}
 */
declare class PlusBlockStartState extends PlusBlockStartState_base {
    [x: string]: any;
    stateType: any;
    loopBackState: any;
}
