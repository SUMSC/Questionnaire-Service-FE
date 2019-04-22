import Vue from 'vue';
import VueApollo from "vue-apollo";
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
    // 你需要在这里使用绝对路径
    uri: 'https://localhost:8000'
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});