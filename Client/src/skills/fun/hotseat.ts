import BaseSkill from '../baseSkill'
import SkillMessage from '../../models/skillMessage'

export default class Hotseat extends BaseSkill {
    skillName: string = "Hotseat questions"

    constructor() {
        super()
        this.commandMap.addCommand("hotseat", ["hot seat"], this.hotseat.bind(this))
    }

    helpMessage(): string {
      return `**hotseat <name>**: Find out what your friends think`
    }

    private questionMap = {
        1: "how many toddlers can they take on?",
        2: "which chess piece would they be?",
        3: "what is the worst song they secretly would enjoy?",
        4: "if they were a movie villian, what would their backstory be?",
        5: "how nice are their ankles?",
        6: "could they pull off bald?",
        7: "could they pull off a beard?",
        8: "could they pull off a mustache?",
        9: "how many pigeons can they take on?",
        10: "how well would they do as a trophy spouse?",
        11: "which Disney princess would they be?",
        12: "which Seven Dwarf would they be?",
        13: "how long would they survive on a uninhabited island?",
        14: "how long could they survive without the internet?",
        15: "how likely are they to become famous?",
        16: "how likely are they to run for office?",
        17: "how well would they do in a military bootcamp?",
        18: "what name would fit them better than their real name?",
        19: "what is the dumbest thing they've ever said?",
        20: "if a song played everytime they walked into a room, what would it be?",
        21: "if this person got a secret tattoo, what would it be?",
        22: "could they pull off bangs?",
        23: "which Harry Potter character are they most like?",
        24: "would this person die a hero or live long enough to see themselves become the villain?",
        25: "which video game character are they most like?",
        26: "which Tetris piece would they be?",
        27: "which breakfast food is this person most like?",
        28: "when would this person die in a horror movie plot?",
        29: "can this person handle the truth?",
        30: "which piece of furniture is this person most like?",
        31: "what is the best way to annoy this person?",
        32: "what romantic surprise would they most like?",
        33: "how many marshmallows could they fit in their mouth?",
        34: "if they suddenly disappeared, what would be the running theory for why?",
        35: "what drink is this person most like?",
        36: "could they pull off crocs?",
        37: "what is the first thing they would do if they won a million dollars?",
        38: "which piece of the keyboard would this person be?",
        39: "if this person had an evil imposter, how would you discover the truth?",
        40: "what meme are they most like?",
        41: "what is their dream job?",
        42: "how good of a liar are they?",
        43: "how well would they do as President of the United States?",
        44: "would they rather be feared or loved?",
        45: "would you trust them to babysit your kids?",
        46: "could they pull off high heels?",
        47: "could they pull off a ponytail?",
        48: "would you still be friends with them if they quacked every time before they spoke?",
        49: "would you still be friends with them if they only spoke in movie quotes?",
        50: "were they popular in middle school?",
        51: "what were they have been in another life?",
        52: "how far could they throw an avocado?",
        53: "how long could they fulfill a vow of silence?",
        54: "how intimidating is this person?",
    }

    randomNumber(): number {
        const maximum = Object.keys(this.questionMap).length
        const answer = Math.floor(Math.random() * maximum) + 1
        this.log('randomNumber', `Calculating random number between 1 and ${maximum} inclusive: ${answer}`)
        return answer
    }

    getReplyStructure(probability: number): string {
        return this.questionMap[probability]
    }

    hotseat(message: SkillMessage): void {
        const caller = message.author.username
        const target = message.arguments
        const random = this.randomNumber()
        if (target === "") {
            message.createMessage(`Regarding ${caller}, `.concat(this.getReplyStructure(random)))
        }
        else {
            message.createMessage(`Regarding ${target}, `.concat(this.getReplyStructure(random)))
        }
    }
}
