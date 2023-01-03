const { BaseDS } = require('./base')

class DeptDS extends BaseDS {
    constructor(deptOpts) {
        super(deptOpts)
    }

    async getByEmpId(empId, params={}) {
        var cacheKey = params ? JSON.stringify(params) : 'noparams'
        cacheKey = `employee:${this.cacheKeyBase}:${cacheKey}`

        const cacheDoc = await this.cache.get(cacheKey)
        if (cacheDoc) {
            return JSON.parse(cacheDoc);
        }

        const doc = await this.service.get({
            ...params,
            "employee.id": empId
        })

        this.cache.set(cacheKey, JSON.stringify(doc), { ttl: 3 })

        return doc;
    }
}

exports.DeptDS = DeptDS;
