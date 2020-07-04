import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

type CompleteMeta = {
  done: boolean
}

type Meta = CompleteMeta

declare global {
  type BaseFSA<TPayload extends any = undefined> = {
    type: string
    payload?: TPayload
    meta: Meta
  }

  type InitiatorFSA<TPayload> = BaseFSA<TPayload> & {
    meta: { done: false }
  }

  type SuccessFSA<TPayload> = BaseFSA<TPayload> & {
    payload: TPayload
    meta: { done: true }
  }

  type ErrorFSA<TPayload> = BaseFSA<TPayload> & {
    payload: TPayload
    error: true
  }

  type FSA<
    TInitiator extends any = undefined,
    TSuccessPayload extends any = undefined,
    TErrorPayload extends any = undefined
  > = InitiatorFSA<TInitiator> | SuccessFSA<TSuccessPayload> | ErrorFSA<TErrorPayload>

  type MrxAction = Action | FSA

  type GraphQLResponse<Keys extends string, T> = {
    data: {
      data?: { [k in Keys]: T }
      errors?: [{ message: string }]
    }
  }

  type MrxThunk<ActionType extends Action<string>, ReturnType = void> = ThunkAction<
    ReturnType,
    ReduxState,
    null,
    ActionType
  >

  type AlertsTypeEnum = 'ERROR' | 'WARN' | 'INFO'
  type SiteTypeEnum = 'LANDING' | 'TEMPLATE'

  type AutoresponderTypeEnum =
    | 'ORDER_CANCELLATION'
    | 'ORDER_CONFIRMATION'
    | 'ORDER_PARTIAL_REFUND'
    | 'SHIPPING_CONFIRMATION'
    | 'PARTIAL_ORDER'

  type SettingTypeEnum =
    | 'BOOLEAN'
    | 'INTEGER'
    | 'FLOAT'
    | 'STRING'
    | 'SELECT'
    | 'CAMPAIGN'
    | 'LANDING_PRODUCT'
    | 'PAYMENT_SYSTEM'
    | 'IMAGE'

  type AssetOwnerEnum = SiteTypeEnum | 'PAGE' | 'PRODUCT' | 'TSHIRT_VARIANT'
  type SettingOwnerEnum = SiteTypeEnum | 'PAGE' | 'AUTORESPONDER'

  type TaskStatusEnum = 'NEW' | 'PROCESSED' | 'COMPLETED' | 'IN_PROGRESS' | 'CANCELED'
  type TaskTypeEnum =
    | 'DEPLOY_LANDING'
    | 'ARCHIVE_LANDING'
    | 'RENEW_LANDING_SSL'
    | 'REQUEST_AWS_CERTIFICATE'
    | 'SEND_ORDER_CANCELLATION_EMAIL'
    | 'SEND_ORDER_PARTIAL_REFUND_EMAIL'
    | 'SEND_ORDER_TO_FULFILLMENT'
    | 'SEND_ORDER_CONFIRMATION_EMAIL'
    | 'SEND_SHIPPING_CONFIRMATION_EMAIL'
    | 'SEND_PARTIAL_ORDER_EMAIL'

  type TaskOwnerEnum = 'LANDING' | 'ORDER'

  type SelectOption = {
    id: string
    name: string
  }
}
