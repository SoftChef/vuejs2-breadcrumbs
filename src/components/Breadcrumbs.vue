<template>
    <ul v-if="nodes">
        <li v-for="(node, index) in nodes" :key="index">
            <template v-if="index < nodes.length - 1">
                <router-link :to="node.to">{{ node.text }}</router-link>
                <span>{{ divider || '/' }}</span>
            </template>
            <template v-else>
                <span>{{ node.text }}</span>
            </template>
        </li>
    </ul>
</template>
<style lang="stylus" scoped>
    ul {
        list-style: none;
        padding: 0;
        display: block;
    }
    li {
        display: inline-block;
    }
    a + span {
        margin: 0 15px;
    }
</style>
<script>
    export default {
        props: [
            'params',
            'divider'
        ],
        data() {
            return {}
        },
        computed: {
            nodes() {
                const breadcrumbName = this.$route.name || null
                if (breadcrumbName) {
                    return this.$breadcrumbs(breadcrumbName, this.params)
                } else {
                    return []
                }
            }
        }
    }
</script>
