<template>
    <van-cell-group>
        <NameForm />
    </van-cell-group>
</template>

<script>
    import NameForm from "@/components/ActivityForms/NameForm";
    export default {
        name: "index",
        components: {NameForm},
        mounted() {
            this.$store.dispatch({
                type: 'getForm',
                target: 'event',
                id: this.$route.params.eventId
            });
        }
    }
</script>

<style scoped>

</style>