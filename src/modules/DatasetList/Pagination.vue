<template>
  <nav class="dataset-pagination" aria-label="Sidevelger">
    <ul>
      <li class="page-named">
        <Button
          v-if="hasPrevPage"
          @click="prevPage"
          aria-label="Forrige side"
          variant="secondary"
          >Forrige</Button
        >
        <Button v-else disabled>Forrige</Button>
      </li>

      <template v-if="pagesToPrint.length > 0">
        <li
          v-for="(page, index) in pagesToPrint"
          :key="index"
          class="page-numbered"
        >
          <span v-if="isNaN(page)">{{ page }}</span>
          <a
            v-else
            href="#"
            @click="(event) => goToPage(event, page)"
            :class="{ current: page === currentPage }"
            :aria-current="page === currentPage"
            :aria-label="
              'Side ' + page + (page === currentPage ? ', denne siden' : '')
            "
            >{{ page }}</a
          >
        </li>
      </template>

      <li class="page-named">
        <Button
          v-if="hasNextPage"
          @click="nextPage"
          aria-label="Neste side"
          variant="secondary"
          >Neste</Button
        >
        <Button v-else disabled>Neste</Button>
      </li>
    </ul>
  </nav>
</template>

<script>
import Button from '@/components/buttons/Button'

export default {
  components: { Button },
  computed: {
    hasNextPage() {
      return this.currentPage < this.pageCount
    },
    hasPrevPage() {
      return 1 < this.currentPage
    },
    pagesToPrint() {
      const lastPage = this.pageCount

      if (lastPage <= 1) {
        return []
      }

      const current = Math.min(lastPage, this.currentPage)
      const padding = 2

      const pages = []
      pages.push(1)
      for (let i = current - padding; i <= current + padding; i++) {
        if (i < lastPage && i > 1) {
          pages.push(i)
        }
      }
      pages.push(lastPage)

      const pagesWithDots = []
      let j
      for (let i of pages) {
        if (j) {
          if (i - j === 2) {
            pagesWithDots.push(j + 1)
          } else if (i - j !== 1) {
            pagesWithDots.push('...')
          }
        }
        pagesWithDots.push(i)
        j = i
      }

      return pagesWithDots
    },
  },
  methods: {
    goToPage(event, newPage) {
      event.preventDefault()
      this.$emit('setPage', newPage)
    },
    prevPage(event) {
      event.preventDefault()
      const newPage =
        this.currentPage > this.pageCount
          ? this.pageCount
          : this.currentPage - 1
      this.$emit('setPage', newPage)
    },
    nextPage(event) {
      event.preventDefault()
      this.$emit('setPage', this.currentPage + 1)
    },
  },
  props: {
    currentPage: Number,
    pageCount: Number,
  },
}
</script>

<style lang="scss" scoped>
nav {
  margin-top: $space-xl;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
}

a,
span {
  align-items: center;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  min-height: 50px;
  min-width: 50px;
  padding: 0.5rem 1rem;
}

.page-named {
  &:first-child {
    margin-right: 1rem;
  }

  &:last-child {
    margin-left: 1rem;
  }
}

.page-numbered {
  a {
    text-decoration: none;
  }

  a:focus,
  a:hover {
    text-decoration: underline;
  }

  a[aria-current] {
    border-color: $grey-200;
  }
}
</style>
