import { WebHeader } from "./web-header";

export interface WebResponse {
    header: WebHeader
    body: Object
    errors: Array<Object>
}