/**
 * This is an object that represents an alert
 * @property message - type:string
 * @property severity - type:string:"error" | "warning"| "info" | "success"
 * @property notificationDate - type:Date
 */
export interface IAlerts {
    message: string,
    severity: "error" | "warning" | "info" | "success",
    notificationDate: Date
}


