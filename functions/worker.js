import async from 'async'
import {response} from '../includes/response'
import {notify} from '../includes/notify'

export const handler = async (event, context, callback) => {
    try {
        callback(null, await execute(event))
    } catch (err) {
        callback(null, await error(event, err))
    }
}

const msgs = {
    notify:     `Successfully processed queued message: \n`,
    success:    `Finished processing batch of messages.`,
    error:      `The following error occurred when attempting to process a message: \n`
}

const execute = async event => {
    async.map(event.messages || event.Records, async message => {
        await notify({text: msgs.notify + '```' + message.body + '```'})
    }, err => {
        if(err) throw Error(err)
        return response(200, {message: msgs.success})
    })
}

const error = async err => {
    const msg = msgs.error + err.message + '\n'
    console.log(err.message)
    await notify({text: '```' + msg + '```'})
    return response(500, {message: msg})
}