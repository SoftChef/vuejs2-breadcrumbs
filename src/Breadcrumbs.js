import BreadcrumbsComponent from './components/Breadcrumbs.vue'

class Breadcrumbs {
    constructor() {
        this.breadcrumbs = {}
    }
    register(name, callback) {
        if (this.breadcrumbs[name] == null) {
            this.breadcrumbs[name] = callback
        } else {
            throw new BreadcrumbsException(`Breadcrumbs: ${name} is duplicate.`)
        }
    }
    getNodes(name, params) {
        if (!this.breadcrumbs[name]) {
            throw new BreadcrumbsException(`Breadcrumbs: ${name} not exists.`)
        }
        let config = this.breadcrumbs[name](params)
        let nodes = config.links
        return config.parent ? nodes.concat(this.getNodes(config.parent, params)) : nodes
    }
    get(name, params) {
        let nodes = this.getNodes(name, params)
        return nodes.reverse()
    }
}

class BreadcrumbsException {
    constructor(message) {
        this.message = message
    }
    toString() {
        return this.message
    }
}

const breadcrumbs = new Breadcrumbs()

export default {
    install(Vue, options = {}) {
        Object.defineProperties(Vue.prototype, {
            $breadcrumbs: {
                get: function() {
                    return breadcrumbs.get.bind(breadcrumbs)
                }
            }
        })
        let template = options.template || BreadcrumbsComponent
        let name = options.name || 'breadcrumbs'
        let items = options.breadcrumbs || {}
        // Register component to Vue
        Vue.component(name, template)
        // Add breadcrumbs to registry
        for (let name in items) {
            this.register(name, items[name])
        }
    },
    register(name, callback) {
        breadcrumbs.register(name, callback)
    }
}
