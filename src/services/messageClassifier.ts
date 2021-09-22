import { messageInterface } from "../application/interfaces";
import {pgRepository} from '../repository/repos'
import { Message } from "../domain/Message";
import { Type } from "../domain/Type";
import {MessageClassification} from "../domain/valueObjects/messageClassification"
import {Alien} from "../domain/Alien";

export async function classifiedMessage(message: messageInterface): Promise<object> {
    // save this in a Class
    const msgFinalProps: MessageClassification = new MessageClassification(message.msg)

    msgFinalProps.messageValid(await validMessage(message))
    msgFinalProps.alienNameValidation(await haveDestinatary(message)) // {"isValid": boolean, "alienLeader": string}
    msgFinalProps.messageTypeValidation(await getMessageType(message)) // {"isValid": boolean, "messageCategory": string}

    console.log(msgFinalProps)
    return await saveMessage(msgFinalProps)
}

async function saveMessage(message: MessageClassification): Promise<object> {
    let alien;
    alien = await pgRepository.findOne({name: message.alien_name}, Alien);

    if (alien === undefined) {
        alien = await pgRepository.save({name: message.alien_name}, Alien) as Alien;
    }

    const type = await pgRepository.findOne({value: message.type}, Type) as Type;
    return pgRepository.save(message.saveRepresent(type, alien), Message);
}

function isConsonant(letter: string): boolean {
    const vocals = ['a', 'e', 'i', 'o', 'u']
    return (!vocals.includes(letter));
}

async function validMessage(message: messageInterface): Promise<boolean> {

    const validation = message.msg.split(" ").map(
        value => {
            if (value.length === 0) return true;
            const wordToValidate = value.slice(1)
            let count = 0
            for (let el=0; el < wordToValidate.length; el+=1) {
                if (isConsonant(wordToValidate[el])) count+=1;
            }
            return (count === 3);
        });
    return !validation.includes(false);
}

async function haveDestinatary(message: messageInterface): Promise<object> {
    const msg = message.msg.split(" ")
    let alienLeader;

    for (let i=0; i < msg.length; i+=1) {
        if (msg[i].length === 0) continue;
        if (i === 0) alienLeader = msg[i][0];

        if (msg[i][0] !== alienLeader) return {"isValid": false, "alienLeader": alienLeader}
    }
    return {"isValid": true, "alienLeader": alienLeader};
}

async function getWordType(firstWord: string): Promise<string> {
    const consonants = [];

    // get the consonants in the word
    for (let el=0; el < firstWord.length; el+=1) {
        if (isConsonant(firstWord[el])) consonants.push(firstWord[el]);
    }
    const initOrder = consonants.toString()

    const asceding = consonants.sort()
    const isAscend = asceding.toString() === initOrder
    const descending = consonants.sort((one, two) => (one > two ? -1 : 1))
    const isDecend = descending.toString() === initOrder

    if (isAscend && !isDecend) {
        return "DANGER"
    } else if (isDecend && !isAscend) {
        return "WARNING"
    } else if (!isAscend && !isDecend) return "INFO"
}

async function getMessageType(message: messageInterface): Promise<object> {
    let messageType = "";
    const msgArray = message.msg.split(" ")
    for (let i=0; i < msgArray.length; i+=1){
        if (msgArray[i].length === 0) continue;

        const word = msgArray[i].slice(1)

        if (i === 0) {
            messageType = await getWordType(word)
        } else if (messageType !== await getWordType(word)) return {"isValid": false, "messageCategory": messageType}
    }

    return {"isValid": true, "messageCategory": messageType}

}

// External queries; This could be abstracted in a repository
// export async function getUsers(): Promise<object> {
//     const msg = getRepository(Message)
//     const data = await msg.find()
//     console.log(data)
//     return data
// }
//
// export async function createUser(): Promise<object> {
//     const type = await getRepository(Type).findOne({value: 'DANGER'})
//     console.log(type)
//     const msg = getRepository(Message).create({"text": "This is a test 2", "valid": true, "type_id": type});
//     await getRepository(Message).save(msg)
//     console.log(msg)
//     return msg;
// }
