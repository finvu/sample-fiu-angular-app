export interface ConsentRequest {
  custId: String
  consentPurposeCode: String
  consentDescription: String
  dateTimeRangeFrom: any
  dateTimeRangeTo: Date
}
