<template>
  <div class="dataset-module">
    <Loader v-if="loading" center>Henter datasett</Loader>

    <HttpError v-if="errorCode" :error="errorCode">
      Kunne ikke hente datasett
    </HttpError>
    <div v-if="dataset" class="dataset">
      <DetailsSidebar>
        <!-- TODO What should be here? -->
        <template v-slot:links>
          <a href="#">Lenke en</a>
          <a href="#">Lenke to</a>
          <a href="#">Lenke tre</a>
          <a href="#">Lenke fire</a>
        </template>

        <template v-slot:buttons>
          <Button>Knapp en</Button>
          <Button variant="secondary">Knapp to</Button>
          <Button disabled>Knapp tre</Button>
        </template>
      </DetailsSidebar>

      <article class="content">
        <h1>{{ dataset.title }}</h1>

        <div class="section">
          <h2>Beskrivelse</h2>

          <p>{{ dataset.description }}</p>
        </div>

        <div class="section">
          <h2>Detaljer</h2>

          <p>
            <strong>Formål:</strong>
            <span>{{ dataset.objective }}</span>
          </p>

          <p>
            <strong>Prosesseringstilstand:</strong>
            <span>{{ dataset.processing_stage }}</span>
          </p>

          <p>
            <strong>Tilgangsnivå:</strong>

            <span v-if="dataset.accessRights === 'public'">
              <IconLockSolidUnlocked /> Datasettet er offentlig tilgjengelig
            </span>
            <span v-else-if="dataset.accessRights === 'restricted'">
              <IconLockSolidLocked /> Datasettet har begrenset offentlig tilgang
            </span>
            <span v-else-if="dataset.accessRights === 'non-public'">
              <IconLockSolidLocked /> Datasettet er unntatt offentligheten
            </span>
            <span v-else>
              <IconLockSolidLocked /> Datasettet har ukjent tilgangsnivå
            </span>
          </p>

          <p>
            <strong>Kontakt:</strong>
            <span
              >{{ dataset.contactPoint.name }} ({{
                dataset.contactPoint.email
              }})</span
            >
          </p>

          <p>
            <strong>Nøkkelord:</strong>
            <span>{{ dataset.keywords.join(', ') }}</span>
          </p>
        </div>

        <div class="secton">
          <h2>Utgivelser</h2>

          <Editions :datasetId="dataset.Id" />
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Button from '@/components/buttons/Button'
import DetailsSidebar from '@/components/Layout/DetailsSidebar'
import HttpError from '@/components/Alert/HttpError'
import IconLockSolidLocked from '@/components/icons/IconLockSolidLocked'
import IconLockSolidUnlocked from '@/components/icons/IconLockSolidUnlocked'
import Loader from '@/components/Loader'

import Editions from './Editions'

export default {
  name: 'Dataset',
  components: {
    Button,
    DetailsSidebar,
    Editions,
    HttpError,
    IconLockSolidLocked,
    IconLockSolidUnlocked,
    Loader,
  },
  data() {
    return {
      dataset: null,
      errorCode: null,
      loading: false,
    }
  },
  created() {
    this.fetchDataset()
  },
  watch: {
    $route: 'fetchDataset',
  },
  methods: {
    async fetchDataset() {
      this.dataset = null
      this.errorCode = null
      this.loading = true

      const datasetId = this.$route.params.id

      try {
        const { data: dataset } = await this.$axios.get(
          `/api/dataplatform/metadata/datasets/${datasetId}`
        )
        if (dataset) {
          this.dataset = dataset
        } else {
          this.errorCode = 404
        }
      } catch (error) {
        this.errorCode = error?.response?.status || 'noResponse'
      }

      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.dataset {
  display: flex;
}

.content {
  flex: 1;
}

.section {
  margin-bottom: $space-lg;

  strong {
    margin-right: 0.75ex;
  }
}
</style>
