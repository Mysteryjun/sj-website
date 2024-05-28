<template>
  <div class="app-container">   
    <div class="home">
      欢迎，{{ userInfo.user.userName }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
}
</script>
