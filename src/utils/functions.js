
function hasOwnProperties(objectSupplied, propertyList){
    for (let property of propertyList){
        if (!objectSupplied.hasOwnProperty(property)){
            return false;
        }
    }
    return true;
}

function hasValue(dataObject, key){
    return dataObject.values().includes(key);
}

module.exports = {
    hasOwnProperties: hasOwnProperties,
    hasValue: hasValue
};