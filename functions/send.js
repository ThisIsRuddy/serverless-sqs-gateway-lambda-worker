import SQS from 'aws-sdk/clients/SQS'
import {response} from '../includes/response'
import {notify} from '../includes/notify'

export const handler = async (event, context, callback) => {
    try {
        callback(null, await execute(event))
    } catch (err) {
        callback(null, await error(err))
    }
}

const msgs = {
    notify:     'Successfully queued message: \n',
    success:    'Queued successfully.',
    error:      'The following error occurred when attempting to process a message: \n'
}

const execute = async event => {

    await new SQS().sendMessage({
        MessageBody: event.body,
        QueueUrl: process.env.SQS_URL
    }).promise()

    await notify({text: msgs.notify + '```' + event.body + '```'})

    return response(200, {message: msgs.success})
}

const error = async err => {
    const msg = msgs.error + err.message + '\n'
    console.log(err)
    await notify({text: '```' + msg + '```'})
    return response(500, {message: msg})
}