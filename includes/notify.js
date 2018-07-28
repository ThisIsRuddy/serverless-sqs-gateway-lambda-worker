import Slack from "node-slack";

export const notify = async payload => {
    try {
        await new Slack(process.env.SLACK_HOOK).send(payload)
    } catch (e) {
        console.error(e)
    }
}