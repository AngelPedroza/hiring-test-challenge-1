import {filterByDatesInterface, messageInterface, leaderInterface, typeInterface} from "./interfaces";
import {classifiedMessage} from "../services/messageClassifier"
import {
    filterMessageByDate,
    getMessagesByLeader,
    getMessagesByType,
    getMessagesByValidState
} from '../services/messageFiltering'

async function receiveMessage(ctx: any): Promise<void> {
    const message = ctx.request.body as messageInterface
    try {
        ctx.body = await classifiedMessage(message)
        // ctx.body = 200
    } catch (e) {
        console.log(e)
        ctx.body = "Had an error in the classification process"
        ctx.status = 500
    }
}

async function filterByDates(ctx: any): Promise<void> {
    const dates = ctx.request.body as filterByDatesInterface
    ctx.body = filterMessageByDate(dates)
}

async function filterByAlienLeader(ctx: any): Promise<void> {
    const leader = ctx.request.body as leaderInterface
    ctx.body = await getMessagesByLeader(leader)
}

async function filterByType(ctx: any): Promise<void> {
    const type = ctx.request.body as typeInterface
    ctx.body = await getMessagesByType(type)
}

async function fetchByValid(ctx: any): Promise<void> {
    const state = ctx.request.body['state']
    console.log(state)
    ctx.body = await getMessagesByValidState(state)
}

export default {
    receiveMessage,
    filterByDates,
    filterByAlienLeader,
    filterByType,
    fetchByValid
};