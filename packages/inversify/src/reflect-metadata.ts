// import 'reflect-metadata'
declare namespace Reflect {
    function defineMetadata(metadataKey: any, metadataValue: any, target: Object): void;
    function hasOwnMetadata(metadataKey: any, target: any): boolean;
    function getMetadata(metadataKey: any, target: any): any;
}

type MetaDataKeyType = string
type PropertyKeyType = any
type TargetType = Object

const log = (...args: any[]) => console.log('[reflect-metadata.ts]', ...args)

const Metadata: WeakMap<any, Map<string, any>> = new WeakMap()

function defineMetadata(metadataKey: MetaDataKeyType, metadataValue: any, target: TargetType, propertyKey?: PropertyKeyType) {
    if (propertyKey) {
        log('not support porpertyKey yet!')
    }
    let data = Metadata.get(target) || new Map()
    data.set(metadataKey, metadataValue)
    Metadata.set(target, data)
}

function getMetadata(metadataKey: MetaDataKeyType, target: TargetType, propertyKey?: PropertyKeyType) {
    if (propertyKey) {
        log('not support porpertyKey yet!')
    }

    if (!Reflect.hasOwnMetadata(metadataKey,target)) {
        log('Metadata', metadataKey, Metadata.get(target), Metadata.get(target)?.get(metadataKey))

        log(`${metadataKey} key not set yet`)
        return null
    }

    return Metadata.get(target)?.get(metadataKey)
}

function hasOwnMetadata(metadataKey: MetaDataKeyType, target: TargetType) {
    let data = Metadata.get(target)
    if(!data){
        return false
    }else{
        return data.has(metadataKey)
    }
}

makeExporter(Reflect, 'defineMetadata', defineMetadata)
makeExporter(Reflect, 'getMetadata', getMetadata)
makeExporter(Reflect, 'hasOwnMetadata', hasOwnMetadata)

function makeExporter(target: any, key: any, value: any) {
    if (typeof target[key] !== 'function') {
        Object.defineProperty(target, key, { configurable: true, writable: true, value })
    }
}
