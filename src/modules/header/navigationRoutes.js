import env from '@/utils/env'

export default {
  home: {
    title: 'Hjem',
    url: '/',
  },
  my_datasets: {
    title: 'Mine datasett',
    url: '/datasett',
  },
  all_datasets: {
    title: 'Alle datasett',
    url: env.VUE_APP_DATASET_CATALOG,
  },
}
