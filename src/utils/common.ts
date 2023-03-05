export const tryGetObjectValue = (fieldName: string | undefined, item: any) => {
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

export const tryGetListValue = (fieldName: string, items: any[] | never[] | undefined): any[] | never[] | undefined => {
    if (!fieldName)
        return items;

    return items?.map(item => tryGetObjectValue(fieldName, item))
}

export const onlyUnique = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
} 

export const range = (from: number, to: number, step: number = 1) =>
    [...Array(Math.floor((to - from) / step) + 1)]?.map((_, i) => from + i * step);

    
