# vuejs2-breadcrumbs

## Installation

Install via NPM
```
$ npm install vuejs2-breadcrumbs
```
...and require the plugin like so:

```
import VueBreadcrumbs from 'vuejs2-breadcrumbs'

Vue.use(VueBreadcrumbs)
```

### Options

```
let options = {}

// Customize element name
options.name = 'app-breadcrumbs'

// Customize template
options.template = VueCompoent || '<template>...</template>'

// You can register breadcrumbs in options, or also can use VueBreadcrumbs.register(name, callback)
options.breadcrumbs = {
    home() {
         return {
              parent: null,
              links: [
                  {
                      text: 'Home',
                      to: {
                          name: 'home'  // use for vue-router
                      }
                  }
              ]
         }
    }
}

Vue.use(VueBreadcrumbs, options)
```


## Register

```
VueBreadcrumbs.register(name, callback)
```

Register the "Root" node
```
VueBreadcrumbs.register('home', () => {
     return {
          parent: null,
          links: [
              {
                  text: 'Home',
                  to: {
                      name: 'home'  // use for vue-router
                  }
              }
          ]
     }
})
```

Register children node under "Root"
```
VueBreadcrumbs.register('users', () => {
     return {
          parent: 'home',
          links: [
              {
                  text: 'Users',
                  to: {
                      name: 'users'  // use for vue-router
                  }
              }
          ]
     }
})

```

Register leaf node under "users" and with parameters
```
VueBreadcrumbs.register('user.profile', ({ user }) => {
     return {
          parent: 'users',
          links: [
              {
                  text: 'Users',
                  to: {
                      name: 'user.profile',  // use for vue-router
                      params: {
                          user_id: user.id
                      }
                  }
              }
          ]
     }
})
```

## Display

> Breadcrumbs will auto match the route name, if you have register.

Common
```
<breadcrumbs />
```

With your parameters
```
<breadcrumbs :params="{ user: user }" />
```

## Customize Template

Sample - Use on Vuetify design
```
<template>
    <div>
        <v-breadcrumbs :divider="divider" v-if="nodes">
            <v-breadcrumbs-item v-for="(node, index) in nodes" :key="node.text" :to="node.to" :disabled="index === nodes.length">
                {{ node.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-divider class="mb-4"></v-divider>
    </div>
</template>
<script>
    export default {
        props: [
            'params',
            'divider',
            'current_route'
        ],
        computed: {
            nodes() {
                const breadcrumb_name = this.current_route || this.$route.name
                if (breadcrumb_name) {
                    // this.$breadcrumbs() can get nodes by name and parameters
                    return this.$breadcrumbs(breadcrumb_name, this.params)
                } else {
                    return []
                }
            }
        }
    }
</script>
```


## License

This SDK is distributed under the GNU GENERAL PUBLIC LICENSE Version 3, see LICENSE for more information.
