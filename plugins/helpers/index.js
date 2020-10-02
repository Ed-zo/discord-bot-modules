class Lock {
    constructor(limit) {
        this.locks = [];
        this.limit = limit || 500;
    }

    lock(key) {
        if (this.locks.length >= this.limit)
            return -1;

        if (this.locked(key))
            return false;
        this.locks.push(key);
        return true;
    }

    unlock(key) {
        if (this.locked(key)) {
            var index = this.locks.indexOf(key);
            if (index != -1) {
                this.locks.splice(index, 1);
            }
            return true;
        }
        return false;
    }

    locked(key) {
        if (this.locks.includes(key))
            return true;
        return false;
    }
}

class Recent {
    constructor(keep, key) {
        this.keep = keep;
        this.recent = [];
        this.key = key;
        return this;
    }

    add(thing) {
        if (this.recent.filter(a => a[this.key] == thing[this.key]).length > 0)
            return false;

        if (this.recent.length == this.keep) this.recent.pop();

        this.recent.unshift(thing);
    }

    get() {
        return this.recent.map(a => {
            var b = {...a }
            delete b.key;
            return b;
        });
    }
}

module.exports = {
    Recent: Recent,
    Lock: Lock,
};
