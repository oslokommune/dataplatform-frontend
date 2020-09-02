<!---Show datasetstatus, FAILED or OK 
    TODO: Need to connect status with correct dataset 
--->
<template>
  <div class="dataset-status">
    <IconSpinner v-if="!finished" />
    <div v-else>
      <IconCheckCircle v-if="!failed" />
      <IconFailedCircle v-else />
    </div>
    <span v-if="!failed">OK</span>
    <span v-else>FEIL</span>
  </div>
</template>
<script>
import IconFailedCircle from '@/components/icons/IconFailedCircle'
import IconSpinner from '@/components/icons/IconSpinner'
import IconCheckCircle from '@/components/icons/IconCheckCircle'
import datasetstatus from '@/assets/mock/status.json'
export default {
  name: 'DatasetStatus',
  components: {
    IconFailedCircle,
    IconCheckCircle,
    IconSpinner,
  },
  data() {
    return {
      datasetstatus,
    }
  },
  computed: {
    /**
     * There are 2 ways that shows that the processing is finished:
     * If status = FINISHED
     * If the status is FAILED
     */
    finished() {
      return this.runStatus || this.failed
    },
    failed() {
      return this.datasetstatus.status === 'FAILED'
    },
    runStatus() {
      return this.datasetstatus.run_status === 'FINISHED'
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/variables';
.dataset-status {
  display: inline-flex;
}
.IconCheckCircle {
  color: $green;
  margin-right: 5px;
}
.IconFailedCircle {
  color: $red;
  margin-right: 5px;
}
</style>
