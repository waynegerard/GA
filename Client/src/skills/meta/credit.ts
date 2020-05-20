import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'
import analytics from '../../util/analytics'

export default class Credit extends BaseSkill {
    skillName: string = "Credit"

    constructor() {
        super()
        this.commandMap.addCommand("credit", ["referred", "referral", "attribute"], this.credit.bind(this))
    }

    credit(message: SkillMessage): void {
        const comments = message.arguments
        if (comments !== "") {
            this.log('credit', `${comments}`)
            analytics.track({
                event: "Credit",
                userId: message.author.id,
                properties: {
                    guildId: message.channel.id,
                    referral: comments,
                },
            })
            message.createMessage("Thanks for crediting! We'll be sure to thank them :)")
        }
        else {
            message.createMessage("Try ga credit <Discord ID>")
        }
    }

    helpMessage(): string {
        return `**credit <Discord ID>**: Give a referral bonus to the awesome friend that showed you GA!\n`
    }
}
