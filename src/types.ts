export const isFSA = (action: MrxAction): action is FSA => {
  return !!(action as FSA).meta || !!(action as ErrorFSA<any>).error || false
}

export const isInitiatorAction = <TInitiatorPayload>(action: MrxAction): action is InitiatorFSA<TInitiatorPayload> => {
  return (isFSA(action) && action.meta && action.meta.done === false) || false
}

export const isSuccessAction = <TSuccessPayload>(action: MrxAction): action is SuccessFSA<TSuccessPayload> => {
  return (isFSA(action) && action.meta && action.meta.done) || false
}

export const isErrorAction = <TErrorPayload>(action: MrxAction): action is ErrorFSA<TErrorPayload> => {
  return isFSA(action) && !!(action as ErrorFSA<TErrorPayload>).error
}
