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

    const msg = `Successfully processed queued message: ${event.body}`

    //TODO: Add processing logic

    await notify({text: msg})

    return response(200, {message: msg})
}

const error = async (event, err) => {

    const msg = `An error occurred when attempting to process a message. \n ${err.message} \n ${event.body}`

    await notify({text: msg})

    return response(500, {message: msg})
}