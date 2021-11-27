export class Logger {
    #name: string

    constructor (name: string) {
      this.#name = name
    }

    #format_message (name: string, message: string): string {
      return `${name}: ${message || ''}`
    }

    info (message: string): void {
      console.info(this.#format_message(this.#name, message))
    }

    debug (message: string): void {
      console.log(this.#format_message(this.#name, message))
    }

    error (message: string): void {
      console.error(this.#format_message(this.#name, message))
    }

    warn (message: string): void {
      console.warn(this.#format_message(this.#name, message))
    }
}
