import {filterByDatesInterface, leaderInterface, typeInterface} from "../application/interfaces";
import {Message} from "../domain/Message";
import {pgRepository} from "../repository/repos";
import {Between} from "typeorm";
import {Alien} from "../domain/Alien";

export async function filterMessageByDate(dates: filterByDatesInterface): Promise<object> {
    console.log(dates)
    // {"createdAt": Between(dates.end, dates.start)}
    return await pgRepository.find({createdAt: '2021-09-22'}, Message)
}

export async function getMessagesByLeader(leader: leaderInterface): Promise<object> {
    return await pgRepository.findJoin(
        'alien',
        'Alien',
        'name',
        {name: leader.name},
        'Message'
    );
}

export async function getMessagesByType(type: typeInterface): Promise<object> {
    return await pgRepository.findJoin(
        'type',
        'Type',
        'value',
        {value: type.value},
        'Message'
    );
}

export async function getMessagesByValidState(valid: boolean): Promise<object> {
    return await pgRepository.find({"valid": valid ? 1 : 0}, Message)
}