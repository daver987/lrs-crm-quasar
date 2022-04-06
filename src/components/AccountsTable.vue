<template>
  <q-table
    v-model:fullscreen="isFullscreen"
    v-model:grid="isGrid"
    :rows="accounts.rows"
    :columns="columns"
    :loading="loading"
    table-header-class="bg-grey-5 q-py-sm"
    square
    flat
    dense
    :pagination="pagination"
    title="Accounts"
    :row-key="accounts.rows.id"
    card-style="border: 1px solid #e0e0e0;"
  >
    >
    <template #top>
      <q-btn
        :disable="loading"
        label="Add New"
        outline
        color="primary"
        size="sm"
        @click="accounts.openAddAccountModal()"
      />
      <q-space />
      <q-btn
        v-if="!isGrid"
        flat
        :disable="loading"
        :icon="isFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        size="sm"
        @click="setFullscreen"
      />
      <q-btn
        v-if="!isFullscreen"
        flat
        :disable="loading"
        :icon="isGrid ? 'view_list' : 'grid_view'"
        size="sm"
        @click="setGrid"
      />
    </template>

    <template #body-cell-details="props">
      <q-td key="details" :props="props" auto-width>
        <q-btn icon="pageview" color="positive" size="sm" round />
      </q-td>
    </template>

    <template #body-cell-edit_company="props">
      <q-td key="details" :props="props" auto-width>
        <div class="q-gutter-sm">
          <q-btn icon="edit" size="sm" round color="secondary" />
          <q-btn icon="delete" size="sm" round color="negative" />
        </div>
      </q-td>
    </template>

    <template #body-cell-company_email="props">
      <q-td key="company_phone" :props="props" auto-width>
        <a
          :href="`mailto:${props.row.company_email}`"
          class="text-grey-9"
          style="text-decoration: none"
          >{{ props.row.company_email }}</a
        >
      </q-td>
    </template>

    <template #body-cell-company_phone="props">
      <q-td key="company_phone" :props="props" auto-width>
        <a
          :href="`tel:${props.row.company_phone}`"
          class="text-indigo-4 text-bold"
          style="text-decoration: none"
          >{{ props.row.company_phone }}</a
        >
      </q-td>
    </template>
  </q-table>
  <add-account-modal :open-value="isOpen" @hide-modal="isOpen = false" />
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '../stores/useAuth'
import { useAccounts } from '../stores/useAccounts'
import AddAccountModal from 'components/AddAccountModal.vue'

const accounts = useAccounts()
const isOpen = ref(false)

//adding the ability to change the view to grid from table
const isGrid = ref(false)
function setGrid() {
  isGrid.value = !isGrid.value
}

//adding the ability to change the view to fullscreen from table
const isFullscreen = ref(false)
function setFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

//get the data for the tables from supabase
const { supabase } = useAuthStore()
const store = reactive({
  user: null,
})
const loading = ref(false)
async function getRows() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from('accounts')
      .select(
        'id, company_name, company_address, company_phone, company_email, company_account_number'
      )
      .eq('user_id', store.user.id)

    if (error && status !== 406) {
      console.log(error)
      return
    }
    if (data) {
      accounts.rows = data
      console.log(accounts.rows)
    }
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getRows()
  console.log(getRows())
})

//add pagination to the table
const pagination = {
  rowsPerPage: 15,
  sortBy: 'account_number',
}

//add the info for the columns in the table
const columns = [
  {
    name: 'account_number',
    required: true,
    label: 'Account #',
    align: 'left',
    field: 'company_account_number',
    classes: 'text-red-6 text-bold',
    format: (val) => `${val}`,
  },
  {
    name: 'details',
    align: 'center',
    label: 'Details',
    field: 'details',
    sortable: false,
  },
  {
    name: 'company_name',
    align: 'left',
    label: 'Company Name',
    field: 'company_name',
    sortable: true,
  },
  {
    name: 'company_address',
    align: 'left',
    label: 'Company Address',
    field: 'company_address',
    sortable: true,
  },
  {
    name: 'company_phone',
    align: 'left',
    label: 'Company Phone',
    field: 'company_phone',
    sortable: true,
  },
  {
    name: 'company_email',
    align: 'left',
    label: 'Company Email',
    field: 'company_email',
    sortable: true,
  },
  {
    name: 'edit_company',
    align: 'left',
    field: 'edit_company',
    sortable: false,
  },
]
</script>
