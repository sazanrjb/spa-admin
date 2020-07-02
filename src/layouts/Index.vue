<template>
    <v-app>
        <sidebar></sidebar>
        <v-content style="backgroundColor: #E1E1E1;">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Layout',
  components: {
      Sidebar,
  },
}
</script>