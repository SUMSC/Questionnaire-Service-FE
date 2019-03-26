<template>
    <div class="scroll-view-0">
        <md-scroll-view
                ref="scrollView"
                :scrolling-x="false"
        >
            <md-cell-item
                    v-for="i in list"
                    class="scroll-view-item"
                    :title="i"
                    :key="i"
                    @click="$_onItemClick(i)"
            />
        </md-scroll-view>
    </div>
</template>

<script>
    import {Toast} from 'mand-mobile'

    export default {
        name: 'HomeSearchList',
        data() {
            return {
                list: 5,
            }
        },
        methods: {
            $_onItemClick(i) {
                Toast.info(`Click ${i}`)
            },
        },
    }
</script>

<style lang="stylus">
    .scroll-view-0
        height 100%
        background #FFF

        .scroll-view-item
            text-align center
            font-size 14px
</style>