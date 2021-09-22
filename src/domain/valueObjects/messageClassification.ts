import {Type} from "../Type";
import {Alien} from "../Alien";

export class MessageClassification {
    text: string
    valid: boolean
    invalid_reason: Array<string> = []
    alien_name: string
    type: string

    constructor(msg: string) {
        this.text = msg
    }

    saveRepresent(type: Type, alien: Alien): object {
        return {
            text: this.text,
            valid: this.valid,
            invalid_reason: this.invalid_reason,
            alien: alien,
            type: type
        }
    }

    messageValid(isValid: boolean): void {
        switch (isValid){
            case true: {
                this.valid = this.valid===false ? false : isValid
                break;
            }
            case false: {
                this.invalid_reason.push("The message not have just the 3 consonants")
                this.valid = isValid
                break;
            }
        }
    }

    alienNameValidation(data: object): void {
        switch (data['isValid']){
            case true: {
                this.valid = this.valid===false ? false : data['isValid']
                this.alien_name = data['alienLeader']
                break;
            }
            case false: {
                this.invalid_reason.push("The message have more than one alien leaders, it's a fake message")
                this.valid = data['isValid']
                this.alien_name = data['alienLeader']
                break;
            }
        }
    }

    messageTypeValidation(data: object): void {
        switch (data['isValid']){
            case true: {
                this.valid = this.valid===false ? false : data['isValid']
                this.type = data['messageCategory']
                break;
            }
            case false: {
                this.invalid_reason.push("The message have more than one type, make it invalid")
                this.valid = data['isValid']
                this.type = data['messageCategory']
                break;
            }
        }
    }
}