const defaultOptions = {
    iconSrc: 'blizzard'
}

/**
 * Main Database class
 */
class Database extends Array {
    constructor(fileName, options) {
        fetch(new Request("./assets/data.json")).then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    }

    /**
     * Override Array.prototype.filter
     *
     * This roughly implements Mozilla's builtin for `Array.prototype.filter`[1].
     * V8 passes the prototype of the original Array into `ArraySpeciesCreate`[2][3],
     * which is the Array that gets returned from `filter()`. However, they don't
     * pass the arguments passed to the constructor of the original Array (this Class),
     * which means that it will always return a new Array with ALL items, even when
     * different categories are specified.[4]
     *
     * [1] https://hg.mozilla.org/mozilla-central/file/tip/js/src/builtin/Array.js#l320
     * [2] https://github.com/v8/v8/blob/master/src/builtins/array-filter.tq#L193
     * [3] https://www.ecma-international.org/ecma-262/7.0/#sec-arrayspeciescreate
     * [4] https://runkit.com/kaptard/5c9daf33090ab900120465fe
     */
    filter(fn) {
        const A = []

        for (const el of this) {
            if (fn(el)) A.push(el)
        }
        return A
    }
}

/**
 * Item Database
 */
class Items extends Database {
    constructor(options) {
        super('data', options)
    }

    /**
     * Converts the item link into an ingame parse-able string.
     */
    getItemLink(itemId) {
        var link = this.find((p) => p.itemId === itemId)

        if (link)
            link = link.itemLink.replace(/\|/g, '\\124')
        else
            return false;

        return `/script DEFAULT_CHAT_FRAME:AddMessage("${link}");`
    }

}

/**
 * Professions Database
 */
class Professions extends Database {
    constructor(options) {
        super('professions', options)
    }

    /**
     * Really small wrapper class to make professions accessible via .get('professionName')
     */
    get(name) {
        return this.find((p) => p.name === name)
    }
}

const items = new Items()
console.log(items)