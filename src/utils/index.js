'use strict'

const _ = require('lodash')

const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick( object, fields)
}

const getSelectData = ( select = [] ) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}

const unGetSelectData = ( unSelect = [] ) => {
    return Object.fromEntries(unSelect.map(el => [el, 0]))
}

const removeUnderfineObject = (obj) => {
    Object.keys(obj).forEach( k => {
        if(obj[k] == null){
            delete obj[k]
        }
    })

    return obj
}

const updateNestedObjectParser = (objParent) => {
    const final = {}

    objParent = removeUnderfineObject(objParent)

    Object.keys(objParent).forEach( keyParent => {
        if(typeof objParent[keyParent] === 'object' && !Array.isArray(objParent[keyParent])){
            
            const objChild = updateNestedObjectParser(objParent[keyParent])

            Object.keys(objChild).forEach( keyChild => {
                final[`${keyParent}.${keyChild}`] = objChild[keyChild]
            })
        }else{
            final[keyParent] = objParent[keyParent]
        }
    })

    return final
}

module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUnderfineObject,
    updateNestedObjectParser,
}