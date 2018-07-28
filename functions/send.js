import SQS from 'aws-sdk/clients/SQS'
import {response} from '../includes/response'
import {notify} from '../includes/notify'

export const handler = async (event, context, callback) => {
    try {
        callback(null, await execute(event))
    } catch (err) {
        callback(null, await error(event, err))
    }
}

const execute = async event => {

    const msg = `Successfully queued message: ${event.body}`

    await new SQS().sendMessage({
        MessageBody: event.body,
        QueueUrl: process.env.SQS_URL
    }).promise()

    await notify({text: msg})

    return response(200, {message: msg})
}

const error = async (event, err) => {

    const msg = `An error occurred when attempting to queue an message. \n ${err.message} \n ${event.body}`

    await notify({text: msg})

    return response(500, {message: msg})
}