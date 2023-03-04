export const tryGetObjectValue = (fieldName: string, item: any) => {
    if (!fieldName)
        return item;

    let prop, props = fieldName.split('.');

    for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
        prop = props[i];

        let candidate = item[prop];
        if (candidate !== undefined) {
            item = candidate;
        } else {
            break;
        }
    }
    return item[props[i]];
}

export const tryGetListValue = (fieldName: string, items: any[] | never[] | undefined) : any[] | never[] | undefined => {
    if (!fieldName)
        return items;

    return items?.map(item => tryGetObjectValue(fieldName, item))
}