import EventEmitter from 'eventemitter3'

const emitter = new EventEmitter()

const eventBus = {
    on: (event, func) => emitter.on(event, func),
    off: (event, func) => emitter.off(event, func),
    emit: (event, payload) => emitter.emit(event, payload),
}

export default eventBus
